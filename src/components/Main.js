import React, { Component } from 'react'
import BuyForm from './BuyForm'
import SellForm from './SellForm'

import { IoSwapVerticalSharp } from 'react-icons/io5';


class Main extends Component {
    constructor(props){
        super(props)
        this.state = {
            currentForm: 'buy'
        }
    }
    
    render() {
        let content
        if (this.state.currentForm == 'buy'){
            content = <BuyForm 
                ethBalance={this.props.ethBalance}
                tokenBalance={this.props.tokenBalance}
                buyTokens={this.props.buyTokens}
            />
        }else if (this.state.currentForm == 'sell'){
            content = <SellForm 
                ethBalance={this.props.ethBalance}
                tokenBalance={this.props.tokenBalance}
                sellTokens={this.props.sellTokens}
            />
        }
        const buttonStyle = {
            margin: '10px 10px 10px 0'
        }
        return (
            <div id="content" className= "mt-3">
                {/* <div className="d-flex justify-content-between mb-3">
                    <button 
                        className="btn btn-light"
                        onClick={() => {
                            this.setState({currentForm: "buy"})
                        }}>
                        Buy
                    </button>
                    <span className="text-muted mt-2">&lt; &nbsp; &gt;</span>
                    <button 
                        className="btn btn-light"
                        onClick={() => {
                            this.setState({currentForm: "sell"})
                        }}>
                        Sell
                    </button>
                </div> */}
                <div className = "cardgroup">
                    <div className="card mb-4 d-flex flex-row">
                        <div className="card-body">
                            {content}
                        </div>
                        <div className="card-body mt-10">
                            <button
                                className="btn btn-light"
                                style={buttonStyle}> 
                                    <IoSwapVerticalSharp size={30}/>
                            </button>
                        </div>
                    </div>

                </div>
                

            </div>
        );
    }
}

export default Main;
