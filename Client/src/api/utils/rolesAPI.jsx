import axios from "../axios";
import { ROLES_ALL_URL } from "../urls/urlsUsers&Roles";

const fetchData = async (url) => {
    try {
      const response = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
  
      const data = response.data;
  
      return data;
    } catch (error) {
      console.error(error);
      throw new Error('An error occurred while fetching the data');
    }
  };
  
  export const getRolesAll = async () => fetchData(ROLES_ALL_URL);