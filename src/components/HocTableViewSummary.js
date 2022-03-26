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
import { useHocPeriod } from "./hoc/useHocPeriod";

const FILTERSTRING = "Pending";

const columns = [
  {
    title: "Findings",
    field: "findings",
    editable: "never",
    cellStyle: {
      minWidth: 200,
      maxWidth: 200,
    },
  },
  {
    title: "Risks",
    field: "risks",
    editable: "never",
    cellStyle: {
      minWidth: 150,
      maxWidth: 150,
    },
  },
  {
    title: "Type/Category",
    field: "category",
    editable: "never",
  },
  {
    title: "What",
    field: "what",
    editable: "never",
  },
  {
    title: "What Details",
    field: "what_details",
    editable: "never",
    cellStyle: {
      minWidth: 150,
      maxWidth: 150,
    },
  },
  {
    title: "Why",
    field: "why",
    editable: "never",
  },
  {
    title: "Why Details",
    field: "why_details",
    editable: "never",
    cellStyle: {
      minWidth: 200,
      maxWidth: 200,
    },
  },
  {
    title: "Discussion",
    field: "discussion",
    editable: "never",
  },
  {
    title: "Action",
    field: "action",
    editable: "never",
  },
  {
    title: "Follow-up required?",
    field: "isfollowup",
    editable: "never",
  },
  {
    title: "Work Related?",
    field: "isworkrelated",
    editable: "never",
  },
  {
    title: "Raised By",
    field: "raisedby",
    editable: "never",
  },
  {
    title: "Raised On",
    field: "raisedon",
    type: "date",
    dateSetting: { locale: "en-GB" },
    editable: "never",
  },
  {
    title: "Company",
    field: "company",
    editable: "never",
  },
  {
    title: "Location",
    field: "location",
    editable: "never",
  },
  // {
  //   title: "Department",
  //   field: "department",
  //   editable: "never",
  // },
];

export default function HocTableViewSummary({ year, month }) {
  const classes = useStyles();
  const { hocperiod, setHocPeriodYrId, setHocPeriodMthId } = useHocPeriod();

  useEffect(() => {
    setHocPeriodYrId(year);
    setHocPeriodMthId(month);
  }, []);

  return (
    <div className={classes.root}>
      {/* <h1>Expenses Claims Application</h1> */}

      {/* <div style={{ maxWidth: "100%", paddingTop: "5px" }}> */}
      <Box maxW="100%" pt="5px" overflow="scroll">
        <MaterialTable
          columns={columns}
          data={hocperiod}
          title="HOC History"
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
    // </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 0,
  },
}));
