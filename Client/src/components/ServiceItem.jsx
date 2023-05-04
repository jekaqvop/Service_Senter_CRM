import React, { useEffect } from "react";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "../api/axios";
import Confirm from 'react-confirm-bootstrap';

const IMAGES_URL = "/api/Images";
const BASE_URL = "https://localhost:44340";
const SERVICESPRIVATE_URL = "/api/private/Services";

const ServiceItem = props => {
  const { product } = props;
  const [isRedirect, setIsRedirect] = useState(false);
  const [imagePath, setImagePath] = useState("https://bulma.io/images/placeholders/128x128.png");
useEffect(()=>{  
  setIsRedirect(false);
    const loadImage = async () => {
     try{
        const response = await axios.get(
          IMAGES_URL + "/" + product.id + "/" + 1
        );    
        setImagePath(response?.data?.pathImage);  
      }catch(err){
        
      }         
    }
    loadImage();
// eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

const DelteService = (id) =>{
  const DeleteServicelocal = async () => {
    try{
       const response = await axios.delete(
        SERVICESPRIVATE_URL + "/" + id,
          {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
          }
      );  
      props.setServices(props.services.filter(service => service.id !== id));          
      props.showToastFiveSec("success", `Услуга ${id} успешно удалена.`)
    }catch(err){
      props.showToastFiveSec("error", "Произошла ошибка во время удаления услуги.")
    }         
  };
  DeleteServicelocal();
}

  return (
    <>
    { isRedirect ?  (<Navigate to={"/seviceItemPage/" + product.id}/>) : (
    <div className=" column is-half">
      <div className="box">
        <div className="media">
          { !imagePath ? console.log(imagePath) :(
             <div className="media-left">
            <figure className="image is-96x96">
              <img id="mini_image"
                src={BASE_URL + "/" + imagePath}
                
              />
            </figure>
          </div>
          )}
          <div className="media-content">
            <b style={{ textTransform: "capitalize" }}>
              {product.title}{" "}
              <span id="bagroundBlue" className="tag is-primary">{product.price === 0 ? "Бесплатно" : ("От " + product.price)} </span>
            </b>
            <div>{product.description.substring(0, 101)}...</div>           
            <div className="is-clearfix">
              <button id="borderBlueAndText"
                className="button is-small is-outlined is-primary   is-pulled-right"
                onClick={() =>{
                    setIsRedirect(true);
                } }
              >
                Подробнее
              </button>
              {!props.openAddButton ? "" : (
              <Confirm
                onConfirm={() => DelteService(product.id)}
                body="Вы уверены, что хотите удалить этоту услугу? Данный процесс необратим!"
                confirmText="Подтвердить удаление"
                title="Подтверждение удаления">
                  <button id="delete_blue_button"
                    className="button is-small is-outlined is-primary   is-pulled-right margin_left10"                   
                  >
                    Удалить
                  </button>
                </Confirm>
              )}             
            </div>
          </div>
        </div>
      </div>
    </div>
    )}</>
  );
};

export default ServiceItem;
