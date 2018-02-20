//import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeUI from './HomeUI';
import { initWeb3, loadObjects } from '../Actions/BlockchainActions.js'
import { ObjectManager } from "../Lib/ObjectManager.js";


const Web3 = require('web3');

const ethereumAccount = "0x33508cc5e4f2a96eda45506cac1dd4e05487b787";
// const availableAccounts = [
//   "0x33508cc5e4f2a96eda45506cac1dd4e05487b787",
//   "0xdd4d5971a63db0c0d2acf02d82e7eee18e9eca11"
// ];


const mapStateToProps = state => {
  return {
    router: state.router,
    blockchain: state.blockchain,
    objects: state.objects
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadWeb3: () => {
      console.log('loadWeb3');
      let web3 = window.web3;
      if (typeof web3 !== 'undefined') {
          web3 = new Web3(web3.currentProvider);
      } else {
          let providerUrl = "localhost:8545";
          web3 = new Web3(new Web3.providers.HttpProvider("http://" + providerUrl));
      }
      web3.defaultAccount = ethereumAccount;

      const objectManager = new ObjectManager(web3);
      initWeb3(dispatch, web3, ethereumAccount, objectManager);

      objectManager.getObjects(ethereumAccount)
      .then(objects => {
          console.log('my objects', objects);
          loadObjects(dispatch, objects);
      })
      .catch(error => {
          console.log(error);
      })
    }
  }
}


const Home = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeUI)

export default Home
