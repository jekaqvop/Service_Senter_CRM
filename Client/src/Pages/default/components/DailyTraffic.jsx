import React from "react";

import { useState } from "react";

// Chakra imports
import { Box, Flex, Icon, Text, useColorModeValue } from "@chakra-ui/react";
import BarChart from "../../../components/charts/BarChart";

// Custom components
import Card from "../../../components/card/Card";
// Assets
import { RiArrowUpSFill } from "react-icons/ri";
import axios from "../../../api/axios";
import { useEffect } from "react";
import { DataDailyTrafficUrl } from "../../../api/urls/urlsAnalytics";
import Preloader from "../../../components/Preloader/Preloader";

const DailyTraffic = (props) => {
  const { ...rest } = props;
  const [dataDailyTraffic, setDataDailyTraffic] = useState([]);
  const [BarChartDataDailyTraffic, setBarChartDataDailyTraffic] = useState([]);
  const [BarChartOptionsDailyTraffic, setBarChartOptionsDailyTraffic] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  
useEffect(() =>{
  setIsLoading(true);
  const fetchData = async () => {
    try {
      const response = await axios.get(DataDailyTrafficUrl, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
  
      const data = response?.data;
      setDataDailyTraffic(data);  
      setBarChartDataDailyTraffic( [
        {
          name: "Daily Traffic",
          data: data.counts,
        },
      ]);
    
      setBarChartOptionsDailyTraffic({
        chart: {
          toolbar: {
            show: false,
          },
        },
        tooltip: {
          style: {
            fontSize: "12px",
            fontFamily: undefined,
          },
          onDatasetHover: {
            style: {
              fontSize: "12px",
              fontFamily: undefined,
            },
          },
          theme: "dark",
        },
        xaxis: {
          categories: data.days,
          show: false,
          labels: {
            show: true,
            style: {
              colors: "#A3AED0",
              fontSize: "14px",
              fontWeight: "500",
            },
          },
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
        },
        yaxis: {
          show: false,
          color: "black",
          labels: {
            show: true,
            style: {
              colors: "#CBD5E0",
              fontSize: "14px",
            },
          },
        },
        grid: {
          show: false,
          strokeDashArray: 5,
          yaxis: {
            lines: {
              show: true,
            },
          },
          xaxis: {
            lines: {
              show: false,
            },
          },
        },
        fill: {
          type: "gradient",
          gradient: {
            type: "vertical",
            shadeIntensity: 1,
            opacityFrom: 0.7,
            opacityTo: 0.9,
            colorStops: [
              [
                {
                  offset: 0,
                  color: "#4318FF",
                  opacity: 1,
                },
                {
                  offset: 100,
                  color: "rgba(67, 24, 255, 1)",
                  opacity: 0.28,
                },
              ],
            ],
          },
        },
        dataLabels: {
          enabled: false,
        },
        plotOptions: {
          bar: {
            borderRadius: 10,
            columnWidth: "40px",
          },
        },
      });
    
      
      setIsLoading(false);  
    } catch (error) {
      console.error(error);
      throw new Error('An error occurred while fetching the data');
    }
  };
  fetchData();
},[])
  

var rounded = function(number){
  return +number.toFixed(2);
}
  
  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  return (<>
    {isLoading ? <div className="loading">"Загрузка..."</div> : 
    <Card align='center' direction='column' w='100%' {...rest}>
      <Flex justify='space-between' align='start' px='10px' pt='5px'>
        <Flex flexDirection='column' align='start' me='20px'>
          <Flex w='100%'>
            <Text
              me='auto'
              color='secondaryGray.600'
              fontSize='sm'
              fontWeight='500'>
              Сегодняшний трафик
            </Text>
          </Flex>
          <Flex align='end'>
            <Text
              color={textColor}
              fontSize='34px'
              fontWeight='700'
              lineHeight='100%'>
              {dataDailyTraffic.counts[0]}
            </Text>
            <Text
              ms='6px'
              color='secondaryGray.600'
              fontSize='sm'
              fontWeight='500'>
                {(dataDailyTraffic.counts[0] === 1) ? 'Посетитель' : (dataDailyTraffic.counts[0] > 1 && dataDailyTraffic.counts[0] < 5 ? 'Посетителя' : 'Посетителей')}              
            </Text>
          </Flex>
        </Flex>
        <Flex align='center'>
          <Icon as={RiArrowUpSFill} color={dataDailyTraffic.counts[0] - dataDailyTraffic.counts[1] > 0 ? 'green.500' : 'red:500'} />
          <Text color={(dataDailyTraffic.counts[0] - dataDailyTraffic.counts[1]) < 0 ? 'red.500' : 'green:500'} fontSize='sm' fontWeight='700'>
            {dataDailyTraffic.counts[1] === 0 ? '+100' : ((dataDailyTraffic.counts[0] - dataDailyTraffic.counts[1]) > 0 ? 
            ('+' + rounded((dataDailyTraffic.counts[0] - dataDailyTraffic.counts[1]) / dataDailyTraffic.counts[1] * 100)) :  
            rounded((dataDailyTraffic.counts[0] - dataDailyTraffic.counts[1]) / dataDailyTraffic.counts[1] * 100))}
            %
          </Text>
        </Flex>
      </Flex>
      <Box h='240px' mt='auto'>
        <BarChart
          chartData={BarChartDataDailyTraffic}
          chartOptions={BarChartOptionsDailyTraffic}
        />
      </Box>
    </Card>
  }</>);
}

export default DailyTraffic;