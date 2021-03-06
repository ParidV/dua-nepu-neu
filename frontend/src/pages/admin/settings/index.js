import React, { useState, useEffect } from "react";
import NavBar from "../../../components/admin/navbar/NavBar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import { useFormik } from "formik";
import * as yup from "yup";
import Snackbar from "@mui/material/Snackbar";
import FormControl from "@mui/material/FormControl";
import { FormHelperText } from "@mui/material";
import axios_auth from "../../../utils/axios/authenticated";
import CustomAlert from "../../../components/CustomAlert";
import { format } from "date-fns";
import { useDispatch } from "react-redux";
import { login, update_data } from "../../../redux/user/userSlice";
function AdminSettings() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openSuccess, setOpenSuccess] = React.useState(false);
  const [openError, setOpenError] = React.useState(false);
  const [messageError, setMessageError] = React.useState("");
  const [messageSuccess, setMessageSuccess] = React.useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios_auth.get(`/user/current_user_data`);
        setData(res.data.user);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setData([]);

        setTimeout(() => {
          setMessageError("Pati Nje problem :(");
          setOpenError(true);
        }, 3000);
        setMessageError("");
        setOpenError(false);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    validateOnChange: false,
    initialValues: {
      name: data.name,
      surname: data.surname,
      email: data.email,
      phone: data.phone,
      country: data.country,
      city: data.city,
      address: data.address,
      zip: data.zip,
      dob: data.dob,
    },
    validationSchema: yup.object({
      name: yup
        .string("Duhet string")
        .required("Emri Kategoris?? ??sht?? i detyruar")
        .min(2, "Emri Kategoris?? duhet t?? jet?? m?? i gjat?? se 2 karaktere"),
      surname: yup
        .string("Duhet string")
        .required("Mbiemri ??sht?? i detyruar")
        .min(3, "Mbiemri duhet t?? jet?? m?? i gjat?? se 2 karaktere"),
      email: yup
        .string("Duhet string")
        .required("Email ??sht?? i detyruar")
        .email("Email nuk ??sht?? i sakt??")
        .test(
          "Unique Email",
          "Email ??sht?? n?? p??rdorim nga dikush tjet??r", // <- key, message
          function (value) {
            return new Promise((resolve, reject) => {
              axios_auth
                .get(`user/email_check/${formik.values.email}`)
                .then((res) => {
                  if (res.data.success) {
                    resolve(true);
                  } else {
                    resolve(false);
                  }
                })
                .catch((error) => {
                  setTimeout(() => {
                    setMessageError("Pati Nje problem :(");
                    setOpenError(true);
                  }, 3000);
                  setMessageError("");
                });
            });
          }
        ),
      phone: yup
        .string("Duhet string")
        .required("Numri i telefonit ??sht?? i detyruar")
        .min(6, "Numri i telefonit duhet t?? jet?? m?? i gjat?? se 6 karaktere")
        .max(13, "Numri i telefonit duhet t?? jet?? m?? i gjat?? se 13 karaktere"),
      country: yup.string("Duhet string").required("Shteti ??sht?? i detyruar"),
      city: yup
        .string("Duhet string")
        .required("Qyteti ??sht?? i detyruar")
        .min(3, "Qyteti duhet t?? jet?? m?? i gjat?? se 3 karaktere"),
      address: yup
        .string("Duhet string")
        .required("Adresa ??sht?? i detyruar")
        .min(3, "Adresa duhet t?? jet?? m?? i gjat?? se 3 karaktere"),
      dob: yup.date().required("Data e lindjes ??sht?? i detyruar"),
      zip: yup.number("Duhet num??r").nullable(),
    }),
    onSubmit: (values) => {
      setLoading(true);
      axios_auth
        .put(`/admin/settings/update_data`, values)
        .then((res) => {
          if (res.data.success && res.status === 200) {
            axios_auth
              .post(`/admin/settings/generate_new_token`)
              .then((res) => {
                console.log(res);
                if (res.data.success && res.status === 200) {
                  localStorage.removeItem("token");
                  localStorage.setItem("token", res.data.new_token);
                  dispatch(update_data(res.data.user));
                  setTimeout(() => {
                    setLoading(false);
                    setMessageSuccess("T?? dh??nat u ndryshuan me sukses");
                    setOpenSuccess(true);
                  }, 3000);
                  setMessageSuccess("");
                  setOpenSuccess(false);
                }
              })
              .catch((error) => {
                setLoading(false);
                setTimeout(() => {
                  setMessageError("Pati Nje problem :(");
                  setOpenError(true);
                }, 3000);
                setMessageError("");
                setOpenError(false);
              });
          } else {
            setLoading(false);
            setOpenError(true);
            setMessageError("Pati nje problem ");
            setTimeout(() => {
              setOpenError(false);
              setMessageError("");
            }, 5000);
          }
        })
        .catch((err) => {
          setLoading(false);
          console.log(err + " MSG ");
          setOpenError(true);
          setMessageError("Pati nje problem");
          setTimeout(() => {
            setOpenError(false);
            setMessageError("");
          }, 5000);
        });
    },
  });
  return (
    <>
      <NavBar />
      <Snackbar open={loading}>
        <CustomAlert severity="info" sx={{ width: "100%" }}>
          Loading
        </CustomAlert>
      </Snackbar>
      <Snackbar open={openSuccess} autoHideDuration={200}>
        <CustomAlert severity="success" sx={{ width: "100%" }}>
          {messageSuccess}
        </CustomAlert>
      </Snackbar>

      <Snackbar open={openError} autoHideDuration={200}>
        <CustomAlert severity="error" sx={{ width: "100%" }}>
          {messageError}
        </CustomAlert>
      </Snackbar>
      <form onSubmit={formik.handleSubmit}>
        <Container>
          <Grid
            padding={3}
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            <Grid
              padding={3}
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              <Grid item xs={12} sm={4} md={4}>
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  variant="outlined"
                  inputLabelProps={{
                    shrink: true,
                  }}
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <TextField
                  fullWidth
                  label="Mbiemri"
                  name="surname"
                  variant="outlined"
                  value={formik.values.surname}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.surname && Boolean(formik.errors.surname)
                  }
                  helperText={formik.touched.surname && formik.errors.surname}
                />
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  variant="outlined"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <TextField
                  fullWidth
                  label="Telefoni"
                  name="phone"
                  variant="outlined"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  error={formik.touched.phone && Boolean(formik.errors.phone)}
                  helperText={formik.touched.phone && formik.errors.phone}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <TextField
                  fullWidth
                  label="Shteti"
                  name="country"
                  variant="outlined"
                  value={formik.values.country}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.country && Boolean(formik.errors.country)
                  }
                  helperText={formik.touched.country && formik.errors.country}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <TextField
                  fullWidth
                  label="Qyteti"
                  name="city"
                  variant="outlined"
                  value={formik.values.city}
                  onChange={formik.handleChange}
                  error={formik.touched.city && Boolean(formik.errors.city)}
                  helperText={formik.touched.city && formik.errors.city}
                />
              </Grid>{" "}
              <Grid item xs={12} sm={12} md={4}>
                <TextField
                  fullWidth
                  label="Adresa"
                  name="address"
                  variant="outlined"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.address && Boolean(formik.errors.address)
                  }
                  helperText={formik.touched.address && formik.errors.address}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <TextField
                  fullWidth
                  label="Zip"
                  name="zip"
                  variant="outlined"
                  value={formik.values.zip}
                  onChange={formik.handleChange}
                  error={formik.touched.zip && Boolean(formik.errors.zip)}
                  helperText={formik.touched.zip && formik.errors.zip}
                />
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <FormControl fullWidth>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                      format="yyyy-MM-dd"
                      inputVariant="outlined"
                      id="date-picker-dialog"
                      label="Dit??lindja"
                      fullWidth
                      name="dob"
                      onChange={(val) => {
                        if (val) {
                          formik.setFieldValue(
                            "dob",
                            format(val, "yyyy-MM-dd")
                          );
                        } else {
                          formik.setFieldValue("dob", "");
                        }
                      }}
                      renderInput={(params) => <TextField {...params} />}
                      onBlur={formik.handleBlur}
                      value={formik.values.dob}
                      error={formik.errors.dob && formik.touched.dob}
                    />
                  </LocalizationProvider>
                  <FormHelperText style={{ color: "#D32F2F" }}>
                    {formik.errors.dob &&
                      formik.touched.dob &&
                      formik.errors.dob}
                  </FormHelperText>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={12} md={12}>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              p={1}
              mb={3}
              bgcolor="background.paper"
              boxShadow={3}
            >
              <Button
                variant="contained"
                color="primary"
                className="mt-2"
                type="submit"
                style={{
                  backgroundColor: "#2196f3",
                }}
              >
                P??rdit??so
              </Button>
            </Box>
          </Grid>
        </Container>
      </form>
    </>
  );
}

export default AdminSettings;
