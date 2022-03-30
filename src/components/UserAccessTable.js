import React, { useState, useEffect } from "react";
import clsx from "clsx";
import MaterialTable, { MTableToolbar } from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Button, Icon } from "@chakra-ui/react";
import { useEmployeesContext } from "../context/employees_context";
import { useTablesContext } from "../context/tables_context";
import { useEmployees } from "./employees/useEmployees";
import { useUpdateEmployees } from "./employees/useUpdateEmployees";

const drawerWidth = 240;

const columns = [
  {
    title: "Name",
    field: "name",
    editable: "never",
  },
  {
    title: "Department",
    field: "department",
    editable: "never",
  },
  {
    title: "Designation",
    field: "designation",
    editable: "never",
  },
  {
    title: "Role",
    field: "role",
    lookup: {
      1: "Staff",
      2: "Manager",
    },
  },
];

export default function UserAccessTable() {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const { employees } = useEmployees();
  const updateEmployees = useUpdateEmployees();
  const { editEmployeeID } = useEmployeesContext();

  const update_rec = (data) => {
    const { id, rec_id, role, ...fields } = data;
    updateEmployees({ id, role: parseInt(role, 10), ...fields });
  };

  return (
    <div className={fixedHeightPaper}>
      {/* <div className={classes.root}> */}
      <Box w="100%" mt="65">
        <MaterialTable
          columns={columns}
          data={employees}
          title="User Access Table"
          editable={{
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  const dataUpdate = [...employees];
                  const index = oldData.tableData.id;
                  dataUpdate[index] = newData;
                  update_rec(newData);

                  resolve();
                }, 1000);
              }),
          }}
          options={{
            filtering: true,
            pageSize: 10,
            headerStyle: {
              backgroundColor: "#90CDF4",
              color: "primary",
            },
            showTitle: true,
          }}
          components={{
            Toolbar: (props) => (
              <div>
                <MTableToolbar {...props} />
                <div style={{ padding: "5px 10px" }}></div>
              </div>
            ),
          }}
        />
      </Box>
      {/* </div> */}
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(9),
    paddingBottom: theme.spacing(4),
    border: "1px solid",
  },
  paper: {
    padding: theme.spacing(2),
    // display: "flex",
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    border: "1px solid",
    width: "100%",
  },
  fixedHeight: {
    height: 800,
  },
}));
