import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../redux/user/userSlice";

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(1, "Password should be of minimum 1 characters length")
    .required("Password is required"),
});

const loginLogic = (values) => {
  return axios.post(`${process.env.REACT_APP_API_URL}/login`, values);
};

export default function Login() {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openSuccessMessage, setOpenSuccessMessage] = useState("");
  const [openError, setOpenError] = useState(false);
  const [openErrorMessage, setOpenErrorMessage] = useState("");
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      loginLogic(values)
        .then((res) => {
          if (res.status === 200) {
            // set localstorage
            localStorage.setItem("token", res.data.accessToken);
            console.log(res.data);
            setOpenSuccessMessage("Login Successful");
            dispatch(login(res.data.user));
            navigate("/");
          }
          console.log(res.data);
        })
        .catch((err) => {
          if (err.response.data.status === 1001) {
            setOpenErrorMessage("T?? dh??nat nuk jan?? t?? sakta");
          } else if (err.response.data.status === 1002) {
            setOpenErrorMessage("Email ose Fjal??kalimi nuk jan?? t?? sakta");
          } else {
            setOpenErrorMessage("Di??ka nuk shkoi si?? duhet :(");
          }

          setOpenError(true);
          setTimeout(() => {
            setOpenError(false);
            setOpenErrorMessage("");
          }, 5000);
        });
    },
  });

  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/random)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Snackbar open={openSuccess} autoHideDuration={200}>
          <Alert severity="success" sx={{ width: "100%" }}>
            {openSuccessMessage}
          </Alert>
        </Snackbar>

        <Snackbar open={openError} autoHideDuration={200}>
          <Alert severity="error" sx={{ width: "100%" }}>
            {openErrorMessage}
          </Alert>
        </Snackbar>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              onSubmit={formik.handleSubmit}
              method="post"
              // noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                fullWidth
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />

              <Button
                type="submit"
                fullWidth
                variant="outlined"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  {/* <Link href="#" variant="body2"> */}
                  {/* Forgot password? */}
                  {/* </Link> */}
                </Grid>
                <Grid item>
                  {/* <Link href="/auth/register" variant="body2">
                    <a>{"Don't have an account? Sign Up"}</a>
                  </Link> */}
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
