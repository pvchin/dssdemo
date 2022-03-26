import React, { useState, useEffect } from "react";
import MaterialTable, { MTableToolbar } from "material-table";
import { TextField, MenuItem } from "@material-ui/core";
import { Button, HStack } from "@chakra-ui/react";
import { makeStyles } from "@material-ui/core/styles";
import * as emailjs from "emailjs-com";
import AddIcon from "@material-ui/icons/Add";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckIcon from "@material-ui/icons/Check";
import SearchIcon from "@material-ui/icons/Search";
import LeaveFormAdmin from "./LeaveFormAdmin";
import { useRecoilState } from "recoil";
import { loginLevelState } from "./data/atomdata";
import { CustomDialog } from "../helpers/CustomDialog";
import { useCustomToast } from "../helpers/useCustomToast";
import { AlertDialogBox } from "../helpers/AlertDialogBox";
import { useLeavesContext } from "../context/leaves_context";
import { useEmployeesContext } from "../context/employees_context";
import { useLeaves } from "./leaves/useLeaves";
import { useLeavesStatus } from "./leaves/useLeavesStatus";
import { useAddLeaves } from "./leaves/useAddLeaves";
import { useDeleteLeaves } from "./leaves/useDeleteLeaves";
import { useUpdateLeaves } from "./leaves/useUpdateLeaves";
import { useEmployees } from "./employees/useEmployees";

const SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICEID;
const TEMPLATE_ID = "template_1y8odlq";
const USER_ID = process.env.REACT_APP_EMAILJS_USERID;
const ADMINMANAGER_EMAIL = process.env.REACT_APP_ADMINMANAGER_EMAIL;

const initial_form = {
  name: "",
  to_date: "",
  from_date: "",
  reason: "",
  status: "Pending",
  no_of_days: 0,
  leave_bal: 0,
};

const columns = [
  {
    title: "Name",
    field: "name",
    editable: "never",
  },
  {
    title: "From Date",
    field: "from_date",
    type: "date",
    dateSetting: { locale: "en-GB" },
    editable: "never",
  },
  {
    title: "To Date",
    field: "to_date",
    type: "date",
    dateSetting: { locale: "en-GB" },
    editable: "never",
  },
  {
    title: "Leave Balance",
    field: "leave_bal",
    type: "numeric",
    editable: "never",
  },
  {
    title: "No of Days",
    field: "no_of_days",
    type: "numeric",
    editable: "never",
  },
  {
    title: "Reason",
    field: "reason",
    editable: "never",
  },
  {
    title: "Status",
    field: "status",
    editComponent: (props) => (
      <TextField
        //defaultValue={props.value || null}
        onChange={(e) => props.onChange(e.target.value)}
        style={{ width: 100 }}
        value={props.value}
        select
      >
        <MenuItem value="Pending">Pending</MenuItem>
        <MenuItem value="Approve">Approve</MenuItem>
        <MenuItem value="Reject">Reject</MenuItem>
        <MenuItem value="Cancel">Cancel</MenuItem>
      </TextField>
    ),
  },
];

export default function LeaveTableApproval() {
  const classes = useStyles();
  const toast = useCustomToast();
  //const { leaves, filter, setFilter, setLeaveId } = useLeaves();
  const { employees } = useEmployees();
  const { leavesstatus, setLeaveStatusId } = useLeavesStatus();
  const updateLeaves = useUpdateLeaves();
  const addLeaves = useAddLeaves();
  const deleteLeaves = useDeleteLeaves();
  const [formdata, setFormdata] = useState(initial_form);
  const [loginLevel, setLoginLevel] = useRecoilState(loginLevelState);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(true);
  const {
    // leaves,
    editLeaveID,
    leaves_loading,
    deleteLeave,
    loadLeaves,
    getSingleLeave,
    setEditLeaveID,
    setIsLeaveEditingOn,
    setIsLeaveEditingOff,
    resetSingleLeave,
  } = useLeavesContext();

  useEffect(() => {
    setLeaveStatusId("Pending");
  }, []);

  // const update_Leave = async (data) => {
  //   const { id } = data;
  //   setFormdata({ ...data });
  //   setEditLeaveID(id);
  //   setIsLeaveEditingOn();
  //   getSingleLeave(id);
  //   handleDialogOpen();
  //   //history.push("/singleleave");
  // };

  // const add_Leave = async (data) => {
  //   // const { id } = data;
  //   setFormdata({ ...data });
  //   resetSingleLeave();
  //   setEditLeaveID("");
  //   setIsLeaveEditingOff();
  //   handleDialogOpen();
  //   //history.push("/singleleave");
  // };

  // const delete_Leave = (data) => {
  //   const { id } = data;
  //   setEditLeaveID(id);
  //   handleAlertOpen();
  //   //deleteLeave(id);
  //   //loadLeaves();
  // };

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
    const id = editLeaveID;
    deleteLeaves(id);
  };

  const handleSentEmail = (data, result) => {
    const { from_date, to_date, name, empid } = data;
    const emp = employees
      .filter((f) => f.id === empid)
      .map((r) => {
        return { ...r };
      });
    console.log("leave form", data, emp);

    var emaildata = {
      to_name: name,
      to_email: emp[0].email,
      message: `Your leave application from ${from_date} to ${to_date} has been ${result}!`,
      cc_to: ADMINMANAGER_EMAIL,
    };

    emailjs.send(SERVICE_ID, TEMPLATE_ID, emaildata, USER_ID).then(
      function (response) {
        console.log(response.status, response.text);
        toast({
          title: `Email has sent successfully to ${emaildata.to_email}!`,
          status: "success",
        });
      },
      function (err) {
        console.log(err);
        toast({
          title: `Email has fail to send to ${emaildata.to_email}!`,
          status: "warning",
        });
      }
    );
  };

  const Approve_Leave = () => {
    leavesstatus.forEach((rec) => {
      if (rec.tableData.checked) {
        const currentrec = rec;
        currentrec.status = "Approved";
        updateLeaves({ id: rec.id, status: "Approved" });

        toast({
          title: "Leave record being approved!",
          status: "success",
        });
        //sent email
        handleSentEmail(rec, "Approved");
      }
    });
    leavesstatus.forEach((d) => {
      if (d.tableData) d.tableData.checked = false;
    });
  };

  const Reject_Leave = () => {
    leavesstatus.forEach((rec) => {
      if (rec.tableData.checked) {
        const currentrec = rec;
        currentrec.status = "Rejected";
        updateLeaves({ id: rec.id, status: "Rejected" });
        setIsUpdate(true);
        toast({
          title: "Leave record being rejected!",
          status: "success",
        });
        //sent email
        handleSentEmail(rec, "Approved");
      }
    });
    leavesstatus.forEach((d) => {
      if (d.tableData) d.tableData.checked = false;
    });
  };
  //console.log("leave", ADMINMANAGER_EMAIL, USER_ID);
  return (
    <div className={classes.root}>
      {/* <h1>Expenses Claims Application</h1> */}

      <div style={{ maxWidth: "100%", paddingTop: "5px" }}>
        <MaterialTable
          columns={columns}
          data={leavesstatus.filter(
            (r) => r.reporting_email === loginLevel.loginEmail
          )}
          title="Leave Application"
          icons={{
            Add: (props) => <AddIcon />,
            Edit: (props) => <AddIcon />,
            View: (props) => <VisibilityIcon />,
            Delete: (props) => <DeleteIcon />,
            Clear: (props) => <DeleteIcon />,
            Check: (props) => <CheckIcon />,
            Search: (props) => <SearchIcon />,
            ResetSearch: (props) => <DeleteIcon />,
          }}
          actions={
            [
              // {
              //   icon: () => <VisibilityIcon />,
              //   tooltip: "Edit Record",
              //   onClick: (event, rowData) => {
              //     update_Leave(rowData);
              //   },
              // },
              // {
              //   icon: "delete",
              //   tooltip: "Delete Record",
              //   onClick: (event, rowData) => {
              //     delete_Leave(rowData);
              //   },
              // },
              // {
              //   icon: "add",
              //   tooltip: "Add Record",
              //   isFreeAction: true,
              //   onClick: (event, rowData) => {
              //     add_Leave(rowData);
              //   },
              // },
            ]
          }
          options={{
            filtering: true,
            selection: true,
            paging: false,
            headerStyle: {
              backgroundColor: "rgba(75, 192, 192, 1)",
              color: "white",
            },
            showTitle: true,
          }}
          components={{
            Toolbar: (props) => (
              <div>
                <MTableToolbar {...props} />
                <HStack p={2}>
                  <Button
                    type="submit"
                    variant="solid"
                    color="white"
                    bgColor="red"
                    //className={classes.button}
                    onClick={Approve_Leave}
                  >
                    Approve
                  </Button>
                  <Button
                    type="submit"
                    variant="solid"
                    color="white"
                    bgColor="red"
                    //className={classes.button}
                    onClick={Reject_Leave}
                  >
                    Reject
                  </Button>
                </HStack>
              </div>
            ),
          }}
        />
        <CustomDialog
          isOpen={isDialogOpen}
          handleClose={handleDialogClose}
          title=""
          showButton={true}
          isFullscree={false}
        >
          <LeaveFormAdmin
            formdata={formdata}
            setFormdata={setFormdata}
            handleDialogClose={handleDialogClose}
          />
        </CustomDialog>

        <AlertDialogBox
          onClose={handleAlertClose}
          onConfirm={handleOnDeleteConfirm}
          isOpen={isAlertOpen}
          title="Delete Expenses"
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
