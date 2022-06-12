import * as React from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import { useFormik } from "formik";
import * as yup from "yup";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import axios from "axios";
import NavBar from "../../../components/company/Navbar/Navbar";
import FormControl from "@mui/material/FormControl";
import { FormHelperText } from "@mui/material";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const validationSchema = yup.object({
  title: yup
    .string("String required")
    .required("Titulli është i detyrueshëm")
    .min(2, "Titulli duhet të jetë më i gjatë se 2 karaktere"),
  categoryId: yup
    .number("Vlera nuk është e vlefshme")
    .required("Kategoria është e detyrueshme"),
  type: yup
    .number("Vlera nuk është e vlefshme")
    .required("Tipi është i detyrueshëm"),
  place_of_work: yup
    .number("Vlera nuk është e vlefshme")
    .required("Vendi ku do punohet është i detyrueshëm"),
  start_of_application: yup
    .date()
    .min(
      new Date(new Date().setDate(new Date().getDate() - 1)),
      "Data e fillimit duhet të jetë minimumi sot ose ditët në vazhdim"
    )
    .required("Data e fillimit të aplikimit është e detyrueshme"),
  end_of_application: yup
    .date()
    .min(new Date(), "Data e mbarimit duhet të jetë më e madhe se tani")
    .when(
      "start_of_application",
      (start_of_application, schema) =>
        start_of_application && schema.min(start_of_application),
      "Data e mbarimit të aplikimit duhet të jetë më e madhe se data e fillimit"
    )
    .required("Data e mbarimit të aplikimit është e detyrueshme"),
  country: yup.string().required("Shteti është i detyrueshëm"),
  city: yup.string().required("Qyteti është i detyrueshëm"),
  salary: yup.number().min(0, "Minimumi i pagës është 0"),
  previous_experience: yup
    .number()
    .min(0, "Minimumi i viteve të përvojës është 0"),
  description: yup.string().max(400, "Përshkrimi jo më shumë se 400 karaktere"),
  requirements: yup.string().max(400, "Kërkesat jo më shumë se 400 karaktere"),
  notes: yup.string().max(400, "Shënimet jo më shumë se 400 karaktere"),
  salary: yup.number().min(0, "Minimumi i pagës është 0"),
});

export default function CreateJob() {
  const [openSuccess, setOpenSuccess] = React.useState(false);
  const [openError, setOpenError] = React.useState(false);
  const formik = useFormik({
    initialValues: {
      title: "",
      categoryId: "",
      type: "",
      place_of_work: "",
      start_of_application: new Date(),
      end_of_application: new Date(),
      country: "",
      city: "",
      wage: "",
      previous_experience: "",
      description: "",
      requirements: "",
      notes: "",
      coverLetter: 0,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      //   const req = axios
      //     .post(`${process.env.API_URL}/company/jobs`, values)
      //     .then((res) => {
      //       if (res.data.success) {
      //         formik.resetForm();
      //         setOpenSuccess(true);
      //         setTimeout(() => {
      //           setOpenSuccess(false);
      //         }, 5000);
      //       } else {
      //         formik.resetForm();
      //         setOpenError(true);
      //         setTimeout(() => {
      //           setOpenError(false);
      //         }, 5000);
      //       }
      //     })
      //     .catch((err) => {
      //       console.log(err);
      //       formik.resetForm();
      //       setOpenError(true);
      //       setTimeout(() => {
      //         setOpenError(false);
      //       }, 5000);
      //     });
    },
  });
  return (
    <>
      <NavBar />

      <Snackbar open={openSuccess} autoHideDuration={200}>
        <Alert severity="success" sx={{ width: "100%" }}>
          Puna u shtua me sukses
        </Alert>
      </Snackbar>

      <Snackbar open={openError} autoHideDuration={200}>
        <Alert severity="error" sx={{ width: "100%" }}>
          Puna nuk u shtua!
        </Alert>
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
              <Grid item xs={12} sm={4} md={3}>
                <TextField
                  fullWidth
                  label="Title"
                  name="title"
                  variant="outlined"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  error={formik.touched.title && Boolean(formik.errors.title)}
                  helperText={formik.touched.title && formik.errors.title}
                />
              </Grid>
              <Grid item xs={12} sm={4} md={3}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Category
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Category"
                    name="categoryId"
                    value={formik.values.categoryId}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.categoryId &&
                      Boolean(formik.errors.categoryId)
                    }
                  >
                    {/* TODO: CATEGORIES */}
                    {/* {categories.map((category) => (
                      <MenuItem key={category.id} value={category.id}>
                        {category.name}
                      </MenuItem>
                    ))} */}
                  </Select>
                  <FormHelperText style={{ color: "#D32F2F" }}>
                    {formik.touched.categoryId && formik.errors.categoryId}
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4} md={3}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Type</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Type"
                    name="type"
                    value={formik.values.type}
                    onChange={formik.handleChange}
                    error={formik.touched.type && Boolean(formik.errors.type)}
                  >
                    <MenuItem value={1}>
                      <Typography>Fulltime</Typography>
                    </MenuItem>
                    <MenuItem value={2}>
                      <Typography>Part-Time</Typography>
                    </MenuItem>
                    <MenuItem value={3}>
                      <Typography>Internship</Typography>
                    </MenuItem>
                    <MenuItem value={4}>
                      <Typography>Freelancer</Typography>
                    </MenuItem>
                  </Select>
                  <FormHelperText style={{ color: "#D32F2F" }}>
                    {formik.touched.type && formik.errors.type}
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4} md={3}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Place of work
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Type"
                    name="place_of_work"
                    value={formik.values.place_of_work}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.place_of_work &&
                      Boolean(formik.errors.place_of_work)
                    }
                  >
                    <MenuItem value={1}>
                      <Typography>Office</Typography>
                    </MenuItem>
                    <MenuItem value={2}>
                      <Typography>Remote</Typography>
                    </MenuItem>
                    <MenuItem value={3}>
                      <Typography>Hybrid</Typography>
                    </MenuItem>
                  </Select>
                  <FormHelperText style={{ color: "#D32F2F" }}>
                    {formik.touched.place_of_work &&
                      formik.errors.place_of_work}
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4} md={3}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Country</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Country"
                    name="country"
                    value={formik.values.country}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.country && Boolean(formik.errors.country)
                    }
                  >
                    <MenuItem value={"RKS"}>
                      <Typography>Kosovo</Typography>
                    </MenuItem>
                    <MenuItem value={"ALB"}>
                      <Typography>Albania</Typography>
                    </MenuItem>
                    <MenuItem value={"AZE"}>
                      <Typography>Azerbaijan</Typography>
                    </MenuItem>
                  </Select>
                  <FormHelperText style={{ color: "#D32F2F" }}>
                    {formik.touched.country && formik.errors.country}
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4} md={3}>
                <TextField
                  fullWidth
                  label="City"
                  name="city"
                  variant="outlined"
                  value={formik.values.city}
                  onChange={formik.handleChange}
                  error={formik.touched.city && Boolean(formik.errors.city)}
                  helperText={formik.touched.city && formik.errors.city}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={3}>
                <TextField
                  fullWidth
                  label="Wage"
                  name="salary"
                  type="number"
                  variant="outlined"
                  value={formik.values.salary || ""}
                  onChange={formik.handleChange}
                  error={formik.touched.salary && Boolean(formik.errors.salary)}
                  helperText={formik.touched.salary && formik.errors.salary}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={3}>
                <TextField
                  fullWidth
                  label="Previous Experience Required"
                  name="previous_experience"
                  variant="outlined"
                  type="number"
                  value={formik.values.previous_experience || ""}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.previous_experience &&
                    Boolean(formik.errors.previous_experience)
                  }
                  helperText={
                    formik.touched.previous_experience &&
                    formik.errors.previous_experience
                  }
                />
              </Grid>
              <Grid item xs={12} sm={4} md={6}>
                <FormControl fullWidth>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                      inputVariant="outlined"
                      id="date-picker-dialog"
                      label="Start Date"
                      fullWidth
                      name="start_of_application"
                      onChange={(val) => {
                        formik.setFieldValue("start_of_application", val);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                      onBlur={formik.handleBlur}
                      value={formik.values.start_of_application}
                      format="dd/MM/yyyy"
                      error={
                        formik.errors.start_of_application &&
                        formik.touched.start_of_application
                      }
                    />
                  </LocalizationProvider>
                  <FormHelperText style={{ color: "#D32F2F" }}>
                    {formik.errors.start_of_application &&
                      formik.touched.start_of_application &&
                      formik.errors.start_of_application}
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4} md={6}>
                <FormControl fullWidth>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                      inputVariant="outlined"
                      id="date-picker-dialog"
                      label="End date"
                      fullWidth
                      name="end_of_application"
                      renderInput={(params) => <TextField {...params} />}
                      onChange={(val) => {
                        formik.setFieldValue("end_of_application", val);
                      }}
                      onBlur={formik.handleBlur}
                      value={formik.values.end_of_application}
                      format="dd/MM/yyyy"
                      error={
                        formik.errors.end_of_application &&
                        formik.touched.end_of_application
                      }
                    />
                  </LocalizationProvider>
                  <FormHelperText style={{ color: "#D32F2F" }}>
                    {formik.errors.end_of_application &&
                      formik.touched.end_of_application &&
                      formik.errors.end_of_application}
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <TextField
                  fullWidth
                  label="Description"
                  multiline
                  rows={2}
                  // maxRows={4}
                  name="description"
                  variant="outlined"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.description &&
                    Boolean(formik.errors.description)
                  }
                  helperText={
                    formik.touched.description && formik.errors.description
                  }
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <TextField
                  fullWidth
                  label="Requirements"
                  multiline
                  rows={2}
                  // maxRows={4}
                  name="requirements"
                  variant="outlined"
                  value={formik.values.requirements}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.requirements &&
                    Boolean(formik.errors.requirements)
                  }
                  helperText={
                    formik.touched.requirements && formik.errors.requirements
                  }
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <TextField
                  fullWidth
                  label="Notes"
                  multiline
                  rows={2}
                  // maxRows={4}
                  name="notes"
                  variant="outlined"
                  value={formik.values.notes}
                  onChange={formik.handleChange}
                  error={formik.touched.notes && Boolean(formik.errors.notes)}
                  helperText={formik.touched.notes && formik.errors.notes}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Cover Letter
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Cover Letter"
                    name="coverLetter"
                    value={formik.values.coverLetter}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.coverLetter &&
                      Boolean(formik.errors.coverLetter)
                    }
                  >
                    <MenuItem value={0}>
                      <Typography>Not required</Typography>
                    </MenuItem>
                    <MenuItem value={1}>
                      <Typography>Mandatory</Typography>
                    </MenuItem>
                    <MenuItem value={2}>
                      <Typography>Optional</Typography>
                    </MenuItem>
                  </Select>
                  <FormHelperText style={{ color: "#D32F2F" }}>
                    {formik.touched.coverLetter && formik.errors.coverLetter}
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
                Krijo
              </Button>
            </Box>
          </Grid>
        </Container>
      </form>
    </>
  );
}
