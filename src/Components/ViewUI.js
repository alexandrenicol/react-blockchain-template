import React, { Component } from 'react';
import { HexEncoder } from '../Lib/HexEncoder.js';


class ViewUI extends Component {
  constructor(props) {
    super(props);
    console.log('constructor');
    if(this.props.blockchain.web3) {
      this.props.loadObject(
        this.props.blockchain.objectManager,
        this.props.blockchain.web3,
        this.props.match.params.objectId
      )
    }

    this.handleKeyPress = this.handleKeyPress.bind(this)
  }

  componentWillReceiveProps(){
    console.log(this.props.match.params);
    if(this.props.blockchain.web3 && !this.props.objects.currentObject) {
      this.props.loadObject(
        this.props.blockchain.objectManager,
        this.props.blockchain.web3,
        this.props.match.params.objectId
      )
    }
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.props.transferObject(
        e,
        this.props.match.params.objectId,
        this.props.blockchain.objectManager,
        this.props.blockchain.web3Account
      );
    }
  }

  render() {
    let object = this.props.match.params.objectId;
    return (
      <div>
        <h3>Object: {HexEncoder.fromHex(object)}</h3>
        <div>
          Owner: {(this.props.objects.currentObject ? this.props.objects.currentObject.owner : '')}
        </div>
        <div>
          Object address: {(this.props.objects.currentObject ? this.props.objects.currentObject.address: '')}
        </div>
        <div>
          <label>Transfer object</label>
          <input type="text"  onKeyUp={this.handleKeyPress}/>
        </div>
      </div>
    );
  }
}

export default ViewUI;
