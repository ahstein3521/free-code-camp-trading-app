import React from 'react'
import Album from './album';


const List = (props) => {
 
   const AlbumList = props.albums.map((v,i) => {
      let button=props.onConfirm? <button className='btn-primary' onClick={()=>props.onConfirm(v)}>Confirm</button>:<p></p>
      return (
      <div className='row well' key={i}>
        <div className='col-xs-4'>
          <h6 onClick={()=>{props.onSelectAlbum(v.trade.album,v.trade.artist,v.trade.image)}}>{v.trade.album} by {v.trade.artist} FOR: </h6>
        </div>
        <div className='col-xs-4'>
          <h6 onClick={()=>{props.onSelectAlbum(v.offer.album,v.offer.artist,v.offer.image)}}>{v.offer.album} by {v.offer.artist}</h6>
        </div>
        <div className='col-xs-4'>
          <div className='btn-group'>
            {button}
            <button className='btn-secondary' onClick={()=>props.onCancel(v)}>Cancel</button>
          </div>
        </div>
      </div> 
      );
    })


  return (
    <div className='request'>
   {AlbumList}
    </div>
  );
};

export default List;