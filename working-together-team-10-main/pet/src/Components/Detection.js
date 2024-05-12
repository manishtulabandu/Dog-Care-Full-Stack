import React, { useState, useRef, useReducer, useEffect } from "react";
import * as mobilenet from "@tensorflow-models/mobilenet";
import './Detection.css';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-backend-webgl';

const stateMachine = {
  initial: "initial",
  states: {
    initial: { on: { next: "loadingModel" } },
    loadingModel: { on: { next: "modelReady" } },
    modelReady: { on: { next: "imageReady" } },
    imageReady: { on: { next: "identifying" }, displayImage: true },
    identifying: { on: { next: "complete" } },
    complete: { on: { next: "modelReady" }, displayImage: true, displayResults: true }
  }
};

function Detection() {
  const [results, setResults] = useState([]);
  const [imageURL, setImageURL] = useState(null);
  const [model, setModel] = useState(null);
  const imageReference = useRef();
  const inputReference = useRef();

  const reducer = (currentState, event) =>
      stateMachine.states[currentState].on[event] || stateMachine.initial;

  const [appState, dispatch] = useReducer(reducer, stateMachine.initial);
  const transitionState = () => dispatch("next");

  const loadModel = async () => {
    transitionState();
    const loadedModel = await mobilenet.load();
    setModel(loadedModel);
    transitionState();
  };

  const identify = async () => {
    transitionState();
    const identificationResults = await model.classify(imageReference.current);
    setResults(identificationResults);
    transitionState();
  };

  const reset = async () => {
    setResults([]);
    transitionState();
  };

  const uploadImage = () => inputReference.current.click();

  const handleImageUpload = event => {
    const { files } = event.target;
    if (files.length > 0) {
      const imageURL = URL.createObjectURL(event.target.files[0]);
      setImageURL(imageURL);
      transitionState();
    }
  };

  const actionButton = {
    initial: { action: loadModel, text: "Load Model" },
    loadingModel: { text: "Loading Model..." },
    modelReady: { action: uploadImage, text: "Upload Image" },
    imageReady: { action: identify, text: "Identify Breed" },
    identifying: { text: "Identifying..." },
    complete: { action: reset, text: "Reset" }
  };

  const { displayImage, displayResults } = stateMachine.states[appState];

  useEffect(() => {
    tf.setBackend('webgl');
  }, []);

  return (
      <div>
        {displayImage && <img className='Detect-img' src={imageURL} alt="upload-preview" ref={imageReference} />}
        <input className="Detection-input"
               type="file"
               accept="image/*"
               capture="camera"
               onChange={handleImageUpload}
               ref={inputReference}
        />
        {displayResults && (
            <ul className="detect-list">
              {results.map(({ className, probability }) => (
                  <li key={className}>{`${className}: %${(probability * 100).toFixed(2)}`}</li>
              ))}
            </ul>
        )}
        <button className="detect-button" onClick={actionButton[appState].action || (() => {})}>
          {actionButton[appState].text}
        </button>
      </div>
  );
}

export default Detection;
