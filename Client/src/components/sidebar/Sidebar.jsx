import { useEffect, useRef, useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './sidebar.scss';
import { AuthContext } from "../../context/AuthContext";
import axios from '../../api/axios';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { useNavigate } from "react-router-dom";

const LOGOUT_URL = "/api/Auth/logout";

const sidebarNavItemsAdmin = [
    {
        display: 'Услуги',
        icon: <i className='bx bx-receipt'></i>,
        to: '/account/services',
        section: 'services'
    },
    {
        display: 'Статистика',
        icon: <i className='bx bx-receipt'></i>,
        to: '/account/adminpanel',
        section: 'adminpanel'
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
        to: '/account/messages',
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
        to: '/account/messages',
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
    const [curUser, setCurUser] = useState(null);

    let navigate = useNavigate(); 
    const routeChange = (url) =>{ 
        
        navigate(url);
    }
   
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
              
                  if(response?.data === "Master"){
                   
                    setSidebarNavItems(sidebarNavItemsMaster);                   
                  }                        
                  else if(response?.data === "Admin"){                     
                      setSidebarNavItems(sidebarNavItemsAdmin);
                  }                        
                  else if(response?.data === "User"){                     
                      setSidebarNavItems(sidebarNavItemsUser);  
                  }
                  const response2 = await axios.get(
                    "/api/private/AccountPrivateData/me",
                    {
                      headers: { 'Content-Type': 'application/json' },
                      withCredentials: true,
                    }
                ); 
                setCurUser(response2.data);
                  
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

    const formatFullName = (fullName) => {
        // Разбиваем строку на массив имени, фамилии и отчества
        const names = fullName.split(' ');
      
        if (names.length >= 3) {
          // Получаем первую букву имени, первую букву отчества и фамилию
          const lastName = names[0].charAt(0).toUpperCase();
          const firstNameInitial = names[1];
          const middleNameInitial = names[2].charAt(0).toUpperCase();
      
          // Соединяем полученные значения в формат "Е.С. Авхачёв"
          const formattedName = `${firstNameInitial} ${middleNameInitial}. ${lastName}.`;
      
          return formattedName;
        }
      
        // Если строка ФИО не содержит необходимых данных, возвращаем исходную строку
        return fullName;
      }
      

    return( 
    <>
        <div >        
            <div className='sidebar'>
                {curUser ? 
                    <div className="sidebar__logo">
                    Приветствую<br/>
                    <Link to='/account/profile'>{formatFullName(curUser.userName)}</Link>
                    </div>
                : ''}
                
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
