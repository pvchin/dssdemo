import React, { useEffect } from "react";
import MaterialTable, { MTableToolbar } from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory, Link } from "react-router-dom";
import { useSetRecoilState, useRecoilValue } from "recoil";
import {
  payPeriodState,
  payPeriodEndMonthState,
  payPeriodEmpIdState,
} from "./data/atomdata";
import { usePayslipsContext } from "../context/payslips_context";
import { useEmployeesContext } from "../context/employees_context";
import { usePayrunStatus} from "./payrun/usePayrunStatus"

const FILTERSTRING = "Pending";

const columns = [
  // { title: "Period", field: "period" },
  {
    title: "Payrun Batch",
    field: "payrun",
    type: "date",
    dateSetting: { locale: "en-GB" },
  },
  // {
  //   title: "Pay Date",
  //   field: "pay_date",
  //   type: "date",
  //   dateSetting: { locale: "en-GB" },
  // },
  { title: "Total Wages", field: "totalwages", type: "currency" },
  { title: "TAP Amount", field: "totaltap", type: "currency" },
  { title: "SCP Amount", field: "totalscp", type: "currency" },
  { title: "Site Allowances", field: "totalsitesallows", type: "currency" },
  { title: "Expenses Claims", field: "totalexpensesclaims", type: "currency" },
  { title: "Total Allowances", field: "totalallows", type: "currency" },
  { title: "Total Deductions", field: "totaldeducts", type: "currency" },
  { title: "Total Payroll", field: "totalpayroll", type: "currency" },
  { title: "Status", field: "status" },
];


export default function PayslipTableVIew({status}) {
  let history = useHistory();
  const classes = useStyles();
  const setPayPeriodEmpId = useSetRecoilState(payPeriodEmpIdState);
  const { payrun, getPayrun,payrun_loading, loadPendingPayslips } =
    usePayslipsContext();
  //const { loadEmployees, employees } = useEmployeesContext();
  const { payrunstatus, setPayrunStatusId} = usePayrunStatus()
  
  
  useEffect(() => {
    setPayrunStatusId(status);
  }, []);

  
  return (
    <div className={classes.root}>
      <div style={{ maxWidth: "100%", paddingTop: "5px" }}>
        <MaterialTable
          columns={columns}
          data={payrunstatus}
          title="Payslips"
          options={{
            filtering: false,
            search: false,
            toolbar: false,
            headerStyle: {
              backgroundColor: "rgba(75, 192, 192, 1)",
              color: "#FFF",
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
