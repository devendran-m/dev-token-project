# dev-token-project - ERC-20 Token Project

A professional ERC-20 token implementation built with Hardhat, Solidity, and OpenZeppelin contracts. This project demonstrates token creation, deployment, testing, and interaction on a local Ethereum blockchain.

## ✨ Features

- **ERC-20 Standard Compliance**: Full implementation of the ERC-20 token standard
- **Minting**: Owner can mint new tokens
- **Burning**: Token holders can burn their tokens
- **Access Control**: Owner-only functions using OpenZeppelin's Ownable
- **Comprehensive Tests**: Full test coverage with Mocha and Chai
- **Local Development**: Easy setup with Hardhat local node

## 🔧 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version 18.x or 20.x (LTS recommended)
  ```bash
  node --version  # Should show v18.x or v20.x
  ```
  Download from: [nodejs.org](https://nodejs.org/)

- **npm**: Comes bundled with Node.js
  ```bash
  npm --version   # Should show 9.x or higher
  ```

- **Git**: For version control (optional)
  ```bash
  git --version
  ```

- **Code Editor**: VS Code recommended
  - Download from: [code.visualstudio.com](https://code.visualstudio.com/)

## 📦 Installation

### Step 1: Clone or Navigate to Project Directory

```bash
cd ~/dev-token-project
```

### Step 2: Install Dependencies

If starting fresh:

```bash
# Initialize npm project
npm init -y

# Install Hardhat
npm install --save-dev hardhat

# Initialize Hardhat (select JavaScript project with Mocha & Ethers ESM)
npx hardhat init

# Install OpenZeppelin contracts
npm install @openzeppelin/contracts
```

If cloning from repository:

```bash
npm install
```

### Step 3: Verify Installation

```bash
npx hardhat --version
```

Expected output: `2.26.5` or higher

## 📁 Project Structure

```
dev-token-project/
├── contracts/
│   └── MyToken.sol              # ERC-20 token contract
├── test/
│   └── MyToken.test.js          # Test suite
├── ignition/
│   └── modules/
│       └── MyToken.js           # Deployment module
├── scripts/
│   ├── deploy-and-interact.js  # Deployment + interaction script
│   └── connect-existing.js     # Connect to deployed contract
├── artifacts/                   # Compiled contracts (auto-generated)
├── cache/                       # Hardhat cache (auto-generated)
├── node_modules/                # Dependencies
├── hardhat.config.js            # Hardhat configuration
├── package.json                 # Project metadata
└── README.md                    # This file
```

## ⚙️ Configuration

The project is configured in `hardhat.config.js`:

```javascript
require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.28",
  networks: {
    hardhat: {
      chainId: 1337
    },
    localhost: {
      url: "http://127.0.0.1:8545"
    }
  }
};
```

## 🚀 Usage

### Compile Contracts

Compile all Solidity contracts:

```bash
npx hardhat compile
```

**Expected Output:**
```
Compiled 1 Solidity file successfully
```

**Clean and Recompile:**
```bash
npx hardhat clean
npx hardhat compile
```

### Run Tests

Run the complete test suite:

```bash
npx hardhat test
```

**Expected Output:**
```
  MyToken
    Deployment
      ✔ Should set the right owner
      ✔ Should assign the total supply of tokens to the owner
      ✔ Should have correct name and symbol
    Transactions
      ✔ Should transfer tokens between accounts
      ✔ Should fail if sender doesn't have enough tokens
    Minting
      ✔ Should allow owner to mint new tokens
      ✔ Should fail if non-owner tries to mint
    Burning
      ✔ Should allow users to burn their tokens
      ✔ Should fail if user tries to burn more than balance

  9 passing (2s)
```

**Run Specific Test:**
```bash
npx hardhat test test/MyToken.test.js
```

**Test with Gas Reporting:**
```bash
REPORT_GAS=true npx hardhat test
```

**Check Test Coverage:**
```bash
npx hardhat coverage
```

### Deploy Contract

#### Option 1: Deploy to Local Hardhat Network

**Terminal 1 - Start Local Node:**
```bash
npx hardhat node
```

Keep this terminal running. You'll see:
```
Started HTTP and WebSocket JSON-RPC server at http://127.0.0.1:8545/

Accounts
========
Account #0: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 (10000 ETH)
Private Key: 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
...
```

**Terminal 2 - Deploy Contract:**
```bash
npx hardhat ignition deploy ./ignition/modules/MyToken.js --network localhost
```

**Expected Output:**
```
✔ Confirm deploy to network localhost (1337)? … yes
Hardhat Ignition 🚀

Deploying [ MyTokenModule ]

Batch #1
  Executed MyTokenModule#MyToken

[ MyTokenModule ] successfully deployed 🚀

Deployed Addresses

MyTokenModule#MyToken - 0x5FbDB2315678afecb367f032d93F642f64180aa3
```

**💡 Save the contract address for later interaction!**

#### Option 2: Deploy Using Custom Script

```bash
npx hardhat run scripts/deploy-and-interact.js --network localhost
```

This script will:
- Deploy the contract
- Display token information
- Perform sample transactions
- Show final balances

### Interact with Contract

#### Method 1: Using Hardhat Console

With the local node running, open Hardhat console:

```bash
npx hardhat console --network localhost
```

Example interactions:

```javascript
// Get the contract factory
const MyToken = await ethers.getContractFactory("MyToken");

// Attach to deployed contract (replace with your address)
const myToken = await MyToken.attach("0x5FbDB2315678afecb367f032d93F642f64180aa3");

// Get signers
const [owner, addr1] = await ethers.getSigners();

// Check token info
await myToken.name();        // Returns: 'MyToken'
await myToken.symbol();      // Returns: 'MTK'
await myToken.decimals();    // Returns: 18

// Check balance
const balance = await myToken.balanceOf(owner.address);
console.log("Balance:", ethers.formatUnits(balance, 18));

// Transfer tokens
await myToken.transfer(addr1.address, ethers.parseUnits("100", 18));

// Mint tokens (owner only)
await myToken.mint(addr1.address, ethers.parseUnits("500", 18));

// Burn tokens
await myToken.burn(ethers.parseUnits("50", 18));

// Check total supply
const totalSupply = await myToken.totalSupply();
console.log("Total Supply:", ethers.formatUnits(totalSupply, 18));

// Exit console
.exit
```

#### Method 2: Using Interaction Script

Edit `scripts/connect-existing.js` and update the contract address:

```javascript
const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Your address
```

Run the script:

```bash
npx hardhat run scripts/connect-existing.js --network localhost
```

#### Method 3: Using MetaMask

1. **Add Hardhat Network to MetaMask:**
   - Network Name: `Hardhat Local`
   - RPC URL: `http://127.0.0.1:8545`
   - Chain ID: `31337`
   - Currency Symbol: `ETH`

2. **Import Test Account:**
   - Copy a private key from the Hardhat node output
   - In MetaMask: Account Menu → Import Account
   - Paste the private key

3. **Add Token:**
   - In MetaMask: Import Tokens
   - Paste your contract address
   - Token details should auto-fill

## 📝 Smart Contract Details

### MyToken.sol

**Inheritance:**
- `ERC20`: OpenZeppelin's ERC-20 implementation
- `Ownable`: Access control for administrative functions

**Constructor Parameters:**
- `initialSupply`: Initial token supply (in whole tokens, not wei)

**Functions:**

| Function | Access | Description |
|----------|--------|-------------|
| `transfer(address to, uint256 amount)` | Public | Transfer tokens to another address |
| `approve(address spender, uint256 amount)` | Public | Approve address to spend tokens |
| `transferFrom(address from, address to, uint256 amount)` | Public | Transfer tokens on behalf of another address |
| `mint(address to, uint256 amount)` | Owner Only | Mint new tokens to an address |
| `burn(uint256 amount)` | Public | Burn own tokens |
| `balanceOf(address account)` | View | Get token balance of an address |
| `totalSupply()` | View | Get total token supply |
| `name()` | View | Get token name |
| `symbol()` | View | Get token symbol |
| `decimals()` | View | Get token decimals (18) |

**Token Details:**
- **Name**: MyToken
- **Symbol**: MTK
- **Decimals**: 18
- **Initial Supply**: Configurable at deployment (default: 1,000,000 tokens)

## 📜 Available Scripts

### Compilation
```bash
# Compile contracts
npx hardhat compile

# Clean and compile
npx hardhat clean && npx hardhat compile
```

### Testing
```bash
# Run all tests
npx hardhat test

# Run specific test file
npx hardhat test test/MyToken.test.js

# Run tests with gas reporting
REPORT_GAS=true npx hardhat test

# Check test coverage
npx hardhat coverage
```

### Deployment
```bash
# Start local node (Terminal 1)
npx hardhat node

# Deploy to localhost (Terminal 2)
npx hardhat ignition deploy ./ignition/modules/MyToken.js --network localhost

# Deploy with custom script
npx hardhat run scripts/deploy-and-interact.js --network localhost
```

### Interaction
```bash
# Open Hardhat console
npx hardhat console --network localhost

# Run interaction script
npx hardhat run scripts/connect-existing.js --network localhost
```

### Utilities
```bash
# Show available commands
npx hardhat help

# List available accounts
npx hardhat accounts

# Check Hardhat version
npx hardhat --version
```

## 🐛 Troubleshooting

### Issue: "Cannot use import statement outside a module"

**Solution:** Ensure `package.json` does NOT have `"type": "module"`. Use CommonJS syntax.

```bash
# Remove "type": "module" from package.json
npm pkg delete type
```

### Issue: "You are not inside a Hardhat project"

**Solution:** Ensure `hardhat.config.js` exists in your project root.

```bash
# Check if config exists
ls hardhat.config.js

# If missing, reinitialize Hardhat
npx hardhat init
```

### Issue: Node.js version warning

**Solution:** Use Node.js LTS version (18.x or 20.x).

```bash
# Using nvm (Node Version Manager)
nvm install 20
nvm use 20
```

### Issue: Port 8545 already in use

**Solution:** Kill the existing process.

```bash
# Find process using port 8545
lsof -i :8545

# Kill the process (replace <PID> with actual process ID)
kill -9 <PID>

# Or kill all hardhat processes
pkill -f hardhat
```

### Issue: Contract not found after deployment

**Solution:**
1. Ensure local node is still running
2. Verify you're using the correct contract address
3. Confirm you're connecting to the right network (`--network localhost`)

### Issue: "Insufficient funds" in tests

**Solution:** The Hardhat network resets between test runs. Each test starts with fresh accounts having 10,000 ETH.

### Issue: Tests fail with "revert" errors

**Solution:**
1. Check that you're using the correct signer (owner vs regular account)
2. Verify the account has sufficient token balance
3. Ensure contract functions are called with correct parameters

## 📚 Additional Resources

- **Hardhat Documentation**: https://hardhat.org/docs
- **OpenZeppelin Contracts**: https://docs.openzeppelin.com/contracts
- **Ethers.js Documentation**: https://docs.ethers.org/v6/
- **Solidity Documentation**: https://docs.soliditylang.org/
- **ERC-20 Token Standard**: https://eips.ethereum.org/EIPS/eip-20

## 📄 License

This project is licensed under the MIT License.

---

## 🚀 Quick Start Summary

```bash
# 1. Navigate to project
cd ~/dev-token-project

# 2. Install dependencies (if needed)
npm install

# 3. Compile contracts
npx hardhat compile

# 4. Run tests
npx hardhat test

# 5. Start local node (Terminal 1)
npx hardhat node

# 6. Deploy contract (Terminal 2)
npx hardhat ignition deploy ./ignition/modules/MyToken.js --network localhost

# 7. Interact with contract
npx hardhat console --network localhost
```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 👨‍💻 Author

**Your Name**
- GitHub: [@devendran-m](https://github.com/devendran-m)

---

**Built with ❤️ using Hardhat, Solidity, and OpenZeppelin**