// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract Marketplace is  AccessControl {
    bytes32 public constant MARKETPLACE_OWNER = keccak256("MARKETPLACE_OWNER");
    uint256 public nextItemId = 0;
    event BuyItem(uint _itemId, uint _price, address _seller, address _buyer);

    struct MarketItem {
         uint itemId;
         string title;
         string description;
         uint256 price;
         address payable seller;
         string imageUrl;
         uint8 quantity;
         uint256 createdAt;
         uint256 updatedAt;
         bool isActive;
         bool isBlocked;
     }
        
     mapping(uint256 => address[]) private idToBuyerAddress;
     mapping(uint256 => MarketItem) private idToMarketItem;
     mapping(address => mapping(uint256 => uint8)) private addressToProductVotes;

     constructor() {
        _grantRole(MARKETPLACE_OWNER, msg.sender);
    }

    modifier onlyProductSeller(uint256 _itemId) {
        require(msg.sender == idToMarketItem[_itemId].seller, "Only product seller can execute this action.");
        _;
    }

    modifier canBuyProduct(uint256 _itemId, uint8 _quantity) {
        require(idToMarketItem[_itemId].isActive, "Market item is not active");
        require(!idToMarketItem[_itemId].isBlocked, "Market item is blocked");
        require(_quantity > 0, "Quantity must be greater than 0");
        require(_quantity <= idToMarketItem[_itemId].quantity, "Quantity must be less than or equal to the available quantity");
        
        uint256 finalPrice = idToMarketItem[_itemId].price * _quantity;
        require(finalPrice == msg.value, "Price does not match");
        _;
    }


    function createMarketItem(string memory _title, string memory _description, uint256 _price, string memory _imageUrl, uint8 _quantity, bool _isActive) public {
        require(_price > 0, "Price must be greater than 0");
        idToMarketItem[nextItemId] = MarketItem(nextItemId, _title, _description, _price, payable(msg.sender), _imageUrl, _quantity, block.timestamp, block.timestamp, _isActive, false);
        nextItemId++;
    }

    function buyMarketItem(uint256 _itemId, uint8 _quantity) public payable canBuyProduct(_itemId, _quantity) {
        idToMarketItem[_itemId].seller.transfer(msg.value);
        idToMarketItem[_itemId].quantity -= _quantity;
        idToBuyerAddress[_itemId].push(msg.sender);
        emit BuyItem(_itemId, idToMarketItem[_itemId].price, idToMarketItem[_itemId].seller, msg.sender);
    }

    function getMarketItem(uint256 _itemId) public view returns (string memory title, address payable seller, uint256 price, bool isActive) {
        return (idToMarketItem[_itemId].title, idToMarketItem[_itemId].seller, idToMarketItem[_itemId].price, idToMarketItem[_itemId].isActive);
    }

    function getMarketItemDetails(uint256 _itemId) public view returns (string memory description, string memory imageUrl, uint8 quantity, uint256 createdAt, uint256 updatedAt) {
        MarketItem memory item = idToMarketItem[_itemId];
        return (item.description, item.imageUrl, item.quantity, item.createdAt, item.updatedAt);
    }

    function updateMarketItemDescription(uint256 _itemId, string memory _description) public onlyProductSeller(_itemId) {
        idToMarketItem[_itemId].description = _description;
        idToMarketItem[_itemId].updatedAt = block.timestamp;
    }

    function updateMarketItemQuantity(uint256 _itemId, uint8 _quantity) public onlyProductSeller(_itemId) {
        idToMarketItem[_itemId].quantity = _quantity;
        idToMarketItem[_itemId].updatedAt = block.timestamp;
    }

    function updateMarketItemImgUrl(uint256 _itemId, string memory _imageUrl) public onlyProductSeller(_itemId) {
        idToMarketItem[_itemId].imageUrl = _imageUrl;
        idToMarketItem[_itemId].updatedAt = block.timestamp;
    }

    function updateMarketItemPrice(uint256 _itemId, uint256 _price) public onlyProductSeller(_itemId) {
        idToMarketItem[_itemId].price = _price;
        idToMarketItem[_itemId].updatedAt = block.timestamp;
    }

    function updateMarketItemActive(uint256 _itemId, bool _isActive) public onlyProductSeller(_itemId) {
        idToMarketItem[_itemId].isActive = _isActive;
        idToMarketItem[_itemId].updatedAt = block.timestamp;
    }

    function updateBlockMarketItem(uint256 _itemId, bool _isBlocked) public onlyRole(MARKETPLACE_OWNER) {
        idToMarketItem[_itemId].isBlocked = _isBlocked;
        idToMarketItem[_itemId].updatedAt = block.timestamp;
    }

    function indexOf(address[] memory arr, address searchFor) private pure returns (bool) {
        for (uint256 i = 0; i < arr.length; i++) {
            if (arr[i] == searchFor) {
            return true;
            }
        }
        return false;
    }

    function checkBuyer(uint256 _itemId, address _buyer) public view returns (bool) {
        return indexOf(idToBuyerAddress[_itemId], _buyer);
    }

    function voteMarketItemStars(uint256 _itemId, uint8 _stars) public {
        require(msg.sender != idToMarketItem[_itemId].seller, "The seller cannot vote");
        require(_stars <= 5, "Stars must be less than or equal to 5");
        require(_stars >= 1, "Stars must be greater than or equal to 1");
        require(checkBuyer(_itemId, msg.sender), "You cannot vote for this product.");
        addressToProductVotes[msg.sender][_itemId] = _stars;
    }


    function getAverageStars(uint256 _itemId) public view returns (uint256) {
        uint256 voteSum = 0;
        uint256 voteCount = 0;
        
        for (uint256 i = 0; i < idToBuyerAddress[_itemId].length; i++) {
            address buyer = idToBuyerAddress[_itemId][i];
            if (addressToProductVotes[buyer][_itemId] != 0) {
                voteSum += addressToProductVotes[buyer][_itemId];
                voteCount++;
            }
        }

        return (voteSum * 100) / voteCount;
    }
}


