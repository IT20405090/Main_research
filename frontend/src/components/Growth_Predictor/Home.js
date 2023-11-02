import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const sideNavStyle = {
    backgroundColor: "#b3e5fc",
    color: "#191970",
    // textShadow: '1px 1px 1px black',
    fontWeight: "bold",
    padding: "10px",
    width: "250px",
    minHeight: "100vh", // Set sidebar height to fill the viewport
    display: "flex",
    flexDirection: "column",
  };

  const linkStyle = {
    textDecoration: "none",
    color: "white",
    margin: "5px 0",
    padding: "5px 15px",
    fontSize: "20px",
  };

  const blockStyle = {
    marginBottom: "12px",
    backgroundColor: "#4682b4", // Background color for blocks
    borderRadius: "5px",
    minHeight: "28px",
  };

  const sectionStyle = {
    padding: "20px",
    background: `url(/images/back4.webp) no-repeat center center fixed`, // Use the path to your background image
    backgroundSize: "cover",
    color: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center", // Center the content vertically
  };

  const speechBubbleStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: "10px",
    display: "inline-block",
    fontSize: "18px",
  };

  const nurseImageStyle = {
    width: "100px",
    height: "100px",
    marginRight: "15px", // Added margin to separate image from text
  };
  const topicStyle123 = {
    fontSize: "80px",
    fontWeight: "bold",
    textShadow: "2px 2px 0px #0a0a0a",
    height:"170px"
  };


  const buttonStyle = {
    textDecoration: "none",
    color: "black", // Change font color to black
    backgroundColor: "white",
    padding: "12px 0",
    display: "block",
    width: "96%",
    fontSize: "16px",
    margin: "5px 0",
    cursor: "pointer",
    textAlign: "center",
    border: "none",
    position: "relative",
    height: "140px",
    overflow: "hidden",
    marginLeft: "10px",
    marginTop: "100px",
  };

  const buttonStyle2 = {
    textDecoration: "none",
    color: "black", // Change font color to black
    backgroundColor: "white",
    padding: "12px 0",
    display: "block",
    width: "96%",
    fontSize: "16px",
    margin: "5px 0",
    cursor: "pointer",
    textAlign: "center",
    border: "none",
    position: "relative",
    height: "130px",
    overflow: "hidden",
    marginLeft: "10px",
    marginBottom: "25px",
  };
  

  const imgStyle = {
    width: "30%", // Adjust the width as needed
    height: "auto", // Maintain aspect ratio
    objectFit: "cover",
  };

  return (
    <div>
      <div style={sectionStyle}>
        <center>
          <h1 style={topicStyle123}>The Development Milestones Of A Child</h1>
        </center>
        {/* <img src="/images/playingtoy.webp" alt="Child" width="280" height="200" />
          <img src="/images/baby.webp" alt="Child" width="280" height="200" />
          <img src="/images/babies.jpg" alt="Child" width="280" height="200" /> */}
      </div>
      <div style={{ display: "flex" }}>
        <div style={sideNavStyle}>
          <h2>
            Appropriate Activities For Each Age To Measure Development
            Milestones
          </h2>
          <Link to="/2months" style={{ ...linkStyle, ...blockStyle }}>
            <center> 2 Months</center>
          </Link>
          <Link to="/4months" style={{ ...linkStyle, ...blockStyle }}>
            <center>4 Months</center>
          </Link>
          <Link to="/6months" style={{ ...linkStyle, ...blockStyle }}>
            <center>6 Months</center>
          </Link>
          <Link to="/9months" style={{ ...linkStyle, ...blockStyle }}>
            <center>9 Months</center>
          </Link>
          <Link to="/12months" style={{ ...linkStyle, ...blockStyle }}>
            <center>12 Months</center>
          </Link>
          <Link to="/15months" style={{ ...linkStyle, ...blockStyle }}>
            <center>15 Months</center>
          </Link>
          <Link to="/18months" style={{ ...linkStyle, ...blockStyle }}>
            <center>18 Months</center>
          </Link>
          <Link to="/2years" style={{ ...linkStyle, ...blockStyle }}>
            <center> 2 Years</center>
          </Link>
          <Link to="/30months" style={{ ...linkStyle, ...blockStyle }}>
            <center>30 Months</center>
          </Link>
          <Link to="/3years" style={{ ...linkStyle, ...blockStyle }}>
            <center>3 Years</center>
          </Link>
          <Link to="/4years" style={{ ...linkStyle, ...blockStyle }}>
            <center>4 Years</center>
          </Link>
          <Link to="/5years" style={{ ...linkStyle, ...blockStyle }}>
            <center> 5 Years</center>
          </Link>
        </div>
        <div style={{ flex: 2 }}>
          <div style={speechBubbleStyle}>
            <div style={{ display: "flex" }}>
              <img
                src="/images/nurse.jfif"
                alt="Nurse"
                style={nurseImageStyle}
              />
              <p
                style={{
                  color: "black",
                  fontSize: "18px",
                  padding: "10px", // Add padding for better readability
                  lineHeight: "1.4", // Increase line height for better spacing
                }}
            
              >
                Child development is an ever-changing and continuous procedure
                that develops from infancy to adulthood. It includes the
                physical, cognitive, spoken, and social-emotional development
                and alterations that children encounter as they acquire older in
                age.
              </p>
            </div>
            {/* <ul
  style={{
    color: "black",
    fontSize: "18px",
    padding: 0,
    listStyleType: "disc", // Set the list style to "disc" for bullet points
    marginLeft: "20px", // Adjust the left margin for the bullet points
  }}
>
  <li>Physical Development - Gross motor and Fine motor skills</li>
  <li>Cognitive Development - Ability to think, reason, and solve problems</li>
  <li>Language Development - Communicate using words and gestures, understand language and expressions</li>
  <li>Social and Emotional Development - Express emotions, interactions, and attachments</li>
</ul> */}
</div>
<div style={{ backgroundColor: "#81d4fa" }}>
  <br/><br/>
          <section class="steps123" id="steps">
            <div class="box-container" >
              <div class="box">
                <h3>What is a "Growth Level Predictor"?</h3>
                <ul className="list-item">

                  <p>
                    <li>The Growth Level Predictor is a tool that evaluates a child's growth and development by analyzing factors such as height, weight, and developmental milestones, providing valuable insights to parents for informed decision-making.</li>
                  
                    </p>
                </ul>
                <br/>
                <button style={{ ...buttonStyle }}>
                  <Link to="/predict">
                    <img
                      src="images/growth.jfif" // Make sure the image path is correct
                      alt=""
                      style={imgStyle} // Apply the image size styles
                    />
                    &nbsp;&nbsp;&nbsp;&nbsp;<b>Click Here To Predict The Growth Level</b>
                  </Link>
                </button>
              </div>
              <div class="box-container">
              <div class="box">
                <h3>What are the Advantages for Parents?</h3>
                <ul className="list-item">
                <p>
                <li>
                Growth Level Predictor assesses height, weight, and key developmental milestones.
                    </li>
                    <li>
                    We consider four major developmental milestones for a comprehensive assessment of your child's development.
                    </li>
                    <li>
                    Parents are advised to consult medical professionals for their child's well-being.
                    </li>
                    <li>
                    Our system aids busy parents in ensuring their child's health and safety without frequent checkups.
                    </li>
                    </p>
                    </ul>
                   
                {/* <button style={{ ...buttonStyle2}}>
              <Link to="/graph" style={linkStyle}>
                <b>View Growth History</b>
              </Link>
            </button> */}
             <button style={{ ...buttonStyle2 }}>
                  <Link to="/graph">
                    <img
                      src="images/graph.webp" // Make sure the image path is correct
                      alt=""
                      style={imgStyle} // Apply the image size styles
                    />
                    &nbsp;&nbsp;&nbsp;&nbsp;<b>Click Here To View Growth Graphs</b>
                  </Link>
                </button>
                
                {/* <img src="images/emotional.webp" alt=""/> */}
              </div>
            </div>
            </div>
          </section>
     <br/> <br/> <br/><br/> <br/> <br/><br/> <br/>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Home;
