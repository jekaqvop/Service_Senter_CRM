import React, { useRef, useState, useEffect, useContext } from 'react';
import axios from '../api/axios';
import './CSS/ServiceItemPage.css';

const SERVICES_URL = "/api/Services";
const IMAGES_URL = "/api/Images";
const BASE_URL = "https://localhost:44340";

const ServicePageid = (props) => {
    const [loading, setLoading] = useState(true);
    const [serviceItem, setServiceItem] = useState({title: '', description: '', price: 0});
    const [images, setImages] = useState([]);
    useEffect(()=>{
        const loadService = async () => {
        try{
            const response = await axios.get(
               SERVICES_URL + `/${props.id}`,
               {
                 headers: { 'Content-Type': 'application/json' },
                 withCredentials: true,
               }
           );  
           
            
           setServiceItem(response?.data);          
           setLoading(false);   
           
         }catch(err){
           setLoading(false);
         } 
        }
        const loadImages = async () => {
            try{
                const response = await axios.get(
                    IMAGES_URL + `/${props.id}`,
                   {
                     headers: { 'Content-Type': 'application/json' },
                     withCredentials: true,
                   }
               );  
               console.log(response?.data);
               setImages(response?.data);  
             }catch(err){
               setLoading(false);
             } 
            }
        loadService();
        loadImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
	return (
	<>{ loading ? (<div>Загрузка...</div>) : (      
         <div className='container-pageservice'>
			<div id="wrapper">
		        <header>
                   
                        <nav>
                            <ul className="top-menu">
                                <li><a href="/home/">HOME</a></li>
                                <li className="active">ABOUT US</li>
                                <li><a href="/services/">SERVICES</a></li>
                                <li><a href="/partners/">PARTNERS</a></li>
                                <li><a href="/customers/">CUSTOMERS</a></li>
                                <li><a href="/projects/">PROJECTS</a></li>
                                <li><a href="/careers/">CAREERS</a></li>
                              
                            </ul>
                        </nav>
                    </header>		       
		        <section>
                    <blockquote>
                    <p>
                    {serviceItem.title}
                    </p>
                    <cite>{serviceItem.price}р</cite>
                    </blockquote>
                    <p>{serviceItem.description}    </p>
                    <div className='images-container'>
                        {images.map((image, index)=>(
                        <figure key={index}>
                            <img src={BASE_URL + "/" + image.pathImage} alt=""/>
                        </figure>
                        ))}                        
                    </div>                  
                </section>
	        </div>
	        <footer>
                <div id="footer">
                    <div id="twitter">
                        <h3>TWITTER FEED</h3>
                        
                        <p>
                            In ultricies pellentesque massa a porta. Aliquam ipsum enim, hendrerit ut porta nec, ullamcorper et nulla. In eget mi dui, sit amet scelerisque nunc. Aenean aug
                        </p>
                    </div>
                    <div id="sitemap">
                        <h3>SITEMAP</h3>
                        <div>
                            <a href="/home/">Home</a>
                            <a href="/about/">About</a>
                            <a href="/services/">Services</a>
                        </div>
                        <div>
                            <a href="/partners/">Partners</a>
                            <a href="/customers/">Support</a>
                            <a href="/contact/">Contact</a>
                        </div>
                    </div>
                    <div id="social">
                        <h3>SOCIAL NETWORKS</h3>
                        <a href="http://twitter.com/" className="social-icon twitter"></a>
                        <a href="http://youtube.com/" className="social-icon youtube"></a>
                        <a href="https://www.instagram.com/" className="social-icon instagram"></a>                    
                    </div>
                    <div id="footer-logo"></div>
                </div>
            </footer>
        </div>
        )}</>
	);
};

export default ServicePageid;

