import React from 'react';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import { useState, useEffect } from 'react';
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Picky } from 'react-picky';
import 'react-picky/dist/picky.css'; 
import axios from '../../api/axios';
import './CSS_Chat/addRoom.css';

const REGEX = /^[A-ЯА-яA-Za-zёЁ0-9\s]{3,20}$/;
const USERS_URL = "/api/private/Users";

const AddRoom = (props) => {
     
  const [roomName, setroomName] = useState('');
  const [validRoomName, setvalidRoomName] = useState(false);
  const [roomNameFocus, setRoomNameFocus] = useState(false)
  const [users, setUsers] = useState([]);
  const [currUsers, setCurrUsers] = useState([]);

  useEffect(() => {
    setvalidRoomName(REGEX.test(roomName));  
  }, [roomName]);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await axios.get(
          USERS_URL,
          {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
          }
        );  
        setUsers(response.data);             
      } catch (err) {
        console.log(err);
      }         
    }
    loadUsers();
  }, []);

  const handleClose = () => {
    props.setOpen(false);
  };
  
  const handleSubmit = async () => {
    try {
        props.addRoom(roomName, currUsers);
    } catch (err) {
      console.log(err);
    }
  }  
 
  return (
    <div>    
      <Dialog open={props.open} onClose={handleClose}>
        <DialogTitle>
          Создание чата
        </DialogTitle>
        <DialogContent>
          <div className='addRoomModal'>
            <section>           
              <form>               
                <div className="text-field">
                  <label htmlFor="roomName" className="text-field__label">
                    Название чата
                    <FontAwesomeIcon
                      icon={faCheck}
                      className={validRoomName ? 'valid' : 'hide'}
                    />
                    <FontAwesomeIcon
                      icon={faTimes}
                      className={validRoomName || !roomName ? 'hide' : 'invalid'}
                    />
                  </label>
                  <input
                    className="text-field__input" 
                    type="text" 
                    name="roomName" 
                    id="roomName" 
                    placeholder="roomName"
                    autoComplete="off"
                    onChange={(e) => setroomName(e.target.value)}
                value={roomName}
                required
                aria-invalid={validRoomName ? 'false' : 'true'}
                aria-describedby="uidnote"
                onFocus={() => setRoomNameFocus(true)}
                onBlur={() => setRoomNameFocus(false)}
              />
              <p
                id="uidnote"
                className={
                  roomNameFocus && roomName && !validRoomName ? 'instructions' : 'offscreen'
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                Должны быть только цифры и буквы длиной 2-20 символов.
              </p>
              </div> 
              <div className="text-field">
              <Picky
                        options={users}
                        labelKey="userName"                       
                        valueKey="id"
                        multiple={true}
                        includeFilter                       
                        value={currUsers}                        
                        onChange={setCurrUsers}
                        render={({
                            style,
                            isSelected,
                            item,
                            selectValue,
                            labelKey,                           
                            valueKey,
                            multiple,
                          }) => {
                            return (
                              <li
                              style={style}                                
                                className={(isSelected ? 'selected' : '') } // required to indicate is selected
                                key={item[valueKey]} // required
                                onClick={() => selectValue(item)}
                              >                               
                                <input type="checkbox" checked={isSelected} readOnly />
                                <span >{item[labelKey]}</span>
                              </li>
                            );
                          }}
                        />
                </div>           
            </form>
          </section>
          </div>         
        </DialogContent>
        <DialogActions>
          <Button  onClick={handleClose} color="primary">
           Закрыть
          </Button>
          <Button disabled={!validRoomName || currUsers.length === 0}
                  onClick={handleSubmit} color="primary" autoFocus>
           Создать чат
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
  
export default AddRoom;