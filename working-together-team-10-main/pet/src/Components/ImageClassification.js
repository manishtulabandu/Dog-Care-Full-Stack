import React from 'react';
import Detection from './Detection';
import Facts from './Facts';
import Header from './TopHeader/Header';
import './ImageClassification.css';

function ImageClassification() {
  return (
    <div className='bg-classification'>
       <Header />
       <span>&nbsp;&nbsp;</span>
       <span>&nbsp;&nbsp;</span>
       <Facts />
       <span>&nbsp;&nbsp;</span>
       <span>&nbsp;&nbsp;</span>
       <span>&nbsp;&nbsp;</span>
       <span>&nbsp;&nbsp;</span>
      <h3 className='ic'>Load model to know your dog's breed</h3>
      
        <Detection/>
      
    </div>
  );
}

export default ImageClassification;
