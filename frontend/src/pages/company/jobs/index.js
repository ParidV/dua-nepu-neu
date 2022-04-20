import NavBar from "../../../components/company/Navbar/index";
import axios from "axios";
import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Swal from "sweetalert2";
const { format } = require("date-fns");
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const FilterComponent = ({ filterText, onFilter, onClear }) => {
  return (
    <div style={{ padding: "20px" }}>
      <input
        type="text"
        className="form-control"
        placeholder="Search..."
        value={filterText}
        onChange={onFilter}
      />
      {filterText && (
        <button className="btn btn-link" onClick={onClear}>
          Clear
        </button>
      )}
    </div>
  );
};

export default function CompanyJobsIndex() {
  // TODO : get all jobs from the database
  const [data, setData] = useState([]);
  const [openSuccess, setOpenSuccess] = React.useState(false);
  const [openError, setOpenError] = React.useState(false);

  const [filterText, setFilterText] = React.useState("");
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
      name: "Titulli",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Fillimi aplikimit",
      selector: (row) =>
        format(new Date(row.start_of_application), "dd/MM/yyyy"),

      sortable: true,
    },
    {
      name: "Mbarimi i aplikimit",
      selector: (row) => format(new Date(row.end_of_application), "dd/MM/yyyy"),
      sortable: true,
    },
    {
      name: "Type",
      selector: (row) =>
        row.type === 1
          ? "Fulltime"
          : row.type === 2
          ? "Part time"
          : row.type === 3
          ? "Internship"
          : row.type === 4
          ? "Freelancer"
          : "",
      sortable: true,
    },

    {
      name: "Vendi punes",
      selector: (row) =>
        row.place_of_work == 1
          ? "Office"
          : row.place_of_work == 2
          ? "Remote"
          : row.place_of_work == 3
          ? "Hybrid"
          : "",
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
      selector: (row) => format(new Date(row.createdAt), "dd/MM/yyyy HH:mm"),
      sortable: true,
    },
    {
      name: "Përtison",
      cell: (row) => (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {/* <FaTrashAlt
            color="red"
            // size bigger
            style={{
              cursor: "pointer",
              fontSize: "20px",
              marginRight: "10px",
            }}
            onClick={() => {
              try {
                Swal.fire({
                  title: `Do you want to delete the selected job?`,
                  text: "You won't be able to revert this!",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Yes, delete it!",
                }).then((result) => {
                  if (result.isConfirmed) {
                    axios
                      .delete(`${process.env.API_URL}/company/jobs/${row.id}`)
                      .then((res) => {
                        console.log(JSON.stringify(res));

                        if (res.data.success) {
                          const filteredData = data.filter(
                            (item) => item.id !== row.id
                          );
                          setData(filteredData);

                          setOpenSuccess(true);
                          setTimeout(() => {
                            setOpenSuccess(false);
                          }, 5000);
                        } else {
                          setOpenError(true);
                          setTimeout(() => {
                            setOpenError(false);
                          }, 5000);
                        }
                      });
                  } else {
                    setOpenError(true);
                    setTimeout(() => {
                      setOpenError(false);
                    }, 5000);
                  }
                });
              } catch (error) {
                setOpenError(true);
                setTimeout(() => {
                  setOpenError(false);
                }, 5000);
                console.log(error);
              }
            }}
          /> */}
          {/* <Link href={`/company/jobs/${row.id}`} passHref>
            <FaEdit
              color="blue"
              style={{ cursor: "pointer", fontSize: "20px" }}
            />
          </Link> */}
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
      <NavBar />
      <Snackbar open={openSuccess} autoHideDuration={200}>
        <Alert severity="success" sx={{ width: "100%" }}>
          Kategoria u fshi me sukses
        </Alert>
      </Snackbar>

      <Snackbar open={openError} autoHideDuration={200}>
        <Alert severity="error" sx={{ width: "100%" }}>
          Kategoria nuk u fshi!
        </Alert>
      </Snackbar>
      <DataTable
        title="Punët"
        columns={columns}
        data={filteredItems}
        pagination
        paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
        subHeader
        subHeaderComponent={subHeaderComponentMemo}
        persistTableHead
        selectableRowsHighlight
        selectableRowsHighlightAuto
        subHeaderAlign="left"
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
