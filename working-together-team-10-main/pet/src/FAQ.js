import React, { useState } from 'react';

const FAQ = () => {
    const [showAnswers, setShowAnswers] = useState({});

    const toggleAnswer = (index) => {
        setShowAnswers(prevState => ({
            ...prevState,
            [index]: !prevState[index]
        }));
    };

    return (
        <div style={{  padding: "20px", textAlign: "left", backgroundColor:"grey" }}>
            <div style={{ maxWidth: "800px", margin: "0 auto" }}>
                <div style={{ marginBottom: "20px" }}>
                    <h3 style={{ fontWeight: "bold", display: "flex", alignItems: "left", justifyContent: "space-between", fontFamily: "new-spirit" }}>
                        <span style={{ flex: "1 1 auto" }}>What are your toys made out of?</span>
                        <button onClick={() => toggleAnswer(0)}style={{ backgroundColor: "grey", border: "none", color: "#000000" }}>{showAnswers[0] ? '-' : '+'}</button>
                    </h3>
                    {showAnswers[0] && (
                        <div>
                            <hr style={{ margin: "5px 0", width: "100%" }} />
                            <p style={{ textAlign: "left", fontFamily: "Cairo, sans-serif", fontSize: "18px", margin: "0 auto" }}>Our Squeaky Chew Ball, Squeaky Chew Stick, Dual Layer Bone and Dual Layer Ring are  made from extra-durable rubber. Our Dri-Tech Rope Knot are made from moisture-wicking shaped fibers. All toys are tested thoroughly to be dog-safe.</p>
                            <hr style={{ margin: "5px 0", width: "100%" }} />
                        </div>
                    )}
                </div>
                <div style={{ marginBottom: "20px" }}>
                    <h3 style={{ fontWeight: "bold", display: "flex", alignItems: "center", justifyContent: "space-between", fontFamily: "new-spirit" }}>
                        <span style={{ flex: "1 1 auto" }}>What toys are recommended for Tyson type dogs, the real tough time chewers?</span>
                        <button onClick={() => toggleAnswer(1)}style={{ backgroundColor: "grey", border: "none", color: "#000000" }}>{showAnswers[1] ? '-' : '+'}</button>
                    </h3>
                    {showAnswers[1] && (
                        <div>
                            <hr style={{ margin: "5px 0", width: "100%" }} />
                            <p style={{ textAlign: "left", fontFamily: "Cairo, sans-serif", fontSize: "18px", margin: "0 auto" }}>No toy is totally indestructible, but toys marked Extra Durable can withstand a more aggressive chewer, even the heavyweights.</p>
                            <hr style={{ margin: "5px 0", width: "100%" }} />
                        </div>
                    )}
                </div>
                <div style={{ marginBottom: "20px" }}>
                    <h3 style={{ fontWeight: "bold", display: "flex", alignItems: "center", justifyContent: "space-between", fontFamily: "new-spirit" }}>
                        <span style={{ flex: "1 1 auto" }}>How do I know which products to buy for my dog?</span>
                        <button onClick={() => toggleAnswer(2)}style={{ backgroundColor: "grey", border: "none", color: "#000000" }}>{showAnswers[2] ? '-' : '+'}</button>
                    </h3>
                    {showAnswers[2] && (
                        <div>
                            <hr style={{ margin: "5px 0", width: "100%" }} />
                            <p style={{ textAlign: "left", fontFamily: "Cairo, sans-serif", fontSize: "18px", margin: "0 auto" }}>We recommend toy sizes by your pup’s weight. Please take our Pawsonality quiz to see the recommendations for the toys and food products.</p>
                            <hr style={{ margin: "5px 0", width: "100%" }} />
                        </div>
                    )}
                </div>
                <div style={{ marginBottom: "20px" }}>
                    <h3 style={{ fontWeight: "bold", display: "flex", alignItems: "center", justifyContent: "space-between", fontFamily: "new-spirit" }}>
                        <span style={{ flex: "1 1 auto" }}>Are your toys safe for a range of ages from puppies to millennials to senior dogs?</span>
                        <button onClick={() => toggleAnswer(3)}style={{ backgroundColor: "grey", border: "none", color: "#000000" }}>{showAnswers[3] ? '-' : '+'}</button>
                    </h3>
                    {showAnswers[3] && (
                        <div>
                            <hr style={{ margin: "5px 0", width: "100%" }} />
                            <p style={{ textAlign: "left", fontFamily: "Cairo, sans-serif", fontSize: "18px", margin: "0 auto" }}>Yes! All of our toys are safe and recommend for any aged dog, from the eeniest pups to older dogs that have been around the block once or twice.</p>
                            <hr style={{ margin: "5px 0", width: "100%" }} />
                        </div>
                    )}
                </div>
                <div style={{ marginBottom: "20px" }}>
                    <h3 style={{ fontWeight: "bold", display: "flex", alignItems: "center", justifyContent: "space-between", fontFamily: "new-spirit" }}>
                        <span style={{ flex: "1 1 auto" }}>What are your chew toys made of?</span>
                        <button onClick={() => toggleAnswer(4)}style={{ backgroundColor: "grey", border: "none", color: "#000000" }}>{showAnswers[4] ? '-' : '+'}</button>
                    </h3>
                    {showAnswers[4] && (
                        <div>
                            <hr style={{ margin: "5px 0", width: "100%" }} />
                            <p style={{ textAlign: "left", fontFamily: "Cairo, sans-serif", fontSize: "18px", margin: "0 auto" }}>All of our chew toys are made of natural high quality rubber we are able to find. The products are thoroughly tested with safety standards.</p>
                            <hr style={{ margin: "5px 0", width: "100%" }} />
                        </div>
                    )}
                </div>
                <div style={{ marginBottom: "20px" }}>
                    <h3 style={{ fontWeight: "bold", display: "flex", alignItems: "center", justifyContent: "space-between", fontFamily: "new-spirit" }}>
                        <span style={{ flex: "1 1 auto" }}>More of a statement than of a question, but my dog doesn’t like his/her unleashing pawsonality toy.</span>
                        <button onClick={() => toggleAnswer(5)}style={{ backgroundColor: "grey", border: "none", color: "#000000" }}>{showAnswers[5] ? '-' : '+'}</button>
                    </h3>
                    {showAnswers[5] && (
                        <div>
                            <hr style={{ margin: "5px 0", width: "100%" }} />
                            <p style={{ textAlign: "left", fontFamily: "Cairo, sans-serif", fontSize: "18px", margin: "0 auto" }}>Well this section isn’t for statements, only questions. Just kidding, a few points here. First of all, clearly all dogs don’t like all toys and food products. And some dogs (the incredibly un-fun ones) don’t like any of them. But if your dog likes a certain type of toy there is a high likelihood. If you still have an issue, please reach out to our team by sending a note: pawsonality@gmail.com</p>
                            <hr style={{ margin: "5px 0", width: "100%" }} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FAQ;

