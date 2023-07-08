// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;

contract voting {

    mapping (uint => string) public options;
    uint public totaloptions;

    mapping (address => bool) public alreadyVote;
    mapping (uint => uint) public voteCount;

    uint public timeStart;
    uint public timeEnd;

    constructor(uint time_Start, uint time_End) {
        timeStart = time_Start;
        timeEnd = time_End;

    }

    function vote(uint candidate) public {
        require(intime(), "Se encuentra fuera del periodo de votacion");
        require(canVote(), "Ya realizo su voto");
        
        alreadyVote[msg.sender] = true;
        voteCount[candidate]++;
    }

    function intime() public view returns (bool){
        return block.timestamp >= timeStart && block.timestamp <= timeEnd;
    }

    function canVote() public view returns (bool){
        return !alreadyVote[msg.sender];
    }
}