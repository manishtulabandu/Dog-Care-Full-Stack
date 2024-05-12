import React from "react";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

const ImageCarousel = ({ images }) => {
  return (
    <Carousel variant="dark">
      {images.map((image, index) => (
        <Carousel.Item key={index}>
          {/* {index==0?(<video className="d-block w-100" alt={`Slide ${index}`} src={video1} style={{ maxWidth: '100%', height: "500px" }}/>):( */}
          <img
            className="d-block w-100"
            src={image}
            alt={`Slide ${index}`}
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ImageCarousel;
