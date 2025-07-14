const hre = require("hardhat");
const main = async ()=>{
    const Transactions = await hre.ethers.getContractFactory("Transactions");
    const transactions = await Transactions.deploy();
    // In ethers v6, deploy() returns a deployed contract instance, so no need to wait for deployed()
    console.log("Transactions deployed to:", transactions.target);
}

const runMain = async ()=>{
    try{
        await main();
        process.exit(0);
    }catch(error){
        console.log(error);
        process.exit(1);
    }
}

runMain();