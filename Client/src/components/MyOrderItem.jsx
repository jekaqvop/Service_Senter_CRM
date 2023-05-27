import React from "react";

const MyOrderItem = props => {
  const { order } = props;
  
  
  return (
    <>
      <div  className="box">
        <div className="media">         
          <div className="media-content">
            <b style={{ textTransform: "capitalize" }}>
              Заказ №{order.id}{" "}
              <span id="bagroundBlue" className="tag is-primary">{order.priceOrder === 0 ? "бесплатно" : order.priceOrder}</span>
            </b>
            <div>Тип устройства: {order.device.typeDevice}</div>           
            <div>Модель: {order.device.model}</div>           
            <div>Серийный номер: {order.device.serialNumber}</div>           
            <div>Производетиель: {order.device.manufacturer}</div>           
            <div className="is-clearfix">
            <div>
               ФИО мастера: {!order.master ? "не существует" : order.master.userName}
              </div>
              <div>
               Номер телефона матера: {!order.master ? "не существует" : order.master.phoneNumber}
              </div>
              <div>
               Дата принятия в сервис: { new Date(order.date_acceptance).getDate() + "."
                + (new Date(order.date_acceptance).getMonth()+1)  + "." 
                + new Date(order.date_acceptance).getFullYear() + " "  
                + new Date(order.date_acceptance).getHours() + ":"  
                + new Date(order.date_acceptance).getMinutes() + ":" 
                + new Date(order.date_acceptance).getSeconds()}
              </div>
              <div>
               Дата начала ремонта: {!order.repair_start_date ? ("не начат") : (
                                        new Date(order.repair_start_date).getDate() + "."
                + (new Date(order.repair_start_date).getMonth()+1)  + "." 
                + new Date(order.repair_start_date).getFullYear() + " "  
                + new Date(order.repair_start_date).getHours() + ":"  
                + new Date(order.repair_start_date).getMinutes() + ":" 
                + new Date(order.repair_start_date).getSeconds())}
              </div>
              <div>
               Дата завершения ремонта: {!order.repair_completion_date ? ("не завершён") : (
                                        new Date(order.repair_completion_date).getDate() + "."
                + (new Date(order.repair_completion_date).getMonth()+1)  + "." 
                + new Date(order.repair_completion_date).getFullYear() + " "  
                + new Date(order.repair_completion_date).getHours() + ":"  
                + new Date(order.repair_completion_date).getMinutes() + ":" 
                + new Date(order.repair_completion_date).getSeconds())}
              </div>
              <div>
               Дата выдачи: {!order.date_issue ? ("не выдан") : (
                                        new Date(order.date_issue).getDate() + "."
                + (new Date(order.date_issue).getMonth()+1)  + "." 
                + new Date(order.date_issue).getFullYear() + " "  
                + new Date(order.date_issue).getHours() + ":"  
                + new Date(order.date_issue).getMinutes() + ":" 
                + new Date(order.date_issue).getSeconds())}
              </div>              
              <div>
               Статус заказа: {order.status}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyOrderItem;
