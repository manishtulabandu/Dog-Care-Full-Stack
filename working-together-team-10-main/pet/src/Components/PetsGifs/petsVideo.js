import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import "./petsVideo.css"

const YouTubeModal = () => {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <div className="youtube-modal-container">
      <img
        src="https://www.zigly.com/media/wysiwyg/exp-center-video-poster.jpg"
       alt="Thumbnail"
        className="youtube-thumbnail"
        onClick={handleShowModal}
        style={{"width":"104%"}}
      />
      <button className="play-button" onClick={handleShowModal}></button>

      {/* <Modal
        show={showModal}
        onHide={handleCloseModal}
        dialogClassName="modal-transparent"
      >
        <Modal.Body>
          <div className="embed-responsive embed-responsive-16by9">
            <iframe
              className="embed-responsive-item"
              src="https://www.youtube.com/watch?v=1vfj_aGQgbc&t=3s"
              allowFullScreen
              title="YouTube video"
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal> */}
    </div>
  );
};

export default YouTubeModal;
