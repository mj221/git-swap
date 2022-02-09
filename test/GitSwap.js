const { default: Web3 } = require('web3');

const PoiToken = artifacts.require("PoiToken");
const GitSwap = artifacts.require("GitSwap");

require('chai')
    .use(require('chai-as-promised'))
    .should()

// helper function for wei conversion
function tokens(n){
    return web3.utils.toWei(n, 'ether');
}

contract("GitSwap", ([deployer, investor]) => {
    let token, gitswap;

    before (async () => {
        token = await PoiToken.new()
        gitswap = await GitSwap.new(token.address)
        await token.transfer(gitswap.address, tokens('1000000'));
    })
    describe("Token deployment", async () => {
        it('Veryify contract name', async() =>{
            // let token = await PoiToken.deployed();
            // let token = await PoiToken.new();
            var name = await token.name();
            assert.equal(name, "Poi Token");
        })
    })

    describe("GitSwap deployment", async () => {
        it('Verify contract name', async() =>{
            // let gitswap = await GitSwap.deployed();
            // let gitswap = await GitSwap.new();
            var name = await gitswap.name();
            assert.equal(name, "GitSwap Dex");
        })
        it('Verify token balance', async function(){
            // let token = await PoiToken.new();
            // let gitswap = await GitSwap.new()
            // await token.transfer(gitswap.address, '1000000000000000000000000');
            
            var balance = await token.balanceOf(gitswap.address);
            assert.equal(balance, tokens('1000000'));
        })
    })
    describe('Buy tokens', async() => {
        let result;
        before(async () => {
            result = await gitswap.buyTokens({from: investor, value: tokens('1')})
        })
        it('Allows user to buy tokens from gitswap', async() => {
            let balance = await token.balanceOf(investor)
            assert.equal(balance, tokens('100'))

            let swapBalance = await token.balanceOf(gitswap.address)
            assert.equal(swapBalance, tokens('999900'))

            //eth balance of gitswap contract
            let gitSwapBalance = await web3.eth.getBalance(gitswap.address)
            assert.equal(gitSwapBalance, tokens('1')); 

            // console.log(result.logs)
            const event = result.logs[0].args;
            assert.equal(event.account, investor);
            assert.equal(event.token, token.address);
            assert.equal(event.amount.toString(), tokens('100').toString())
            assert.equal(event.rate.toString(), '100')
        })
    })
    describe('Sell tokens', async() => {
        let result;
        before(async () => {
            await token.approve(gitswap.address, tokens('100'), {from: investor})
            result = await gitswap.sellTokens(tokens('100'), {from: investor})
        })
        it('Allows user to sell tokens to gitswap', async() => {
            let balance = await token.balanceOf(investor)
            assert.equal(balance, tokens('0'));
            
            let swapBalance = await token.balanceOf(gitswap.address)
            assert.equal(swapBalance, tokens('1000000'))

            let gitSwapBalance = await web3.eth.getBalance(gitswap.address)
            assert.equal(gitSwapBalance, tokens('0')); 

            const event = result.logs[0].args;
            assert.equal(event.account, investor);
            assert.equal(event.token, token.address);
            assert.equal(event.amount.toString(), tokens('100').toString())
            assert.equal(event.rate.toString(), '100')


            await gitswap.sellTokens(tokens('500'), {from: investor}).should.be.rejected;
        })
    })

})