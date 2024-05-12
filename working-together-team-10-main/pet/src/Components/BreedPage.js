import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom'
import { DropdownButton } from 'react-bootstrap'
import { Dropdown } from 'bootstrap'
import {useState,useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../Components/TopHeader/Dog-Logo.png';
import c1 from '../images/dc1.jpg'
import c2 from '../images/dc2.jpg';
import p1 from '../images/p1.webp';
import p2 from '../images/p2.webp';
import Header from './TopHeader/Header';
import ImageCarousel from './ImageCaurosel';
import BreedList from './BreedList';
import Breeds from './Breeds';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './BreedModal.css'
import Accordion from 'react-bootstrap/Accordion';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import Card from 'react-bootstrap/Card';
import wave from '../images/right-wave.png'
import './Home.css'

function BreedPage(props) {
    const {breed,setBreed,setProductCat}=props
    
    const [showBreed, setShowBreed] = useState(false);

    const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  const handleClose = () => setShowBreed(false);
const images=[c1,c2];

function CustomToggle({ children, eventKey }) {
  const decoratedOnClick = useAccordionButton(eventKey, () =>
    console.log('totally custom!'),
  );

  return (
    <button
      type="button"
      style={{ backgroundColor:  "#a24c00", color:"white" }}
      onClick={decoratedOnClick}
    >
      {children}
    </button>
  );
}
  return (
    
    <div  >
      
        <Header />
       <div className='wave'>
       <h2 style={{marginLeft:"25px", marginTop:"5px",marginBottom:"-10px"}}><img src={wave} />BREEDS<img src={wave} /></h2>
       </div>
      <BreedList setProductCat={setProductCat} Breeds={Breeds} setBreed={setBreed} setShowBreed={setShowBreed}/>
      <Modal show={showBreed} onHide={handleClose} centered size="xl">
      <Modal.Header closeButton className="modal-header">
      <img src={breed.img} className='Logo-style' style={{borderRadius:"50%"}}/>
        <Modal.Title className="modal-title"> {breed.breed} Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        
        <Accordion defaultActiveKey="0">
      <Card>
        <Card.Header>
          <CustomToggle eventKey="0">Overview</CustomToggle>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <Card.Body>
          <p className="modal-text">{breed.overview.description}</p>
          <p className="modal-text"><b>Size:</b> {breed.overview.size}</p>
          <p className="modal-text"><b>Height Range:</b> {breed.overview.height_range}</p>
          <p className="modal-text"><b>Weight Range:</b> {breed.overview.weight_range}</p>
          <p className="modal-text"><b>Coat Colors:</b> {breed.overview.coat_colors.join(', ')}</p>

          </Card.Body>
        </Accordion.Collapse>
      </Card>
      
      <Card>
        <Card.Header>
          <CustomToggle eventKey="1">Temperament and Personality</CustomToggle>
        </Card.Header>
        <Accordion.Collapse eventKey="1">
          <Card.Body>
          <p className="modal-text">{breed.temperament_and_personality.description}</p>
          <p className="modal-text"><b>Traits:</b> {breed.temperament_and_personality.traits.join(', ')}</p>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
      <Card>
        <Card.Header>
          <CustomToggle eventKey="2">Feeding Recommendations</CustomToggle>
        </Card.Header>
        <Accordion.Collapse eventKey="2">
          <Card.Body>
          <p className="modal-text">{breed.feeding_recommendations.description}</p>
          <p className="modal-text"><b>Diet:</b> {breed.feeding_recommendations.diet}</p>
          <p className="modal-text"><b>Special Consideration:</b> {breed.feeding_recommendations.special_consideration}</p>

          </Card.Body>
        </Accordion.Collapse>
      </Card>
      <Card>
        <Card.Header>
          <CustomToggle eventKey="3">Additional Information</CustomToggle>
        </Card.Header>
        <Accordion.Collapse eventKey="3">
          <Card.Body>
          <p className="modal-text">{breed.additional_information}</p>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
      
     
    </Accordion>
      </Modal.Body>
      
    </Modal>
              
    </div>
  );
}
export default BreedPage;