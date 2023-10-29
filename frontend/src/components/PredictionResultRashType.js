import React from "react";
import { useLocation } from "react-router-dom";
import { Link } from 'react-router-dom';
import './styles/UploadForm.css'

function PredictionResultRashType() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const result = searchParams.get("result");
  const imageUrl = searchParams.get("image");

  return (
    <div className="Bg-SRTPred">
      <h2 className="Topic">Prediction Result</h2>

      <Link to="/upload"><button type="button" class="btn btn-primary" 
        style={{marginRight:'1200px', backgroundColor:'#3895d3', color:'white', border:'white', width:'100px', height:'30px', fontSize:'15px'}} >
        <i class="far fa-arrow-alt-circle-left"></i>&nbsp;Go Back</button>
      </Link>
      
      <center>  <p className="Pred-result2">Your Skin Rash Type: {result}</p> </center>

      {/* Display the uploaded image if available */}
      {imageUrl && (
        <div>
          <h2>Uploaded Image</h2>
          <img src={imageUrl} alt="Uploaded" />
        </div>
      )}
      <br></br><br></br><br></br>
    </div>
  );
}

export default PredictionResultRashType;
