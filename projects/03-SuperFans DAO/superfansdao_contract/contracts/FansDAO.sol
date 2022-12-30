// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "./Promotion.sol";

contract FansDAO {
    uint256 public creationTime;
    address public owner;
    string public ownerName;
    uint256 public id;
    string public name;
    string public description;
    string public logo;
    string public banner;
    address[] public members;
    uint256[] public power;
    address[] public promotions_address;
    address public vote_token;
    address public member_token;

    constructor(
        uint256 _id,
        uint256 _creationTime,
        address _owner,
        string memory _ownerName,
        string memory _nameOfDAO,
        string memory _story,
        string memory _logoDAO,
        string memory _bannerDAO
    ) {
        creationTime = _creationTime;
        owner = _owner;
        id = _id;
        ownerName = _ownerName;
        name = _nameOfDAO;
        description = _story;
        logo = _logoDAO;
        banner = _bannerDAO;
        members.push(msg.sender);
        power.push(100);
    }

    modifier onlyOwner() {
        // Check if the caller's address matches the contract owner
        require(
            msg.sender == owner,
            "Only the contract owner can call this function."
        );

        // If the caller is the contract owner, execute the function
        _;
    }

    uint256 public numberOfPromotions = 0;

    struct NFTPromotion {
        address consignor;
        address NFTAddress;
        uint128 royaltyPercent;
        string promotionLogo;
        uint256 threshold;
        uint256 promotionCreationTime;
        uint256 promotionID;
        string promotionName;
        string promotionStory;
        string NFTsymbol;
    }

    mapping(uint256 => NFTPromotion) public promotionContracts;

    function become_memeber() public {
        members.push(msg.sender);
        power.push(0);
    }

    function get_memebers() view public returns (address[] memory, uint256[] memory) {
        return (members, power);
    }

    function create_promotion(
        address _consignor,
        uint128 _royaltyPercent,
        string memory _promotionLogo,
        uint256 _threshold,
        string memory _promotionName,
        string memory _NFTsymbol,
        string memory _promotionStory
    ) public onlyOwner returns (uint256){
        uint256 _promotion_creationTime = block.timestamp;
        Promotion newNFTContract = new Promotion(_promotionName, _NFTsymbol, _consignor, _royaltyPercent);
        address _NFTaddress = address(newNFTContract);
        // Store the contract's data in the mapping
        promotionContracts[numberOfPromotions].promotionCreationTime = _promotion_creationTime;
        promotionContracts[numberOfPromotions].consignor = _consignor;
        promotionContracts[numberOfPromotions].promotionID = numberOfPromotions;
        promotionContracts[numberOfPromotions].promotionLogo = _promotionLogo;
        promotionContracts[numberOfPromotions].royaltyPercent = _royaltyPercent;
        promotionContracts[numberOfPromotions].threshold = _threshold;
        promotionContracts[numberOfPromotions].NFTAddress = _NFTaddress;
        promotionContracts[numberOfPromotions].promotionStory = _promotionStory;
        promotionContracts[numberOfPromotions].NFTsymbol = _NFTsymbol;
        promotionContracts[numberOfPromotions].promotionName = _promotionName;
        numberOfPromotions++;
        return numberOfPromotions-1;
    }

        function get_promotions() public view returns(NFTPromotion[] memory){
        NFTPromotion[] memory allPromotions = new NFTPromotion[](numberOfPromotions);
        for(uint i = 0; i<numberOfPromotions; i++){
            NFTPromotion storage item = promotionContracts[i];
            allPromotions[i] = item;
        }
        return allPromotions;
    }
}
