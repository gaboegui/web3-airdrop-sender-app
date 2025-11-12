//import { test, expect } from '@playwright/test';  --> replaced by with Synpress set up
import basicSetup from './wallet-setup/airdrop.setup';
import { testWithSynpress } from '@synthetixio/synpress';
import { MetaMask, metaMaskFixtures } from '@synthetixio/synpress/playwright'

// Set up the test environment with Synpress and MetaMask fixtures, using the basic setup configuration
const test = testWithSynpress(metaMaskFixtures(basicSetup));
const { expect } = test;


test('has title', async ({ page }) => {
  
  await page.goto('/');   // '/' is defined in playwright.config.ts baseURL

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle("Airdrop Sender App");
});

test('should show mock token in token box', async ({ context, page, metamaskPage, extensionId }) => {
  // Show message when disconnected
  await page.goto('/');
  await expect(page.getByText('Please connect to a Wallet')).toBeVisible();

  const metamask = new MetaMask(context, metamaskPage, basicSetup.walletPassword, extensionId);
   // Click the connect button to initiate the wallet connection
  await page.getByTestId('rk-connect-button').click();     // we obtain id from html: <button data-testid="rk-connect-button" />
  // Wait for popup to be visible
  await page.getByTestId('rk-wallet-option-io.metamask').waitFor({
    state: 'visible',
    timeout: 30000
  });
  // Click choose the metamask option
  await page.getByTestId('rk-wallet-option-io.metamask').click();  
  await metamask.connectToDapp();

  const customNetwork = {
    name: 'Anvil',
    rpcUrl: 'http://127.0.0.1:8545',
    chainId: 31337,
    symbol: 'ETH'
  }
  // await metamask.addNetwork(customNetwork)

  // this a label from an input 
  await expect(page.getByText('ERC20 Token - Smart Contract Address')).toBeVisible();

  // Verify the connected account address
  await expect(page.locator('#accounts')).toHaveText('0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266');

});


