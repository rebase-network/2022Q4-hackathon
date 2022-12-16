// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "./FansDAO.sol";

contract FansDAOFactory {
    // Mapping from contract addresses to their associated data
    mapping(uint256 => DAOData) public contracts;

    // Struct to store the data for a deployed contract
    struct DAOData {
        uint id;
        uint creationTime;
        address contractAddress;
        address owner;
        string ownerName;
        string nameOfDAO;
        string story;
        string logoDAO;
        string bannerDA0;
    }

    uint256 public numberOfDAOs = 0;

    // Function to deploy a new contract instance
    function createFansDAOContract(string memory _ownerName, string memory _story, string memory _nameOfDAO, string memory _logoDAO, string memory _bannerDAO) public returns (uint256){
        // Create a new contract instance and store its address
        uint _creationTime = block.timestamp;
        address _owner = msg.sender;
        uint _id = numberOfDAOs;
        FansDAO newDAO = new FansDAO(_id, _creationTime, _owner, _ownerName, _nameOfDAO, _story, _logoDAO, _bannerDAO);
        address _address = address(newDAO);
        // Store the contract's data in the mapping
        contracts[_id].creationTime = _creationTime;
        contracts[_id].owner = _owner;
        contracts[_id].id = _id;
        contracts[_id].contractAddress = _address;
        contracts[_id].ownerName = _ownerName;
        contracts[_id].story = _story;
        contracts[_id].nameOfDAO = _nameOfDAO;
        contracts[_id].logoDAO = _logoDAO;
        contracts[_id].bannerDA0 = _bannerDAO;
        numberOfDAOs++;
        return numberOfDAOs-1;
    }

    function get_DAOs() public view returns(DAOData[] memory){
        DAOData[] memory allDAOs = new DAOData[](numberOfDAOs);
        for(uint i = 0; i<numberOfDAOs; i++){
            DAOData storage item = contracts[i];
            allDAOs[i] = item;
        }
        return allDAOs;
    }

    // Contract to be deployed by the factory
}




