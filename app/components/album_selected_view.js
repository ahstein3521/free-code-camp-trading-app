import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { bindActionCreators } from 'redux';
import AlbumSelected from './album_selected'
import AlbumLibrary from './album_library';
import _ from 'lodash';

 class LightBox extends Component {  
  constructor(props){
    super(props);    
    this.state={userLib:false,albumPicked:null}
  }

  addAlbum(a){
    this.props.addNewAlbum({...this.props.selected.current,owner:this.props.user.name})
    this.props.unselectAlbum();
  }  
  
  deleteAlbum(a){
    const album=a.album;
    const index=_.findIndex(this.props.albums, (v)=>{return v.album==album})
    this.props.deleteAlbum(album,index);
     this.props.unselectAlbum();
  }
  
  findTrade(album){
    this.props.unselectAlbum();
    
    if(!this.props.user){
      return alert('You need to be logged in before you can make trades.')
    }
    else if(this.props.user.name==album.owner){
      return alert("You can't make trades with yourself, Sybil..")
    }

    return this.setState({userLib:true,albumPicked:album})
  }

  makeTradeRequest(a,b,c,d){
    const album=this.state.albumPicked;
    const trade={album:a,artist:b,image:c,owner:d}
    const appendList=this.props.user.request_sent.concat({offer:album,trade})
  
     this.props.sendRequest(this.props.user.name,album.owner,album,trade,{request_sent:appendList})
     this.props.unselectAlbum();
     this.setState({userLib:false})
  }
  
  
  renderUserLib(){
    if(this.state.userLib){
      const Lib=this.props.albums.filter((v)=>{return v.owner==this.props.user.name})
    
      return <div className='lb2'>
              <h2>Select An Album To Trade</h2>
              <button className='close-btn' onClick={()=>this.setState({userLib:false})}>X</button>
              <AlbumLibrary albums={Lib} onAlbumSelect={(a,b,c,d)=>{this.makeTradeRequest(a,b,c,d)}}/>
            </div>  
    }
  }
  
  handleButtonClick(a){
    switch(this.props.label){
      case 'Delete':
        return this.deleteAlbum(a);
      case 'Request Trade':
         return this.findTrade(a); 
    }
    return this.addAlbum(a);
  }

  render(){
    return( 
      <div>    
         <AlbumSelected selected={this.props.selected}
                           label={this.props.label}
                       onConfirm={(a)=>{ this.handleButtonClick(a)}} 
                        onCancel={()=>{this.props.unselectAlbum()}}/> 
                        {this.renderUserLib()}       
      </div>
    )
  }
}

function mapStateToProps({selected,user,albums}){


  return {selected,user,albums}
  
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}


export default connect(mapStateToProps,mapDispatchToProps)(LightBox);
