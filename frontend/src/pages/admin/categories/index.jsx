import NavBar from "../../../components/admin/navbar/NavBar";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import Swal from "sweetalert2";
import CustomAlert from "../../../components/CustomAlert";
import axios_auth from "../../../utils/axios/authenticated";
import { FilterComponent } from "../../../components/admin/FilterComponent";


export default function CategoriesIndex() {
  const [openSuccess, setOpenSuccess] = React.useState(false);
  const [openError, setOpenError] = React.useState(false);
  const [messageError, setMessageError] = React.useState("");
  const [messageSuccess, setMessageSuccess] = React.useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios_auth.get(`/admin/categories`);
        setData(res.data.categories);
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

  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);
  const filteredItems = data.filter(
    (item) =>
      (item.name &&
        item.name.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.User.name &&
        item.User.name.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.User.surname &&
        item.User.surname.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.User.surname &&
        item.User.surname.toLowerCase().includes(filterText.toLowerCase()))
  );

  const columns = [
    {
      name: "Emri Kategorisë",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Krijuar nga",
      selector: (row) => format(new Date(row.createdAt), "dd/MM/yyyy hh:mm:ss"),
      sortable: true,
    },
    {
      name: "Krijuar më",
      selector: (row) => row.User.name + " " + row.User.surname,
      sortable: true,
    },
    {
      name: "actions",
      cell: (row) => (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Link to={`/admin/categories/${row.id}`}>
            <FaEdit
              color="blue"
              style={{
                cursor: "pointer",
                fontSize: "20px",
                marginRight: "20px",
              }}
            />
          </Link>
          <FaTrashAlt
            color="red"
            // size bigger
            style={{
              cursor: "pointer",
              fontSize: "20px",
              marginRight: "10px",
            }}
            onClick={() => {
              Swal.fire({
                title: `Doni ta fshini kategorin ${row.name}?`,
                text: "Fshirja nuk mund të kthehet mbrapsht!",
                icon: "question",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Fshije!",
                cancelButtonText: "Anullo",
              }).then((result) => {
                if (result.isConfirmed) {
                  axios_auth
                    .delete(`/admin/categories/${row.id}`)
                    .then((res) => {
                      console.log(res.data.success);
                      if (res.data.success) {
                        const filteredData = data.filter(
                          (item) => item.id !== row.id
                        );
                        setData(filteredData);

                        setMessageSuccess("Kategoria u fshi me sukses!");
                        setOpenSuccess(true);
                        setTimeout(() => {
                          setOpenSuccess(false);
                          setMessageSuccess("");
                        }, 5000);
                      }
                    })
                    .catch((err) => {
                      if (err.response.status !== 200) {
                        setMessageError("Pati nje problem :(");
                        setOpenError(true);
                        setTimeout(() => {
                          setMessageError("");
                          setOpenError(false);
                        }, 5000);
                      }
                    });
                }
              });
            }}
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
        title="Kategoritë"
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
