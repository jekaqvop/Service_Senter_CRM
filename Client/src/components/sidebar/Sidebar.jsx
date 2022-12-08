import { useEffect, useRef, useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './sidebar.scss';
import { AuthContext } from "../../context/AuthContext";
import axios from '../../api/axios';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

const LOGOUT_URL = "/api/Auth/logout";

const LOGOUTFUN = async () => {

  try {
    const response = await axios.get(
      LOGOUT_URL,				
      {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      }
    );  
    
  return true;
  } catch (err) {
    console.log("error");
    return false;
  }
  
}


const sidebarNavItems = [
    {
        display: 'Услуги',
        icon: <i className='bx bx-service'></i>,
        to: '/',
        section: 'services'
    },
    {
        display: 'Пользователи',
        icon: <i className='bx bx-user'></i>,
        to: '/user',
        section: 'user'
    },
    {
        display: 'Заказы',
        icon: <i className='bx bx-receipt'></i>,
        to: '/order',
        section: 'order'
    },
]

const Sidebar = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [stepHeight, setStepHeight] = useState(0);
    const sidebarRef = useRef();
    const indicatorRef = useRef();
    const location = useLocation();
    const { setAuthData, auth } = useContext(AuthContext);

    const onLogOut = () => {
        setAuthData(null);
        LOGOUTFUN();
      } //clearing the context

    useEffect(() => {
        setTimeout(() => {
            const sidebarItem = sidebarRef.current.querySelector('.sidebar__menu__item');
            indicatorRef.current.style.height = `${sidebarItem.clientHeight}px`;
            setStepHeight(sidebarItem.clientHeight);
        }, 50);
    }, []);

    // change active index
    useEffect(() => {
        const curPath = window.location.pathname.split('/')[1];
        const activeItem = sidebarNavItems.findIndex(item => item.section === curPath);
        setActiveIndex(curPath.length === 0 ? 0 : activeItem);
    }, [location]);

    return( 
    <>
        <div >        
            <div className='sidebar'>
                <div className="sidebar__logo">
                    CRM System
                </div>
                <div ref={sidebarRef} className="sidebar__menu">
                    <div
                        ref={indicatorRef}
                        className="sidebar__menu__indicator"
                        style={{
                            transform: `translateX(-50%) translateY(${activeIndex * stepHeight}px)`
                        }}
                     >                      
                    </div>
                    {
                        sidebarNavItems.map((item, index) => (
                            <Link to={item.to} key={index}>
                                <div className={`sidebar__menu__item ${activeIndex === index ? 'active' : ''}`}>
                                    <div className="sidebar__menu__item__icon">
                                        {item.icon}
                                    </div>
                                    <div className="sidebar__menu__item__text">
                                        {item.display}
                                    </div>
                                </div>
                            </Link>
                        ))
                    }
             
                        <Box id="boxButtonLogOut" className="row" >
                            <div className="col text-center">
                                <Button id='buttonLogOut'  variant="outlined" className='centered' 
                                    color="primary" onClick={onLogOut}>
                                    Выйти из акаунта
                                </Button>     
                            </div>
                        </Box>
                           
                </div>
            </div>
        </div>
    </>
    );
};

export default Sidebar;
