import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import Room from './Room';
import AddRoom from './AddRoom';
import axios from '../../api/axios';
import Preloader from '../Preloader/Preloader';

const ROOMS_URL = "/api/private/rooms"
const Lobby = (props) => {
    const [rooms, setRooms] = useState();    
    const [openAddRoom, setOpenAddRoom] = useState(false);
    const { openChat } = props;
    const [loading, setLoading] = useState(true);
    const loadRooms = async (e) => {
        try{
           const response = await axios.get(
              ROOMS_URL,
              {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
              }
          );  
          setRooms(response.data);          
          setLoading(false);   
        }catch(err){
          setLoading(false);
        }         
      };
      useState(()=>{
        loadRooms();
      }, []);

      const addRoom = (roomName, currUsers) => {
        const CreateNewRoom = async (roomName, currUsers) => {
          const response = await axios.post(
            ROOMS_URL,
            { roomName: roomName, idUsers: currUsers },
            {
              headers: { 'Content-Type': 'application/json' },
              withCredentials: true,
            }
          );
          setRooms(prevState => [...prevState, response.data]);
          setOpenAddRoom(false);
        };
       
          const idCurrUsers = [];
          currUsers.map((item)=>{
              idCurrUsers.push(item.id);
          });
          console.log(idCurrUsers);
          CreateNewRoom(roomName, idCurrUsers);
      }

    return (<>
       {loading ? <Preloader/> : 
        (<>
            <div className='container_contacts'>
             <div className='sc-bcXHqe cAvkWb'>
                <Button className="btn btn-lg btn-primary" onClick={() => setOpenAddRoom(true)}> Создать чат </Button>
                <div className='contacts'>  
                    {rooms.map((item)=>{
                        return <Room id={item.id} openChat={openChat} chatName={item.name} rooms={rooms} setRooms={setRooms}
                        loadRooms={loadRooms}/>
                    })}
                </div>
            </div>   
        </div>         
        <AddRoom open={openAddRoom} 
                 setOpen={setOpenAddRoom}
                 addRoom={addRoom}/>
                 </>)} 
        </>         
    )
}

export default Lobby;