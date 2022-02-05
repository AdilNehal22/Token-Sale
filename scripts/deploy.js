async function main() {

    const [deployer] = await ethers.getSigners();
  
    console.log("Deploying contracts with the account:", deployer.address);
  
    console.log("Account balance:", (await deployer.getBalance()).toString());
  
    const Token = await ethers.getContractFactory("Token");
    const token = await Token.deploy();
  
    console.log("Token address:", token.address);
  }
  
main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });


//contract verified at ropsten.etherscan with hash...
//0xa2b638b81931ff28e2046ff6e0a3f5815e94a2fd35faf9e0bf548c9c974a5a69
//contract is verified and published.

//contract address 0xaae9fd39ec5d94Ab6463Be013f7CF69c077684d0


