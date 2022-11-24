import { useEffect, useRef, useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './sidebar.scss';
import { AuthContext } from "../../context/AuthContext";
import axios from '../../api/axios';

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
        display: 'Dashboard',
        icon: <i className='bx bx-home'></i>,
        to: '/',
        section: ''
    },
    {
        display: 'Getting Started',
        icon: <i className='bx bx-star'></i>,
        to: '/started',
        section: 'started'
    },
    {
        display: 'Calendar',
        icon: <i className='bx bx-calendar'></i>,
        to: '/calendar',
        section: 'calendar'
    },
    {
        display: 'User',
        icon: <i className='bx bx-user'></i>,
        to: '/user',
        section: 'user'
    },
    {
        display: 'Orders',
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
                       <button
                        variant="primary"
                        type="button"
                        className="w-100 mt-3"
                        onClick={onLogOut}
                        >
                        Log out
                        </button>
                </div>
            </div>
        </div>
    </>
    );
};

export default Sidebar;
