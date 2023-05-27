import {
    Avatar,
    Box,
    Flex,
    FormLabel,
    Icon,
    Select,
    SimpleGrid,
    useColorModeValue,
  } from "@chakra-ui/react";
  // Assets
  import Usa from "../assets/img/dashboards/usa.png";
  // Custom components
  import MiniCalendar from "../components/calendar/MiniCalendar";
  import MiniStatistics from "../components/card/MiniStatistics";
  import IconBox from "../components/icons/IconBox";
  import React from "react";
  import {
    MdAddTask,
    MdAttachMoney,
    MdBarChart,
    MdFileCopy,
  } from "react-icons/md";
  import CheckTable from "./default/components/CheckTable";
  import ComplexTable from "./default/components/ComplexTable";
  import DailyTraffic from "./default/components/DailyTraffic";
  import PieCard from "./default/components/PieCard";
  import Tasks from "./default/components/Tasks";
  import TotalSpent from "./default/components/TotalSpent";
  import WeeklyRevenue from "./default/components/WeeklyRevenue";
  import {
    columnsDataCheck,
    columnsDataComplex,
  } from "./default/variables/columnsData";
  import tableDataCheck from "./default/variables/tableDataCheck.json";
  import tableDataComplex from "./default/variables/tableDataComplex.json";
  import { ChakraProvider } from "@chakra-ui/react/dist/chakra-ui-react.cjs";
  import theme from "../theme/theme";
  import "./CSS/AdminPanel.css";
import { getAverageCeckDay, getAverageCeckMonth, getDiffIncomePrevPerc, getIncomeMonth, getIncomeYear, getOrdersLastMonth, getOrdersLastYear } from "../api/utils/analyticsAPI";
import { useState } from "react";
import { useEffect } from "react";
  
const AdminPanel = () => {
    // Chakra Color Mode
    const brandColor = useColorModeValue("brand.500", "white");
    const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");

    const [averageCheckDay, setAverageCheckDay] = useState(0);
    const [averageCheckMonth, setAverageCheckMonth] = useState(0);
    const [ordersLastMonth, setOrdersLastMonth] = useState(0);
    const [ordersLastYear, setOrdersLastYear] = useState(0);
    const [incomeMonth, setIncomeMonth] = useState(0);
    const [IncomeYear, setIncomeYear] = useState(0);
    const [diffIncomePrevPerc, setDiffIncomePrevPerc] = useState(0);
   
    var rounded = function(number){
        return +number.toFixed(2);
      }

    useEffect(() => {
        async function fetchData() {
          try {
            let data = await getAverageCeckDay();            
            setAverageCheckDay(data);
            data = await getAverageCeckMonth();            
            setAverageCheckMonth(data);
            data = await getOrdersLastMonth();            
            setOrdersLastMonth(data);   
            data = await getOrdersLastYear();            
            setOrdersLastYear(data);   
            data = await getIncomeMonth();            
            setIncomeMonth(data);   
            data = await getIncomeYear();            
            setIncomeYear(data);   
            data = await getDiffIncomePrevPerc();            
            setDiffIncomePrevPerc(data);   

          } catch (error) {
            console.error(error);            
          }
        }
    
        fetchData();
      }, []); 
    return (
        <div className="adminPanel">        
            <ChakraProvider theme={theme}>
            <Box pt={{ base: "130px" }}>
               <div className="miniStatistics">
                <MiniStatistics
                    startContent={
                    <IconBox
                        w='56px'
                        h='56px'
                        bg={boxBg}
                        icon={
                        <Icon w='32px' h='32px' as={MdBarChart} color={brandColor} />
                        }
                    />
                    }
                    name='Средний чек за текущий день'
                    value={rounded(averageCheckDay) + " р."}
                />
                <MiniStatistics
                    startContent={
                    <IconBox
                        w='56px'
                        h='56px'
                        bg={boxBg}
                        icon={
                        <Icon w='32px' h='32px' as={MdAttachMoney} color={brandColor} />
                        }
                    />
                    }
                    name='Средний чек за месяц'
                    value={rounded(averageCheckMonth) + " р."}
                />
                <MiniStatistics 
                    growth={rounded(diffIncomePrevPerc)} 
                    name='Доход за текущий месяц' 
                    
                    value={rounded(incomeMonth) + " р."} 
                    />
                </div>
                <div className="miniStatistics">
                <MiniStatistics                    
                    name="Доход текущий за год"
                    startContent={
                        <IconBox
                            w='56px'
                            h='56px'
                            bg={boxBg}
                            icon={
                            <Icon w='32px' h='32px' as={MdAttachMoney} color={brandColor} />
                            }
                        />
                        }
                    value={IncomeYear + " р."}
                />
                <MiniStatistics
                    startContent={
                    <IconBox
                        w='56px'
                        h='56px'
                        bg='linear-gradient(90deg, #4481EB 0%, #04BEFE 100%)'
                        icon={<Icon w='28px' h='28px' as={MdAddTask} color='white' />}
                    />
                    }
                    name='Выполенные заказы за месяц'
                    value={ordersLastMonth}
                />
                <MiniStatistics
                    startContent={
                    <IconBox
                        w='56px'
                        h='56px'
                        bg={boxBg}
                        icon={
                        <Icon w='32px' h='32px' as={MdFileCopy} color={brandColor} />
                        }
                    />
                    }
                    name='Выполненные заказы за год'
                    value={ordersLastYear}
                />
                </div>
        
                <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px' mb='20px'>
                {/*<TotalSpent />*/}
                    <WeeklyRevenue />
                    <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px'>
                        <DailyTraffic />
                        <PieCard />
                    </SimpleGrid>
                </SimpleGrid>
                <TotalSpent />
                {/*<SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap='20px' mb='20px'>
                <CheckTable columnsData={columnsDataCheck} tableData={tableDataCheck} />
                
                </SimpleGrid>
                <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap='20px' mb='20px'>
                <ComplexTable
                    columnsData={columnsDataComplex}
                    tableData={tableDataComplex}
                />
                <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px'>
                    <Tasks />
                    <MiniCalendar h='100%' minW='100%' selectRange={false} />
                </SimpleGrid>
                </SimpleGrid>*/}
            </Box>
            </ChakraProvider>
        </div>
    );
  }
  

export default AdminPanel;