import React, { useEffect, useState } from 'react'
import axios from '../api/axios';

import "./CSS/MainPage.css";
import 'bulma/css/bulma.css';

import Preloader from '../components/Preloader/Preloader';

const SERVICES_URL = "/api/Services"

const MainPage = (props) =>{
    const [loading, setLoading] = useState(false);
    const [services, setServices] = useState([]);
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
      }         
    };
    useEffect(()=>{
        setLoading(true);          
        loadServices();       
       }, []);

       const showToastFiveSec = (type, description) =>{
   
        props.showToast(type, "top-right", true, 5000, !description ? "Error" : description);
      }

       return(
        <div className='container-pageservice'>
			<div id="wrapper">
		        <header>
                        <nav>
                            <ul className="top-menu">
                                <li className="active">HOME</li>
                             
                                <li><a href="/services/">SERVICES</a></li>
                                <li id='right'><a href="/register/">REGISTER</a></li>
                                <li id='right'><a href="/login/">LOGIN</a></li>
                              
                            </ul>
                            
                        </nav>
                      
                    </header>		       
		        <section>
                 
                    <div className="advantages">
                    <h1 id='titleMain' className='titleStrong'>Ремонт ноутбуков</h1>
                    <p className='previewText'>
                        Ноутбук сломался в самый неподходящий момент? Мы поможем предотвратить катастрофу, связанную 
                        с потерей данных и вашего времени: предлагаем профессиональный ремонт ноутбуков всех производителей и любых конфигураций!
                    </p>
                    <h2 id='titleMain' className='titleStrong'>Наши <span className="red">преимущества</span></h2>
                        <div className="row">
                        <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
                        <div id='conteineStrong' className="ablock"><img src={"/MainPageImages/advantages-pic6.png"} border="0"/>
                        <p className="seo-text-h5">Быстрая диагностика</p>
                        <p>Проведем профессиональную диагностику неисправности Вашего устройства в течении 3-х рабочих дней.</p>
                        </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
                        <div id='conteineStrong' className="ablock"><img src={"/MainPageImages/advantages-pic2.png"} border="0"/>
                        <p className="seo-text-h5">Низкая стоимость</p>
                        <p>Мы сотрудничаем напрямую с производителями, закупая комплектующие по оптовым ценам. Высокое качество ремонтных работ и запчастей подтверждается гарантией.</p>
                        </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
                        <div id='conteineStrong' className="ablock"><img src={"/MainPageImages/advantages-pic7.png"} border="0"/>
                        <p className="seo-text-h5">Безупречная репутация</p>
                        <p>Мы являемся действующими членами Международной Ассоциации сервисных центров, девиз которой – «Честный ремонт».</p>
                        </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
                        <div id='conteineStrong' className="ablock"><img src={"/MainPageImages/advantages-pic4.png"} border="0"/>
                        <p className="seo-text-h5">Только оригинальные запчасти</p>
                        <p>Мы сотрудничаем с проверенными поставщиками. Некачественный товар и фальсификат исключены!</p>
                        </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
                        <div id='conteineStrong' className="ablock"><img src={"/MainPageImages/advantages-pic1.png"} border="0"/>
                        <p className="seo-text-h5">Квалифицированные специалисты</p>
                        <p>Опытные мастера проходят обязательную сертификацию и курсы повышения квалификации. Мы ремонтируем даже то, что другие сервисные центры считают невозможным!</p>
                        </div>
                        </div>
                            <div  className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
                            <div id='conteineStrong' className="ablock"><img src={"/MainPageImages/advantages-pic8.png"} border="0"/>
                            <p className="seo-text-h5">Оперативность</p>
                            <p>Большинство неисправностей мы устраняем сразу. Более сложные ремонты выполняем за 1–3 рабочих дня.</p>
                            </div>
                            </div>
                        </div>
                        </div>
                        <p>Стоимость ремонта ноутбука в Минске зависит от характера поломки, марки устройства и стоимости комплектующих.</p>
                        <p>Мы уделяем особое внимание качеству диагностики компьютерной техники. В наших СЦ 
                            (мастерских) используется современное и практичное диагностическое оборудование, 
                            позволяющее точно определить характер поломки уже в день сдачи ноутбука в ремонт. 
                            По результатам диагностики рассчитывается точная стоимость, остающаяся неизменной.</p>
                            <p>Все работы, связанные с устранением неисправностей, а также цены на услуги согласовываются с клиентом.</p>
                            <p>Мы сотрудничаем напрямую с производителями, закупая детали по оптовым ценам. Качество ремонтных работ и комплектующих подтверждается гарантией.</p>
                        <h3 id='titleBag'>Устраним любую неисправность ноутбука</h3>
                        <ul className="check-list">
                            <li><a href="/uslugi/ne-vklyuchaetsya-noutbuk/">Не включается ноутбук</a></li>
                            <li><a href="/uslugi/remont-gnezda-zaryadki-noutbuka/">Не заряжается ноутбук</a></li>
                            <li><a href="/uslugi/propal-zvuk/">Пропал звук</a></li>
                            <li><a href="/uslugi/remont-sistemy-okhlazhdeniya-noutbuka/">Сильно нагревается</a></li>
                            <li><a href="/uslugi/remont-klaviatury-noutbuka/">Не работает клавиатура на ноутбуке</a></li>
                            <li><a href="/uslugi/remont-mosta-noutbuka/">Не работает USB</a></li>
                            <li><a href="/stati/slomalsya-tachpad-na-noutbuke/">Не работает тачпад</a></li>
                            <li><a href="/uslugi/noutbuk-zavisaet/">Зависает ноутбук</a></li>
                            <li><a href="/uslugi/remont-zalitogo-noutbuka/">Залитый ноутбук</a></li>
                        </ul>
                        <h2 id='titleMain' className='titleStrong'>О гарантии</h2>
                        <p>На услуги сервисного центра (диагностику, ремонт) предоставляется Международная гарантия.</p>
                        <h2 id='titleMain' className='titleStrong'>Партнерская программа</h2>
                        <p>Мы заинтересованы в партнерстве с успешными организациями, предоставляющими посреднические услуги, связанные с ремонтом и диагностикой компьютерной техники.</p>
                        <p>В рамках партнерской программы мы предлагаем сниженные цены на услуги по диагностике и ремонту компьютеров. Постоянным клиентам предоставляются скидки.</p>
                        <div className="part-block">
                        <p className="seo-text-h5">Наш сервисный центр приглашает к сотрудничеству компании, осуществляющие ремонт и обслуживание компьютерной и мобильной техники.</p>
                        <p >Для своих партнеров мы предлагаем:</p>
                        <div className="row">
                        <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
                        <ul className="check-list">
                        <li>Быструю диагностику</li>
                        <li>Цены ниже розницы</li>
                        <li>Продажу запчастей</li>
                        </ul>
                        </div>
                        <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
                        <ul className="check-list">
                        <li>Высочайшее качество</li>
                        <li>Гарантию</li>
                        <li>Честное отношение</li>
                        </ul>
                        </div>
                        </div>
                        </div>
                       
                </section>
	        </div>
	        <footer>
                <div id="footer">
                    <div id="twitter">
                        <h3>TWITTER FEED</h3>
                        
                        <p>
                        Одной из приоритетных задач сервисного является продвижение качественных услуг в сфере компьютерного сервиса. 
                        </p>
                    </div>
                    <div id="sitemap">
                        <h3>SITEMAP</h3>
                        <div>
                            <a href="/home/">Home</a>                          
                            <a href="/services/">Services</a>
                        </div>
                       
                    </div>
                    <div id="social">
                        <h3>SOCIAL NETWORKS</h3>
                        <a href="http://twitter.com/" className="social-icon twitter"></a>
                        <a href="http://youtube.com/" className="social-icon youtube"></a>
                        <a href="https://www.instagram.com/" className="social-icon instagram"></a>                    
                    </div>
                    <div id="footer-logo"></div>
                </div>
            </footer>
        </div>
       );
}


export default MainPage;
