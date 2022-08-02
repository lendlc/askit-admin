import Head from 'next/head';
import { Box, Container, Grid } from '@mui/material';
import { DashboardCard } from '../components/dashboard/card';
import { RegistrationData } from '../components/dashboard/registration-data';
import { UserTypes } from '../components/dashboard/user-types';
import { DashboardLayout } from '../components/dashboard-layout';
import { useEffect, useState } from 'react';
import useApi from 'src/utils/http';

const Dashboard = () => {
  const [cardData, setCardData] = useState({})

  const getCardData = async () => {
    const { data, code } = await useApi('GET', '/admin/dashboard/cards/')

    if(code >= 200) {
      setCardData(data)
    }
  }

  useEffect(()=>{
    getCardData()
  },[])

  return <>
    <Head>
      <title>
        Ask IT - Dashboard
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth={false}>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <DashboardCard 
              title='Tutees' 
              count={cardData.tutees}
            />
          </Grid>
          <Grid
            item
            xl={3}
            lg={3}
            sm={6}
            xs={12}
          >
            <DashboardCard 
              title='Tutors' 
              count={cardData.tutors}
            />
          </Grid>
          <Grid
            item
            xl={3}
            lg={3}
            sm={6}
            xs={12}
          >
            <DashboardCard 
              title='Appointments' 
              count={cardData.appointments}
            />
          </Grid>
          <Grid
            item
            xl={3}
            lg={3}
            sm={6}
            xs={12}
          >
            <DashboardCard 
              title='New Users' 
              count={cardData.new_users}
            />
          </Grid>
          <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
            <RegistrationData />
          </Grid>
          <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
            <UserTypes sx={{ height: '100%' }} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
}

Dashboard.getLayout = (page) => ( 
    <DashboardLayout>
      {page}
    </DashboardLayout>
);

export default Dashboard;
