import React, { Component } from 'react'
import Web3 from 'web3'

import Navbar from './Navbar'
import Main from './Main'

import GitSwap from '../abis/GitSwap.json'
import PoiToken from '../abis/PoiToken.json'

import './App.css'

class App extends Component {
  async componentWillMount() {
    // await this.loadWeb3()
    // await this.loadBlockchainData()
  }
  async loadBlockchainData() {
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    console.log("Account:", this.state.account)

    const ethBalance = await web3.eth.getBalance(this.state.account)
    this.setState({ ethBalance })
    console.log("ETH Balance:", this.state.ethBalance)

    // Load Token contract //
    const networkId = await web3.eth.net.getId()
    // const address = PoiToken.networks['5777'].address
    const tokenData = PoiToken.networks[networkId]

    if (tokenData) {
      const poiToken = new web3.eth.Contract(PoiToken.abi, tokenData.address)
      this.setState({ poiToken })

      let tokenBalance = await poiToken.methods.balanceOf(this.state.account).call()
      this.setState({ tokenBalance: tokenBalance.toString() })

      console.log("Network Id:", networkId)
      console.log("Address:", tokenData.address)
      console.log("Token balance:", tokenBalance.toString())
    } else {
      window.alert("Token contract not deployed on current network.")
    }

    // Load Gitswap contract //
    const swapData = GitSwap.networks[networkId]

    if (swapData) {
      const gitSwap = new web3.eth.Contract(GitSwap.abi, swapData.address)
      this.setState({ gitSwap })

    } else {
      window.alert("Swap contract not deployed on current network.")
    }
    this.setState({ loading: false })
  }
  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
      
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    } else {
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

  buyTokens = (ethAmount) => {
    this.setState({loading: true})
    this.state.gitSwap.methods.buyTokens()
                              .send({from: this.state.account, value: ethAmount})
                              .on('transactionHash', (hash) => {
                                this.setState({currentForm: "buy"})
                                // for debug
                                this.setState({loading: true})
                                
                              })
                              .on('confirmation', async (receipt) => {
                                // window.location.reload()
                                
                                let bal = await window.web3.eth.getBalance(this.state.account)
                                let tbal = await this.state.poiToken.methods.balanceOf(this.state.account).call()
                                this.setState({ ethBalance: bal })
                                this.setState({tokenBalance: tbal.toString()})
                                // console.log("CHECKPOINT_BUY:", bal)
                                // console.log("CHECKPOINT_BUY2:", tbal.toString())
                                this.setState({loading: false})
                              }).catch((error) => {
                                this.setState({loading: false})
                              })
  }

  sellTokens = async(tokenAmount) =>{
    this.setState({loading: true})
    this.state.poiToken.methods.approve(this.state.gitSwap.address, tokenAmount)
                                .send({from: this.state.account})
                                .on('transactionHash', (hash) => {
                                  this.setState({currentForm: "sell"})
                                  this.state.gitSwap.methods.sellTokens(tokenAmount)
                                                            .send({from: this.state.account})
                                                            .on('confirmation', async (receipt) => {
                                                              let bal = await window.web3.eth.getBalance(this.state.account)
                                                              let tbal = await this.state.poiToken.methods.balanceOf(this.state.account).call()
                                                              this.setState({ ethBalance: bal })
                                                              this.setState({tokenBalance: tbal.toString()})
                                                              
                                                              this.setState({loading: false})
                                                            })
                                }).on('confirmation', () => {
                                
                                  this.setState({loading: true})
                                }).catch((err)=>{
                                  this.setState({loading:false})
                                })
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      ethBalance: '',
      poiToken: '',
      tokenBalance: '',
      gitSwap: '',
      loading: true,
      currentForm: "buy"
    }
    // this.loadWeb3 = this.loadWeb3.bind(this);
    // this.loadBlockchainData = this.loadBlockchainData.bind(this);
  }

  render() {
    let content
    if (this.state.loading) {
      content = <p id="loader" className="text-center">Loading...</p>
      
    } else {
      
      content = <Main 
        ethBalance={this.state.ethBalance} 
        tokenBalance={this.state.tokenBalance}
        buyTokens={this.buyTokens}
        sellTokens= {this.sellTokens}
        currentForm={this.state.currentForm}
        />
    }
    return (
      <div>

        <Navbar account={this.state.account} loadWeb3= {this.loadWeb3} loadBlockchainData= {this.loadBlockchainData.bind(this)}/>

        <div className="container-fluid mt-7">
          <div className="row">
            <main role="main" className="col-lg-12 ml-auto mr-auto text-center" style={{maxWidth: '600px'}}>
              <div className="content mr-auto ml-auto">
                
                {content}

              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
