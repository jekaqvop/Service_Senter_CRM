import React, { useEffect, useState } from 'react'
import axios from '../api/axios';
import ServiceItem from '../components/ServiceItem';
import "./CSS/Services.css"
import 'bulma/css/bulma.css';
import Preloader from '../components/Preloader/Preloader';

const SERVICES_URL = "/api/Services"

const ServicesPublicPage = (props) =>{
    const [loading, setLoading] = useState(false);
    const [services, setServices] = useState([]);
    const [open, setOpen] = useState(false);
    const loadServices = async (e) => {
      try{
         const response = await axios.get(
            SERVICES_URL,
            {
              headers: { 'Content-Type': 'application/json' },
              withCredentials: true,
            }
        );  
        setServices(response.data);          
        setLoading(false);   
      }catch(err){
        setLoading(false);
      }         
    };
    useEffect(()=>{
        setLoading(true);          
        loadServices();       
       }, []);

       return(
        <>
            {loading ? (
            <Preloader/>) : (
            <> 
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
                <div id="bagroundBlue" className="hero is-primary">
              <div className="hero-body container">
                <h4 className="title">Предоставляемые услуги</h4>
              </div>
            </div>
            <br />
            <div className="container">
              <div className="column columns is-multiline">
              
                {services && services.length ? (
                  services.map((service, index) => (
                    <ServiceItem
                      product={service}
                      key={index}
                      addToCart={()=> console.log("adding")}
                    />
                  ))
                ) : (
                  <div className="column">
                    <span className="title has-text-grey-light">
                      Услуги не найдены
                    </span>
                  </div>
                )}
              </div>
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
            </>
            )
            }
        </>
       );
}


export default ServicesPublicPage;
