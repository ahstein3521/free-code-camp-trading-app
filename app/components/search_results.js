import React from 'react'
import Album from './album'


const List = (props) => {
 

  const AlbumList = props.albums.map((v,i) => {
    if(v.images&&v.images[1]){
      return (
        <Album key={i} 
             album={v.name}
             artist={props.query.toUpperCase()}
             img={v.images[1].url}
             onAlbumSelect={props.onAlbumSelect}/>
      );
    }
  });

  return (
    <div className='search-results'> 
      <div className='results-header'>
        <h3>{"Top Results For "+ props.query}</h3>
        <button onClick={()=>props.clearResults()}>X</button>
      </div>
      <div className="row ">
        {AlbumList}
      </div>
    </div> 
  );
};

export default List;



 