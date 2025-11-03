// Get the contract factory
const MyToken = await ethers.getContractFactory("MyToken");

// Deploy a new instance
const myToken = await MyToken.deploy(1000000);
await myToken.waitForDeployment();

// Get the contract address
const address = await myToken.getAddress();
console.log("Contract deployed to:", address);

// Get signers (accounts)
const [owner, addr1, addr2] = await ethers.getSigners();

// Check balances
const balance = await myToken.balanceOf(owner.address);
console.log("Owner balance:", ethers.formatUnits(balance, 18));

// Transfer tokens
await myToken.transfer(addr1.address, ethers.parseUnits("100", 18));
console.log("Transferred 100 tokens to addr1");

// Check new balance
const addr1Balance = await myToken.balanceOf(addr1.address);
console.log("Addr1 balance:", ethers.formatUnits(addr1Balance, 18));

// Mint tokens (owner only)
await myToken.mint(addr2.address, ethers.parseUnits("500", 18));
console.log("Minted 500 tokens to addr2");

// Burn tokens
await myToken.burn(ethers.parseUnits("50", 18));
console.log("Burned 50 tokens");

// Check total supply
const totalSupply = await myToken.totalSupply();
console.log("Total supply:", ethers.formatUnits(totalSupply, 18));

// Exit console
//.exit