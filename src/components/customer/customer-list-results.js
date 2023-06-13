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
import { cus_data } from '../../__mocks__/customers';
import useApi from 'src/utils/http';

const rowsPerPageOptions = [5, 10, 25];

export const CustomerListResults = ({ ...rest }) => {
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);

  const [customers, setCustomers] = useState([])

  const GetUser = async () => {
    const { data, code } = await useApi('GET', '/admin/users/')

    if(code >= 200) {
      setCustomers(data)
    }
  }

  useEffect(()=>{
    GetUser()
  }, [])

  
  //?
  const handleSelectAll = (event) => {
    let newSelectedCustomerIds;

    if (event.target.checked) {
      newSelectedCustomerIds = customers.map((customer) => customer.id);
    } else {
      newSelectedCustomerIds = [];
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedCustomerIds.indexOf(id);
    let newSelectedCustomerIds = [];

    if (selectedIndex === -1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds, id);
    } else if (selectedIndex === 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(1));
    } else if (selectedIndex === selectedCustomerIds.length - 1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, selectedIndex),
        selectedCustomerIds.slice(selectedIndex + 1)
      );
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

   const handleChangePage = (event, newPage) => {
     setPage(newPage);
   };

   const handleChangeRowsPerPage = (event) => {
     setRowsPerPage(parseInt(event.target.value, 10));
     setPage(0);
   };

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Full Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Last Login</TableCell>
                <TableCell>Date Registered</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((customer) => (
                  <TableRow
                    hover
                    key={customer.id}
                    selected={selectedCustomerIds.indexOf(customer.id) !== -1}
                  >
                    <TableCell>
                      <Box
                        sx={{
                          alignItems: "center",
                          display: "flex",
                        }}
                      >
                        <Typography color="textPrimary" variant="body1">
                          {customer.get_full_name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{customer.email}</TableCell>
                    <TableCell>{customer.role.toUpperCase()}</TableCell>
                    <TableCell>
                      {customer.last_login
                        ? format(new Date(customer.date_joined).getTime(), "MM/dd/yyyy - HH:MM")
                        : "N/A"}
                    </TableCell>
                    <TableCell>
                      {format(new Date(customer.date_joined).getTime(), "MM/dd/yyyy")}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        count={customers.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Card>
  );
};

// CustomerListResults.propTypes = {
//   customers: PropTypes.array.isRequired
// };
