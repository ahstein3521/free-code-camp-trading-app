import React from 'react';
import { Component } from 'react';
import Nav from './navbar'
require('../styles/style.scss');

export default class App extends Component {
  render() {
    localStorage.removeItem('token');
    return (
     <div>
     <Nav/>
      <div>
      	{this.props.children}
      </div>
     </div> 
    );
  }
}