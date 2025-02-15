const hre = require("hardhat");

async function main() {
    try {
        console.log("Compiling contracts...");
        await hre.run("compile"); // Ensure the latest contract code is compiled

        console.log("Deploying the MedicalRecords smart contract...");

        // Get the contract factory
        const MedicalRecords = await hre.ethers.getContractFactory("MedicalRecords");

        // Deploy the contract
        const medicalRecords = await MedicalRecords.deploy();

        // Wait for contract deployment
        await medicalRecords.deploymentTransaction().wait();

        // Get deployed contract address
        const contractAddress = await medicalRecords.getAddress();

        console.log("✅ Contract successfully deployed!");
        console.log(`📌 Contract Address: ${contractAddress}`);
    } catch (error) {
        console.error("❌ Deployment failed:", error);
        process.exit(1);
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("Unhandled error:", error);
        process.exit(1);
    });
