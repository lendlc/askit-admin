import { useEffect, useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { format } from 'date-fns';
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import useApi from 'src/utils/http';

export const AppointmentListResults = ({ ...rest }) => {
  const [selectedAppointmentIds, setSelectedAppointmentIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const [appointments, setAppointments] = useState([])

  const GetAppointments = async () => {
    const { data, code } = await useApi('GET', '/admin/appointments/')

    if(code >= 200) {
      setAppointments(data)
    }
  }

  useEffect(()=>{
    GetAppointments()
  }, [])

  
  // //?
  // const handleSelectAll = (event) => {
  //   let newSelectedCustomerIds;

  //   if (event.target.checked) {
  //     newSelectedCustomerIds = customers.map((customer) => customer.id);
  //   } else {
  //     newSelectedCustomerIds = [];
  //   }

  //   setSelectedCustomerIds(newSelectedCustomerIds);
  // };

  // const handleSelectOne = (event, id) => {
  //   const selectedIndex = selectedCustomerIds.indexOf(id);
  //   let newSelectedCustomerIds = [];

  //   if (selectedIndex === -1) {
  //     newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds, id);
  //   } else if (selectedIndex === 0) {
  //     newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(1));
  //   } else if (selectedIndex === selectedCustomerIds.length - 1) {
  //     newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(0, -1));
  //   } else if (selectedIndex > 0) {
  //     newSelectedCustomerIds = newSelectedCustomerIds.concat(
  //       selectedCustomerIds.slice(0, selectedIndex),
  //       selectedCustomerIds.slice(selectedIndex + 1)
  //     );
  //   }

  //   setSelectedCustomerIds(newSelectedCustomerIds);
  // };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Tutor
                </TableCell>
                <TableCell>
                  Tutee
                </TableCell>
                <TableCell>
                  Schedule
                </TableCell>
                <TableCell>
                  Duration in Minutes
                </TableCell>
                <TableCell>
                  Description
                </TableCell>
                <TableCell>
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {appointments.slice(0, limit).map((appointment) => (
                <TableRow
                  hover
                  key={appointment.id}
                  selected={selectedAppointmentIds.indexOf(appointment.id) !== -1}
                >
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {appointment.tutee_email}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {appointment.tutor_email}
                  </TableCell>
                   <TableCell>
                    {format(new Date(appointment.tutor_schedule.datetime_start).getTime(), 'MM/dd/yyyy')}
                  </TableCell>
                  <TableCell>
                    {appointment.duration}
                  </TableCell>
                  <TableCell>
                    {appointment.description} 
                  </TableCell>
                  <TableCell>
                    {appointment.status.toUpperCase()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={appointments.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

// CustomerListResults.propTypes = {
//   customers: PropTypes.array.isRequired
// };
