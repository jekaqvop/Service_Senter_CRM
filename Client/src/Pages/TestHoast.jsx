import { useState } from 'react';

import './CSS/TestHoast.css';
import Toast from '../components/Toasts/Toast';
import Button from '../components/button/Button';
import { TOAST_PROPERTIES } from '../components/Toasts/toastProperties';


const TestHoast = () => {
  const [list, setList] = useState([]);
  const [position, setPosition] = useState("top-right");
  const [autoDelete, setAutoDelete] = useState(false);
  const [autoCloseTime, setAutoCloseTime] = useState(0);

  const showToast = (type, positionToast, autoDeleteToast, autoCloseTime) => {
    setPosition(positionToast);
    setAutoDelete(autoDeleteToast);
    setAutoCloseTime(autoCloseTime);
    const toastProperties = TOAST_PROPERTIES.find((toast) => toast.title.toLowerCase() === type.toLowerCase());
    setList([...list, toastProperties]);
  }
  
 

  return (
    <>  
        
        <div className="toast-buttons">
          
              <Button 
                
                handleClick={() => showToast("Danger", "top-right", false, 0)}
              />        
        </div>

      <Toast 
        toastList={list}
        position={position}
        autoDelete={autoDelete}
        autoDeleteTime={parseInt(autoCloseTime, 10)}
      />
    </>
  );
}

export default TestHoast;
