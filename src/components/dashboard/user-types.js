import { Doughnut } from 'react-chartjs-2';
import { Box, Card, CardContent, CardHeader, Divider, Typography, useTheme } from '@mui/material';
import useApi from 'src/utils/http';
import { useEffect, useState } from 'react';

export const UserTypes = (props) => {
  const theme = useTheme();

  const [chartData, setChartData] = useState({})

  const GetChartData = async () => {
    const { data, code } = await useApi('GET', '/admin/dashboard/donut_chart/')

    if(code >= 200) {
      setChartData(data)
    }
  }

  useEffect(()=>{
    GetChartData()
  },[])

  const data = {
    datasets: [
      {
        data: chartData.donut,
        backgroundColor: ['#293462', '#FEB139'],
        borderWidth: 2,
        borderColor: '#FFFFFF',
        hoverBorderColor: '#FFFFFF'
      }
    ],
    labels: ['Tutees', 'Tutors']
  };

  const options = {
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    legend: {
      display: false
    },
    maintainAspectRatio: false,
    responsive: true,
    tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  };

  const devices = [
    {
      title: 'Tutees',
      value: chartData.tutee_percentage,
    },
    {
      title: 'Tutors',
      value: chartData.tutor_percentage,  
    },
  ];

  return (
    <Card {...props}>
      <CardHeader title="User Types" />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 300,
            position: 'relative'
          }}
        >
          <Doughnut
            data={data}
            options={options}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pt: 2
          }}
        >
          {devices.map(({
            color,
            title,
            value
          }) => (
            <Box
              key={title}
              sx={{
                p: 1,
                textAlign: 'center'
              }}
            >
              <Typography
                color="textPrimary"
                variant="body1"
              >
                {title}
              </Typography>
              <Typography
                style={{ color }}
                variant="h4"
              >
                {value}
                %
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};
