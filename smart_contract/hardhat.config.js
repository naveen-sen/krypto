require("@nomicfoundation/hardhat-ethers");

module.exports = {
  solidity: '0.8.0',
  networks: {
    sepolia: {
      url: 'https://eth-sepolia.g.alchemy.com/v2/PbV9nnWbiyQ8138EtPWjkDcb_76UwEm-',
      accounts: ['46359c375358ce88bea5d29bb198f8ca4ae30df570828088d43d0c641fee12b4']
    }
  }
}
