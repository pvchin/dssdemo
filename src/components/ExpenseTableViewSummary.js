import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { TextField, MenuItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@chakra-ui/react";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckIcon from "@material-ui/icons/Check";
import SearchIcon from "@material-ui/icons/Search";
import LeaveForm from "./LeaveForm";
import { CustomDialog } from "../helpers/CustomDialog";
import { AlertDialog } from "../helpers/AlertDialogBox";
import { useExpensesStatus } from "./expenses/useExpensesStatus";
import { useExpensesPeriod } from "./expenses/useExpensesPeriod";
import { useEmployeesContext } from "../context/employees_context";

const FILTERSTRING = "Pending";

const columns = [
  {
    title: "Name",
    field: "name",
  },
  {
    title: "Date",
    field: "date",
    type: "date",
    dateSetting: { locale: "en-GB" },
  },

  { title: "Description", field: "description" },
  { title: "Amount", field: "amount", type: "currency" },
  { title: "Status", field: "status" },
];

export default function ExpenseTableView({ year, month }) {
  const classes = useStyles();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [totals, setTotals] = useState(0);
  const [isCalc, setIsCalc] = useState(false);
  const { loadEmployees } = useEmployeesContext();
  const { expensesstatus, setExpStatusId } = useExpensesStatus();
  const { expensesperiod, setExpPeriodYrId, setExpPeriodMthId } =
    useExpensesPeriod();

  useEffect(() => {
    setExpPeriodYrId(year);
    setExpPeriodMthId(month);
    setIsCalc(true);
  }, []);

  useEffect(() => {
    if (expensesperiod) {
      Calc_Totals();
      setIsCalc(false);
    }
  }, [isCalc]);

  const Calc_Totals = () => {
    const amount = expensesperiod.reduce((acc, r) => {
      if (r.status === "Approved" || r.status === "Approve") {
        return acc + r.amount;
      } else {
        return acc;
      }
    }, 0);
    setTotals(amount);
  };

  return (
    <div className={classes.root}>
      {/* <h1>Expenses Claims Application</h1> */}

      <Box maxW="100%" pt="5px" overflow="scroll">
        <MaterialTable
          columns={columns}
          data={expensesperiod}
          title="Leave Application"
          options={{
            filtering: false,
            search: false,
            toolbar: false,
            paging: false,
            headerStyle: {
              backgroundColor: "rgba(75, 192, 192, 1)",
              color: "white",
            },
            showTitle: false,
          }}
        />
      </Box>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 0,
  },
}));
