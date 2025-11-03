### Step 1: Add Localhost Network to MetaMask

- Open MetaMask
- Click the network dropdown (top left)
- Click "Add Network" or "Add a network manually"
- Enter these details:
  - Network Name: Hardhat Local
  - New RPC URL: http://127.0.0.1:8545
  - Chain ID: 31337
  - Currency Symbol: ETH
- Click "Save"

### Step 2: Import Test Account

From your Hardhat node output, copy one of the private keys and import it:
- Click the account icon (top right)
- Click "Import Account"
- Paste the private key (e.g., `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`)
- Click "Import"

### Step 3: Add Token to MetaMask

In MetaMask, click "Import tokens"
- Paste your contract address
- Token symbol and decimals should auto-fill
- Click "Add Custom Token"