// Chakra imports
import {
  Box,
  Button,
  Flex,
  Icon,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Card from "../../../components/card/Card";
// Custom components
import BarChart from "../../../components/charts/BarChart";
import React, { useEffect, useState } from "react";
import {
  barChartDataConsumption,
  barChartOptionsConsumption,
} from "../../../variables/charts";
import { MdBarChart } from "react-icons/md";
import axios from "../../../api/axios";
import { WeekOrdersUrl } from "../../../api/urls/urlsAnalytics";

export default function WeeklyRevenue(props) {
  const { ...rest } = props;

  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
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

  const [BarChartDataConsumption, setBarChartDataConsumption] = useState([]);
  const [BarChartOptionsConsumption, setBarChartOptionsConsumption] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  
  useEffect(() =>{
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const response = await axios.get(WeekOrdersUrl, {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        });
    
        const data = response?.data;        
        setBarChartDataConsumption([
          {
            name: "Заказ принят",
            data: data.dataAccept,
          },
          {
            name: "Начат ремонт",
            data: data.dataStart,
          },
          {
            name: "Ремонт окончен",
            data: data.dataIssue,
          },
          {
            name: "Заказ завершён",
            data: data.dataComplite,
          },
        ]);
        setBarChartOptionsConsumption({
          chart: {
            stacked: true,
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
              show: false,
              style: {
                colors: "#A3AED0",
                fontSize: "14px",
                fontWeight: "500",
              },
            },
          },
        
          grid: {
            borderColor: "rgba(163, 174, 208, 0.3)",
            show: true,
            yaxis: {
              lines: {
                show: false,
                opacity: 0.5,
              },
            },
            row: {
              opacity: 0.5,
            },
            xaxis: {
              lines: {
                show: false,
              },
            },
          },
          fill: {
            type: "solid",
            colors: ["#5E37FF", "#6AD2FF", "#E1E9F8"],
          },
          legend: {
            show: false,
          },
          colors: ["#5E37FF", "#6AD2FF", "#E1E9F8"],
          dataLabels: {
            enabled: false,
          },
          plotOptions: {
            bar: {
              borderRadius: 10,
              columnWidth: "20px",
            },
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
    <Card align='center' direction='column' w='100%' {...rest}>
      <Flex align='center' w='100%' px='15px' py='10px'>
        <Text
          me='auto'
          color={textColor}
          fontSize='xl'
          fontWeight='700'
          lineHeight='100%'>
          Заказы за неделю
        </Text>
        <Button
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

      <Box h='240px' mt='auto'>
        <BarChart
          chartData={BarChartDataConsumption}
          chartOptions={BarChartOptionsConsumption}
        />
      </Box>
    </Card>}
    </>);
}
