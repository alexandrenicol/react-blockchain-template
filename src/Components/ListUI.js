import React, { Component } from 'react';
import { HexEncoder } from '../Lib/HexEncoder.js';
import { Link } from 'react-router-dom';


class ListUI extends Component {
  
  render() {
    return (
      <div>
        <h3>My Objects</h3>
        <ul>
          {this.props.objects.objects.map((object, index) => {
            return <li key={index}><Link to={`${this.props.match.url}/${object}`}>{ HexEncoder.fromHex(object)}</Link></li>
          })}
        </ul>
      </div>
    );
  }
}

export default ListUI;
