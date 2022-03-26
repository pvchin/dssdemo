import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { TextField, MenuItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
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

const columns = [
  {
    title: "January",
    field: "jan",
  },
  {
    title: "February",
    field: "feb",
  },
  {
    title: "March",
    field: "mar",
  },
  {
    title: "April",
    field: "apr",
  },
  {
    title: "May",
    field: "may",
  },
  {
    title: "June",
    field: "jun",
  },
  {
    title: "July",
    field: "jul",
  },
  {
    title: "August",
    field: "aug",
  },
  {
    title: "September",
    field: "sep",
  },
  {
    title: "October",
    field: "oct",
  },
  {
    title: "November",
    field: "nov",
  },
  {
    title: "December",
    field: "dec",
  },
];

const data = [
  {
    jan: 80,
    feb: 90,
    mar: 78,
    apr: 63,
    may: 55,
    jun: 60,
    jul: 55,
    aug: 65,
    sep: 70,
    oct: 58,
    nov: 60,
    dec: 62,
  },
];

export default function ExpenseSummaryTableView({ year }) {
  const classes = useStyles();
  const [expdata, setExpData] = useState([]);
  const { expensesperiod, setExpPeriodYrId, setExpPeriodMthId } =
    useExpensesPeriod();

  // useEffect(() => {
  //   setExpPeriodYrId(year);
  //   setExpPeriodMthId(i);
  // }, []);

  // const Build_data = () => {
  //   for (var i = 1; i <= 12; i++) {
  //     setExpPeriodYrId(year);
  //     setExpPeriodMthId(i);
  //     const amount = expensesperiod.reduce((acc, r) => {
  //       if (r.status === "Approved" || r.status === "Approve") {
  //         return acc + r.amount;
  //       } else {
  //         return acc;
  //       }
  //     }, 0);
  //     expdata[i] = amount
  //   }
  //   console.log("exp", expdata)
  // };

  return (
    <div className={classes.root}>
      {/* <h1>Expenses Claims Application</h1> */}

      <div style={{ maxWidth: "100%", paddingTop: "5px" }}>
        <MaterialTable
          columns={columns}
          data={data}
          title="Expenses Claims"
          options={{
            filtering: false,
            search: false,
            toolbar: false,
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
