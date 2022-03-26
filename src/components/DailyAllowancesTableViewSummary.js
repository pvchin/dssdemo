import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import MaterialTable, { MTableToolbar } from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@chakra-ui/react";
import {
  useSetRecoilState,
  useRecoilValue,
  useRecoilState,
  useRecoilValueLoadable,
} from "recoil";
import {
  allowsPeriodState,
  allowsDataState,
  empidState,
} from "./data/atomdata";
import { fetchDailyAllowancesSelector } from "./data/selectordata";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckIcon from "@material-ui/icons/Check";
import SearchIcon from "@material-ui/icons/Search";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { CustomDialog } from "../helpers/CustomDialog";
import { useDailyAllowancesContext } from "../context/dailyallowances_context";
//import { useEmployeesContext } from "../context/employees_context";
import { useDailyAllowsPeriod } from "./dailyallows/useDailyAllowsPeriod";

const FILTERSTRING = "Submitted";

const columns = [
  {
    title: "Name",
    field: "name",
  },
  { title: "Period", field: "period" },
  { title: "Location", field: "location" },
  { title: "Manager", field: "manager_name" },
  { title: "Days", field: "no_of_days", type: "numeric" },
  { title: "Amount", field: "amount", type: "currency" },
  { title: "Status", field: "status" },
];

export default function DailyAllowancesTable({ month, year }) {
  let history = useHistory();
  const classes = useStyles();
  const period = `${year}-${month}`;

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [tmpallowsdata, setTmpallowsdata] = useState([]);
  const allows_period = useRecoilValue(allowsPeriodState);
  const allows_empid = useRecoilValue(empidState);
  const [allowsdata, setAllowsdata] = useRecoilState(allowsDataState);
  const setEmpID = useSetRecoilState(empidState);
  const title = `Site Allowances (${allows_period})`;
  const { dailyallowsperiod, setDailyAllowsPeriodId } = useDailyAllowsPeriod();
  const {
    dailyallowances,
    loadPendingDailyAllowances,
    singlebatch_dailyallowance,
    singlebatch_dailyallowance_loading,
    deleteDailyAllowance,
    setEditDailyAllowanceID,
    setIsDailyAllowanceEditingOn,
    setIsDailyAllowanceEditingOff,
    resetSingleDailyAllowance,
    dailyallowance_period,
    getSingleBatchDailyAllowance,
  } = useDailyAllowancesContext();

  useEffect(() => {
    setDailyAllowsPeriodId(period);
  }, []);

  const handleDialogOpen = () => {
    //console.log("allowsdetls", allowsdata, allowsdataRef, singlebatch_dailyallowsdetl);
    //setAllowsdata({ singlebatch_dailyallowsdetl });
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    //getSingleBatchDailyAllowance(dailyallowance_period);
  };

  return (
    <div className={classes.root}>
      <Box maxW="100%" pt="5px" overflow="scroll">
        <MaterialTable
          columns={columns}
          data={dailyallowsperiod}
          title={title}
          options={{
            filtering: false,
            search: false,
            toolbar: false,
            paging: false,
            headerStyle: {
              backgroundColor: "rgba(75, 192, 192, 1)",
              color: "#FFF",
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
  dialog: {
    width: 1000,
  },
}));
