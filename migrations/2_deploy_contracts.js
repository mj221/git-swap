const GitSwap = artifacts.require("GitSwap");
const PoiToken = artifacts.require("PoiToken");


module.exports = async function(deployer){
    await deployer.deploy(PoiToken);
    const poitoken = await PoiToken.deployed();

    await deployer.deploy(GitSwap, PoiToken.address);
    const gitswap = await GitSwap.deployed();

    var totalSupply = '1000000000000000000000000';
    await poitoken.transfer(GitSwap.address, totalSupply);
};