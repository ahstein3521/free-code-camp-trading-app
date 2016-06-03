import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { bindActionCreators } from 'redux';
import SearchBar from './search_form'
import AlbumSelected from './album_selected_view'
import AlbumLibrary from './album_library'
import Requests from './request';

 
 class Profile extends Component {  
  constructor(props){
    super(props);
  
    this.User=this.props.user?this.props.user.name:null;
    this.Sent=this.props.user?this.props.user.request_sent:[];
    this.Received=this.props.user?this.props.user.request_received:[];
  
    this.state={requestView:null,label:'Albums'}
  }
  
  cancelRequest(a,isUser){
    const request_sent=this.Sent.filter((v)=>{return v!=a})
    const request_received=this.Received.filter((v)=>{return v!=a})//remove on client
     
     if(isUser){
      //remove on server-user cancels their own sent request
      return this.props.cancelRequest(this.User,a.offer.owner,a,{request_received,request_sent})
     }
     //remove on server-user cancels a received request
    return this.props.cancelRequest(a.trade.owner,this.User,a,{request_received,request_sent})
  }
  
  confirmRequest(a){
    this.props.confirmRequest(this.User,a.trade.owner,a.offer.album,a.trade.album);
    this.cancelRequest(a) //clear DB of this pending trade
  }
  
  selectNewAlbum(a,b,c){
    let filterUserButton=this.state.label!='Albums'? 'hidden' : 'btn-primary'
    let label=this.props.search_results.current? 'Add':'Delete';
    this.props.selectAlbum({artist:b,album:a,image:c,label,filterUserButton})
  }
  
  renderSentRequests(){
    return <Requests albums={this.props.user.request_sent} 
              onSelectAlbum={(a,b,c)=>{this.selectNewAlbum(a,b,c)}}
              onCancel={(a)=>this.cancelRequest(a,true)}/>
  }
  
  renderReceivedRequests(){
    return <Requests albums={this.Received} 
              onSelectAlbum={(a,b,c)=>{this.selectNewAlbum(a,b,c)}}
                   onCancel={(a)=>{this.cancelRequest(a,null)}}
                  onConfirm={(a)=>{this.confirmRequest(a)}}/> 
  }
  
  renderUserLibrary(){
      const List=this.props.albums.filter((v)=>{return v.owner==this.User})
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
function mapStateToProps({albums,selected,user,search_results}){
 return {albums,selected,user,search_results} 
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(Profile);
