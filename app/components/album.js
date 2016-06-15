import React from 'react'

const Album = ({album,onAlbumSelect,img,artist,owner}) => {
        return(
          <div className="col-sm-3 col-xs-6"  onClick={()=> onAlbumSelect(album,artist,img,owner)}>
            <div className="thumbnail">
              <div className='caption'>
                <p><strong>{artist}</strong></p>
                <p>{album}</p>
              </div>
              <img src={img} alt={`${album} by ${artist}`}/>
            </div>
          </div> 
  );
};

export default Album;