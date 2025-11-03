const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("MyTokenModule", (m) => {
  const initialSupply = m.getParameter("initialSupply", 1000000);
  
  const myToken = m.contract("MyToken", [initialSupply]);

  return { myToken };
});