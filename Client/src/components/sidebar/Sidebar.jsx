import { useEffect, useRef, useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './sidebar.scss';
import { AuthContext } from "../../context/AuthContext";
import axios from '../../api/axios';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

const LOGOUT_URL = "/api/Auth/logout";

const sidebarNavItemsAdmin = [
    {
        display: 'Услуги',
        icon: <i className='bx bx-receipt'></i>,
        to: '/account/services',
        section: 'services'
    },
    {
        display: 'Устройства',
        icon: <i className='bx bx-devices'></i>,
        to: '/account/devices',
        section: 'devices'
    },
    {
        display: 'Сотрудники',
        icon: <i className='bx bx-male'></i>,
        to: '/account/staffers',
        section: 'staffers'
    },
    {
        display: 'Клиенты',
        icon: <i className='bx bx-user'></i>,
        to: '/account/users',
        section: 'users'
    },
    {
        display: 'Мессенджер',
        icon: <i className='bx bxs-user-circle'></i>,
        to: '/account/messages',
        section: 'messages'
    },
    {
        display: 'Заказы',
        icon: <i className='bx bx-basket'></i>,
        to: '/account/orders',
        section: 'orders'
    },   
    {
        display: 'Личные данные',
        icon: <i className='bx bxs-user-circle'></i>,
        to: '/account/profile',
        section: 'profile'
    }
];

const sidebarNavItemsUser = [
    {
        display: 'Услуги',
        icon: <i className='bx bx-receipt'></i>,
        to: '/account/services',
        section: 'services'
    },
    {
        display: 'Мои заказы',
        icon: <i className='bx bx-basket'></i>,
        to: '/account/myOrders',
        section: 'myOrders'
    },
    {
        display: 'Мессенджер',
        icon: <i className='bx bx-male'></i>,
        to: '/account/im',
        section: 'messages'
    },
    {
        display: 'Личные данные',
        icon: <i className='bx bxs-user-circle'></i>,
        to: '/account/profile',
        section: 'profile'
    }
];

const sidebarNavItemsMaster = [
    {
        display: 'Услуги',
        icon: <i className='bx bx-receipt'></i>,
        to: '/account/services',
        section: 'services'
    },
    {
        display: 'Устройства',
        icon: <i className='bx bx-devices'></i>,
        to: '/account/devices',
        section: 'devices'
    },
    {
        display: 'Мессенджер',
        icon: <i className='bx bx-male'></i>,
        to: '/account/im',
        section: 'messages'
    },
    {
        display: 'Клиенты',
        icon: <i className='bx bx-user'></i>,
        to: '/account/users',
        section: 'users'
    },   
    {
        display: 'Заказы',
        icon: <i className='bx bx-basket'></i>,
        to: '/account/orders',
        section: 'orders'
    },
    {
        display: 'Личные данные',
        icon: <i className='bx bxs-user-circle'></i>,
        to: '/account/profile',
        section: 'profile'
    }
];


const Sidebar = () => {          
    const [activeIndex, setActiveIndex] = useState(1);
    const [stepHeight, setStepHeight] = useState(1);
    const sidebarRef = useRef();
    const indicatorRef = useRef();
    const location = useLocation();
    const { setAuthData, auth} = useContext(AuthContext);
    const [sidebarNavItems, setSidebarNavItems] = useState(sidebarNavItemsUser);
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
              
                  if(response?.data === "Master")
                        setSidebarNavItems(sidebarNavItemsMaster);
                    else if(response?.data === "Admin")
                        setSidebarNavItems(sidebarNavItemsAdmin);
                    else
                        setSidebarNavItems(sidebarNavItemsUser);  
            }catch(err){
              
            }         
          }
          loadDataUser();
        
    },[]);

    useEffect(()=>{
        moveDiv();                
    },[sidebarNavItems]);

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

    const onLogOut = () => {
        setAuthData(null);
        LOGOUTFUN();
      } //clearing the context

      const moveDiv = () =>{
        setTimeout(() => {
            const sidebarItem = sidebarRef.current.querySelector('.sidebar__menu__item');
            indicatorRef.current.style.height = `${sidebarItem.clientHeight}px`;
            setStepHeight(sidebarItem.clientHeight);
        }, 100);
      }

    useEffect(() => {
        moveDiv();        
    }, []);

   

    // change active index
    useEffect(() => {
        const curPath = window.location.pathname.split('/account/')[1];
        const activeItem = sidebarNavItems.findIndex(item => item.section === curPath);
        setActiveIndex(curPath.length === 0 ? 0 : activeItem);
       
    }, [location, sidebarNavItems]);

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
