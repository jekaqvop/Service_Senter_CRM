import React, { useEffect } from "react";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "../api/axios";

const IMAGES_URL = "/api/Images";
const BASE_URL = "https://localhost:44340";

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
        setImagePath(BASE_URL + "/" + response?.data?.pathImage);  
      }catch(err){

      }         
    }
    loadImage();
// eslint-disable-next-line react-hooks/exhaustive-deps
}, []);
  return (
    <>
    { isRedirect ?  (<Navigate to={"/seviceItemPage/" + product.id}/>) : (
    <div className=" column is-half">
      <div className="box">
        <div className="media">
          <div className="media-left">
            <figure className="image is-64x64">
              <img
                src={imagePath}
                alt={product.shortDesc}
              />
            </figure>
          </div>
          <div className="media-content">
            <b style={{ textTransform: "capitalize" }}>
              {product.title}{" "}
              <span id="bagroundBlue" className="tag is-primary">${product.price}</span>
            </b>
            <div>{product.shortDesc}</div>           
            <div className="is-clearfix">
              <button id="borderBlueAndText"
                className="button is-small is-outlined is-primary   is-pulled-right"
                onClick={() =>{
                    setIsRedirect(true);
                } }
              >
                Подробнее
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    )}</>
  );
};

export default ServiceItem;