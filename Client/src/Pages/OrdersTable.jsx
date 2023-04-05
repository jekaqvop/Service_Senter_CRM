import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter, selectFilter } from 'react-bootstrap-table2-filter';
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import axios from '../api/axios';
import Confirm from 'react-confirm-bootstrap';

import "./CSS/StylesTable.css";
import AddOrderModal from '../components/Modals/AddOrderModal';
import Preloader from '../components/Preloader/Preloader';


const DESCRIPTION_REGEX = /^[^_]{5,20000}$/;


let serialNumberFilter;
let OrderNameClientFilter;
let OrderNameMasterFilter;
let DescriptonFilter;
let PhoneNumberFilter;
let IdOrderFilter;
let StatusOrderFilter;


const OrdersTable = (props) => {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  const [open, setOpen] = useState(false);

  const ORDERS_URL = "/api/private/Orders"

const selectOptions = [
  {id: 0,  status:'Заказ принят'},
  {id: 1, status:'Начат ремонт'},
  {id: 2, status:'Ремонт закончен'},
  {id: 3, status:'Заказ завершён'}
];
  
  
 const columns = [{
  dataField: 'id',
  text: 'Id Заказа', 
  filter: textFilter({
    getFilter: (filter) => {
        IdOrderFilter = filter;
    }
  }), 
  isKey: true,    
  sort: true
},{
  dataField: 'master.userName',
  text: 'ФИО мастера',
  filter: textFilter({
    getFilter: (filter) => {
        OrderNameMasterFilter = filter;
    }
  }),
  editable: false,
    sort: true
},
{
  dataField: 'client.userName',
  text: 'ФИО клиента',
  filter: textFilter({
    getFilter: (filter) => {
        OrderNameClientFilter = filter;
    }
  }),
  sort: true
},
{
  dataField: 'client.phoneNumber',
  text: 'Номер телефона клиента',
  filter: textFilter({
    getFilter: (filter) => {
        PhoneNumberFilter = filter;
    }
  }),
  editable: false,
  sort: true
},
{
  dataField: 'status',
  text: 'Статус заказа',
  filter: textFilter({
    getFilter: (filter) => {
      StatusOrderFilter = filter;
    }
  }),

  editor:{
    type: Type.SELECT,
    getOptions: (setOptions, { row, column }) => {
      return selectOptions.filter(item => item.id >= selectOptions.find(obj => obj.status === row.status).id).map((item, index) => (
       {value: item.status, label: item.status}
      ));
    }
    },
  filter: selectFilter({
      options: () => {
        return selectOptions.map((item, index) => (
         {value: item.status, label: item.status}
        ))},
  }),
  sort: true
},
{
  dataField: 'device.serialNumber',
  text: 'серийный номер устройства',
  filter: textFilter({
    getFilter: (filter) => {
        serialNumberFilter = filter;
    }
  }),
  editable: false,
  sort: true
},
{
  dataField: 'description',
  text: 'Описание',
  filter: textFilter({
      getFilter: (filter) => {
          DescriptonFilter = filter;
      }
    }),
    validator: (newValue, row, column) => {          
      if (!newValue || !DESCRIPTION_REGEX.test(newValue)) {
        return {
          valid: false,
          message: 'Должны быть только цифры и буквы длиной 3-23 символа.'
        };             
      } 
      return true;
    },
    sort: true
},
{
  dataField: 'device.typeDevice',
  text: 'Тип устройства',
  editable: false,
  sort: true
},
{
  dataField: "id2",
  text: "Remove",
  editable: false,
  formatter: (cellContent, row) => {
    return (
      <Confirm
      onConfirm={() => handleDelete(row.id)}
      body="Вы уверены, что хотите удалить этого пользователя? Данный процесс необратим!"
      confirmText="Подтвердить удаление"
      title="Подтверждение удаления">
        <Button
          className="btn-danger"         
        >
          Удалить
        </Button>
      </Confirm>
    );
  },
},];


const handleClick = () => {
  serialNumberFilter('');
  OrderNameClientFilter('');
  OrderNameMasterFilter('');
  DescriptonFilter('');
  PhoneNumberFilter('');
  IdOrderFilter('');
  StatusOrderFilter('');
};


const beforeSaveCell = (oldValue, newValue, row, column, done) => {
  const id = row.id;
  const dataField = column.dataField;
  const EditOrders = async (e) => {
    try{
      const response = await axios.put(
      ORDERS_URL + "/" + id + "/" + dataField,      
      JSON.stringify(newValue.toString()),   
      {
        headers: { 'Content-Type': 'application/json-patch+json' },
        withCredentials: true,
      }
    ); 

      done(true);
    }catch(err){
      done(false);
    }         
  }
  EditOrders();
  return { async: true };
}
  const handleDelete = async (rowId) => {
    const loadOrders = async () => {
     try{
        const response = await axios.delete(
          ORDERS_URL + "/" + rowId,
           {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
           }
       );              
        
        setOrders(orders.filter(item => item.id !== rowId));

      }catch(err){
        showToastFiveSec('error', "Не удалось удалить строку с id равным " + rowId);
      }         
    }
    loadOrders();
  };

  const DefaultSorted = [{
    dataField: 'id',
    order: 'desc'
  }];    
    
 
  const onDeleteRows = () => {
    
    const handleSubmit = async () => {
     if(selectedRows.length === 0) {showToastFiveSec('Warning', 'Пользователи для удаления не выбраны');}
     else{
      try {
        const response = await axios.post(
          ORDERS_URL + "/DeleteOrders",
          selectedRows,
          {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
          }
        );
        const message = response?.data.messageValue; 
        if(message === "Orders Deleted") {
          setOrders(orders.filter(item => !selectedRows.includes(item.id)));
          setSelectedRows([]);
        }          
        else {showToastFiveSec('error', 'Не удалось удалить выбранных пользователей');} 
      } catch (err) {
        showToastFiveSec('error', 'No Server Response');
        if (!err?.response) {
          
          showToastFiveSec('error', 'No Server Response');
        } 
      }      
     }      
    };
    handleSubmit();
  }

  const showToastFiveSec = (type, description) =>{
   
    props.showToast(type, "top-right", true, 5000, !description ? "Error" : description);
  }

  const handleOnSelect = (row, isSelect) => {
    if (isSelect) {
      setSelectedRows([...selectedRows, row.id]);
    } else {
      setSelectedRows(selectedRows.filter(x => x !== row.id));
    }    
  }

  const handleOnSelectAll = (isSelect, rows) => {
    const ids = rows.map(r => r.id);    
    if (isSelect) {
        setSelectedRows(ids);
    } else {
      setSelectedRows([]);
    }    
  }
  const selectRow = {
    mode: 'checkbox',
    clickToSelect: false,
    style: { backgroundColor: '#fff8dc' },
    selected: selectedRows,
    onSelect: handleOnSelect,
    onSelectAll: handleOnSelectAll
  };     

   useEffect(()=>{
    setLoading(true);
      const loadOrders = async (e) => {
        try{
           const response = await axios.get(
              ORDERS_URL,
              {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
              }
          );  
   
          setOrders(response?.data);
          setLoading(false);   
        }catch(err){
          setLoading(false);
        }         
      }
    
      loadOrders();
     
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);
   const handleTableChange = (type, { data, cellEdit: { rowId, dataField, newValue } }) => {
   
    const result = data.map((row) => {
      if (row.id === rowId) {
        const newRow = { ...row };
        newRow[dataField] = newValue;
        return newRow;
      }
      return row;
    });
    setOrders(result);  
  }
   const editCell = {
      mode: 'dbclick' ,
      blurToSave: true,
      beforeSaveCell
   };
   const AddNewOrder = (newOrder) => {  
      setOrders(prevState => [ newOrder, ...prevState]);
  };
    return(
        <>      
        {loading ? (
            <Preloader/>) : (
              <>    
                <div className='tableContainer'>              
                  <Button id='buttonFixPosition' className="btn btn-lg btn-primary" onClick={()=> handleClick() }> Очистить фильтры </Button>
                  <Button id='buttonFixPosition' className="btn btn-lg btn-primary" onClick={() => {setOpen(true)} }> Создать заказ </Button>
                  <Confirm
                            onConfirm={onDeleteRows}
                            body="Вы уверены, что хотите удалить выбранных пользователей? Данный процесс необратим!"
                            confirmText="Подтвердить удаление"
                            title="Подтверждение удаления">
                    <Button id='buttonFixPosition' className="btn btn-lg btn-primary btn-danger"  > Удалить строки </Button>
                  </Confirm>

                  <BootstrapTable 
                      id="tableUsers"
                      keyField='id' 
                      data={ orders }  
                      columns={ columns } 
                      selectRow={ selectRow }
                     
                      filter={ filterFactory() }
                      defaultSorted={DefaultSorted} 
                      cellEdit={ cellEditFactory(editCell) }
                      onTableChange={ handleTableChange }
                      remote={{cellEdit: true}}
                    
                      noDataIndication="Пользователей нет"
                      striped
                      hover 
                      />         
                </div>    
                <AddOrderModal open={open}
                              setOpen={setOpen}
                              showToast={showToastFiveSec}
                              AddNewOrder={AddNewOrder}
                />      
              </>
          )
        }
        
          </>       
    );
}

export default OrdersTable;

