import React,{Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { bindActionCreators } from 'redux';

import SearchResults from './search_results';
import Album from './album_selected'

 class Search extends Component {
  //Default signed-out view
  constructor(props){
    super(props);
    this.state={term:''}
    this.handleOnChange=this.handleOnChange.bind(this);
    this.handleOnSubmit=this.handleOnSubmit.bind(this);
  }
  handleOnChange(e){
    this.setState({term:e.target.value})
  }
  handleOnSubmit(e){
    e.preventDefault();
    this.props.findAlbum(this.state.term);
    
  }

  renderResults(){
    return(
    <div>
      <Album/> 
      <SearchResults albums={this.props.search_results.current} 
                     query={this.state.term}
             onAlbumSelect={(a,b,c,d)=>{ this.props.selectAlbum({album:a,artist:b,image:c,owner:null, label:'Add'})}}
              clearResults={()=>{this.props.clearResults()}}/>
      </div>)        
  }
  renderForm() {
    return (
       <form  className="form-inline" 
       onSubmit={this.handleOnSubmit}
       onChange={this.handleOnChange}>
        <div className='form-group'>
          <label for='text'>Find a new album:</label>
          <input
            type='text'
            placeholder="Search For Albums"
            className="form-control"
            onChange={this.handleOnChange}
            value={this.state.term}/>
          </div>
          <input type="submit" className="btn btn-secondary" value='search'/>       
        </form>
    );
  }
  render(){
    if(this.props.search_results && this.props.search_results.current){
        return this.renderResults()
    }
    return this.renderForm();
  }
}
function mapStateToProps({albums,search_results}){
  return {albums,search_results}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Search);