import React, { useState, useEffect, useMemo } from "react";
import MaterialTable from "material-table";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { TextField, MenuItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { GrFormView } from "react-icons/gr";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckIcon from "@material-ui/icons/Check";
import SearchIcon from "@material-ui/icons/Search";
import LeaveForm from "./LeaveForm";
import { CustomDialog } from "../helpers/CustomDialog";
import { AlertDialog } from "../helpers/AlertDialogBox";
import { useExpensesPeriod } from "./expenses/useExpensesPeriod";
import { useEmployeesContext } from "../context/employees_context";
import { useEmployees } from "./employees/useEmployees";
import { useLeaves } from "./leaves/useLeaves";

const YEAR = new Date().getFullYear();

const columns = [
  {
    title: "Name",
    field: "name",
    cellStyle: {
      width: 250,
      maxWidth: 250,
    },
  },
  // { title: "IC No", field: "ic_no" },
  // { title: "Gender", field: "gender" },
  { title: "Emp No", field: "empno" },
  { title: "Designation", field: "designation" },
  { title: "Department", field: "department" },

  {
    title: "Leave Entitled",
    field: "leave_entitled",
    type: "numeric",
    cellStyle: {
      width: 60,
    },
  },
  {
    title: "Leave C/F",
    field: "leave_bf",
    type: "numeric",
    cellStyle: {
      width: 60,
    },
  }, 
  {
    title: "Total Leave",
    field: "leave_total",
    type: "numeric",
    cellStyle: {
      width: 60,
    },
  },
  {
    title: "Leave Taken",
    field: "leave_taken",
    type: "numeric",
    cellStyle: {
      width: 60,
    },
  },
  // {
  //   title: "Leave Pending",
  //   field: "leave_pending",
  //   type: "numeric",
  //   cellStyle: {
  //     width: 60,
  //   },
  // },
  {
    title: "Leave Balance",
    field: "leave_bal",
    type: "numeric",
    cellStyle: {
      width: 60,
    },
  },
  // { title: "Email", field: "email" },
];

export default function EmployeeTableLeaveView({ year }) {
  const classes = useStyles();
  const history = useHistory();
  const { employees, setEmployeeId } = useEmployees();
  const { leaves } = useLeaves();
  const [empdata, setEmpData] = useState([]);
  const currentyear = new Date().getFullYear();
  const { expensesperiod, setExpPeriodYrId, setExpPeriodMthId } =
    useExpensesPeriod();
  const emp = employees.map((rec) => {
    return { ...rec, leave_total: 0, leave_taken: 0, leave_pending: 0 };
  });

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

  const update_Employee = (data) => {
    const { id } = data;
    resetSingleEmployee();
    resetEmployees();
    setEditEmployeeID(id);
    setIsEditingOn();
    setEmployeeId(id);

    history.push("/singleemployee");
  };

  const Build_EmpData = (YEAR) => {
    // eslint-disable-next-line no-lone-blocks
    {
      emp &&
        emp.forEach((rec, index) => {
          const {
            id,
            name,
            icno,
            gender,
            designation,
            department,
            leave_entitled,
            leave_bf,
            leave_cd,
          } = rec;
          // calculate leaves
          const leavedata = leaves
            .filter(
              (r) =>
                r.empid === id && moment(r.from_date).format("YYYY") === YEAR
            )
            .map((rec) => {
              return { ...rec };
            });
          console.log("leavedata", leavedata);
          const leaveTaken = leavedata.reduce((acc, item) => {
            if (item.status === "Approved") {
              return acc + item.no_of_days;
            } else {
              return acc;
            }
          }, 0);
          const leavePending = leavedata.reduce((acc, item) => {
            if (item.status === "Pending") {
              return acc + item.no_of_days;
            } else {
              return acc;
            }
          }, 0);
          const leaveEntitled = isNaN(emp[index].leave_entitled)
            ? 0
            : emp[index].leave_entitled;
          const leaveBf = isNaN(emp[index].leave_bf) ? 0 : emp[index].leave_bf;
          //const leaveCd = isNaN(emp[index].leave_cd) ? 0 : emp[index].leave_cd;
          const leaveCd = 0;
          emp[index].leave_cd = leaveCd;
          emp[index].leave_total = leaveEntitled + leaveBf;
          emp[index].leave_taken = leaveTaken + leaveCd;
          emp[index].leave_pending = leavePending;
          emp[index].leave_bal = leaveEntitled + leaveBf - leaveCd - leaveTaken;
          setEmpData(emp);
        });
    }
  };

  useEffect(() => {
    Build_EmpData(YEAR);
  }, []);

  return (
    <div className={classes.root}>
      <div style={{ maxWidth: "100%", paddingTop: "5px" }}>
        <MaterialTable
          columns={columns}
          data={empdata}
          title="Employee Leave Details"
          actions={[
            (rowData) => ({
              //disabled: rowData.status !== "Pending",
              icon: () => <GrFormView size="33px" />,
              tooltip: "View",
              onClick: (event, rowData) => {
                update_Employee(rowData);
              },
            }),
          ]}
          options={{
            filtering: true,
            search: true,
            toolbar: false,
            paging: false,
            headerStyle: {
              backgroundColor: "rgba(75, 192, 192, 1)",
              color: "white",
            },
            showTitle: false,
          }}
        />
      </div>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 0,
  },
}));
