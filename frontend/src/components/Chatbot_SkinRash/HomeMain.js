import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Homestyle.css';

function HomeMain() {
    return (
        <div>
            {/* home section starts for chatbot and skin rash prediction */}
            <section className="home" id="home">
                <div className="content">
                    <h3 style={{fontSize:'70px'}}>
                        <span className="skin-rash-text">Skin Rash Predictions</span> &{' '}
                        <span className="predictions-text">Chatbot</span>
                    </h3>
                    <p style={{fontSize:'24px'}}>"Your Baby's Wellness, Our Priority!"</p>
                </div>
                <div className="image">
                    <img src="images/home.png" alt="" />
                </div>
                <div className="custom-shape-divider-bottom-1684324473">
                    <svg
                        data-name="Layer 1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 1200 120"
                        preserveAspectRatio="none"
                    >
                        <path
                            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
                            className="shape-fill"
                        ></path>
                    </svg>
                </div>
            </section>
            {/* home section ends */}

            {/* about us section starts */}
            <section className="about" id="about">
                <h1 className="heading">
                    <span className="skin-rash-text">Skin Rash</span>
                    <span className="predictions-text"> Prediction</span>
                </h1>
                <div className="row">
                    <div className="image">
                        <img src="/images/about us.png" alt="" />
                        
                    </div>
                    <div className="content">
                        <h3>Thriving with Us for Infant Skin Bliss</h3>
                        <p className="desc-text" style={{fontSize:'17px'}}>
                            "Welcome to our Skin Rash Prediction System! We understand the significance of your baby's skin health. Our advanced image analysis technology allows you to upload photos of your baby's skin conditions. Our system offers precise predictions and invaluable guidance. Your child's well-being is our top priority, and we're here to support your informed healthcare choices. We strongly advocate early detection and swift care. Together, we ensure your baby's skin stays healthy and joyful. Thank you for entrusting us with your child's skin care journey."
                        </p>
                    </div>
                </div>
            </section>
            {/* about us section ends */}

            {/* about part 2 */}
            <section className="about2" id="about2">
                <h1 className="heading">
                    <span className="skin-rash-text">Health Care</span>
                    <span className="predictions-text"> Chat Bot</span>
                </h1>
                <div className="row">
                    <div className="image">
                        <img src="images/about us2.png" alt="" />
                    </div>
                    <div className="content">
                        <h3>Nurturing Health, One Chat at a Time</h3>
                        <p className="desc-text" style={{fontSize:'17px'}}>
                            "Welcome to our Infant Health Informatics Chatbot! We understand that your baby's health is of paramount importance. With our cutting-edge technology, you can receive instant information and guidance on your baby's well-being. We are dedicated to providing you with accurate, timely, and reliable assistance to ensure your child's health and happiness. Whether it's monitoring growth milestones, vaccination schedules, or offering health tips, our chatbot is here to support you every step of the way. Trust us with your infant's health journey, and together, we'll nurture their well-being."
                        </p>
                    </div>
                </div>
            </section>
            {/* end */}

            {/* education section start */}
            <section className="steps" id="steps">
                <h1 className="heading">Guide Lines</h1>
                <div className="box-container">
                    <div className="box">
                        <h3>ChatBot</h3>
                        <p>
                            <p>1. Talk freely about the concerns that you worry about</p>
                            <p>2. Use "exit" as the keyword when you start a new conversation</p>
                            <p>3. You can view the chat history from the "History" Button</p>
                            <p>4. You can delete your chat history if you want (search bar will help you to find a conversation)</p>
                            <p>5. Use keywords when you ask questions (ex: Fever, Red Rashes, how old is you kid ... etc)</p>
                        </p>
                        <br/>
                        <Link to="/chatbot"> <button type="button" class="btn btn-primary" style={{ backgroundColor:'#3979b6', border:'white', width:'150px', height:'30px', fontSize:'15px'}} >Go To ChatBot</button></Link>
                        <br/><br/>

                    </div>

                    <div className="box">
                        <h3>Skin Rash</h3>
                        <p>
                            <p>1. Upload the image that skin rash is spread from "choose image" option </p>
                            <p>2. Click on "Upload" button </p>
                            <p>3. You will be redirected to the result page</p>
                            <p>4. You can view your history from "History" button with the prediction result saved end of the image name</p>
                            <p>5. You can delete or download your history records</p>
                            <p>6. Do not upload two images with the same name</p>
                        </p>
                        
                        <Link to="/upload"><button type="button" class="btn btn-primary" style={{backgroundColor:'#e9768f', 
                        color:'white', border:'white', width:'200px', height:'30px', fontSize:'15px'}} >
                            Go To Rash Prediction</button></Link><br/>
                        <br/>

                    </div>
                </div>
            </section>
            {/* education section ends */}
            {/* end of all for chatbot and skin rash prediction */}


            {/* home section starts for growth lvl prediction */}
            <section className="home" id="home">
                <div className="content">
                    <h3 style={{fontSize:'100px'}}>
                        <span className="skin-rash-text">Growth Level</span>
                        <span className="predictions-text">Prediction</span>
                    </h3>
                    <p style={{fontSize:'24px'}}>Guiding You through the Journey of Parenthood.</p>
                </div>
                <div className="image">
                    {/* <img src="images/home.png" alt="" /> */}
                </div>
                <div className="custom-shape-divider-bottom-1684324473">
                    <svg
                        data-name="Layer 1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 1200 120"
                        preserveAspectRatio="none"
                    >
                        <path
                            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
                            className="shape-fill"
                        ></path>
                    </svg>
                </div>
            </section>
            {/* home section ends */}

            {/* about us section starts */}
            <section className="about" id="about">
                <h1 className="heading">
                    <span className="skin-rash-text">Skin Rash</span>
                    <span className="predictions-text"> Prediction</span>
                </h1>
                <div className="row">
                    <div className="image">
                        {/* <img src="/images/about us.png" alt="" /> */}
                        
                    </div>
                    <div className="content">
                        <h3>Groth level prediction</h3>
                        <p className="desc-text" style={{fontSize:'17px'}}>
                            growth lvl prediction decriptio  </p>
                    </div>
                </div>
            </section>
            {/* about us section ends */}

            

            {/* education section start */}
            <section className="steps" id="steps">
                <h1 className="heading">Guide Lines</h1>
                <div className="box-container">
                    <div className="box">
                        <h3>groth level prediction</h3>
                        <p>
                           
                        </p>
                    </div>
                 
                </div>
            </section>
            {/* education section ends */}
            {/* end of all for growth lvl prediction*/}




         {/* home section starts for gvideo record prediction */}
         <section className="home" id="home">
                <div className="content">
                    <h3 style={{fontSize:'100px'}}>
                        <span className="skin-rash-text">Video Recording</span>
                        <span className="predictions-text">Prediction</span>
                    </h3>
                    <p style={{fontSize:'24px'}}>Informed Choices for Your Precious Little One</p>
                </div>
                <div className="image">
                    {/* <img src="images/home.png" alt="" /> */}
                </div>
                <div className="custom-shape-divider-bottom-1684324473">
                    <svg
                        data-name="Layer 1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 1200 120"
                        preserveAspectRatio="none"
                    >
                        <path
                            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
                            className="shape-fill"
                        ></path>
                    </svg>
                </div>
            </section>
            {/* home section ends */}

            {/* about us section starts */}
            <section className="about" id="about">
                <h1 className="heading">
                    <span className="skin-rash-text">Skin Rash</span>
                    <span className="predictions-text"> Prediction</span>
                </h1>
                <div className="row">
                    <div className="image">
                        {/* <img src="/images/about us.png" alt="" /> */}
                        
                    </div>
                    <div className="content">
                        <h3>Video Record prediction</h3>
                        <p className="desc-text" style={{fontSize:'17px'}}>
                            vedio record prediction decription  </p>
                    </div>
                </div>
            </section>
            {/* about us section ends */}

            

            {/* education section start */}
            <section className="steps" id="steps">
                <h1 className="heading">Guide Lines</h1>
                <div className="box-container">
                    <div className="box">
                        <h3>record prediction</h3>
                        <p>
                           
                        </p>
                    </div>
                 
                </div>
            </section>
            {/* education section ends */}
            {/* end of all for video record prediction*/}



        </div>
    );
}

export default HomeMain;
