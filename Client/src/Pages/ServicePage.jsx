import React from 'react';
import { useParams } from 'react-router-dom';
import ServicePageid from './ServicePageid';


const ServicePage = () => {
    const { id } = useParams();
    return (<ServicePageid id={id} />);
  };

  export default ServicePage;