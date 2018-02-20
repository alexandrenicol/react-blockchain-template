//import React, { Component } from 'react';
import { connect } from 'react-redux';
import ViewUI from './ViewUI';
import { loadObject } from '../Actions/BlockchainActions.js'
import { MyObject } from '../Lib/Object';

const mapStateToProps = state => {
  return {
    router: state.router,
    blockchain: state.blockchain,
    objects: state.objects
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadObject: (objectManager, web3, identifier) => {
      let currentObject = {};
      objectManager.getObject(identifier)
      .then(objectAddress => {
          currentObject.address= objectAddress;

          let object = new MyObject(web3, objectAddress);
          console.log('objectAddress', objectAddress);
          return object.getOwner();
      })
      .then(owner => {
          currentObject.owner = owner;
          console.log('owner', owner);
          loadObject(dispatch, currentObject);
      })
      .catch(error => {
          console.log('error');
          console.log(error);
      });
    },
    transferObject: (event, identifier, objectManager, web3Account) => {
      console.log(identifier, event.target.value, objectManager, web3Account);
      objectManager.transferObject(web3Account, identifier, event.target.value)
      .then(success => {
          alert("Object transferred");
          //refreshHistory(tmpl);
      })
      .catch(error => {
          alert(error.message);
      });
    }
  }

}


const View = connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewUI)

export default View
