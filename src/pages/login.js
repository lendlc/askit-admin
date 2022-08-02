import Head from 'next/head';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Container, Grid, Link, TextField, Typography } from '@mui/material';
import useApi from 'src/utils/http';
import { useState } from 'react';


const Login = () => {
  const [authError, setAuthError] = useState("")

  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        .email(
          'Must be a valid email')
        .max(255)
        .required('Email is required'),
      password: Yup
        .string()
        .max(255)
        .required('Password is required')
    }),
    onSubmit: async () => {
      formik.setSubmitting(false)

      const payload = {
        "username": formik.values.email,
        "password": formik.values.password
      }

      const { data, code } = await useApi('POST', '/auth/login/', payload)

      if(code == 200 && data.role == '') {
        localStorage.setItem('user', JSON.stringify(data))
        router.reload(window.location.pathname) //force reload?
      }

      else if (code == 400) {
        setAuthError("Invalid Credentials")
      } else {
        setAuthError("Unauthroized Access")
      }
      
      formik.resetForm()
    }
  });

  return (
    <>
      <Head>
        <title>Ask IT - Login</title>
      </Head>
      <Box
        component="main"
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexGrow: 1,
          minHeight: '100%'
        }}
      >
        <Container maxWidth="sm">
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ my: 1 }}>
              <Typography
                color="textPrimary"
                variant="h4"
              >
                Ask IT Admin
              </Typography>
              <Typography
                color="textSecondary"
                gutterBottom
                variant="body2"
              >
                Admin portal for ASK IT mobile and web app
              </Typography>
            </Box>
        
            <TextField
              error={Boolean(formik.touched.email && formik.errors.email)}
              fullWidth
              helperText={formik.touched.email && formik.errors.email}
              label="Email Address"
              margin="normal"
              name="email"
              onBlur={formik.handleBlur}
              onChange={e => {formik.handleChange(e), setAuthError("")}}
              type="email"
              value={formik.values.email}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.password && formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              label="Password"
              margin="normal"
              name="password"
              onBlur={formik.handleBlur}
              onChange={e => {formik.handleChange(e), setAuthError("")}}
              type="password"
              value={formik.values.password}
              variant="outlined"
            />
            <Typography
                color="#ff0000"
                variant="body2"
              >
                {authError}
          </Typography>
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Sign In
              </Button>
            </Box>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Login;
