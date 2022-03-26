import React, { useState, useEffect, useMemo } from "react";
import MaterialTable, { MTableToolbar } from "material-table";
import { useHistory } from "react-router-dom";
import { Box} from "@chakra-ui/react"
import { makeStyles } from "@material-ui/core/styles";
import { Button, Icon } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckIcon from "@material-ui/icons/Check";
import SearchIcon from "@material-ui/icons/Search";
import { useCustomToast } from "../helpers/useCustomToast";
import { useRecoilState } from "recoil";
import { editEmployeeIdState } from "./data/atomdata";
import { CustomDialog } from "../helpers/CustomDialog";
import { AlertDialogBox } from "../helpers/AlertDialogBox";
import EmployeeView from "./EmployeeView";
import { useEmployeesContext } from "../context/employees_context";
import { useTablesContext } from "../context/tables_context";
import { useDepartments } from "./departments/useDepartments";
import { useDesignations } from "./designations/useDesignations";
import { useEmployees } from "./employees/useEmployees";
import { useAllEmployees } from "./employees/useAllEmployees";
import { useDeleteEmployees } from "./employees/useDeleteEmployees";
import App from "../utils/firebase";

export default function AllEmployeesTable() {
  let history = useHistory();
  const classes = useStyles();
  const toast = useCustomToast();
  const { designations } = useDesignations();
  const { departments } = useDepartments();
  const { employees, setEmployeeId } = useEmployees();
  const { allemployees, setAllEmpId } = useAllEmployees();
  const [empId, setEmpId] = useRecoilState(editEmployeeIdState);
  const deleteEmployees = useDeleteEmployees();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const columns = useMemo(() => [
    {
      title: "Name",
      field: "name",
    },
    { title: "IC No", field: "ic_no" },
    { title: "Gender", field: "gender" },
    {
      title: "Birth Date",
      field: "birthdate",
      type: "date",
      dateSetting: { locale: "en-GB" },
    },
    { title: "Email", field: "email" },
  ]);

  const {
    editEmployeeID,
    employees_loading,
    //deleteEmployee,
    //loadEmployees,
    setEditEmployeeID,
    setIsEditingOn,
    setIsEditingOff,
    resetSingleEmployee,
    resetEmployees,
    //getSingleEmployee,
  } = useEmployeesContext();

  const { loadDepartments, loadDesignations, resetTables } = useTablesContext();

  useEffect(() => {
    setAllEmpId("111");
  }, []);

  // useEffect(() => {
  //   resetEmployees();
  //   loadEmployees();
  // }, []);

  const update_Employee = async (data) => {
    const { id } = data;
    resetSingleEmployee();
    resetEmployees();
    setEditEmployeeID(id);
    setIsEditingOn();
    setEmployeeId(id);

    history.push("/singleemployee");
  };

  const add_Employee = async (data) => {
    resetSingleEmployee();
    setEditEmployeeID("");
    setIsEditingOff();
    //handleDialogOpen();
    history.push("/singleemployee");
  };

  const delete_Employee = (data) => {
    const { id } = data;
    setEditEmployeeID(id);
    handleAlertOpen();
    //deleteEmployee(id);
    //loadEmployees();
  };

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    //loadEmployees();
  };

  const handleAlertOpen = () => {
    setIsAlertOpen(true);
  };

  const handleAlertClose = () => {
    setIsAlertOpen(false);
  };

  const handleOnDeleteConfirm = () => {
    const id = editEmployeeID;
    deleteEmployees(id);
    //loadEmployees();
  };

  const calculateAge = (dob) => {
    var today = new Date();
    var birthDate = new Date(dob);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const Reset_PW = () => {
    allemployees.forEach((rec) => {
      if (rec.tableData.checked) {
        try {
          if (rec.password) {
            App.auth().createUserWithEmailAndPassword(rec.email, rec.password);
          } else {
            App.auth().createUserWithEmailAndPassword(rec.email, "abc123*");
          }
        } catch (error) {
          console.log(error);
        }
        try {
          App.auth().sendPasswordResetEmail(rec.email);
          toast({
            title: `Reset Password sent to ${rec.email}!`,
            status: "success",
          });
        } catch (error) {
          toast({
            title: `Error send to  ${rec.email}!`,
            status: "warning",
          });
        }
      }
    });
    allemployees.forEach((d) => {
      if (d.tableData) d.tableData.checked = false;
    });
  };

  // if (employees_loading) {
  //   return <div>Loading...</div>;
  // } else {
  //   //console.log(employees);
  // }
  return (
    <div className={classes.root}>
      {/* <div style={{ maxWidth: "100%", paddingTop: "5px" }}> */}
        <Box maxW="100%" pt="5px">
        <MaterialTable
          columns={columns}
          data={allemployees.sort((a, b) =>
            a.name > b.name ? 1 : b.name > a.name ? -1 : 0
          )}
          title="Employees Listing"
          icons={{
            Add: (props) => <AddIcon />,
            Edit: (props) => <EditIcon />,
            Delete: (props) => <DeleteIcon />,
            Clear: (props) => <DeleteIcon />,
            Check: (props) => <CheckIcon />,
            Search: (props) => <SearchIcon />,
            ResetSearch: (props) => <DeleteIcon />,
          }}
          actions={[
            {
              icon: "edit",
              tooltip: "Edit Record",
              position: "row",
              onClick: (event, rowData) => {
                update_Employee(rowData);
              },
            },
            {
              icon: "delete",
              tooltip: "Delete Record",
              position: "row",
              onClick: (event, rowData) => {
                delete_Employee(rowData);
              },
            },
            {
              icon: "add",
              tooltip: "Add Record",
              isFreeAction: true,
              onClick: (event, rowData) => {
                add_Employee(rowData);
              },
            },
          ]}
          options={{
            filtering: true,
            selection: true,
            paging: false,
            headerStyle: {
              //backgroundColor: "#DAAD86",
              backgroundColor: "#90CDF4",
              color: "secondary",
            },
            showTitle: true,
          }}
          components={{
            Toolbar: (props) => (
              <div>
                <MTableToolbar {...props} />
                <div style={{ padding: "5px 10px" }}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    onClick={Reset_PW}
                  >
                    Reset PW <Icon className={classes.rightIcon}>send</Icon>
                  </Button>
                </div>
              </div>
            ),
          }}
        />
        <CustomDialog
          isOpen={isDialogOpen}
          handleClose={handleDialogClose}
          title=""
          showButton={true}
          isFullscreen={true}
          isFullwidth={true}
        >
          <EmployeeView handleDialogClose={handleDialogClose} />
        </CustomDialog>

        <AlertDialogBox
          onClose={handleAlertClose}
          onConfirm={handleOnDeleteConfirm}
          isOpen={isAlertOpen}
          title="Delete Employee"
        >
          <h2>Are you sure you want to delete ?</h2>
        </AlertDialogBox>
      </Box>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3, 2),
  },
}));
