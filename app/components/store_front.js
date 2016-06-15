import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { bindActionCreators } from 'redux';
import Album from './album'
import AlbumSelected from './album_selected_view'
import AlbumLibrary from './album_library'

 class StoreFront extends Component {  
  
  componentWillMount(){
    this.props.fetchAlbums()
  }
  
  selectNewAlbum(a,b,c,d){
    const album={album:a,artist:b,image:c,owner:d,label:'Request Trade'}
    this.props.selectAlbum(album)
  }
         
  render() { 
    return (
     <div className='container storefront'>
      <h1>All albums:</h1>  
        <AlbumLibrary albums={this.props.albums} onAlbumSelect={(a,b,c,d)=>{this.selectNewAlbum(a,b,c,d)}}/>  
        <AlbumSelected label={'Request Trade'} />
     </div>
    );
  }
}

function mapStateToProps({albums}){  
  return {albums}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(StoreFront);


