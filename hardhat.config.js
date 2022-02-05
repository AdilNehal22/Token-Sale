require("@nomiclabs/hardhat-waffle");
require('dotenv').config();

const INFURA_API_KEY = process.env.INFURA_API_KEY;

const ROPSTEN_PRIVATE_KEY = process.env.ROPSTEN_PRIVATE_KEY;

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.11",
  networks: {
    ropsten: {
      url: INFURA_API_KEY,
      accounts: [`${ROPSTEN_PRIVATE_KEY}`]
    }
  }
};
