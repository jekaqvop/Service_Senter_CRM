import React, { useRef, useState, useEffect, useContext } from 'react';
import axios from '../api/axios';
import Preloader from '../components/Preloader/Preloader';
import './CSS/ServiceItemPage.css';

const SERVICES_URL = "/api/Services";
const IMAGES_URL = "/api/Images";
const BASE_URL = "https://localhost:44340";
//const BASE_URL = "https://localhost:44340";

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
               response?.data ? setImages(response?.data) : setImages([{}]);  
             }catch(err){
               setLoading(false);
             } 
            }
        loadService();
        loadImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
	return (
	<>{ loading ? (<Preloader/>) : (      
         <div className='container-pageservice'>
			<div id="wrapper">
		        <header>
                   
                        <nav>
                            <ul className="top-menu">
                                <li ><a  href="/">HOME</a></li>
                             
                                <li className="active">SERVICES</li>
                                <li id='right'><a href="/register/">REGISTER</a></li>
                                <li id='right'><a href="/login/">LOGIN</a></li>
                              
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
                        Одной из приоритетных задач сервисного является продвижение качественных услуг в сфере компьютерного сервиса. 
                        </p>
                    </div>
                    <div id="sitemap">
                        <h3>SITEMAP</h3>
                        <div>
                            <a href="/home/">Home</a>                          
                            <a href="/services/">Services</a>
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

