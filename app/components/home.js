import React,{Component} from 'react';
import { Link } from 'react-router';




export default class Home extends Component {
  //Default signed-out view
  render() {
    return (
      <div className='signed-out-view'>
    	   <h2>For The Record...</h2>
          <img src='https://upload.wikimedia.org/wikipedia/commons/0/05/Grammofon,_Nordisk_familjebok.png' />
        <hr/>
        <h4>Connect With Fellow Collectors And Enthusiasts From Around The World,</h4> 
        <h4><strong>And Make Once-In-A-Lifetime Trades!</strong></h4>
    	</div>     
 
    );
  }
}