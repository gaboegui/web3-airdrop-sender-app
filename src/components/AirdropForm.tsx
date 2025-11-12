"use client"

import { useState, useMemo, useEffect } from "react";
import InputField from "./ui/InputField";
import { chainsToTSender, tsenderAbi, erc20Abi } from "@/constants";

import { useChainId, useAccount, useConfig, useWriteContract, useWaitForTransactionReceipt  } from "wagmi";
import { readContract } from "@wagmi/core";
import { calculateTotal } from "@/utils";
import { Footer } from "./Footer";
import * as styles from "./AirdropForm.styles";


export default function AirDropForm() {
  
  // Initialize state with localStorage data if available (client-side only)
  const getInitialState = (key: string, defaultValue: string = "") => {
    if (typeof window !== 'undefined') {
      const savedFormData = localStorage.getItem('airdropFormData')
      if (savedFormData) {
        const data = JSON.parse(savedFormData)
        return data[key] || defaultValue
      }
    }
    return defaultValue
  }

  const [tokenAddress, setTokenAddress] = useState(() => getInitialState('tokenAddress', ""))
  const [recipientAddresses, setRecipientAddresses] = useState(() => getInitialState('recipientAddresses', ""))
  const [amounts, setAmounts] = useState(() => getInitialState('amounts', ""))
  const [isLoading, setIsLoading] = useState(false)
  const [transactionHash, setTransactionHash] = useState<string | null>(null)
  const [tokenDetails, setTokenDetails] = useState<{symbol?: string, decimals?: number, totalSupply?: string}>({})
  
  const config = useConfig()
  const account = useAccount()      // wagmi: wallet account selected
  const chainId = useChainId()      // wagmi: hook that updates if changed
  const { data: hash, isPending, error, writeContractAsync } = useWriteContract()
  
  // Use useWaitForTransactionReceipt for the main airdrop transaction
  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    isError: isTransactionError,
    error: transactionError
  } = useWaitForTransactionReceipt({
    confirmations: 1,
    hash: transactionHash as `0x${string}`,
  })

  // Save form data to localStorage whenever inputs change
  useEffect(() => {
    // Only access localStorage on the client side
    if (typeof window !== 'undefined') {
      const formData = { tokenAddress, recipientAddresses, amounts }
      localStorage.setItem('airdropFormData', JSON.stringify(formData))
    }
  }, [tokenAddress, recipientAddresses, amounts])

  // Fetch token details when token address changes
  useEffect(() => {
    if (tokenAddress && tokenAddress.length === 42) {
      fetchTokenDetails()
    }
  }, [tokenAddress])

  // react: useMemo monitor [amounts] and call function calculateTotalAmount every time that changes
  const totalAmountForm: number = useMemo(() => calculateTotal(amounts), [amounts])

  /**
   * Gets the aproved amount in the blockchain 
   * @param tSenderAddress 
   * @returns 
   */
  async function getAprovedAmount(tSenderAddress: string | null): Promise<number> {
      if (!tSenderAddress){
        alert("No address found for the current Blockchain")
        return 0
      }
      // read from the contract if we have enough aprroved tokens
      // token.allowance(account, tsender)
      // https://wagmi.sh/core/api/actions/readContract
      const amountAproved = await readContract(config, {
        abi: erc20Abi,
        address: tokenAddress as `0x${string}`, // check correct format
        functionName: 'allowance',
        args: [account.address, tSenderAddress as `0x${string}`]
      })
      return amountAproved as unknown as number
    }

  /**
   * Get details of ERC20 Token
   */  
  async function fetchTokenDetails() {
    try {
      const [symbol, decimals, totalSupply] = await Promise.all([
        readContract(config, {
          abi: erc20Abi,
          address: tokenAddress as `0x${string}`,
          functionName: 'symbol',
        }),
        readContract(config, {
          abi: erc20Abi,
          address: tokenAddress as `0x${string}`,
          functionName: 'decimals',
        }),
        readContract(config, {
          abi: erc20Abi,
          address: tokenAddress as `0x${string}`,
          functionName: 'totalSupply',
        })
      ])
      setTokenDetails({
        symbol: symbol as string,
        decimals: decimals as number,
        totalSupply: (totalSupply as bigint).toString()
      })
    } catch (error) {
      console.error('Error fetching token details:', error)
      setTokenDetails({})
    }
  }

  /**
   * Send Airdrop function
   */
  async function handleSendAirdrop() {
    setIsLoading(true)
    setTransactionHash(null)
    try {
      // 1a. If already approved, moved to step 2
      const tSenderAddress = chainsToTSender[chainId].tsender //mappig in constatnts
      const amountAproved = await getAprovedAmount(tSenderAddress)
      console.log(amountAproved)
      
      // 1b. Approve our sender contract to send our tokens
      if (amountAproved < totalAmountForm){
        console.log(totalAmountForm)
        // call approve
        const approvalHash = await writeContractAsync({
            abi: erc20Abi,
            address: tokenAddress as `0x${string}`,
            functionName: "approve",
            args: [tSenderAddress as `0x${string}`, BigInt(totalAmountForm)]
        })
        console.log("Approval transaction sent:", approvalHash)

        // For approval, we'll just wait for the hash and proceed
        // The main useWaitForTransactionReceipt will handle the airdrop transaction
      }

      // 2. Call the airdrop function on the tsender contract
      const airdropHash = await callAirDrop(tSenderAddress)
      setTransactionHash(airdropHash)
      console.log("Airdrop transaction sent:", airdropHash)
      
    } catch (error) {
      console.error("Transaction error:", error)
    } finally {
      setIsLoading(false)
    }
  }


  /**
   * Call the airdrop function on the tsender contract
   */ 
  async function callAirDrop(tSenderAddress: string ): Promise<string> {
    // call airdrop transfer we divide multiple line in text areas with regular expressions
      return await writeContractAsync({
          abi: tsenderAbi,
          address: tSenderAddress as `0x${string}`,
          functionName: "airdropERC20",
          args: [
              tokenAddress,
              recipientAddresses.split(/[,\n]+/).map((addr: string) => addr.trim()).filter((addr: string) => addr !== ''),
              amounts.split(/[,\n]+/).map((amt: string) => amt.trim()).filter((amt: string) => amt !== ''),
              BigInt(totalAmountForm),
          ],
      },)
  }
  
function formatTokenAmount(weiAmount: number, decimals: number): string {
    const tokenAmount = weiAmount / Math.pow(10, decimals)
    return tokenAmount.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })
}

  /** FORM RENDER */
  return (
    <div className={styles.containerClasses}>
      <InputField
        label={"ERC20 Token - Smart Contract Address"}
        placeholder={"0x..."}
        value={tokenAddress}
        type={"text"}
        large={false}
        onChange={e => setTokenAddress(e.target.value)}
      />
      <InputField
        label="Receipents Addresses "
        placeholder="0x45ABF, 0x5ABF, 0x65ABF, ... "
        value={recipientAddresses}
        type={"text"}
        large={true}
        onChange={e => setRecipientAddresses(e.target.value)}
      />
      <InputField
        label="Amounts of Token to Send"
        placeholder="100, 200, 150, ..."
        value={amounts}
        type={"text"}
        large={true}
        onChange={e => setAmounts(e.target.value)}
      />
      {/* Token Details Box */}
      {tokenDetails.symbol && (
        <div className={`${styles.cardClasses} ${styles.cardBlueClasses}`}>
          <h3 className={styles.cardTitleClasses}>Token Details</h3>
          <div className={styles.gridClasses}>
            <div className={styles.infoBoxClasses}>
              <p className={styles.infoLabelClasses}>Symbol</p>
              <p className={styles.infoValueClasses}>{tokenDetails.symbol}</p>
            </div>
            <div className={styles.infoBoxClasses}>
              <p className={styles.infoLabelClasses}>Decimals</p>
              <p className={styles.infoValueClasses}>{tokenDetails.decimals}</p>
            </div>
            <div className={styles.infoBoxClasses}>
              <p className={styles.infoLabelClasses}>Total Supply</p>
              <p className={styles.infoValueSmallClasses}>{tokenDetails.totalSupply}</p>
            </div>
          </div>
        </div>
      )}

      {/* Improved Total Box */}
      <div className={`${styles.cardClasses} ${styles.cardGreenClasses}`}>
        <h3 className={styles.cardTitleClasses}>Airdrop Summary</h3>
        <div className={styles.summaryContainerClasses}>
          <div className={styles.summaryRowClasses}>
            <span className={styles.summaryLabelClasses}>Total Amount (Wei):</span>
            <span className={styles.summaryValueClasses}>{totalAmountForm}</span>
          </div>
          <div className={styles.summaryRowClasses}>
            <span className={styles.summaryLabelClasses}>Total Amount Tokens:</span>
            <span className={styles.summaryValueLargeClasses}>{formatTokenAmount(totalAmountForm, tokenDetails.decimals as number)} {tokenDetails.symbol || 'tokens'}</span>
          </div>
          {recipientAddresses && (
            <div className={styles.recipientsContainerClasses}>
              <p className={styles.recipientsLabelClasses}>Recipients ({recipientAddresses.split(/[,\n]+/).filter((addr: string) => addr.trim()).length}):</p>
              <div className={styles.recipientsListClasses}>
                {recipientAddresses.split(/[,\n]+/).filter((addr: string) => addr.trim()).map((addr: string, index: number) => (
                  <div key={index} className={styles.recipientItemClasses}>
                    <span className={styles.recipientAddressClasses}>{addr.trim()}</span>
                    <span className={styles.recipientAmountClasses}>
                      {amounts.split(/[,\n]+/)[index]?.trim() || '0'} {tokenDetails.symbol || ''}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Transaction Status Display */}
      {(transactionHash || error || isTransactionError) && (
        <div className={`${styles.cardClasses} ${styles.cardYellowClasses}`}>
          <h3 className={styles.cardTitleClasses}>Transaction Status</h3>
          
          {transactionHash && (
            <div className={styles.transactionHashClasses}>
              <p className={styles.transactionHashLabelClasses}>Transaction Hash:</p>
              <p className={styles.transactionHashValueClasses}>{transactionHash}</p>
            </div>
          )}
          
          {isConfirming && (
            <div className={styles.loadingContainerClasses}>
              <div className={styles.spinnerClasses}></div>
              <span>Confirming transaction...</span>
            </div>
          )}
          
          {isConfirmed && (
            <div className={styles.statusSuccessClasses}>
              ✅ Transaction confirmed successfully!
            </div>
          )}
          
          {(error || isTransactionError) && (
            <div className={styles.statusErrorClasses}>
              <p className={styles.statusErrorLabelClasses}>❌ Transaction failed:</p>
              <p className={styles.statusErrorMessageClasses}>
                {error?.message || transactionError?.message || 'Unknown error occurred'}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Send Button */}
      <button
        onClick={handleSendAirdrop}
        disabled={isLoading || isPending || isConfirming}
        className={styles.buttonClasses}
      >
        {isLoading || isPending ? (
          <div className={styles.buttonContentClasses}>
            <div className={styles.spinnerLargeClasses}></div>
            {isPending ? 'Signing Transaction...' : 'Processing...'}
          </div>
        ) : isConfirming ? (
          <div className={styles.buttonContentClasses}>
            <div className={styles.spinnerLargeClasses}></div>
            Confirming...
          </div>
        ) : (
          'Send Airdrop'
        )}
      </button>

      {/* Improved Footer with react-icons */}
      <Footer/>
    </div>
  );
}