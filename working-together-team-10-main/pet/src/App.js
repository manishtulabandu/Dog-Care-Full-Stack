import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Components/TopHeader/Header';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './Components/Home';
import React, { useState } from 'react';
import ProductDetails from './Components/ProductDetails';
import BreedPage from './Components/BreedPage';
import img from './images/p1.webp';
import img2 from './images/blog-images/JSON1.jpeg';
import Login from './Components/Login'
import BlogPage from './Components/BlogPage';
import BlogDetails from './Components/BlogDetails';
import Contact from './Components/Contact';
import ProductList from './Components/ProductList';
import Products from './Components/Products';
import Pawsonality from './Components/Pawsonality/Pawsonality';
import SignUp from './Components/SignUp';
import QuizPage from './Components/QuizPage';
import AdminPage from './Components/AdminPage';
import PaymentPage from './Components/PaymentPage';
import ImageClassification from './Components/ImageClassification';
import Wikipedia from './Components/Wikipedia';
import WikipediaSearchEngine from './Components/Wikipedia';
import Memorials from './Components/Memorials';
import InventoryManagement from "./Components/InventoryManagment";
import Inventory from "./Components/Inventory";
import UserDetails from "./Components/UserDetails";
import Results from "./Components/Results";
import Detection from "./Components/Detection";



function App() {
  const [page,changePage]=useState("home");
  const [User,changeUser]=useState("");
  const [productCat,setProductCat]=useState("");
  const [blog,setBlog]=useState({
    "image":img2,
    "title":"GROOMING HEALTH-TIPS AND TRICKS",
    "description":"6 Tips to Keep Your French Bulldogs Smelling Fresh",
    "introduction":"Are you looking for ways to maintain your French Bulldog's pleasant scent? Look no further! Our guide offers a variety of Effective Bathing Methods that will leave your four-legged companion smelling wonderful. You'll learn how to select the ideal shampoo and conditioner, as well as achieve optimal water temperature during bath time - all guaranteed to make an impact. Discover more about maintaining your furry friend's odor by continuing to read on below.",
    "headingsAndParas":{
      "Regular Grooming" :["Keeping your French Bulldog smelling fresh begins with Regular Grooming. This practice not only ensures your furry companion looks their best but also plays a significant role in managing their aroma.",
        "Start by brushing your Frenchie's coat regularly to remove loose hair and dirt. This simple step not only keeps their fur clean but also reduces shedding, which can contribute to odors around your home.",
        "Pay special attention to their facial wrinkles. These adorable folds can trap moisture and debris, creating the perfect breeding ground for unpleasant smells. Gently clean these areas to prevent any build-up.",
        "Trimming your Frenchie's nails is another essential grooming task. Overgrown nails can collect dirt and odors from their paws, so keeping them well-maintained can help manage any unpleasant scents.",
        "Additionally, don't forget to keep your French Bulldog's ears clean. Ear-related odors can develop if wax and debris accumulate. Use gentle cleaning solutions and seek advice from your veterinarian if you notice any unusual ear odor or discharge.",
        "For added convenience, consider using Paw.com's pet wipes and beauty kit. These specially designed products can make your grooming routine more efficient, leaving your Frenchie smelling fresh and looking fabulous."],

      "A Balanced Diet":["What your French Bulldog eats has a direct impact on their overall aroma. A Balanced Diet is crucial for ensuring they smell pleasant and stay healthy.","Begin by selecting high-quality dog food with the right ingredients. Look for options that include real meat as the primary source of protein and avoid the ones with   fillers or artificial additives.",
        "Proper hydration is equally important. Ensure your Frenchie has access to clean water at all times. Dehydration can lead to concentrated urine, which can be a source of strong odors.",
        "Resist the temptation to overfeed your Frenchie or offer excessive treats. Obesity and indigestion can contribute to unpleasant body odors. Stick to recommended portion sizes and opt for healthy treat alternatives.",
        "Monitor your French Bulldog for food allergies or sensitivities. Allergic reactions can manifest as skin issues or gastrointestinal problems, both of which can lead to unwanted odors. Consult your vet if you suspect food-related issues.",
        "Remember, a well-balanced diet not only promotes good health but also contributes to a pleasant, fresh scent for your French Bulldog."],

      "Dental Care":["Maintaining proper oral hygiene for your French Bulldog is a key element in aroma management. Dental Care plays a significant role in keeping your Frenchie's breath and overall scent pleasant.",
        "Start by brushing your Frenchie's teeth regularly. This simple yet effective practice helps prevent the build-up of plaque and tartar, which can lead to bad breath and oral odor.",
        "Incorporate dental chews or toys into your Frenchie's routine. These can help reduce plaque and tartar build-up while keeping them mentally stimulated.",
        "Regular visits to the vet for professional dental cleanings are essential. Your vet can perform a thorough examination of your Frenchie's oral health and address any dental issues promptly.",
        "Fresh breath is not only a sign of good dental health but also contributes to a fresher overall scent for your furry friend.",
        "Consider using dental care products to maintain your Frenchie's oral health. These specially designed products can complement your dental care routine and contribute to a more pleasant aroma management strategy."],

      "Clean Environment":["Maintaining a Clean Environment is crucial in your quest to keep your French Bulldog smelling fresh. This aspect encompasses not only your Frenchie's belongings but also your home environment.",
        "Start by washing your Frenchie's bedding and toys frequently. Over time, these items can accumulate odors, and regular cleaning helps prevent them from becoming a source of unwanted smells.",
        "To tackle the issue at its source, vacuum and mop your home regularly. Pet hair, dander, and debris can accumulate on your floors and furniture, leading to lingering odors. A clean living space goes a long way in aroma management.",
        "Should accidents happen, eliminate urine or feces promptly. Prompt cleanup not only maintains a fresh environment but also discourages repeat incidents.",
        "Consider using pet-friendly air purifiers if needed. These devices help remove airborne allergens and odors, creating a cleaner and more pleasant atmosphere for both you and your Frenchie Remember, a clean environment is an effective way to reduce lingering odors and contribute to a fresher living space for you and your French Bulldog."],

      "Regular Vet Check-Ups":["Regular veterinary check-ups are a cornerstone of Aroma Management for your French Bulldog. These visits are essential not only for their overall health but also for addressing potential odor-related issues",
        "Schedule routine vet visits for comprehensive health assessments. Your veterinarian can detect underlying health problems that may contribute to unpleasant odors.",
        "Address any identified health issues promptly. Skin conditions, allergies, or infections can be a source of persistent odors. Your vet can provide guidance on appropriate treatments and management strategies.",
        "Seek professional advice if you notice persistent odors despite following other aroma management techniques. Your vet can investigate and offer tailored solutions.",
        "Keeping your Frenchie's vaccinations and preventatives up to date is equally crucial. Preventing diseases and parasites not only ensures their well-being but also helps maintain a healthier, odor-free pet.",
        "A healthy French Bulldog is less likely to have odor problems, so prioritize regular vet check-ups to keep them in top shape."],

      "Natural Remedies":["Exploring Natural Remedies is an eco-friendly and effective approach to aroma management for your French Bulldog. These solutions can complement your efforts to keep your furry friend smelling fresh.",
        "Consider natural odor-neutralizing options such as activated charcoal or bamboo charcoal bags. These natural absorbents can help eliminate unwanted scents in your home.",
        "Use pet-safe air fresheners or diffusers that emit natural fragrances like lavender or eucalyptus. These aromas can create a pleasant environment without the use of harsh chemicals.",
        "Aromatherapy is another intriguing option. Essential oils like lavender or chamomile, when used cautiously and in moderation, can help maintain a soothing and pleasant atmosphere.",
        "Baking soda is a well-known natural deodorizer. Sprinkle it on carpets, furniture, or other odor-prone areas, let it sit, and then vacuum it up to neutralize smells effectively.",
        "For the best results, consider combining these natural solutions with Paw.com's quality products. Their expertise in pet care can help you achieve a harmonious and aromatic living space for both you and your French Bulldog."],

      "Final Thoughts":["In your journey to maintain a delightful aroma for your beloved French Bulldog, you've explored an array of effective strategies. These tips, ranging from proper grooming to natural remedies, offer a holistic approach to Aroma Management that ensures a fresh and pleasant environment for both you and your furry companion.",
        "Remember, consistency is key. Regular grooming, a balanced diet, dental care, and a clean living space all contribute to a harmonious atmosphere. Seeking professional veterinary care and exploring natural remedies further enhance your efforts.",
        "As you implement these strategies, consider the advantages of Paw.com's quality pet care products. Their specially designed shampoo, conditioner, pet wipes, and beauty kit can elevate your aroma management routine, providing convenience and effectiveness.",
        "So, in conclusion, take these valuable insights and make them a part of your daily routine. By doing so, you'll not only ensure that your French Bulldog smells fresh and delightful but also enjoy the rewards of a stronger bond with your cherished companion. Here's to an odor-free and joyful journey with your Frenchie!"]
    }})
  const [showCart,setShowCart]=useState(false);
  const [product,setProduct]=useState({});
  const [cartItems,addItemToCart]=useState([]);
  const [breed,setBreed]=useState({
        "breed": "Golden Retriever",
        "overview": {
          "description": "Friendly and Gentle. Known for their friendly and gentle nature, making them wonderful family companions.",
          "size": "Medium-to-Large",
          "height_range": "21.5 to 24 inches at the shoulder",
          "weight_range": "55 to 75 pounds",
          "coat_colors": ["golden"]
        },
        "temperament_and_personality": {
          "traits": ["Social and Affectionate", "Intelligent and Trainable"],
          "description": "Highly social dogs that thrive on human companionship. With high intelligence, they're easily trainable, making them excellent family pets and therapy dogs."
        },
        "feeding_recommendations": {
          "diet": "Balanced Nutrition",
          "special_consideration": "Coat Health",
          "description": "Provide a diet with balanced nutrition to support their overall health, including coat health. Foods rich in omega-3 fatty acids contribute to a healthy, shiny coat."
        },
        "nutritional_essentials": {
          "protein": "18-25%",
          "fats": "8-15%, with omega-3 and omega-6",
          "carbohydrates": "30-70% from whole grains and vegetables",
          "vitamins_and_minerals": ["A", "D", "E", "B-complex", "balanced minerals"],
          "antioxidants": "From fruits and vegetables",
          "coat_health": "Omega-3 fatty acids for a healthy coat",
          "avoid": "Artificial additives",
          "hydration": "Provide fresh water always"
        },
        "portion_guidelines": {
          "puppies": "Feed 3-4 times a day to support their growth",
          "adults": "Feed twice a day, adjusting portions based on weight and activity level",
          "seniors": "Consider a diet tailored to their changing nutritional needs"
        },
        "additional_information": "Golden Retrievers are known for their friendly and gentle temperament, and they require regular exercise to stay healthy and happy. Consult your vet for personalized advice based on your Golden Retriever's specific needs."
      }
  );

  return (
      <>
        <Router>
          <Routes>
            <Route path="/" element={<Home product={product} setProduct={setProduct} cartItems={cartItems} addItemToCart={addItemToCart} setShowCart={setShowCart} showCart={showCart}/>}></Route>
            <Route path="/home" element={<Home User={User} product={product} setProduct={setProduct} cartItems={cartItems} addItemToCart={addItemToCart} setShowCart={setShowCart} showCart={showCart}/>}></Route>
            <Route path="/Product" element={<ProductDetails User={User} product={product} cartItems={cartItems} addItemToCart={addItemToCart} setProduct={setProduct} setShowCart={setShowCart} showCart={showCart} />}></Route>
            <Route path="/Breeds" element={<BreedPage setProductCat={setProductCat} User={User} breed={breed} setBreed={setBreed} cartItems={cartItems} addItemToCart={addItemToCart}/>} setShowCart={setShowCart} showCart={showCart}></Route>
            <Route path="/BlogPage" element={<BlogPage User={User} product={product} setProduct={setProduct} cartItems={cartItems} addItemToCart={addItemToCart} setShowCart={setShowCart} showCart={showCart} setBlog={setBlog}/>}></Route>
            <Route path="/Blog" element={<BlogDetails User={User} product={product} setProduct={setProduct} cartItems={cartItems} addItemToCart={addItemToCart} setShowCart={setShowCart} showCart={showCart} blog={blog} setBlog={setBlog}/>}></Route>
            <Route path="/ContactUs" element={<Contact User={User} product={product} setProduct={setProduct} cartItems={cartItems} addItemToCart={addItemToCart} setShowCart={setShowCart} showCart={showCart}/>}></Route>
            <Route path="/ProductList" element={<Products productCat={productCat} User={User} product={product} cartItems={cartItems} addItemToCart={addItemToCart} setProduct={setProduct} setShowCart={setShowCart} showCart={showCart} />}></Route>
            <Route path="/sign-in" element={<Login User={User} changeUser={changeUser} page={page} changePage={changePage} product={product} setProduct={setProduct} cartItems={cartItems} addItemToCart={addItemToCart} setShowCart={setShowCart} showCart={showCart}/>} />
            <Route path="/sign-up" element={<SignUp User={User} page={page} changePage={changePage} product={product} setProduct={setProduct} cartItems={cartItems} addItemToCart={addItemToCart} setShowCart={setShowCart} showCart={showCart}/>} />
            <Route path="/Pawsonality" element={<QuizPage User={User} page={page} changePage={changePage} product={product} setProduct={setProduct} cartItems={cartItems} addItemToCart={addItemToCart} setShowCart={setShowCart} showCart={showCart}/>} />
            <Route path="/admin" element={<AdminPage/>}/>
            <Route path="/payment" element={<PaymentPage User={User} page={page}  changePage={changePage} product={product}  setShowCart={setShowCart} showCart={showCart} cartItems={cartItems} addItemToCart={addItemToCart}/>} />
            <Route path="/ImageClassification" element={<ImageClassification/>}/>
            <Route path="/Wikipedia" element={<WikipediaSearchEngine/>}/>
            <Route path="/memorials" element={<Memorials />} />
            <Route path ="/im" element={<InventoryManagement />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/UserDetails" element={<UserDetails />} />
            <Route path="/image" element={<Results/>} />
            <Route path="/detection" element={<Detection />}/>




          </Routes>


        </Router>
      </>
  );
}

export default App;