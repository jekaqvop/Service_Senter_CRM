import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter, selectFilter } from 'react-bootstrap-table2-filter';
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import axios from '../api/axios';
import Confirm from 'react-confirm-bootstrap';

import "./CSS/StylesTable.css";
import AddStafferModal from '../components/Modals/AddStafferModal';
import Preloader from '../components/Preloader/Preloader';
import { getRolesAll } from '../api/utils/rolesAPI';



const LOGIN_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const USER_REGEX = /^(([А-ЯЁA-Z][а-яёa-z']+[\\-\s]?){2,3})$/;
const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PHONENUMBER_REGEX = /^(?:\+375|80)\s?\(?\d\d\)?\s?\d\d(?:\d[\\-\s]\d\d[\\-\s]\d\d|[\\-\s]\d\d[\\-\s]\d\d\d|\d{5})$/;

let LoginFilter2;
let UserNameFilter2;
let EmailFilter2;
let PhoneNumberFilter2;


const StaffersTable = (props) => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  const [open, setOpen] = useState(false);

  const USERS_URL = "/api/private/Staffers";

const [selectOptions, setSelectOptions] = useState([
  {id: 1, roleName: 'User'},
  {id: 2, roleName: 'Admin'},
  {id: 3, roleName: 'Master'}
]);
 
 const columns = [{
  dataField: 'id',
  text: 'Id Сотрудника',  
  isKey: true,    
  sort: true
}, {
  dataField: 'login',
  text: 'Логин',
  filter: textFilter({
      getFilter: (filter) => {            
        LoginFilter2 = filter;              
      }            
    }),
    validator: (newValue, row, column) => {
    
      if (!newValue || !LOGIN_REGEX.test(newValue)) {
        return {
          valid: false,
          message: 'Длина от 4 до 24 символов(только латиница). Должен начинаться с буквы.'
        };             
      } 
      return true;
    },
    sort: true
}, {
  dataField: 'userName',
  text: 'ФИО',
  filter: textFilter({
      getFilter: (filter) => {
        UserNameFilter2 = filter;
      }
    }),
    validator: (newValue, row, column) => {          
      if (!newValue || !USER_REGEX.test(newValue)) {
        return {
          valid: false,
          message: 'ФИО должно содержать 2/3 слова начинающихся с заглавных букв.'
        };             
      } 
      return true;
    },
    sort: true
},{
  dataField: 'email',
  text: 'Электронная почта',
  filter: textFilter({
      getFilter: (filter) => {
          EmailFilter2 = filter;
      }
    }),
    validator: (newValue, row, column) => {          
      if (!newValue || !EMAIL_REGEX.test(newValue)) {
        return {
          valid: false,
          message: 'Электронная почта должна быть в формате name@mail.com'
        };             
      } 
      return true;
    },
    sort: true
},{
  dataField: 'phoneNumber',
  text: 'Номер телефона',
  filter: textFilter({
      getFilter: (filter) => {
        PhoneNumberFilter2 = filter;
      }
    }),
    validator: (newValue, row, column) => {          
      if (!newValue || !PHONENUMBER_REGEX.test(newValue)) {
        return {
          valid: false,
          message: 'Номер должен быть в формате +378/80 xx xxx xx xx или +378/80 xx xxxxxxx'
        };             
      } 
      return true;
    },
    sort: true
},{
  dataField: 'idRole',
  text: 'Роль',
  formatter: cell => selectOptions.find(obj => {
    return obj.id.toString() === cell.toString()
  }).roleName || ' ',
  editor:{
    type: Type.SELECT,
    getOptions: (setOptions, { row, column }) => {
      return selectOptions.map((item, index) => (
       {value: item.id, label: item.roleName}
      ));
    }
    },
  filter: selectFilter({
      options: () => {
        return selectOptions.map((item, index) => (
         {value: item.id, label: item.roleName}
        ))},
  }),
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
      body="Вы уверены, что хотите удалить этого сотрудника? Данный процесс необратим!"
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


const beforeSaveCell = (oldValue, newValue, row, column, done) => {
  const id = row.id;
  const dataField = column.dataField;
  const EditUsers = async (e) => {
    try{
      const response = await axios.put(
      USERS_URL + "/" + id + "/" + dataField,      
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
  EditUsers();
  return { async: true };
}
  const handleDelete = async (rowId) => {
    const deleteUsers = async () => {
     try{
        const response = await axios.delete(
           USERS_URL + "/" + rowId,
           {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
           }
       );              
        
        setUsers(users.filter(item => item.id !== rowId));

      }catch(err){
        showToastFiveSec('error', "Не удалось удалить строку с id равным " + rowId);
      }         
    }
    deleteUsers();
  };

  const DefaultSorted = [{
    dataField: 'id',
    order: 'desc'
  }];    
    

  const handleClick = () => {
    LoginFilter2('');
    UserNameFilter2('');
    EmailFilter2('');
    PhoneNumberFilter2('');
  };
  

  const onDeleteRows = () => {
    
    const handleSubmit = async () => {
     if(selectedRows.length === 0) {showToastFiveSec('Warning', 'сотрудники для удаления не выбраны');}
     else{
      try {
        const response = await axios.post(
          USERS_URL + "/DeleteUsers",
          selectedRows,
          {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
          }
        );
        const message = response?.data.messageValue; 
        if(message === "Users Deleted") {
          setUsers(users.filter(item => !selectedRows.includes(item.id)));
          setSelectedRows([]);
        }          
        else {showToastFiveSec('error', 'Не удалось удалить выбранных сотрудников');} 
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
      const loadUsers = async (e) => {
        try{
           const response = await axios.get(
              USERS_URL,
              {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
              }
          );  
          setUsers(response.data);   
          const dataRoles = await getRolesAll();    
          setSelectOptions(dataRoles);  
          setLoading(false);   
        }catch(err){
          setLoading(false);
          showToastFiveSec('error', 'Не загрузить список сотрудников');
        }         
      }
      
      loadUsers();
     
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);
   
   useEffect(()=>{
    console.log(selectOptions);     
   }, [selectOptions])
   const handleTableChange = (type, { data, cellEdit: { rowId, dataField, newValue } }) => {
   
    const result = data.map((row) => {
      if (row.id === rowId) {
        const newRow = { ...row };
        newRow[dataField] = newValue;
        return newRow;
      }
      return row;
    });
    setUsers(result);  
  }
   const editCell = {
      mode: 'dbclick' ,
      blurToSave: true,
      beforeSaveCell
   };
   const AddNewUser = (newUser) => {  
      setUsers(prevState => [ newUser, ...prevState]);
  };
    return(
        <>      
        {loading ? (
            <Preloader/>) : (
              <>    
                <div className='tableContainer'> 
                <div className='tableContainer'>               
                  <Button className="btn btn-lg btn-primary" onClick={ ()=> handleClick() }> Очистить фильтры </Button>
                  <Button className="btn btn-lg btn-primary" onClick={() => {setOpen(true)} }> Добавить Сотрудника </Button>
                  <Confirm
                            onConfirm={onDeleteRows}
                            body="Вы уверены, что хотите удалить выбранных сотрудников? Данный процесс необратим!"
                            confirmText="Подтвердить удаление"
                            title="Подтверждение удаления">
                    <Button className="btn btn-lg btn-primary btn-danger"  > Удалить выбранных сотрудников </Button>
                  </Confirm>
                </div>
                  <BootstrapTable 
                      id="tableUsers"
                      keyField='id' 
                      data={ users }  
                      columns={ columns } 
                      selectRow={ selectRow }
                     
                      filter={ filterFactory() }
                      defaultSorted={DefaultSorted} 
                      cellEdit={ cellEditFactory(editCell) }
                      onTableChange={ handleTableChange }
                      remote={{cellEdit: true}}
                    
                      noDataIndication="Сотрудников нет"
                      striped
                      hover 
                      />         
                </div>    
                <AddStafferModal open={open}
                              setOpen={setOpen}
                              showToast={showToastFiveSec}
                              AddNewUser={AddNewUser}
                />      
              </>
          )
        }
        
          </>       
    );
}

export default StaffersTable;

