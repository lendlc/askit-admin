import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { AppointmentListResults } from '../components/appointment/appointment-list-results';
import { CustomerListToolbar } from '../components/customer/customer-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';


const Appointments = () => (
  <>
    <Head>
      <title>
        Ask IT - Appointments
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
        <CustomerListToolbar title='Appointments'/> 
        <Box sx={{ mt: 3 }}>
          <AppointmentListResults/> 
        </Box>
      </Container>
    </Box>
  </>
);

Appointments.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Appointments;
