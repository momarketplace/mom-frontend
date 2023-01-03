import React from 'react'
//import { Link } from 'react-router-dom'

function About() {
    return (
        <div style={{backgroundColor:"white", textAlign:"center", padding:"20px", maxWidth:"100%", margin:"20px 10px"}}>
            <h3>About Us</h3>
            <p>Mosganda is an online platform and a marketplace for buying and selling of goods and services, located in Warri, Delta State, Nigeria. Mosganda provides the platform for entrepreneurs to bring their business online by creating their online store. </p>
            <p>At Mosganda, registered sellers can sell a wide range of products ranging from Electronics, Furniture, Fashion/clothes, down to even the market woman that sells Tomatoes. However, Mosganda does not accept listing of products that cannot be sold legally within the country.
            </p>
            <p>We connect buyers and sellers and give them the opportunity to communicate effectively through our chat.</p>
            <h4>Our Vision</h4>
            <p>To make life easy for buyers and sellers across the globe.
            </p>
            <h4>Our Mission</h4>
            <p>We seek to develop an effective, well placed online selling platform for individuals, micro and small enterprises.</p>
            <div>
                <h4>Objectives</h4>
            <p>To provide an online platform as a marketplace for sellers and buyers.</p>
            <p>To bring every small and medium business online.</p>
            <p>To provide an online store for small businesses that could not afford the cost of shop rent.</p>
            <p>To facilitate buying and selling within our towns/cities.</p>
            <p>To promote and facilitate trade in Nigeria, and across the globe.</p>
            </div>
            <h4>Our Core Values</h4>
            <p>Our core values are captured in the word <b>TIPS</b>.</p>
            <p><strong>Teamwork:</strong> We work together to meet the needs of our customers.</p>
            <p><strong>Integrity:</strong> At Mosganda, we do what we say, and say what we do. we build trust by making integrity our watch word.</p>
            <p><strong>Passion:</strong> We have strong passion for our brand and mission.</p>
            <p><strong>Service:</strong> We exist to attract and maintain customers. Your satisfaction is our priority.</p>

            {/* <div className='row center'>
                <div className='about-me'>
                    < Link to="/ojiko">
                    <img className='large' src="/images/ojiko.jpg" alt="Ojiko" />
                    </Link>
                    <div>
                        <h4 style={{padding:"0", margin:"0"}}>Ojiko Moses</h4>
                        <p style={{padding:"0", margin:"0"}}>Founder</p>
                        </div>
                        </div>
            </div> */}
        </div>
    )
}

export default About
