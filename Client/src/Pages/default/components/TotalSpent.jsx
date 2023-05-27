// Chakra imports
import {
  Box,
  Button,
  Flex,
  Icon,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import Card from "../../../components/card/Card";
import LineChart from "../../../components/charts/LineChart";
import React from "react";
import { MdBarChart, MdOutlineCalendarToday } from "react-icons/md";
// Assets
import { RiArrowUpSFill } from "react-icons/ri";
import {
  lineChartDataTotalSpent,
  LineChartOptionsTotalSpent,
} from "../../../variables/charts";
import { useEffect } from "react";
import { useState } from "react";
import axios from "../../../api/axios";
import { MounthOrdersUrl, YearOrdersPriceUrl } from "../../../api/urls/urlsAnalytics";

export default function TotalSpent(props) {
  const { ...rest } = props;

  // Chakra Color Mode

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = useColorModeValue("secondaryGray.600", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const iconColor = useColorModeValue("brand.500", "white");
  const bgButton = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const bgHover = useColorModeValue(
    { bg: "secondaryGray.400" },
    { bg: "whiteAlpha.50" }
  );
  const bgFocus = useColorModeValue(
    { bg: "secondaryGray.300" },
    { bg: "whiteAlpha.100" }
  );

  const [data, setData] = useState([]);
  const [LineChartDataTotalSpent, setLineChartDataTotalSpent] = useState([]);
  const [LineChartOptionsTotalSpent, setLineChartOptionsTotalSpent] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  
  useEffect(() =>{
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const response = await axios.get(YearOrdersPriceUrl, {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        });
    
        const data = response?.data;  
        setData(data);      
        setLineChartDataTotalSpent([ {
          name: "Revenue",
          data: data.counts,
        }]);
        setLineChartOptionsTotalSpent({
          chart: {
            toolbar: {
              show: false,
            },
            dropShadow: {
              enabled: true,
              top: 13,
              left: 0,
              blur: 10,
              opacity: 0.1,
              color: "#4318FF",
            },
          },
          colors: ["#4318FF", "#39B8FF"],
          markers: {
            size: 0,
            colors: "white",
            strokeColors: "#7551FF",
            strokeWidth: 4,
            strokeOpacity: 0.9,
            strokeDashArray: 0,
            fillOpacity: 1,
            discrete: [],
            shape: "circle",
            radius: 2,
            offsetX: 0,
            offsetY: 0,
            showNullDataPoints: true,
          },
          tooltip: {
            theme: "dark",
          },
          dataLabels: {
            enabled: false,
          },
          stroke: {
            curve: "smooth",
            type: "line",
          },
          xaxis: {
            type: "numeric",
            categories: data.mounth,
            labels: {
              style: {
                colors: "#A3AED0",
                fontSize: "11px",
                fontWeight: "500"        
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
          },
          legend: {
            show: false,
          },
          grid: {
            show: false,
            column: {
              color: ["#7551FF", "#39B8FF"],
              opacity: 0.5,
            },
          },
          color: ["#7551FF", "#39B8FF"],
        });

        setIsLoading(false);
      }catch(e){
        setIsLoading(false);
      }
    };
    fetchData();
  },[]);

  return (<>
    {isLoading ? <div className="loading">Загрузка...</div> :
    <Card
      justifyContent='center'
      align='center'
      direction='column'
      w='100%'
      mb='0px'
      {...rest}>
      <Flex justify='space-between' ps='0px' pe='20px' pt='5px'>
        <Flex align='center' w='100%'>
          <Button
            bg={boxBg}
            fontSize='sm'
            fontWeight='500'
            color={textColorSecondary}
            borderRadius='7px'>
            <Icon
              as={MdOutlineCalendarToday}
              color={textColorSecondary}
              me='4px'
            />
            Выручка за год
          </Button>
          <Button
            ms='auto'
            align='center'
            justifyContent='center'
            bg={bgButton}
            _hover={bgHover}
            _focus={bgFocus}
            _active={bgFocus}
            w='37px'
            h='37px'
            lineHeight='100%'
            borderRadius='10px'
            {...rest}>
            <Icon as={MdBarChart} color={iconColor} w='24px' h='24px' />
          </Button>
        </Flex>
      </Flex>
      <Flex w='100%' flexDirection={{ base: "column", lg: "row" }}>
        <Flex flexDirection='column' me='20px' mt='28px'>
          <Text
            color={textColor}
            fontSize='34px'
            textAlign='start'
            fontWeight='700'
            lineHeight='100%'>
            {data.counts.reduce((acc, number) => acc + number, 0)}р.
          </Text>
          {/*<Flex align='center' mb='20px'>            
            <Flex align='center'>
              <Icon as={RiArrowUpSFill} color='green.500' me='2px' mt='2px' />
              <Text color='green.500' fontSize='sm' fontWeight='700'>
                +2.45%
              </Text>
            </Flex>
          </Flex>*/}

        
        </Flex>
        <Box minH='260px' minW='75%' mt='auto'>
          <LineChart
            chartData={LineChartDataTotalSpent}
            chartOptions={LineChartOptionsTotalSpent}
          />
        </Box>
      </Flex>
    </Card>}
  </>);
}
