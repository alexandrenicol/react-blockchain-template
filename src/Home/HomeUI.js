import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import logo from './logo.svg';
import './Home.css';

import List from '../Components/List';
import View from '../Components/View';

class HomeUI extends Component {

  componentDidMount() {
    console.log('home component did mount');
    if (!this.props.blockchain.web3) {
      this.props.loadWeb3();
    }
  }

  render() {
    console.log('home component is rendering');

    let web3Span = <span> Web3 is not loaded </span>;
    if (this.props.blockchain.web3) {
      const address = this.props.blockchain.web3Account;
      web3Span = <span> Web3 is loaded with address {address} </span>;
    }

    return (
      <div>
        <div className="Home">
          <header className="Home-header">
            <img src={logo} className="Home-logo" alt="logo" />
            <h1 className="Home-title">Welcome to React</h1>
          </header>
          <p className="Home-intro">
            {web3Span}<br/>
            <Link to="/">Home</Link><br/>
            <Link to="/objects">My Objects</Link><br/>
            <Link to="/debug">Debug</Link><br/>
          </p>
        </div>
        <div className="content">
          <Route exact path={`${this.props.match.path}objects`} component={List}/>
          <Route path={`${this.props.match.path}objects/:objectId`} component={View}/>
          <Route path={`${this.props.match.path}debug`} render={() => (
            <h3>Debug.</h3>
          )}/>
          <Route exact path={this.props.match.path} render={() => (
            <h3>Default.</h3>
          )}/>
        </div>
      </div>
    );
  }
}

export default HomeUI;
