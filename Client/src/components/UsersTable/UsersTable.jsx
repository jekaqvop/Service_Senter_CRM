import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter, selectFilter } from 'react-bootstrap-table2-filter';
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import axios from '../../api/axios';



const selectOptions = {
    2: 'Admin',
    1: 'User',
    3: 'Master'
  };

const LOGIN_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const USER_REGEX = /^(([А-ЯЁA-Z][а-яёa-z']+[\\-\s]?){2,3})$/;
const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PHONENUMBER_REGEX = /^(?:\+375|80)\s?\(?\d\d\)?\s?\d\d(?:\d[\\-\s]\d\d[\\-\s]\d\d|[\\-\s]\d\d[\\-\s]\d\d\d|\d{5})$/;

 const columns = [{
        dataField: 'id',
        text: 'Id Пользователя',      
        sort: true
      }, {
        dataField: 'login',
        text: 'Логин',
        filter: textFilter({
            getFilter: (filter) => {            
              LoginFilter = filter;              
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
              UserNameFilter = filter;
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
                EmailFilter = filter;
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
              PhoneNumberFilter = filter;
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
        formatter: cell => selectOptions[cell],
        editor:{
          type: Type.SELECT,
          options:[
            {label: "User",value:1 },   
            {label: "Admin",value:2 },
            {label: "Master",value:3 }
            ]
          },
        filter: selectFilter({
            options: selectOptions
        }),
        sort: true
      },];

      const DefaultSorted = [{
        dataField: 'Id',
        order: 'desc'
      }];
      
      const selectRow = {
        mode: 'checkbox',
        clickToSelect: false,
        style: { backgroundColor: '#fff8dc' }
      };     

      let LoginFilter;
      let UserNameFilter;
      let EmailFilter;
      let PhoneNumberFilter;

      const handleClick = () => {
        LoginFilter('');
        UserNameFilter('');
        EmailFilter('');
        PhoneNumberFilter('');
      };
      
const GETUSERS_URL = "/api/Users"

const beforeSaveCell = (oldValue, newValue, row, column, done) => {
console.log("oldValue: " + oldValue);
console.log("newValue: " + newValue);
console.log("rowid: " + row.id);
console.log("cel: " + row.userName);
console.log("rowid: " + row.id);
console.log("column: " + JSON.stringify(column));
const id = row.id;
const dataField = column.dataField;
const loadUsers = async (e) => {
  try{
     const response = await axios.put(
        GETUSERS_URL + "/" + id + "/" + newValue + "/" + dataField,
        
				{
					headers: { 'Content-Type': 'application/json' },
					withCredentials: true,
				}
    ); 
     
    done(true);
  }catch(err){
    done(false);
  }         
}
loadUsers();
  console.log("celedit: " + row.userName);
  return { async: true };
}

const UsersTable = () => {
  
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
   useEffect(()=>{
    setLoading(true);
      const loadUsers = async (e) => {
        try{
           const response = await axios.get(
              GETUSERS_URL
          );  
          setUsers(response.data);          
          setLoading(false);   
        }catch(err){
          setLoading(false);
        }         
      }
      loadUsers();
      
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
    setUsers(result);  
  }
   const editCell = {
      mode: 'dbclick' ,
      blurToSave: true,
      beforeSaveCell
   }
    return(
        <>      
        {loading ? (
            <h4>Loading...</h4>) : (
              <>
          <Button className="btn btn-lg btn-primary" onClick={ handleClick }> Clear all filters </Button>
          <BootstrapTable 
              keyField='id' 
              data={ users }  
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
              </>
          )
        }
          </>       
    );
}

export default UsersTable;

