const { expect } = require("chai");
const { ethers } = require("hardhat");
const { loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers");

describe("MyToken", function () {
  async function deployTokenFixture() {
    const initialSupply = 1000000;
    const [owner, addr1, addr2] = await ethers.getSigners();

    const MyToken = await ethers.getContractFactory("MyToken");
    const myToken = await MyToken.deploy(initialSupply);

    return { myToken, owner, addr1, addr2, initialSupply };
  }

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      const { myToken, owner } = await loadFixture(deployTokenFixture);
      expect(await myToken.owner()).to.equal(owner.address);
    });

    it("Should assign the total supply of tokens to the owner", async function () {
      const { myToken, owner } = await loadFixture(deployTokenFixture);
      const ownerBalance = await myToken.balanceOf(owner.address);
      expect(await myToken.totalSupply()).to.equal(ownerBalance);
    });

    it("Should have correct name and symbol", async function () {
      const { myToken } = await loadFixture(deployTokenFixture);
      expect(await myToken.name()).to.equal("MyToken");
      expect(await myToken.symbol()).to.equal("MTK");
    });
  });

  describe("Transactions", function () {
    it("Should transfer tokens between accounts", async function () {
      const { myToken, owner, addr1, addr2 } = await loadFixture(deployTokenFixture);
      
      await expect(
        myToken.transfer(addr1.address, 50)
      ).to.changeTokenBalances(myToken, [owner, addr1], [-50, 50]);

      await expect(
        myToken.connect(addr1).transfer(addr2.address, 50)
      ).to.changeTokenBalances(myToken, [addr1, addr2], [-50, 50]);
    });

    it("Should fail if sender doesn't have enough tokens", async function () {
      const { myToken, owner, addr1 } = await loadFixture(deployTokenFixture);
      const initialOwnerBalance = await myToken.balanceOf(owner.address);

      await expect(
        myToken.connect(addr1).transfer(owner.address, 1)
      ).to.be.revertedWithCustomError(myToken, "ERC20InsufficientBalance");

      expect(await myToken.balanceOf(owner.address)).to.equal(
        initialOwnerBalance
      );
    });
  });

  describe("Minting", function () {
    it("Should allow owner to mint new tokens", async function () {
      const { myToken, addr1 } = await loadFixture(deployTokenFixture);
      
      await myToken.mint(addr1.address, 1000);
      expect(await myToken.balanceOf(addr1.address)).to.equal(1000);
    });

    it("Should fail if non-owner tries to mint", async function () {
      const { myToken, addr1 } = await loadFixture(deployTokenFixture);
      
      await expect(
        myToken.connect(addr1).mint(addr1.address, 1000)
      ).to.be.revertedWithCustomError(myToken, "OwnableUnauthorizedAccount");
    });
  });

  describe("Burning", function () {
    it("Should allow users to burn their tokens", async function () {
      const { myToken, owner } = await loadFixture(deployTokenFixture);
      const initialBalance = await myToken.balanceOf(owner.address);
      
      await myToken.burn(1000);
      expect(await myToken.balanceOf(owner.address)).to.equal(initialBalance - BigInt(1000));
    });

    it("Should fail if user tries to burn more than balance", async function () {
      const { myToken, addr1 } = await loadFixture(deployTokenFixture);
      
      await expect(
        myToken.connect(addr1).burn(1000)
      ).to.be.revertedWithCustomError(myToken, "ERC20InsufficientBalance");
    });
  });
});