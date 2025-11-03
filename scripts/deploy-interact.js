const { ethers } = require("hardhat");

async function main() {
  console.log("Starting deployment and interaction...\n");

  // Get signers
  const [owner, addr1, addr2] = await ethers.getSigners();
  console.log("Owner address:", owner.address);
  console.log("Address 1:", addr1.address);
  console.log("Address 2:", addr2.address);
  console.log();

  // Deploy the contract
  console.log("Deploying MyToken contract...");
  const MyToken = await ethers.getContractFactory("MyToken");
  const myToken = await MyToken.deploy(1000000); // 1 million tokens
  await myToken.waitForDeployment();

  const contractAddress = await myToken.getAddress();
  console.log("MyToken deployed to:", contractAddress);
  console.log();

  // Get token information
  const name = await myToken.name();
  const symbol = await myToken.symbol();
  const decimals = await myToken.decimals();
  const totalSupply = await myToken.totalSupply();

  console.log("=== Token Information ===");
  console.log("Name:", name);
  console.log("Symbol:", symbol);
  console.log("Decimals:", decimals);
  console.log("Total Supply:", ethers.formatUnits(totalSupply, decimals), symbol);
  console.log();

  // Check initial balances
  console.log("=== Initial Balances ===");
  let ownerBalance = await myToken.balanceOf(owner.address);
  console.log("Owner:", ethers.formatUnits(ownerBalance, decimals), symbol);
  console.log();

  // Transfer tokens to addr1
  console.log("=== Transferring 1000 tokens to Address 1 ===");
  const transferTx = await myToken.transfer(addr1.address, ethers.parseUnits("1000", decimals));
  await transferTx.wait();
  console.log("Transfer successful! Tx hash:", transferTx.hash);
  
  let addr1Balance = await myToken.balanceOf(addr1.address);
  console.log("Address 1 balance:", ethers.formatUnits(addr1Balance, decimals), symbol);
  console.log();

  // Mint tokens to addr2
  console.log("=== Minting 500 tokens to Address 2 ===");
  const mintTx = await myToken.mint(addr2.address, ethers.parseUnits("500", decimals));
  await mintTx.wait();
  console.log("Mint successful! Tx hash:", mintTx.hash);
  
  let addr2Balance = await myToken.balanceOf(addr2.address);
  console.log("Address 2 balance:", ethers.formatUnits(addr2Balance, decimals), symbol);
  console.log();

  // Transfer from addr1 to addr2
  console.log("=== Address 1 transferring 250 tokens to Address 2 ===");
  const transfer2Tx = await myToken.connect(addr1).transfer(addr2.address, ethers.parseUnits("250", decimals));
  await transfer2Tx.wait();
  console.log("Transfer successful! Tx hash:", transfer2Tx.hash);
  
  addr1Balance = await myToken.balanceOf(addr1.address);
  addr2Balance = await myToken.balanceOf(addr2.address);
  console.log("Address 1 balance:", ethers.formatUnits(addr1Balance, decimals), symbol);
  console.log("Address 2 balance:", ethers.formatUnits(addr2Balance, decimals), symbol);
  console.log();

  // Burn tokens
  console.log("=== Owner burning 100 tokens ===");
  const burnTx = await myToken.burn(ethers.parseUnits("100", decimals));
  await burnTx.wait();
  console.log("Burn successful! Tx hash:", burnTx.hash);
  
  ownerBalance = await myToken.balanceOf(owner.address);
  const newTotalSupply = await myToken.totalSupply();
  console.log("Owner balance:", ethers.formatUnits(ownerBalance, decimals), symbol);
  console.log("New total supply:", ethers.formatUnits(newTotalSupply, decimals), symbol);
  console.log();

  // Final summary
  console.log("=== Final Balances ===");
  console.log("Owner:", ethers.formatUnits(await myToken.balanceOf(owner.address), decimals), symbol);
  console.log("Address 1:", ethers.formatUnits(await myToken.balanceOf(addr1.address), decimals), symbol);
  console.log("Address 2:", ethers.formatUnits(await myToken.balanceOf(addr2.address), decimals), symbol);
  console.log("Total Supply:", ethers.formatUnits(await myToken.totalSupply(), decimals), symbol);
  console.log();
  
  console.log("Contract Address:", contractAddress);
  console.log("Save this address to interact with the contract later!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });