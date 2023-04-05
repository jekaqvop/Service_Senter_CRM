import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter, selectFilter } from 'react-bootstrap-table2-filter';
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import axios from '../api/axios';
import Confirm from 'react-confirm-bootstrap';

import "./CSS/StylesTable.css";
import AddDeviceModal from '../components/Modals/AddDeviceModal';
import Preloader from '../components/Preloader/Preloader';

let LoginFilter;
let DeviceNameFilter;
let EmailFilter;
let PhoneNumberFilter;


const REGEX = /^[A-zА-я0-9-_\\/\s]{3,23}$/;

const DevicesTable = (props) => {
  const [loading, setLoading] = useState(false);
  const [Devices, setDevices] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  const [open, setOpen] = useState(false);

  const DEVICES_URL = "/api/private/Devices"  
  


 const columns = [{
  dataField: 'id',
  text: 'Id Устройства',  
  isKey: true,    
  sort: true
}, {
  dataField: 'typeDevice',
  text: 'Тип устройства',
  filter: textFilter({
      getFilter: (filter) => {            
        LoginFilter = filter;              
      }            
    }),
    validator: (newValue, row, column) => {
    
      if (!newValue || !REGEX.test(newValue)) {
        return {
          valid: false,
          message: 'Должны быть только цифры и буквы длиной 3-23 символа.'
        };             
      } 
      return true;
    },
    sort: true
}, {
  dataField: 'model',
  text: 'Модель',
  filter: textFilter({
      getFilter: (filter) => {
        DeviceNameFilter = filter;
      }
    }),
    validator: (newValue, row, column) => {          
      if (!newValue || !REGEX.test(newValue)) {
        return {
          valid: false,
          message: 'Должны быть только цифры и буквы длиной 3-23 символа.'
        };             
      } 
      return true;
    },
    sort: true
},{
  dataField: 'serialNumber',
  text: 'Серийный номер',
  filter: textFilter({
      getFilter: (filter) => {
          EmailFilter = filter;
      }
    }),
    validator: (newValue, row, column) => {          
      if (!newValue || !REGEX.test(newValue)) {
        return {
          valid: false,
          message: 'Должны быть только цифры и буквы длиной 3-23 символа.'
        };             
      } 
      return true;
    },
    sort: true
},{
  dataField: 'manufacturer',
  text: 'Производитель',
  filter: textFilter({
      getFilter: (filter) => {
        PhoneNumberFilter = filter;
      }
    }),
    validator: (newValue, row, column) => {          
      if (!newValue || !REGEX.test(newValue)) {
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
  dataField: "id2",
  text: "Remove",
  editable: false,
  formatter: (cellContent, row) => {
    return (
      <Confirm
      onConfirm={() => handleDelete(row.id)}
      body="Вы уверены, что хотите удалить это устройство? Данное действие необратимо!"
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
  LoginFilter('');
  DeviceNameFilter('');
  EmailFilter('');
  PhoneNumberFilter('');
};


const beforeSaveCell = (oldValue, newValue, row, column, done) => {
  const id = row.id;
  const dataField = column.dataField;
  const EditDevices = async (e) => {
    try{
      const response = await axios.put(
        DEVICES_URL + "/" + id + "/" + dataField,  
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
  EditDevices();
  return { async: true };
}
  const handleDelete = async (rowId) => {
    const loadDevices = async () => {
     try{
        const response = await axios.delete(
           DEVICES_URL + "/" + rowId,
           {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
           }
       );              
        
        setDevices(Devices.filter(item => item.id !== rowId));

      }catch(err){
        showToastFiveSec('error', "Не удалось удалить строку с id равным " + rowId);
      }         
    }
    loadDevices();
  };

  const DefaultSorted = [{
    dataField: 'id',
    order: 'desc'
  }];    
    
 
  const onDeleteRows = () => {
    
    const handleSubmit = async () => {
     if(selectedRows.length === 0) {showToastFiveSec('Warning', 'Устройства для удаления не выбраны');}
     else{
      try {
        const response = await axios.post(
            DEVICES_URL + "/DeleteDevices",
          selectedRows,
          {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
          }
        );
        const message = response?.data.messageValue; 
        if(message === "Devices Deleted") {
            setDevices(Devices.filter(item => !selectedRows.includes(item.id)));
            setSelectedRows([]);
        }          
        else {showToastFiveSec('error', 'Не удалось удалить выбранные устройства');} 
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
      const loadDevices = async (e) => {
        try{
           const response = await axios.get(
            DEVICES_URL,
              {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
              }
          );  
          setDevices(response.data);          
          setLoading(false);   
        }catch(err){
          setLoading(false);
        }         
      }    
      
      loadDevices();
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
    setDevices(result);  
  }
   const editCell = {
      mode: 'dbclick' ,
      blurToSave: true,
      beforeSaveCell
   };
   const AddNewDevice = (newDevice) => {  
      setDevices(prevState => [ newDevice, ...prevState]);
  };
    return(
        <>      
        {loading ? (
            <Preloader/>) : (
              <>    
                <div className='tableContainer'>              
                  <Button id='buttonFixPosition' className="btn btn-lg btn-primary" onClick={ handleClick }> Очистить фильтры </Button>
                  <Button id='buttonFixPosition' className="btn btn-lg btn-primary" onClick={() => {setOpen(true)} }> Добавить устройство</Button>
                  <Confirm
                            onConfirm={onDeleteRows}
                            body="Вы уверены, что хотите удалить выбранные устройства? Данное действие необратимо!"
                            confirmText="Подтвердить удаление"
                            title="Подтверждение удаления">
                    <Button id='buttonFixPosition' className="btn btn-lg btn-primary btn-danger"  > Удалить строки </Button>
                  </Confirm>

                  <BootstrapTable 
                      id="tableUsers"
                      keyField='id' 
                      data={ Devices }  
                      columns={ columns } 
                      selectRow={ selectRow }
                     
                      filter={ filterFactory() }
                      defaultSorted={DefaultSorted} 
                      cellEdit={ cellEditFactory(editCell) }
                      onTableChange={ handleTableChange }
                      remote={{cellEdit: true}}
                    
                      noDataIndication="Устройств не найдено"
                      striped
                      hover 
                      />         
                </div>    
                <AddDeviceModal open={open}
                              setOpen={setOpen}
                              showToast={showToastFiveSec}
                              AddNewDevice={AddNewDevice}
                />      
              </>
          )
        }
        
          </>       
    );
}

export default DevicesTable;

