import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { uploadImageNormalAbnormal, uploadImageSkinRashType } from "../../api_skinRash";
import { useNavigate } from "react-router-dom";
import './styles/UploadForm.css'
import baby_boy from './images/baby_boy.jpg'
import baby_girl from './images/baby_girl.jpeg'

function ImageUploadForm() {
  const [selectedFileNormalAbnormal, setSelectedFileNormalAbnormal] = useState(null);
  const [selectedFileSkinRashType, setSelectedFileSkinRashType] = useState(null);
  const navigate = useNavigate();

  const handleFileChangeNormalAbnormal = (e) => {
    setSelectedFileNormalAbnormal(e.target.files[0]);
  };

  const handleFileChangeSkinRashType = (e) => {
    setSelectedFileSkinRashType(e.target.files[0]);
  };

  const handleUploadNormalAbnormal = async () => {
    if (selectedFileNormalAbnormal) {
      const formData = new FormData();
      formData.append("file", selectedFileNormalAbnormal);

      try {
        const response = await uploadImageNormalAbnormal(formData);
        console.log(response);

        // Generate a URL for the uploaded image
        const imageUrl = URL.createObjectURL(selectedFileNormalAbnormal);

        // Redirect to the appropriate result page based on the type of prediction
        // For normal/abnormal prediction
        navigate(`/result-normal-abnormal?result=${response.skin_rash_type}&image=${imageUrl}`);

      } catch (error) {
        console.error("Error uploading image for normal/abnormal prediction:", error);
      }
    }
  };

  const handleUploadSkinRashType = async () => {
    if (selectedFileSkinRashType) {
      const formData = new FormData();
      formData.append("file", selectedFileSkinRashType);

      try {
        const response = await uploadImageSkinRashType(formData);
        console.log(response);

        // Generate a URL for the uploaded image
        const imageUrl = URL.createObjectURL(selectedFileSkinRashType);

        // Redirect to the appropriate result page based on the type of prediction
        navigate(`/result-rash-type?result=${response.skin_rash_type}&image=${imageUrl}`);
      } catch (error) {
        console.error("Error uploading image for skin rash type prediction:", error);
      }
    }
  };

  return (
    <div>
    

       
      <div className="NA-Prediction">
      <Link to="/"><button type="button" class="btn btn-primary" style={{backgroundColor:'#3895d3', color:'white', border:'white', width:'100px', height:'30px', fontSize:'15px'}} >
          <i class="far fa-arrow-alt-circle-left"></i>&nbsp;Go Back</button>
        </Link>
        <center>
        <h1 className="Topic5">Normal/Abnormal Skin Prediction</h1>
        <br/><br/><br/><br/>
        <img src={baby_girl} alt="" className="bg pic1" />
        
        
        <u style={{color:'#e9768f'}}><h2 style={{fontSize:'30px', color:'#e9768f'}}>Description</h2></u><br/>
            <p class="p2" style={{fontSize:'15px'}}>"Welcome to our Normal/Abnormal Skin Prediction System! 
            We understand the importance of your child's skin health. 
            With our advanced image analysis technology, you can now upload images of your 
            child's skin conditions, and our system will provide you with accurate predictions 
            and guidance. We're proud to achieve an accuracy level of 45%, giving you reliable results. 
            Your child's well-being is our top priority, and we are here to support you in making informed 
            decisions about their health. It is a must to say this, We strongly recommend consulting with a healthcare professional 
            for a complete evaluation and care plan. Early detection and prompt medical attention are vital 
            to ensuring your child's skin stays healthy and happy. At the end, Thank you for choosing us to be a part of 
            your child's skin care journey." </p>
            <br/><br/>
       
            
              <input style={{fontSize:'13px'}} type="file" onChange={handleFileChangeNormalAbnormal} />
            
              </center>
        <button style={{backgroundColor:'#e9768f', border:'white',width:'600px', height:'30px', color:'white', fontSize:'15px'}} 
        onClick={handleUploadNormalAbnormal}>Upload for Normal/Abnormal Skin Prediction</button>

        {/* {selectedFileNormalAbnormal && (
          <div className="Imageclass" >
            <h2>Uploaded Image</h2>
            <img src={URL.createObjectURL(selectedFileNormalAbnormal)} alt="Uploaded" />
          </div>
        )} */}

      </div>

      <div className="ST-Prediction">
      <Button  size="lg" className="btn btn-primary" 
        style={{ borderRadius: '0', marginRight:'100px', marginTop:'7px', width:'100px', backgroundColor:'#e9768f', border:'#e9768f' }} 
        href="/view-images"> <i class="fa-solid fa-bars"></i>&nbsp;History
        </Button>
        <center>
        <h1 className="Topic4" >Skin Rash Type Prediction</h1>
        <br/><br/><br/><br/>
        <img src={baby_boy} alt="" className="bg pic2" />
 
       <u style={{color:'#3979b6'}}> <h2 style={{fontSize:'30px' , color:'#3979b6'}}>Description</h2></u><br/>
            <p class="p1" style={{fontSize:'15px'}}>"Welcome to our Skin Rash Type Prediction System!
             We understand that your baby's skin health is a top priority. 
             With our advanced image analysis technology, you can now upload images of your 
             baby's skin rashes, and our system will provide you with accurate predictions 
             and guidance. We're proud to announce that our system boasts an impressive accuracy 
             level of 55%. While our technology is a valuable tool for assessing skin conditions, 
             it's crucial to remember that it should be used as a helpful reference. The health and 
             well-being of your child are our utmost concern, and we are here to assist you in making 
             informed decisions about their health. We believe in the power of early detection and prompt 
             care, and we encourage you to seek your doctor's advice every time. Let's work together to 
             ensure your baby's skin stays healthy and happy.
             Thank you for entrusting us with your child's skin care journey." </p>

        <input style={{fontSize:'13px'}} type="file" onChange={handleFileChangeSkinRashType} />
        </center>
        
        <button style={{backgroundColor:'#3979b6', border:'white',width:'600px', height:'30px', color:'white', fontSize:'15px'}}
        onClick={handleUploadSkinRashType}>Upload for Skin Rash Type Prediction</button>
        
        {/* {selectedFileSkinRashType && (
          <div>
            <h2>Uploaded Image</h2>
            <img src={URL.createObjectURL(selectedFileSkinRashType)} alt="Uploaded" />
          </div>
        )} */}
      </div>
      
    </div>
  );
}

export default ImageUploadForm;
