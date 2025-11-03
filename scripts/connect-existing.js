const { ethers } = require("hardhat");

async function main() {
  // Replace with your deployed contract address
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

  console.log("Connecting to contract at:", contractAddress);
  console.log();

  // Get the contract
  const MyToken = await ethers.getContractFactory("MyToken");
  const myToken = await MyToken.attach(contractAddress);

  // Get signers
  const [owner, addr1, addr2] = await ethers.getSigners();

  // Get token info
  const name = await myToken.name();
  const symbol = await myToken.symbol();
  const decimals = await myToken.decimals();
  const totalSupply = await myToken.totalSupply();

  console.log("=== Token Information ===");
  console.log("Name:", name);
  console.log("Symbol:", symbol);
  console.log("Decimals:", decimals);
  console.log("Total Supply:", ethers.formatUnits(totalSupply, decimals));
  console.log();

  // Check balances
  console.log("=== Current Balances ===");
  const ownerBalance = await myToken.balanceOf(owner.address);
  const addr1Balance = await myToken.balanceOf(addr1.address);
  const addr2Balance = await myToken.balanceOf(addr2.address);

  console.log("Owner:", ethers.formatUnits(ownerBalance, decimals), symbol);
  console.log("Address 1:", ethers.formatUnits(addr1Balance, decimals), symbol);
  console.log("Address 2:", ethers.formatUnits(addr2Balance, decimals), symbol);
  console.log();

  // Perform a transfer
  console.log("=== Transferring 50 tokens to Address 1 ===");
  const tx = await myToken.transfer(addr1.address, ethers.parseUnits("50", decimals));
  await tx.wait();
  console.log("Transfer successful! Tx hash:", tx.hash);

  // Check new balance
  const newAddr1Balance = await myToken.balanceOf(addr1.address);
  console.log("Address 1 new balance:", ethers.formatUnits(newAddr1Balance, decimals), symbol);

  
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });