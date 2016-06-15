import React from 'react'
import Album from './album'


const List = (props) => {
 

  const AlbumList = props.albums.map((v,i) => {
    if(v.image[1]['#text']){
      return (
        <Album key={i} 
             album={v.name}
             artist={v.artist}
             img={v.image[2]['#text']}
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



 