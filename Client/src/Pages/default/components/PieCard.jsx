// Chakra imports
import { Box, Flex, Text, Select, useColorModeValue } from "@chakra-ui/react";
// Custom components
import Card from "../../../components/card/Card";
import PieChart from "../../../components/charts/PieChart";
import { pieChartData, pieChartOptions } from "../../../variables/charts";
import { VSeparator } from "../../../components/separator/Separator";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "../../../api/axios";
import { MounthOrdersUrl } from "../../../api/urls/urlsAnalytics";

export default function Conversion(props) {
  const { ...rest } = props;

  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const cardColor = useColorModeValue("white", "navy.700");
  const cardShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "unset"
  );
  const [PieChartData, setPieChartData] = useState([]);
  const [PieChartOptions, setPieChartOptions] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  var rounded = function(number){
    return +number.toFixed(2);
  }
  
  useEffect(() =>{
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const response = await axios.get(MounthOrdersUrl, {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        });
    
        const data = response?.data;        
        setPieChartData(data);
        setPieChartOptions({
          labels: ["Заказ принят", "Начат ремонт", "Ремонт окончен", "Заказ завершён"],
          colors: ["#4318FF", "#6AD2FF", "#EFF4FB"],
          chart: {
            width: "50px",
          },
          states: {
            hover: {
              filter: {
                type: "none",
              },
            },
          },
          legend: {
            show: false,
          },
          dataLabels: {
            enabled: false,
          },
          hover: { mode: null },
          plotOptions: {
            donut: {
              expandOnClick: false,
              donut: {
                labels: {
                  show: false,
                },
              },
            },
          },
          fill: {
            colors: ["#4318FF", "#6AD2FF", "#EFF4FB"],
          },
          tooltip: {
            enabled: true,
            theme: "dark",
          },
        });

        setIsLoading(false);
      }catch(e){
        setIsLoading(false);
      }
    }
    fetchData();
  },[]);

  return (<>
    {isLoading ? <div className="loading">Загрузка...</div> :
    <Card p='20px' align='center' direction='column' w='100%' {...rest}>
      <Flex
        px={{ base: "0px", "2xl": "10px" }}
        justifyContent='space-between'
        alignItems='center'
        w='100%'
        mb='8px'>
        <Text color={textColor} fontSize='xl' fontWeight='900' mt='4px'>
          Соотношение заказов по статусам за текущий месяц
        </Text>
        {/*<Select
          fontSize='sm'
          variant='subtle'
          defaultValue='monthly'
          width='unset'
          
          fontWeight='700'>
          <option value='daily'>Daily</option>
          <option value='monthly'>Monthly</option>
          <option value='yearly'>Yearly</option>
  </Select>*/}
      </Flex>

      <PieChart
        h='100%'
        w='100%'
        chartData={PieChartData}
        chartOptions={PieChartOptions}
      />
      <Card
        bg={cardColor}
        flexDirection='row'
        boxShadow={cardShadow}
        w='100%'
        p='15px'
        px='20px'
        mt='15px'
        mx='auto'>
        <Flex direction='column' py='5px'>
          <Flex align='center'>
            <Box h='8px' w='8px' bg='brand.500' borderRadius='50%' me='4px' />
            <Text
              fontSize='xs'
              color='secondaryGray.600'
              fontWeight='700'
              mb='5px'>
             Завершённые заказы
            </Text>
          </Flex>
          <Text fontSize='lg' color={textColor} fontWeight='700'>
          {rounded((PieChartData[3])/ (PieChartData[0] + PieChartData[1] + PieChartData[2] + PieChartData[3]) * 100)}
          %
          </Text>
        </Flex>
        <VSeparator mx={{ base: "60px", xl: "60px", "2xl": "60px" }} />
        <Flex direction='column' py='5px' me='10px'>
          <Flex align='center'>
            <Box h='8px' w='8px' bg='#6AD2FF' borderRadius='50%' me='4px' />
            <Text
              fontSize='xs'
              color='secondaryGray.600'
              fontWeight='700'
              mb='5px'>
              Незавершённые заказы
            </Text>
          </Flex>
          <Text fontSize='lg' color={textColor} fontWeight='700'>
            {rounded((PieChartData[0] + PieChartData[1] + PieChartData[2])/ (PieChartData[0] + PieChartData[1] + PieChartData[2] + PieChartData[3]) * 100)}
            %
          </Text>
        </Flex>
      </Card>
    </Card>
}</>);
}
