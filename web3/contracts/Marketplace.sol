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
         uint8 stars;
         uint8 votes;
         uint8 quantity;
         uint256 createdAt;
         uint256 updatedAt;
     }

     mapping(uint256 => address[]) private idToBuyerAddress;
     mapping(uint256 => MarketItem) private idToMarketItem;

     constructor() {
        _grantRole(MARKETPLACE_OWNER, msg.sender);
    }

    function createMarketItem(string memory _title, string memory _description, address payable _seller, uint256 _price, string memory _imageUrl, uint8 _quantity) public {
        require(msg.sender == _seller, "Only the seller can create a market item");
        require(_price > 0, "Price must be greater than 0");
        idToMarketItem[nextItemId] = MarketItem(nextItemId, _title, _description, _price, _seller, _imageUrl, 0, 0, _quantity, block.timestamp, block.timestamp);
        nextItemId++;
    }

    function buyMarketItem(uint256 _itemId, uint8 _quantity) public payable {
        uint256 finalPrice = idToMarketItem[_itemId].price * _quantity;
        require(finalPrice == msg.value, "Price does not match");
        require(_quantity > 0, "Quantity must be greater than 0");
        require(_quantity <= idToMarketItem[_itemId].quantity, "Quantity must be less than or equal to the available quantity");
        idToMarketItem[_itemId].seller.transfer(msg.value);
        idToMarketItem[_itemId].quantity -= _quantity;
        idToBuyerAddress[_itemId].push(msg.sender);
        emit BuyItem(_itemId, idToMarketItem[_itemId].price, idToMarketItem[_itemId].seller, msg.sender);
    }

    function getMarketItem(uint256 _itemId) public view returns (string memory title, address payable seller, uint256 price) {
        return (idToMarketItem[_itemId].title, idToMarketItem[_itemId].seller, idToMarketItem[_itemId].price);
    }

    function getMarketItemDetails(uint256 _itemId) public view returns (string memory description, string memory imageUrl, uint8 stars, uint8 quantity, uint256 createdAt, uint256 updatedAt) {
        MarketItem memory item = idToMarketItem[_itemId];
        return (item.description, item.imageUrl, item.stars, item.quantity, item.createdAt, item.updatedAt);
    }

    function updateMarketItemDescription(uint256 _itemId, string memory _description) public {
        require(msg.sender == idToMarketItem[_itemId].seller, "Only the seller can update the description");
        idToMarketItem[_itemId].description = _description;
        idToMarketItem[_itemId].updatedAt = block.timestamp;
    }

    function updateMarketItemQuantity(uint256 _itemId, uint8 _quantity) public {
        require(msg.sender == idToMarketItem[_itemId].seller, "Only the seller can update the quantity");
        idToMarketItem[_itemId].quantity = _quantity;
        idToMarketItem[_itemId].updatedAt = block.timestamp;
    }

    function updateMarketItemImgUrl(uint256 _itemId, string memory _imageUrl) public {
        require(msg.sender == idToMarketItem[_itemId].seller, "Only the seller can update the image url");
        idToMarketItem[_itemId].imageUrl = _imageUrl;
        idToMarketItem[_itemId].updatedAt = block.timestamp;
    }

    function updateMarketItemPrice(uint256 _itemId, uint256 _price) public {
        require(msg.sender == idToMarketItem[_itemId].seller, "Only the seller can update the price");
        idToMarketItem[_itemId].price = _price;
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
        idToMarketItem[_itemId].stars += _stars;
        idToMarketItem[_itemId].votes++;
    }

    function getAverageStars(uint256 _itemId) public view returns (uint8) {
        return idToMarketItem[_itemId].stars / idToMarketItem[_itemId].votes;
    }
}


