pragma solidity ^0.8.7;
import "./PoiToken.sol";

contract GitSwap{
    string public name = "GitSwap Dex";
    PoiToken public token;

    //re-entrancy protection
    bool public Flag;

    //redemption rate
    uint public rate = 100;

    event TokenBought(
        address account,
        address token,
        uint amount,
        uint rate
    );

    event TokenSold(
        address account,
        address token,
        uint amount,
        uint rate
    );
    
    constructor(PoiToken _tokenContract){
        token = _tokenContract;
    }
    function buyTokens() public payable{
        uint tokenAmount = msg.value * rate;
        require((token.balanceOf(address(this)) >= tokenAmount) && !Flag);

        Flag = true;
        token.transfer(msg.sender, tokenAmount);
        emit TokenBought(msg.sender, address(token), tokenAmount, rate);
        Flag = false;
    }

    function sellTokens(uint _amount) public {
        require(token.balanceOf(msg.sender) >= _amount);
        uint etherAmount = _amount / rate;
        require(address(this).balance >= etherAmount);
        // return poi token to swap contract
        token.transferFrom(msg.sender, address(this), _amount);
        payable(msg.sender).transfer(etherAmount);
        
        emit TokenSold(msg.sender, address(token), _amount, rate);
    }

}