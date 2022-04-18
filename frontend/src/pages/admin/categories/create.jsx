import TextField from "@mui/material/TextField";
import NavBar from "../../../components/admin/navbar/NavBar";
import Grid from "@mui/material/Grid";
import { Container, Button } from "@material-ui/core";
import { useFormik } from "formik";
import * as yup from "yup";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import React from "react";
import axios_auth from "../../../utils/axios/authenticated";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const validationSchema = yup.object({
  name: yup
    .string("Duhet string")
    .required("Emri Kategorisë është i detyruar")
    .min(2, "Emri Kategorisë duhet të jetë më i gjatë se 2 karaktere"),
});

export default function CreateCategory() {
  const [openSuccess, setOpenSuccess] = React.useState(false);
  const [openError, setOpenError] = React.useState(false);
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      axios_auth
        .post(`/admin/categories`, {
          name: values.name,
        })
        .then((res) => {
          if (res.data.success) {
            formik.resetForm();
            setOpenSuccess(true);
            setTimeout(() => {
              setOpenSuccess(false);
            }, 5000);
          } else {
            formik.resetForm();
            setOpenError(true);
            setTimeout(() => {
              setOpenError(false);
            }, 5000);
          }
        })
        .catch((err) => {
          console.log(err);
          formik.resetForm();
          setOpenError(true);
          setTimeout(() => {
            setOpenError(false);
          }, 5000);
        });
    },
  });
  return (
    <>
      <NavBar />

      <Snackbar open={openSuccess} autoHideDuration={200}>
        <Alert severity="success" sx={{ width: "100%" }}>
          Kategoria u shtua me sukses
        </Alert>
      </Snackbar>

      <Snackbar open={openError} autoHideDuration={200}>
        <Alert severity="error" sx={{ width: "100%" }}>
          Kategoria nuk u shtua!
        </Alert>
      </Snackbar>

      <form onSubmit={formik.handleSubmit}>
        <Container>
          <Grid container spacing={12}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Emri"
                name="name"
                variant="outlined"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Grid>
          </Grid>
          <Button
            variant="contained"
            color="primary"
            className="mt-2"
            type="submit"
          >
            Ruaj
          </Button>
        </Container>
      </form>
    </>
  );
}
