import React, { useEffect, useState } from "react";
import "./months.css";

function Age4Months() {
  const [data, setData] = useState(null);
  const [scores, setScores] = useState({
    cognitive: 0,
    emotional: 0,
    language: 0,
    physical: 0,
  });

  useEffect(() => {
    // Fetch data for 4 months from the Flask API endpoint
    fetch(`http://localhost:5000/get_milestone?age=4%20months`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const calculateScore = (section) => {
    const selectedCheckboxes = document.querySelectorAll(
      `input[name=${section}]:checked`
    );
    const totalCheckboxes = document.querySelectorAll(`input[name=${section}]`);
    const percentage =
      (selectedCheckboxes.length / totalCheckboxes.length) * 100;

    // Calculate milestone result based on the percentage
    if (percentage >= 80) {
      return "Excellent";
    } else if (percentage > 65) {
      return "Good";
    } else if (percentage >= 40) {
      return "Fair";
    } else {
      return "Poor";
    }
  };

  const updateScores = () => {
    setScores({
      cognitive: calculateScore("cognitive"),
      emotional: calculateScore("emotional"),
      language: calculateScore("language"),
      physical: calculateScore("physical"),
    });
  };

  return (
    <div style={{ display: "flex" }}>
      <div
        style={{
          flex: 3,
          padding: "1em",
          textAlign: "left",
          background: "rgba(173, 216, 230, 0.9)", // Set a white background
          color: "black", // Set text color to black
        }}
      >
        <h1>Development Milestones - 4 Months</h1>
        <br />
        <p className="boxed-paragraph">
          <i>
            This page serves as a valuable tool to provide insights into
            age-appropriate activities for your child and offers a scoring
            system for monitoring their developmental milestones. It's important
            to remember that every child progresses at their own pace, and not
            all children will achieve the same milestones at the same time. This
            is perfectly normal. Open discussions about your child's development
            with your healthcare provider during routine medical check-ups are
            highly recommended, as it allows for a comprehensive understanding
            of your child's progress and offers the best approach to observe
            their activities and growth.
          </i>
        </p>
        <br />
        <h3>
          Please mark the checkboxes corresponding to the activities that your
          baby successfully accomplishes within each developmental milestone to
          calculate the score
        </h3>

        {data ? (
          <div>
            <br />
            <h2>
              <u>Cognitive Milestones</u>
            </h2>
            <div>
              {data.cognitive.split(", ").map((item, index) => (
                <label key={index} className="checkbox-label">
                  <input
                    type="checkbox"
                    name="cognitive"
                    onChange={updateScores}
                  />
                  <span className="checkbox-text">{item}</span>
                </label>
              ))}
              <br />
              <p className="boxed-paragraph">
                <b>Cognitive Development is: {scores.cognitive}</b>
              </p>
            </div>

            <h2>
              <u>Emotional Milestones</u>
            </h2>
            <div>
              {data.emotional.split(", ").map((item, index) => (
                <label key={index} className="checkbox-label">
                  <input
                    type="checkbox"
                    name="emotional"
                    onChange={updateScores}
                  />
                  <span className="checkbox-text">{item}</span>
                  <br />
                </label>
              ))}
              <br />
              <p className="boxed-paragraph">
                <b>Emotional Development is: {scores.emotional}</b>
              </p>
            </div>

            <h2>
              <u>Language Milestones</u>
            </h2>
            <div>
              {data.language.split(", ").map((item, index) => (
                <label key={index} className="checkbox-label">
                  <input
                    type="checkbox"
                    name="language"
                    onChange={updateScores}
                  />
                  <span className="checkbox-text">{item}</span>
                  <br />
                </label>
              ))}
              <br />
              <p className="boxed-paragraph">
                <b>Language Development is: {scores.language}</b>
              </p>
            </div>

            <h2>
              <u>Physical Milestones</u>
            </h2>
            <div>
              {data.physical.split(", ").map((item, index) => (
                <label key={index} className="checkbox-label">
                  <input
                    type="checkbox"
                    name="physical"
                    onChange={updateScores}
                  />
                  <span className="checkbox-text">{item}</span>
                  <br />
                </label>
              ))}
              <br />
              <p className="boxed-paragraph">
                <b>Physical Development is: {scores.physical}</b>
              </p>
            </div>
          </div>
        ) : (
          <p>Loading data...</p>
        )}
      </div>
      <div
        style={{
          flex: 1,
          background: "rgba(173, 216, 230, 0.5)",
          padding: "1em",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img
          src="../images/4m1.jpg"
          alt="Your Baby At Two Months"
          style={{ width: "100%", height: "75%" }}
        />
        <br />
        <img
          src="../images/4m3.jpeg"
          alt="Your Baby At Two Months"
          style={{ width: "100%", height: "auto" }}
        />
        <br />
        <img
          src="../images/4m4.jpg"
          alt="Your Baby At Two Months"
          style={{ width: "100%", height: "auto" }}
        />
      </div>
    </div>
  );
}

export default Age4Months;
