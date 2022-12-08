import React, { useEffect } from "react";
import { useState } from "react";
import axios from "../api/axios";

const IMAGES_URL = "/api/Images"

const ServiceItem = props => {
  const { product } = props;
  const [imagePath, setImagePath] = useState("https://bulma.io/images/placeholders/128x128.png");
useEffect(()=>{  
    const loadImage = async () => {
     try{
        const response = await axios.get(
          IMAGES_URL + "/" + product.id + "/" + 1
       );    
          setImagePath(response?.data?.PathImage ? response?.data?.PathImage : "https://bulma.io/images/placeholders/128x128.png");
      }catch(err){

      }         
    }
    loadImage();
// eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

  return (
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
                onClick={() =>
                  props.addToCart({
                    id: product.id,
                    product,
                    amount: 1
                  })
                }
              >
                Подробнее
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceItem;
