import React, { useEffect, useState } from 'react'
import axios from '../api/axios';
import ServiceItem from '../components/ServiceItem';
import "./CSS/Services.css"
import 'bulma/css/bulma.css';
import Button from '@material-ui/core/Button';
import AddServices from '../components/AddService/AddService';
import Preloader from '../components/Preloader/Preloader';

const SERVICES_URL = "/api/Services";


const Services = (props) =>{
    const [loading, setLoading] = useState(false);
    const [services, setServices] = useState([]);
    const [open, setOpen] = useState(false);
    const [openAddButton, setOpenAddButton] = useState(false);
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
        showToastFiveSec('error', 'Не удалось загрузить список услуг');
      }         
    };
    useEffect(()=>{
        setLoading(true);          
        loadServices();       
       }, []);

       const showToastFiveSec = (type, description) =>{
   
        props.showToast(type, "top-right", true, 5000, !description ? "Error" : description);
      }

      const AddNewService = (newService) => {  
        setServices(prevState => [ newService, ...prevState]);
      };

      useEffect(()=>{
        const loadDataUser = async (e) => {
            try{
               const response = await axios.get(
                  "/api/private/AccountPrivateData/getRole",
                  {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                  }
              );  
              
              if(response?.data === "Admin")
                  setOpenAddButton(true);
            }catch(err){
              showToastFiveSec('error', 'Не удалось получить вашу роль');
            }         
          }
          loadDataUser();
        
    },[]);

       return(
        <>
            {loading ? (
            <Preloader/>) : (
            <> 
                  <div id="bagroundBlue" className="hero is-primary">
              <div className="hero-body container">
                <h4 className="title">Предоставляемые услуги</h4>
              </div>
            </div>
            <br />
            <div className="container">
              <div className="column columns is-multiline">
                {!openAddButton ? "" : 
              <div className=" column is-half">
                  <div className="box">
                    <div className="media">                     
                      <div className="media-content">         
                        <div className='centered'>       
                        <Button id='buttonAddService' 
                                    color="primary" onClick={() => {setOpen(true)} }>    
                          <svg className='' xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 0 24 24" width="48px" fill="#308efe">
                            <path d="M0 0h24v24H0z" fill="none"/>
                            <path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                          </svg>                         
                          <div> Добавить услугу  </div>      
                          </Button>                   
                        </div>                  
                      </div>
                    </div>
                  </div>
                </div>
                }
                {services && services.length ? (
                  services.map((service, index) => (
                    <ServiceItem
                      product={service}
                      key={index}
                      showToastFiveSec={showToastFiveSec}
                      services={services}
                      setServices={setServices}
                      openAddButton={openAddButton}
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
            <AddServices open={open}
                              setOpen={setOpen}
                              showToast={showToastFiveSec}
                              AddNewUser={AddNewService}
                              loadservices={loadServices}                             

                />      
            </>
            )
            }
        </>
       );
}


export default Services;
