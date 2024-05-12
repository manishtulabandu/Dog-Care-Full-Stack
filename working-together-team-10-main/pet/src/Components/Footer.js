import React, { useState, useRef } from 'react';

import FAQ from '../FAQ';



const Footer = () => {
  const [showFAQ, setShowFAQ] = useState(false);

  const handleFAQClick = () => {
      if (c == "c1") {
          setShowFAQ(!showFAQ);
          sc("c2");
      }
      else {
          div2.current.scrollIntoView({ behaviour: "smooth" });
          sc("c1");
      }
  };

    const div2 = useRef(null);
    const [c, sc] = useState("c1");
  return (
    <>
      <footer style={{backgroundColor: "#333",
  color: "#fff",
  padding: "10px",flex:1,textAlign:"center"}} >
       
   <href onClick={handleFAQClick} style={{cursor: "pointer"}}> <b> PAWSONALITY</b> we provide platform for dog care suggestions and products ,you can find out blog content breed content w.r.t your dogs pawsonality<br></br>(Double click here for more FAQ's)</href>
          </footer>
          <div ref={div2}>{showFAQ && <FAQ />}</div>
    </>
  );
};

export default Footer;
