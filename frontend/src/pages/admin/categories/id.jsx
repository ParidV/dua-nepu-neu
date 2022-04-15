import axios from "axios";
import React, { useEffect, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import { Container, Button } from "@material-ui/core";
import { useFormik } from "formik";
import TextField from "@mui/material/TextField";
import * as yup from "yup";
import Grid from "@mui/material/Grid";
import axios_auth from "../../../utils/axios/authenticated";
import CustomAlert from "../../../components/CustomAlert";
import NavBar from "../../../components/admin/navbar/NavBar";
import { useParams, useNavigate } from "react-router-dom";

const validationSchema = yup.object({
  name: yup
    .string("Duhet string")
    .required("Emri Kategorisë është i detyruar")
    .min(2, "Emri Kategorisë duhet të jetë më i gjatë se 2 karaktere"),
});

export default function EditCategory() {
  const [categoryName, setCategoryNameState] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [openSuccess, setOpenSuccess] = React.useState(false);
  const [openError, setOpenError] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  let navigate = useNavigate();
  let { id } = useParams();

  useEffect(() => {
    async function getCategory() {
      axios_auth
        .get(`admin/categories/${id}`)
        .then((res) => {
          if (res.data.success) {
            setCategoryNameState(res.data.category.name);
            setCategoryId(res.data.category.id);
            setLoading(false);
          }
        })
        .catch((err) => {
          if (err.response.status === 404) {
            navigate("/404");
          }
          console.log(err.response.status);
          console.log(err);
          setOpenError(true);
          setLoading(false);
        });
    }
    getCategory();
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: categoryName,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      axios_auth
        .put(`/admin/categories/${categoryId}`, {
          name: values.name,
        })
        .then((res) => {
          if (res.data.success) {
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
  if (loading) {
    return (
      <div>
        <NavBar />
        <Container>
          <h1>Loading...</h1>
        </Container>
      </div>
    );
  }
  return (
    <>
      <NavBar />
      <Snackbar open={openSuccess} autoHideDuration={200}>
        <CustomAlert severity="success" sx={{ width: "100%" }}>
          Kategoria u përditsua me sukses
        </CustomAlert>
      </Snackbar>
      <Snackbar open={openError} autoHideDuration={200}>
        <CustomAlert severity="error" sx={{ width: "100%" }}>
          Pati një problem gjatë përditësimit të kategorisë
        </CustomAlert>
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
            Përditëso
          </Button>
        </Container>
      </form>
    </>
  );
}
