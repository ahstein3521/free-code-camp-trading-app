import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { bindActionCreators } from 'redux';
import SearchBar from './search_form'
import AlbumSelected from './album_selected_view'
import AlbumLibrary from './album_library'
import Requests from './request';
import _ from 'lodash';

function updateList(currentList,index){
  let i=_.findIndex(currentList,(v)=>{return v==index});
  return [...currentList.slice(0,i),...currentList.slice(i+1)]
}
 
 class Profile extends Component {  
  constructor(props){
    super(props);  
    this.state={requestView:null,label:'Albums'}
  }
  
  cancelRequest(a,isUser){
    const sent=updateList(this.props.sent,a);
    const received=updateList(this.props.received,a)//remove on client
    let user=this.props.auth.user;

    user.user.request_received=received;
    user.user.request_sent=sent 

     if(isUser){
      //user cancels their own sent request
      return this.props.cancelRequest(this.props.name,a.offer.owner,a,user)
     }
     //user cancels a received request
    return this.props.cancelRequest(a.trade.owner,this.props.name,a,user)
  }
  
  confirmRequest(a){
    this.props.confirmRequest(this.props.name, a.trade.owner,a.offer.album,a.trade.album);
    this.cancelRequest(a) //clear DB of this pending trade
  }
  
  selectNewAlbum(a,b,c){
    let filterUserButton=this.state.label!='Albums'? 'hidden' : 'btn-primary'
    let label=this.props.search_results.current? 'Add':'Delete';
    this.props.selectAlbum({artist:b,album:a,image:c,label,filterUserButton})
  }
  
  renderSentRequests(){
    return <Requests albums={this.props.sent} 
              onSelectAlbum={(a,b,c)=>{this.selectNewAlbum(a,b,c)}}
              onCancel={(a)=>this.cancelRequest(a,true)}/>
  }
  
  renderReceivedRequests(){
    return <Requests albums={this.props.received} 
              onSelectAlbum={(a,b,c)=>{this.selectNewAlbum(a,b,c)}}
                   onCancel={(a)=>{this.cancelRequest(a,null)}}
                  onConfirm={(a)=>{this.confirmRequest(a)}}/> 
  }
  
  renderUserLibrary(){
      const List=this.props.albums.filter((v)=>{return v.owner==this.props.name})
      return <AlbumLibrary albums={List} onAlbumSelect={(a,b,c)=>{this.selectNewAlbum(a,b,c)}}/>
  }
  
  renderView(){
    switch(this.state.requestView){
      case 'Sent':
        return this.renderSentRequests();
      case 'Received':
        return this.renderReceivedRequests();  
      }
      return this.renderUserLibrary();
}

  render() { 
    return (
      <div className='container profile'>
        <div className='profile-nav'>
          <button onClick={()=>this.setState({requestView:null,label:'Albums'})}>Library</button>
          <button onClick={()=>this.setState({requestView:'Received',label:'Current Offers'})}>Inbox</button>
          <button onClick={()=>this.setState({requestView:'Sent',label:'Sent Requests'})}>Outbox</button>
          <SearchBar/>
        </div>
        <AlbumSelected label={this.props.search_results.current? 'Add' : 'Delete'}/>
        <hr/>
        <h3>Your {this.state.label}:</h3>
        <div className='row'>{this.renderView()}</div>
     </div>
    );
  }
}
function mapStateToProps({albums,selected,auth,search_results}){
  const user=auth.user?auth.user.user:null;
  let sent=user? user.request_sent:null;
  let received=user? user.request_received:null;
  let name= user? user.name:null;
 return {albums,selected,search_results,sent,received,name,auth} 
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(Profile);
