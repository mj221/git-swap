import React, { Component } from 'react'
import Web3 from 'web3'
import Navbar from './Navbar'

import './App.css'

class App extends Component {
  async componentWillMount(){
    await this.loadWeb3()
    await this.loadBlockchainData()
  }
  async loadBlockchainData(){
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    // const accounts2 = await web3.eth.getCoinbase()
    this.setState({account: accounts[0]})
    console.log("Account:", this.state.account)

    const ethBalance = await web3.eth.getBalance(this.state.account)
    this.setState({ethBalance})
    console.log("ETH Balance:", this.state.ethBalance)
  }
  async loadWeb3(){
    if(window.ethereum){
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
  
    }else if(window.web3){
      window.web3 = new Web3(window.web3.currentProvider)
    }else{
      window.alert("Non-Ethereum browser detected. Try using MetaMask.")
    }
    // if (window.ethereum) {
    //   try {
    //     const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    //     const balance = await window.ethereum.request({method: 'eth_getBalance', param: [accounts[0], 'latest']})
    //     this.setState({account: accounts[0]})
    //     this.setState({ethBalance: balance})
    //   } catch (error) {
    //     if (error.code === 4001) {
    //       // User rejected request
    //       window.alert("Non-Ethereum browser detected. Try using MetaMask.")
    //     }
    //   }
    // }
  }

  constructor(props){
    super(props)
    this.state = {
      account: '',
      ethBalance: ''
    }
  }

  render() {
    return (
      <div>

        <Navbar account={this.state.account}/>

        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                <a
                  href="http://www.dappuniversity.com/bootcamp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                </a>
                <h1> example</h1>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
