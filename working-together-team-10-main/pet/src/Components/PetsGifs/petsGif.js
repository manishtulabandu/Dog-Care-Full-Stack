import React from 'react';
import gifVedio from "../../images/blog-images/playful-temptations-desktop.mp4"
import PetsVideo from './petsVideo';

const PetsGif = () => {
  return (
    <div style={{"marginLeft":"2rem"}}>
      <div>
      <video controls style={{"width":"98%"}} >
        <source  src={gifVedio} allow="autoplay; encrypted-media" type="video/mp4" />
      </video>
      </div>
      {/* <div >
      <video controls autoPlay style={{"width":"98%"}} >
        <source  src="https://www.youtube.com/watch?v=1vfj_aGQgbc&t=3s" type="video/mp4" />
      </video>
      <PetsVideo />
      </div> */}
    </div>
  );
};

export default PetsGif;