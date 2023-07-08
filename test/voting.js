const { expect } = require("chai");
const { ethers } = require("hardhat");
const Voting = require('../artifacts/contracts/voting.sol/voting.json');
const { SourceLocation } = require("hardhat/internal/hardhat-network/stack-traces/model");

describe("Voting", function () {
    let votinInstance;
    let accounts;

    this.beforeAll(async function () {
        const timeStart = Math.floor(Date.now() / 1000) - 1000;
        const timeEnd = Math.floor(Date.now() / 1000) + 1000;

        accounts = await ethers.getSigners();
        const votingContract = await ethers.getContractFactory(Voting.abi, Voting.bytecode);
        votinInstance = await votingContract.deploy(timeStart, timeEnd);
    });

    it("deberia poder votar", async function(){
        const candidate = 1;

        const canVoteBefore = await votinInstance.canVote.call({from: accounts[0].addres});
        expect(canVoteBefore).to.be.true;

        const vote = await votinInstance.vote(candidate, {from: accounts[0].addres});

        const canVoteAfter = await votinInstance.canVote.call({from: accounts[0].addres});
        expect(canVoteAfter).to.be.false;
    });


    // it("no deberia votar mas de una vez", async function(){
    //     const candidate =1;

    //     await votinInstance.vote(candidate, {from: accounts[0].addres});
        
    //     await expect(votinInstance.vote(candidate, {from: accounts[0].addres})).to.be.reverted('Ya realizo su voto');
    // })
});