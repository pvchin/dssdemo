import React, { useState, useEffect } from "react";
import MaterialTable, { MTableToolbar } from "material-table";
import { format } from "date-fns";
import { TextField, MenuItem, Button, Icon } from "@material-ui/core";
import { Select } from "@chakra-ui/react";
import { Alert } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import { useRecoilState } from "recoil";
import { loginLevelState } from "./data/atomdata";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckIcon from "@material-ui/icons/Check";
import SearchIcon from "@material-ui/icons/Search";
import CheckCircleOutlineOutlinedIcon from "@material-ui/icons/CheckCircleOutlineOutlined";
import { useCustomToast } from "../helpers/useCustomToast";
import { useExpensesContext } from "../context/expenses_context";
import HocForm from "./HocForm";
import { useEmployeesContext } from "../context/employees_context";
import { CustomDialog } from "../helpers/CustomDialog";
import { AlertDialogBox } from "../helpers/AlertDialogBox";
import { useHoc } from "./hoc/useHoc";
import { useAddHoc } from "./hoc/useAddHoc";
import { useDeleteHoc } from "./hoc/useDeleteHoc";
import { useUpdateHoc } from "./hoc/useUpdateHoc";

const columns = [
  {
    title: "Item No",
    field: "itemno",
    editable: "never",
    cellStyle: {
      minWidth: 200,
      maxWidth: 200,
    },
  },
  {
    title: "Description",
    field: "desp",
    editable: "never",
    cellStyle: {
      minWidth: 150,
      maxWidth: 150,
    },
  },
  {
    title: "Category",
    field: "category",
    editable: "never",
  },
  {
    title: "Qty On Hand",
    field: "qty",
    editable: "never",
  },
  {
    title: "Min Level",
    field: "minqty",
    editable: "never",
    cellStyle: {
      minWidth: 150,
      maxWidth: 150,
    },
  },
  {
    title: "Expiry Date",
    field: "expiry",
    editable: "never",
  },
  {
    title: "Supplier",
    field: "supplier",
    editable: "never",
  },
  {
    title: "Status",
    field: "status",
    editable: "never",
  },
 
];

const items = [
  {
    itemno: "A000111",
    desp: "Bottle ABC",
    category: "Bottle",
    expiry: "23/02/2022",
    qty: 10,
    minqty: 15,
    tobeexpiry: true,
    toorder: true,
    status: "In Stock",
    supplier: "ABC Supplier",
  },
  {
    itemno: "B000111",
    desp: "Bottle ABC",
    category: "Bottle",
    expiry: "23/04/2022",
    qty: 5,
    minqty: 10,
    toorder: true,
    tobeexpiry: false,
    status: "In Stock",
    supplier: "ABC Supplier",
  },
  {
    itemno: "D000111",
    desp: "Bottle ABC",
    category: "Bottle",
    expiry: "23/02/2022",
    qty: 15,
    minqty: 10,
    toorder: false,
    tobeexpiry: true,
    status: "In Stock",
    supplier: "ABC Supplier",
  },
  {
    itemno: "E000111",
    desp: "Bottle ABC",
    category: "Bottle",
    expiry: "23/02/2022",
    qty: 25,
    minqty: 5,
    tobeexpiry: true,
    toorder: false,
    status: "In Stock",
    supplier: "ABC Supplier",
  },
  {
    itemno: "F000111",
    desp: "Bottle ABC",
    category: "Bottle",
    expiry: "23/05/2022",
    qty: 30,
    minqty: 15,
    tobeexpiry: false,
    toorder: false,
    status: "In Stock",
    supplier: "ABC Supplier",
  },
];


const initial_form = {
  findings: "",
  category: "",
  what: "",
  what_details: "",
  why: "",
  why_details: "",
  discussion: "No",
  action: "",
  isfollowup: "No",
  isworkrelated: "No",
  raisedby: "",
  email: "",
  raisedon: null,
  company: "APPSMITH SUTERA",
  location: " ",
  department: "",
};

export default function HocTable() {
  const classes = useStyles();
  const toast = useCustomToast();
  const [isLoad, setIsLoad] = useState(false);
  const { hoc, filter, setFilter, setHocId } = useHoc();
  const updateHoc = useUpdateHoc();
  const addHoc = useAddHoc();
  const deleteHoc = useDeleteHoc();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [hocdata, setHocdata] = useState([]);
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [formdata, setFormdata] = useState(initial_form);
  const [loginLevel, setLoginLevel] = useRecoilState(loginLevelState);
  const [isEditId, setIsEditId] = useState("");

  useEffect(() => {
    setFilter(loginLevel.loginUserId);
  }, []);

  const add_Hoc = async (data) => {
    //const { id } = data;
    let today = format(new Date(), "yyyy-MM-dd");
    //console.log("today", today);
    setIsEditId((prev) => (prev = ""));
    setFormdata(
      (prev) =>
        (prev = {
          ...data,
          raisedby: loginLevel.loginUser,
          email: loginLevel.loginEmail,
          company: "APPSMITHS SUTERA",
          raisedon: today,
        })
    );
    //setFormdata(initial_form);
    //setIsHocEditingOff();
    handleDialogOpen();
    // history.push("/singleexpense");
  };

  const update_Hoc = async (data) => {
    console.log("hoc", data);
    const { id } = data;
    setIsEditId((prev) => (prev = id));
    setFormdata((prev) => (prev = { ...data }));
    //setFormdata({ ...data });
    //setHocId(prev => prev = id)
    //setEditHocID(id);
    //setIsExpenseEditingOn();
    handleDialogOpen();

    // history.push("/singleexpense");
  };

  const delete_Hoc = (data) => {
    const { id } = data;
    setIsEditId((prev) => (prev = id));
    handleAlertOpen();

    // deleteExpense(id);
    // loadExpenses();
  };

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleAlertOpen = () => {
    setIsAlertOpen(true);
  };

  const handleAlertClose = () => {
    setIsAlertOpen(false);
  };

  const handleOnDeleteConfirm = () => {
    //const id = isEditId;
    deleteHoc(isEditId);
  };

  return (
    <div className={classes.root}>
      {/* <h1>Expenses Claims Application</h1> */}

      <div style={{ maxWidth: "100%", paddingTop: "5px" }}>
        <MaterialTable
          columns={columns}
          data={items}
          title="Items Tables"
          icons={{
            Add: (props) => <AddIcon />,
            Edit: (props) => <CheckCircleOutlineOutlinedIcon />,
            Delete: (props) => <DeleteIcon />,
            Clear: (props) => <DeleteIcon />,
            Check: (props) => <CheckIcon />,
            Search: (props) => <SearchIcon />,
            ResetSearch: (props) => <DeleteIcon />,
          }}
          // editable={{
          //   onRowUpdate: (newData, oldData) =>
          //     new Promise((resolve, reject) => {
          //       setTimeout(() => {
          //         const dataUpdate = [...expensesdata];
          //         const index = oldData.tableData.id;
          //         dataUpdate[index] = newData;
          //         setExpensesdata([...dataUpdate]);
          //         //approve_Expense(newData);

          //         resolve();
          //       }, 1000);
          //     }),
          // }}
          actions={[
            (rowData) => ({
              icon: "edit",
              tooltip: "Edit Record",
              onClick: (event, rowData) => {
                update_Hoc(rowData);
              },
            }),
            (rowData) => ({
              icon: "delete",
              tooltip: "Delete Record",
              onClick: (event, rowData) => {
                delete_Hoc(rowData);
              },
            }),
            {
              icon: "add",
              tooltip: "Add Record",
              isFreeAction: true,
              onClick: (event, rowData) => {
                add_Hoc(rowData);
              },
            },
          ]}
          options={{
            filtering: true,
            headerStyle: {
              backgroundColor: "orange",
              color: "#FFF",
            },
            showTitle: true,
          }}
          components={{
            Toolbar: (props) => (
              <div>
                <MTableToolbar {...props} />
              </div>
            ),
          }}
        />
        <CustomDialog
          isOpen={isDialogOpen}
          handleClose={handleDialogClose}
          title=""
          showButton={true}
          isFullscreen={false}
          isFullwidth={false}
          isEditId={isEditId}
        >
          <HocForm
            formdata={formdata}
            setFormdata={setFormdata}
            handleDialogClose={handleDialogClose}
          />
        </CustomDialog>

        <AlertDialogBox
          onClose={handleAlertClose}
          onConfirm={handleOnDeleteConfirm}
          isOpen={isAlertOpen}
          title="Delete HOC"
        >
          <h2>Are you sure you want to delete ?</h2>
        </AlertDialogBox>
      </div>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 0,
  },
}));
