import axios from "../axios";
import {AverageCeckDayUrl, AverageCeckMonthUrl, IncomeMonthUrl, IncomeYearUrl,  OrdersLastMonthUrl,
   OrdersLastYearUrl, DiffIncomePrevPercUrl} from "../urls/urlsAnalytics";

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
  
  export const getAverageCeckDay = async () => fetchData(AverageCeckDayUrl);
  
  export const getAverageCeckMonth = async () => fetchData(AverageCeckMonthUrl);
  
  export const getIncomeMonth = async () => fetchData(IncomeMonthUrl);
  
  export const getIncomeYear = async () => fetchData(IncomeYearUrl);
  
  export const getOrdersLastMonth = async () => fetchData(OrdersLastMonthUrl);
  
  export const getOrdersLastYear = async () => fetchData(OrdersLastYearUrl);
  
  export const getDiffIncomePrevPerc = async () => fetchData(DiffIncomePrevPercUrl);