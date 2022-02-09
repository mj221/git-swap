import React, { Component } from 'react'
import Identicon from 'identicon.js';

import './App.css'

class Navbar extends Component {

  render() {
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            href=""
            target="_blank"
            rel="noopener noreferrer"
          >
            Git Swap
          </a>
          <ul className="navbar-nav px-3">
            <li className="navbar-item text-nowrap d-none d-sm-none d-sm-block">
                {this.props.account 
                    ? <img
                    className="mr-2"
                    width='30'
                    height='30'
                    src={`data:image/png;base64,${new Identicon(this.props.account, 30).toString()}`}
                    alt=""
                    />
                    :<span>No account</span>
                }
                <small className="text-secondary">
                    <small id="account">{this.props.account}</small>
                </small>

                
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default Navbar;
