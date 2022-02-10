import React, { Component } from 'react'
import poitokenLogo from '../poi-logo.png'
import ethLogo from '../eth-logo.png'

class SellForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            output: '0'
        }
    }
    render() {
        return (
            <form className="mb-3" 
                onSubmit={(event)=>{
                    event.preventDefault()
                    let tokenAmount = this.input1.value.toString()
                    tokenAmount = window.web3.utils.toWei(tokenAmount, 'ether')
                    this.props.sellTokens(tokenAmount)
                }}
            >
                <div>
                    <label className="float-left"><b>Input</b></label>
                    <span className="float-right text-muted">
                        Balance: {window.web3.utils.fromWei(this.props.tokenBalance, 'ether')}
                    </span>
                </div>
                <div className="input-group mb-4">
                    <input 
                        type="text" 
                        onChange={(event) => {
                            console.log("changing...")
                            const tokenAmount = this.input1.value.toString()
                            this.setState({
                                //update token value amount
                                output: tokenAmount / 100
                            })
                            // console.log(this.state.output)
                        }}
                        ref={(input) => {this.input1 = input}}
                        className="form-control form-control-lg" 
                        placeholder="0" 
                        required/>
                    <div className="input-group-append">
                        <div className="input-group-text">
                            <img src={poitokenLogo} height='32' alt=""/>
                            &nbsp;&nbsp;&nbsp;&nbsp; POI
                        </div>
                    </div>
                </div>
                <div>
                    <label className="float-left"><b>Ouput</b></label>
                    <span className="float-right text-muted">
                        Balance: {window.web3.utils.fromWei(this.props.ethBalance, 'ether')}
                    </span>
                </div>
                <div className="input-group mb-2">
                    <input 
                        type="text" 
                        className="form-control form-control-lg" 
                        placeholder="0" 
                        value={this.state.output}
                        disabled/>
                    <div className="input-group-append">
                        <div className="input-group-text">
                            <img src={ethLogo} height="32" alt=""/>
                            &nbsp;&nbsp;&nbsp; ETH
                        </div>
                    </div>
                </div>
                <div className="mb-5">
                    <span className="float-left text-muted">Exchange Rate</span>
                    <span className="float-right text-muted"> 100 POI = 1 ETH</span>
                </div>
                <button type="submit" className="btn btn-primary btn-block btn-lg">SWAP</button>
            </form>
        );
    }
}

export default SellForm;
