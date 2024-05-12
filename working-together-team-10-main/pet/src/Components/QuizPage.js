import React, { useState } from 'react';
import './QuizPage.css'; 
import Header from './TopHeader/Header';
import { Button, Form } from 'react-bootstrap';
import '@fortawesome/fontawesome-free/css/all.css';
import { BrowserRouter as Router, Routes, Route, Link ,useNavigate} from 'react-router-dom';

const QuizPage = (props) => {
  const [answers, setAnswers] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const {page,changePage,product ,cartItems,addItemToCart,setProduct,showCart,setShowCart}=props;
  const [Items, addItemToAnswer] = useState([]);
  const [quizStarted, setQuizStarted] = useState(false);
  const startQuiz = () => {
    setQuizStarted(true);
  };
  const navigate=useNavigate();

  const retakeQuiz = () => {
    setAnswers([]);
    setQuestionIndex(0);
    setSelectedOption(null);
    setQuizStarted(false);
  };
  const questions =[
    {
      "id": 1,
      "type": "Activity Level",
      "question": "How active is your dog?",
      "options": [
        { "id": "A", "text": "High Energy: Loves long walks, runs, and playing fetch.", "verdict": "High Energy" },
        { "id": "B", "text": "Moderate: Enjoys shorter walks, playtime with toys, and occasional outdoor adventures.", "verdict": "Moderate Energy" },
        { "id": "C", "text": "Low Energy: Prefers short walks, sniffing explorations, and quiet playtime.", "verdict": "Low Energy" }
      ]
    },
    {
      "id": 2,
      "type": "Coat Care",
      "question": "Does your dog require regular brushing due to their coat type?",
      "options": [
        { "id": "A", "text": "Yes: They have a long or double coat, needing frequent brushing.", "verdict": "Needs Regular Brushing" },
        { "id": "B", "text": "No: Their coat requires minimal brushing and is considered low-maintenance.", "verdict": "Low-Maintenance Coat" }
      ]
    },
    {
      "id": 3,
      "type": "Shedding",
      "question": "Does your dog shed heavily throughout the year?",
      "options": [
        { "id": "A", "text": "Yes", "verdict": "Heavy Shedder" },
        { "id": "B", "text": "No", "verdict": "Moderate to Minimal Shedding" }
      ]
    },
    {
      "id": 4,
      "type": "Outdoor Adventures",
      "question": "Does your dog enjoy occasional outdoor adventures?",
      "options": [
        { "id": "A", "text": "Yes: Short walks or park visits.", "verdict": "Outdoor Adventurer" },
        { "id": "B", "text": "No: Prefers cozy indoor activities like snuggling on the couch.", "verdict": "Indoor Companion" }
      ]
    },
    {
      "id": 5,
      "type": "Breathing Difficulties",
      "question": "Does your dog have short legs or breathing difficulties?",
      "options": [
        { "id": "A", "text": "Yes", "verdict": "Having Breathing Difficulties" },
        { "id": "B", "text": "No", "verdict": "No Breathing Difficulties" }
      ]
    },
    {
      "id": 6,
      "type": "Personality",
      "question": "Does your dog have a calm and relaxed personality?",
      "options": [
        { "id": "A", "text": "Yes", "verdict": "Calm and Relaxed" },
        { "id": "B", "text": "No", "verdict": "Energetic and Active" }
      ]
    }
  ];

  const handleAnswer = (questionId, answer) => {
    if(answer !== null){
      setAnswers([...answers, [questions[questionIndex].type , answer]]);
    }
    setSelectedOption(null); 
    setQuestionIndex(questionIndex + 1);
  };

  const renderOptions = (options) => {
    return options.map(option => (
      <Form.Check
        key={option.id}
        type="radio"

        id={option.id}
        label={option.text}
        name={`question${questionIndex}`}
        value={option.id}
        checked={selectedOption === option.verdict}
        onChange={() => setSelectedOption(option.verdict)}
        className={selectedOption === option.verdict ? 'selected-option formCheck' : 'formCheckSelected'}
      />
    ));
  };

  const renderQuestion = () => {
    const currentQuestion = questions[questionIndex];
    return (
      <>
        <h3>{currentQuestion.question}</h3>
        <Form>
          {renderOptions(currentQuestion.options)}
        </Form>
        <div className='buttons'>
          <Button variant="secondary" style={{marginRight:"20px"}} onClick={() => handleAnswer(questionIndex, null)}>Skip</Button>
          <Button variant="secondary" onClick={() => handleAnswer(questionIndex, selectedOption)}>Next  <i className="fa-solid fa-chevron-right" ></i></Button>
        </div>
      </>
    );
  };

  const renderResult = () => {
    let activityLevel = '';
    let coatCare = '';
    let shedding = '';
    let outdoorAdventures = '';
    let breathingDifficulties = '';
    let personality = '';
  
    answers.forEach(([type, answer]) => {
      switch (type) {
        case 'Activity Level':
          activityLevel = answer;
          break;
        case 'Coat Care':
          coatCare = answer;
          break;
        case 'Shedding':
          shedding = answer;
          break;
        case 'Outdoor Adventures':
          outdoorAdventures = answer;
          break;
        case 'Breathing Difficulties':
          breathingDifficulties = answer;
          break;
        case 'Personality':
          personality = answer;
          break;
        default:
          break;
      }
    });
  
    if (activityLevel === 'High Energy' && shedding === 'Heavy Shedder') {
      return (
        <div>
          <h3>The Energizer</h3>
          <p>Ideal for high-energy dogs with heavy shedding.</p>
          <ul>
            <li>Toys: Durable fetch toys, chew toys, frisbee, and a shedding brush.</li>
            <li>Food & Treats: High-energy kibble, a portion of wet food for hydration, long-lasting chews, and a collapsible food and water bowl.</li>
            <li>Emergency Medical Kit: Basic first-aid supplies like antiseptic wipes, gauze pads, tick remover, and a thermometer.</li>
            <li>Important: Waste disposal bags and a leash.</li>
          </ul>
        </div>
      );
    } else if (activityLevel === 'Moderate Energy' && shedding === 'Moderate to Minimal Shedding') {
      return (
        <div>
          <h3>The Zoomie</h3>
          <p>Perfect for playful pups who shed moderately.</p>
          <ul>
            <li>Toys: Interactive puzzles, tug toys, bouncy ball, and a collapsible water dispenser with clip.</li>
            <li>Food & Treats: Moderate-energy kibble, a collapsible water bowl, healthy training treats, and a travel food container.</li>
            <li>Emergency Medical Kit: Basic first-aid supplies like antiseptic wipes, gauze pads, and tick remover.</li>
            <li>Important: Waste disposal bags and a leash.</li>
          </ul>
        </div>
      );
    } else if (outdoorAdventures === 'Outdoor Adventurer') {
      return (
        <div>
          <h3>The Cozy Companion</h3>
          <p>Great for dogs who enjoy occasional outdoor adventures.</p>
          <ul>
            <li>Toys: Plush squeaky toys, collapsible water bowl, travel food bowl, and a collapsible waste bag dispenser.</li>
            <li>Food & Treats: Travel-sized portions of dry and wet food, waste disposal bags, and a travel water bottle.</li>
            <li>Emergency Medical Kit: Basic first-aid supplies like antiseptic wipes, gauze pads, and tick remover.</li>
            <li>Important: A leash and a small first-aid kit for minor cuts or scrapes.</li>
          </ul>
        </div>
      );
    } else if (personality === 'Calm and Relaxed') {
      return (
        <div>
          <h3>The Cuddler</h3>
          <p>Ideal for snuggle buddies who prefer indoor activities.</p>
          <ul>
            <li>Toys: Soft plush toys, snuffle mat for mental stimulation, calming chew toy, and a nightlight.</li>
            <li>Food & Treats: Cozy bed, slow feeder bowl to prevent overeating, calming treats, and a water dispenser.</li>
            <li>Emergency Medical Kit: Basic first-aid supplies like antiseptic wipes, gauze pads, and tick remover.</li>
            <li>Important: A comfortable blanket and a food storage container.</li>
          </ul>
        </div>
      );
    } else if (breathingDifficulties === 'Having Breathing Difficulties' && coatCare === 'Yes') {
      return (
        <div>
          <h3>The Gentle Stroller</h3>
          <p>Best for dogs with short legs, breathing difficulties, or requiring special care.</p>
          <ul>
            <li>Toys: Lightweight plush toys, portable cooling bandana, food and water dispenser, and a ramp for easy access.</li>
            <li>Food & Treats: Small, easily digestible kibble, collapsible water bowl, medication dispenser (if needed), and a cooling mat.</li>
            <li>Important: A harness (recommended for dogs with breathing difficulties) and a comprehensive first-aid kit with specific items recommended by your veterinarian.</li>
          </ul>
        </div>
      );
    } else {
      return (
        <div>
          <h3>The Snuggle Bug</h3>
          <p>Perfect for calm and relaxed dogs who enjoy quiet companionship.</p>
          <ul>
            <li>Toys: Soft, self-warming bed, a selection of calming aromatherapy sprays, and quiet, interactive puzzle toys.</li>
            <li>Food & Treats: Calming kibble formula, a slow feeder bowl, and anxiety-reducing treats.</li>
            <li>Emergency Medical Kit: Basic first-aid supplies like antiseptic wipes, gauze pads, and tick remover.</li>
            <li>Important: A calming pheromone diffuser and a comfortable travel crate for added security.</li>
          </ul>
        </div>
      );
    }
  };
  
  const handleRoute = () => {
    navigate('/ProductList');
  };
  return (
    <div>
      <Header cartItems={cartItems} addItemToCart={addItemToCart} product={product} setProduct={setProduct} setShowCart={setShowCart} showCart={showCart}/>

      <div className="background-image">
        <div className="auth-wrapper">
          <div className="auth-inner" style={{marginLeft:"-10%"}}>
            {!quizStarted && (
              <div className="start-quiz">
                <h2>Welcome to the Quiz</h2>
                <p>Let's find the perfect bag for your furry friend!</p>
                <Button variant="primary" onClick={startQuiz}>Start Quiz</Button>
              </div>
            )}

            {quizStarted ?(questionIndex < questions.length ? renderQuestion() : renderResult()):null}

            {questionIndex >= questions.length && (
              <div className="quiz-finished">
                <Button variant="secondary" onClick={handleRoute} style={{margin:"10px"}}>Suggested Products</Button>

                <Button variant="primary" onClick={retakeQuiz} style={{margin:"10px"}}>Retake Quiz</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
