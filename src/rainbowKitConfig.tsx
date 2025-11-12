"use client"


/**
 * Set with chains will work in the app
 * Configuration of rainbow and project_id will be obtained from walletconnect.com
 */

import '@rainbow-me/rainbowkit/styles.css';
import {getDefaultConfig} from "@rainbow-me/rainbowkit"
import {
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
    anvil, 
    zksync, 
    sepolia
} from "wagmi/chains"

export default getDefaultConfig ({
    appName: "Airdrop Sender",
    projectId:  process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID!,
    chains: [mainnet, polygon, optimism, arbitrum, base, anvil, zksync, sepolia],
    ssr: false
})