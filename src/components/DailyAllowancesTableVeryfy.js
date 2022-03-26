import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import MaterialTable, { MTableToolbar } from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Icon, MenuItem } from "@material-ui/core";
import { Button, HStack } from "@chakra-ui/react";
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
import { useCustomToast } from "../helpers/useCustomToast";
import { useDailyAllowancesContext } from "../context/dailyallowances_context";
//import { useEmployeesContext } from "../context/employees_context";
import DailyAllowsDetlsTable from "./DailyAllowsDetlsTable";
import { useDailyAllowsStatus } from "./dailyallows/useDailyAllowsStatus";
import { useUpdateDailyAllows } from "./dailyallows/useUpdateDailyAllows";

const FILTERSTRING = "Submitted";

const columns = [
  {
    title: "Name",
    field: "name",
    editable: "never",
  },
  { title: "Period", field: "period", editable: "never" },
  { title: "Location", field: "location", editable: "never" },
  { title: "Manager Name", field: "manager", editable: "never" },
  {
    title: "No Of Days",
    field: "no_of_days",
    type: "numeric",
    editable: "never",
  },
  { title: "Amount", field: "amount", type: "currency", editable: "never" },
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
        <MenuItem value="Approved">Approved</MenuItem>
        <MenuItem value="Rejected">Rejected</MenuItem>
        <MenuItem value="Cancel">Cancel</MenuItem>
      </TextField>
    ),
  },
];

export default function DailyAllowancesTable() {
  let history = useHistory();
  const toast = useCustomToast()
  const classes = useStyles();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [tmpallowsdata, setTmpallowsdata] = useState([]);
  const allows_period = useRecoilValue(allowsPeriodState);
  const allows_empid = useRecoilValue(empidState);
  const [allowsdata, setAllowsdata] = useRecoilState(allowsDataState);
  const { dailyallowsstatus, setDailyAllowsStatusId } = useDailyAllowsStatus();
  const updateDailyAllows = useUpdateDailyAllows();
  const setEmpID = useSetRecoilState(empidState);
  const title = `Site Allowances (${allows_period})`;
  const {
    dailyallowances_loading,
    singlebatch_dailyallowance,
    singlebatch_dailyallowance_loading,
    deleteDailyAllowance,
    updateDailyAllowance,
    setEditDailyAllowanceID,
    setIsDailyAllowanceEditingOn,
    setIsDailyAllowanceEditingOff,
    resetSingleDailyAllowance,
    dailyallowance_period,
    getSingleBatchDailyAllowance,
  } = useDailyAllowancesContext();

  useEffect(() => {
    setDailyAllowsStatusId("Submitted");
  }, []);

  const Save_DailyAllowancesData = () => {
    dailyallowsstatus.forEach((data) => {
      const { id } = data;
      if (id) {
        const { id, rec_id, tableData, ...fields } = data;
        updateDailyAllowance({ id, ...fields });
      }
    });
  };

  const Verify_DailyAllowancesData = () => {
    dailyallowsstatus.forEach((rec) => {
      if (rec.tableData.checked) {
        const currentrec = rec;
        currentrec.status = "Verified";
        updateDailyAllows({ id: rec.id, status: "Verified" });
         toast({
           title: "Site Allows record being updated!",
           status: "success",
         });
        //update leavesdata
        // if (!update_dailyallowance_error) {
        //   const recdata = dailyallowancesdata.filter((r) => r.id === rec.id);
        //   recdata[0].status = "Approved";
        // }
      }
    });
    dailyallowsstatus.forEach((d) => {
      if (d.tableData) d.tableData.checked = false;
    });
  };

  const Reject_DailyAllowancesData = () => {
    dailyallowsstatus.forEach((rec) => {
      if (rec.tableData.checked) {
        const currentrec = rec;
        currentrec.status = "Rejected";
        updateDailyAllows({ id: rec.id, status: "Rejected" });
         toast({
           title: "Site Allows record being rejected!",
           status: "warning",
         });
        //update leavesdata
        // if (!update_dailyallowance_error) {
        //   const recdata = dailyallowancesdata.filter((r) => r.id === rec.id);
        //   recdata[0].status = "Rejected";
        // }
      }
    });
    dailyallowsstatus.forEach((d) => {
      if (d.tableData) d.tableData.checked = false;
    });
  };

  return (
    <div className={classes.root}>
      <div style={{ maxWidth: "100%", paddingTop: "5px" }}>
        <MaterialTable
          columns={columns}
          data={dailyallowsstatus}
          title="Site Allows Application"
          icons={{
            Add: (props) => <AddIcon />,
            Edit: (props) => <EditIcon />,
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
          //         const dataUpdate = [...dailyallowancesdata];
          //         const index = oldData.tableData.id;
          //         dataUpdate[index] = newData;
          //         setDailyAllowancesdata([...dataUpdate]);
          //         //approve_Expense(newData);

          //         resolve();
          //       }, 1000);
          //     }),
          // }}
          options={{
            filtering: true,
            selection: true,
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
                    onClick={Verify_DailyAllowancesData}
                  >
                    Verify
                  </Button>
                  <Button
                    type="submit"
                    variant="solid"
                    color="white"
                    bgColor="red"
                    onClick={Reject_DailyAllowancesData}
                  >
                    Reject
                  </Button>
                </HStack>
              </div>
            ),
          }}
        />
        <div className={classes.dialog}>
          <CustomDialog
            isOpen={isDialogOpen}
            //handleClose={handleDialogClose}
            title=""
            showButton={true}
            isFullscreen={true}
            isFullwidth={true}
          >
            <DailyAllowsDetlsTable
              setAllowsdata={setAllowsdata}
              allowsdata={allowsdata}
              //handleDialogClose={handleDialogClose}
            />
          </CustomDialog>
        </div>
      </div>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 0,
  },
  button: {
    margin: theme.spacing(1),
  },
  dialog: {
    width: 1000,
  },
}));
