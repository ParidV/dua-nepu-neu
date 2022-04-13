import NavBar from "../../../components/admin/navbar/NavBar";
import axios from "axios";
import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { FaTrashAlt } from "react-icons/fa";
import MuiAlert from "@mui/material/Alert";
import { Link } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";

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

export async function getServerSideProps(context) {
  const res = await axios.get(`${process.env.API_URL}/admin/categories`);
  return {
    props: {
      categories: res.data,
    },
  };
}

export default function CategoriesIndex() {
  const session = useSelector((state) => state.user.user);

  const [openSuccess, setOpenSuccess] = React.useState(false);
  const [openError, setOpenError] = React.useState(false);
  const [data, setData] = useState([]);

  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);
  const filteredItems = data.filter(
    (item) =>
      item.name && item.name.toLowerCase().includes(filterText.toLowerCase())
  );

  // const columns = [
  //   {
  //     name: "Id",
  //     selector: (row) => row.id,
  //     sortable: true,
  //   },
  //   {
  //     name: "Emri",
  //     selector: (row) => row.name,
  //     sortable: true,
  //   },
  // ];
  // }
  //  else if (session.role == 3) {
  const columns = [
    {
      name: "Id",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Emri",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "actions",
      cell: (row) => (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <FaTrashAlt
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
                  title: `Do you want to delete the selected category?`,
                  text: "You won't be able to revert this!",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Yes, delete it!",
                }).then((result) => {
                  console.log(result);
                  //   if (result.isConfirmed) {
                  //     axios
                  //       .delete(
                  //         `${process.env.API_URL}/admin/categories/${row.id}`
                  //       )
                  //       .then((res) => {
                  //         console.log(res.data.success);
                  //         if (res.data.success) {
                  //           const filteredData = data.filter(
                  //             (item) => item.id !== row.id
                  //           );
                  //           setData(filteredData);

                  //           setOpenSuccess(true);
                  //           setTimeout(() => {
                  //             setOpenSuccess(false);
                  //           }, 5000);
                  //         }
                  //       });
                  //   }
                });
              } catch (error) {
                console.log(error);
              }
            }}
          />
          {/* Todo */}
          {/* <Link to={`/admin/categories/${row.id}`} >
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

  return (
    <>
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
      <NavBar />
      <DataTable
        title="Kategoritë"
        columns={columns}
        data={filteredItems}
        pagination
        paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
        subHeader
        subHeaderComponent={subHeaderComponentMemo}
        selectableRows
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
