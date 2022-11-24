import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter, selectFilter } from 'react-bootstrap-table2-filter';
import cellEditFactory from 'react-bootstrap-table2-editor';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import { Button } from 'react-bootstrap';

const selectOptions = {
    0: 'Admin',
    1: 'User',
    2: 'Master'
  };

 const columns = [{
        dataField: 'Id',
        text: 'Id Пользователя',
        sort: true
      }, {
        dataField: 'Login',
        text: 'Логин',
        filter: textFilter({
            getFilter: (filter) => {
              LoginFilter = filter;
            }
          }),
          sort: true
      }, {
        dataField: 'UserName',
        text: 'ФИО',
        filter: textFilter({
            getFilter: (filter) => {
              UserNameFilter = filter;
            }
          }),
          sort: true
      },{
        dataField: 'Email',
        text: 'Электронная почта',
        filter: textFilter({
            getFilter: (filter) => {
                EmailFilter = filter;
            }
          }),
          sort: true
      },{
        dataField: 'PhoneNumber',
        text: 'Номер телефона',
        filter: textFilter({
            getFilter: (filter) => {
              PhoneNumberFilter = filter;
            }
          }),
          sort: true
      },{
        dataField: 'Role',
        text: 'Роль',
        formatter: cell => selectOptions[cell],
        filter: selectFilter({
            options: selectOptions
        }),
        sort: true
      },];

      const DefaultSorted = [{
        dataField: 'Id',
        order: 'desc'
      }];
      
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
      
      const rows = [ {
        Id: 1,
        Login: "jeka1",
        UserName: "Авхачёв Евгений Сергеевич",
        Email: "jeka@mail.com",
        PhoneNumber: "80336810715",
        Role: 0
      },{
        Id: 2,
        Login: "jeka2",
        UserName: "Авхачёв Евгений Сергеевич",
        Email: "jeka@mail.com",
        PhoneNumber: "80336810715",
        Role: 2
      },{
        Id: 3,
        Login: "jeka3",
        UserName: "Авхачёв Евгений Сергеевич",
        Email: "jeka@mail.com",
        PhoneNumber: "80336430715",
        Role: 1
      },{
        Id: 4,
        Login: "jeka4",
        UserName: "Авхачёв Евгений Сергеевич",
        Email: "jeka@mail.com",
        PhoneNumber: "80336810715",
        Role: 1
      },{
        Id: 5,
        Login: "jeka5",
        UserName: "Авхачёв Евгений Сергеевич",
        Email: "jeka@mail.com",
        PhoneNumber: "80336810715",
        Role: 2
      },];

const UsersTable = () => {
   console.log(rows);
    return(
        <>      
         <Button className="btn btn-lg btn-primary" onClick={ handleClick }> Clear all filters </Button>
        <BootstrapTable 
            keyField='Id' 
            data={ rows }  
            columns={ columns } 
            filter={ filterFactory() }
            defaultSorted={DefaultSorted} 
            cellEdit={ cellEditFactory({ 
                mode: 'dbclick' ,
                blurToSave: true
            }) }
            noDataIndication="Пользователей нет"/>
          </>       
    );
}

export default UsersTable;

