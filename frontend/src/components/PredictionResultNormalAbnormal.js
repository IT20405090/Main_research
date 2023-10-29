import React from "react";
import { useLocation } from "react-router-dom";
import { Link } from 'react-router-dom';
import './styles/UploadForm.css'

function PredictionResultNormalAbnormal() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const result = searchParams.get("result");
  const imageUrl = searchParams.get("image");

  return (
    <div className="Bg-NAPred">
      <div>
        <h2 className="Topic6">Prediction Result for Normal/Abnormal Skin</h2>

        <Link to="/upload"><button type="button" class="btn btn-primary" 
          style={{marginRight:'1200px', backgroundColor:'#e9768f', color:'white', border:'white', width:'100px', height:'30px', fontSize:'15px'}} >
          <i class="far fa-arrow-alt-circle-left"></i>&nbsp;Go Back</button>
        </Link>

        <br></br>
        <center>  <p className="Pred-result">Prediction: {result}</p> </center>

        
       
        {/* Display the uploaded image if available */}
        {imageUrl && (
          <div>
            <br></br><br></br>
            <h2>Uploaded Image</h2>
            <img src={imageUrl} alt="Uploaded" />
          </div>
        )}
      </div>
      <br></br><br></br><br></br><br></br><br></br><br></br><br></br>
    </div>
  );
}

export default PredictionResultNormalAbnormal;
