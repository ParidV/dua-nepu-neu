import NavBar from "../../../components/admin/navbar/NavBar";
import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { FilterComponent } from "../../../components/admin/FilterComponent";
import axios_auth from "../../../utils/axios/authenticated";
import { Snackbar } from "@mui/material";
import CustomAlert from "../../../components/CustomAlert";
import ExpandedComponentJob from "../../../components/admin/jobs/ExpandedComponent";
const { format } = require("date-fns");

export default function JobsAdmin() {
  const [data, setData] = useState([]);
  const [filterText, setFilterText] = React.useState("");
  const [loading, setLoading] = useState(true);
  const [openSuccess, setOpenSuccess] = React.useState(false);
  const [openError, setOpenError] = React.useState(false);
  const [messageError, setMessageError] = React.useState("");
  const [messageSuccess, setMessageSuccess] = React.useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios_auth.get(`/admin/jobs`);
        console.log(res.data.jobs);
        setData(res.data.jobs);
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

  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);
  const filteredItems = data.filter(
    (item) =>
      (item.title &&
        item.title.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.country &&
        item.country.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.city && item.city.toLowerCase().includes(filterText.toLowerCase()))
  );
  const columns = [
    {
      name: "Emri",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Kategoria",
      selector: (row) => row.Category.name,
      sortable: true,
    },
    {
      name: "Fillimi aplikimit",
      selector: (row) =>
        format(new Date(row.start_of_application), "dd/MM/yyyy hh:mm:ss"),
      sortable: true,
      width: "150px",
    },
    {
      name: "Mbarimi i aplikimit",
      selector: (row) =>
        format(new Date(row.end_of_application), "dd/MM/yyyy hh:mm:ss"),
      sortable: true,
      width: "150px",
    },
    {
      name: "Type",
      selector: (row) => row.type,
      sortable: true,
    },

    {
      name: "Vendi punes",
      selector: (row) => row.place_of_work,
      sortable: true,
    },
    {
      name: "Shteti",
      selector: (row) => row.country,
      sortable: true,
    },
    {
      name: "Qyteti",
      selector: (row) => row.city,
      sortable: true,
    },
    {
      name: "Krijuar më",
      selector: (row) => format(new Date(row.createdAt), "dd/MM/yyyy hh:mm:ss"),
      sortable: true,
      width: "150px",
    },
    {
      name: "actions",
      cell: (row) => (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <FaEdit
            color="blue"
            style={{ cursor: "pointer", fontSize: "20px" }}
          />
        </div>
      ),
    },
  ];

  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <FilterComponent
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);
  const date = new Date();
  console.log(`${format(date, "dd.MM.yyyy")}`);
  return (
    <>
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
      <NavBar />
      <DataTable
        title="Punët"
        columns={columns}
        data={filteredItems}
        pagination
        paginationResetDefaultPage={resetPaginationToggle}
        subHeader
        subHeaderComponent={subHeaderComponentMemo}
        persistTableHead
        subHeaderAlign="left"
        expandableRows
        expandableRowsComponent={ExpandedComponentJob}
        subHeaderClassName="bg-dark text-white"
        subHeaderComponentStyle={{
          backgroundColor: "#333",
          color: "#fff",
          fontSize: "1rem",
          fontWeight: "bold",
          padding: "10px",
        }}
      />
    </>
  );
}
