import React, { Component } from 'react'

class Main extends Component {
    render() {
        return (
            <div id="content">
                <div className="card mb-4">
                    <div className="card-body">
                        <form className="mb-3">
                            <div>
                                <label className="float-left"><b>Input</b></label>
                                <span className="float-right text-muted">
                                    Balance:0
                                </span>
                            </div>
                            <div className="input-group mb-4">
                                <input type="text" className="form-control form-control-lg" placeholder="0" required/>
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <img src="" height='32' alt=""/>
                                        &nbsp;&nbsp;&nbsp; ETH
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label className="float-left"><b>Ouput</b></label>
                                <span className="float-right text-muted">
                                    Balance: 0
                                </span>
                            </div>
                            <div className="input-group mb-2">
                                <input type="text" className="form-control form-control-lg" placeholder="0" disabled/>
                                
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Main;
