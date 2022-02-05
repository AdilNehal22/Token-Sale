const { expect } = require("chai");
const { ethers } = require("hardhat");
const { time } = require('@openzeppelin/test-helpers');

let Token;
let token;
let admin;
let marketingAddress;
let receiver;
let stakeHolder;

beforeEach(async () => {

    Token = await ethers.getContractFactory("Token");
    [admin, marketingAddress, receiver, stakeHolder, ...addrs] = await ethers.getSigners();
    token = await Token.deploy();

});

describe('Token contract', async () => {

    it('deploys the contract', async () => {
        console.log('Token contract deployed at', token.address);
    });

    it('should set the right owner', async () => {
        expect(await token.admin_HolderOfTokens()).to.equal(admin.address);
    })

    it('should assign the initial supply to admin', async () => {
        const initialSupply = await token.initialNumberOfTokens();
        expect(await token.getAdminBalance()).to.equal(initialSupply);
    });

    it('sets the marketing department address', async () => {
        await token.setMarketingDepartmentAddress(marketingAddress.address);
        expect(await token.getMarketingDepartmentAddress()).to.equal(marketingAddress.address);
    });

    it('transfers the tokens to receiver and marketing department', async () => {
        await token.onSale();
        const tokenAmount = 500;
        await token.transferToken(tokenAmount, receiver.address);
        expect(await token.getMarketingDepartmentBalance()).to.equal(125);
        expect(await token.getAdminBalance()).to.equal(24500);
    });

    it('it stakes the tokens after one minutes of previous staking', async () => {
        //increase time by two minutes
        await ethers.provider.send("evm_increaseTime", [120]);
        //calling function
        const stakeAmount = 500;
        await token.stakeToken(stakeAmount, stakeHolder.address);
        expect(await token.getStakeHolderBalance(stakeHolder.address)).to.equal(500);
    });

});

