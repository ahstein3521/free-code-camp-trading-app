import React from 'react'
import Album from './album'


const Library = (props) => {
  

  const AlbumsList = props.albums.map((v,i) => {
      return (
        <Album key={i} 
             album={v.album}
             artist={v.artist}
             img={v.image}
             owner={v.owner}
             onAlbumSelect={props.onAlbumSelect}/>
      );
    })
  

  return (
   <div className='row library-container'> 
      {AlbumsList}
   </div> 
  );
}


export default Library;