const { ethers, upgrades } = require("hardhat");

async function main() {
  // Get the ContractFactory and signers from the Hardhat runtime
  const CrowdFunding = await ethers.getContractFactory("CrowdFunding");
  const [deployer] = await ethers.getSigners();

  // Deploy the CrowdFunding contract
  console.log("Deploying CrowdFunding...");
  const crowdFunding = await upgrades.deployProxy(CrowdFunding, {
    initializer: "initialize",
  });

  // Wait for the contract to be mined and get the deployed instance
  await crowdFunding.deployed();

  console.log("CrowdFunding deployed to:", crowdFunding.address);
  console.log("Deployed by:", deployer.address);
}

// Run the deployment
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
