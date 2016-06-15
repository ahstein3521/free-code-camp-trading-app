import React from 'react'

const AlbumSelect = (props) => {
  
  if(!props.selected || !props.selected.current){return <p></p>}
      
  const current=props.selected.current
    return(
      <div> 
        <div className='lightbox-frame' onClick={()=>props.onCancel()}></div>  
          <div className="selected-album row">
            <button onClick={()=>props.onCancel()} className="close-btn" >X</button>
              <div className='col-md-4'> 
                <img className='img-responsive' src={current.image}/>
              </div>
              <div className='col-md-8'>
                <h1>{current.artist}</h1>
                <h4>{`Album: ${current.album}`}</h4>
                <button className={current.filterUserButton} onClick={()=>props.onConfirm(current)}>{current.label}</button>    
             </div>
          </div>
        </div> 
  );
};

export default AlbumSelect;