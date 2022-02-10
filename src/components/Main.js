import React, { Component } from 'react'
import BuyForm from './BuyForm'
import SellForm from './SellForm'

import { IoSwapVerticalSharp } from 'react-icons/io5';
import './App.css'

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
                    <div className="card mb-4 d-flex flex-row align-items-center">
                        <div className="card-body">
                            {content}
                        </div>
                        <div className="card-body">
                            <button 
                                className="btn btn-light mb-8"
                                onClick={() => {
                                    if (this.state.currentForm == "buy"){
                                        this.setState({currentForm: "sell"})
                                    }else{
                                        this.setState({currentForm: "buy"})
                                    }
                                }}
                                > 
                                    <IoSwapVerticalSharp size={25}/>
                            </button>
                        </div>
                    </div>

                </div>
                

            </div>
        );
    }
}

export default Main;
