//import React, { Component } from 'react';
import { connect } from 'react-redux';
import ListUI from './ListUI';
//import { initWeb3, loadObjects } from '../Actions/BlockchainActions.js'

const mapStateToProps = state => {
  return {
    router: state.router,
    //blockchain: state.blockchain,
    objects: state.objects
  }
}

const mapDispatchToProps = dispatch => {
  return {

  }
}


const List = connect(
  mapStateToProps,
  mapDispatchToProps
)(ListUI)

export default List
