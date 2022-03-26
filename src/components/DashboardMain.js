import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Redirect, useHistory } from "react-router-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useRecoilState } from "recoil";
import { Container, Flex, Heading } from "@chakra-ui/react";
// import Chart from "./Chart";
// import Deposits from "./Deposits";
// import Orders from "./Orders";

import Appbanner from "./Appbanner";
import Example from "./Example6";
import SideDrawer from "./SideDrawer";
import SingleEmployee from "./SingleEmployee";
import SingleLeave from "./SingleLeave";
import SingleExpense from "./SingleExpense";
import SingleDailyAllowance from "./SingleDailyAllowance";
import SingleDailyAllowsDetls from "./SingleDailyAllowsDetls";
import BatchDailyAllowances from "./BatchDailyAllowances";
import SinglePayslip from "./SinglePayslip";
import { loginLevelState } from "./data/atomdata";
import Login from "./LoginForm";
import Payrun from "./Payrun";
import Payrunbatch from "./Payrunbatch";
import DashboardStaff from "./DashboardStaff";
import DashboardAdmin from "./DashboardAdmin";
import DashboardOpsSpvr from "./DashboardOpsSpvr";
import DashboardAdminManager from "./DashboardAdminManager";
import DashboardManager from "./DashboardManager";
import DashboardDirector from "./DashboardDirector";

import {
  Home,
  AllEmployees,
  Leave,
  Expenses,
  Payslip,
  BatchPayslips,
  Payroll,
  Departments,
  Designation,
  Tables,
  Clients,
  Allowances,
  DailyAllowances,
  // PrivateRoute,
  Error,
} from "../pages";

const drawerWidth = 0;

export default function DashboardMain() {
  const classes = useStyles();
  const history = useHistory();
  const [loginLevel, setLoginLevel] = useRecoilState(loginLevelState);
  const [open, setOpen] = React.useState(true);
  const [login, setLogin] = React.useState(true);
  const [select, setSelect] = React.useState("Staff");
  //console.log("loginLevel", loginLevel);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleSelect = (title) => {
    setLoginLevel({ ...loginLevel, loginLevel: title });
    setSelect(title);
    <Redirect to="/" />;
  };

  //  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  if (!login) {
    return <Login setLogin={setLogin} />;
  }
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Router>
        <Appbanner
          handleDrawerOpen={handleDrawerOpen}
          handleDrawerClose={handleDrawerClose}
          handleSelect={handleSelect}
          open={open}
          setLogin={setLogin}
          title="DSS Inventory Management and Assets Tracking System"
        />
        <Flex>
          {select === "Staff" && (
            <DashboardStaff
              open={open}
              handleDrawerOpen={handleDrawerOpen}
              handleDrawerClose={handleDrawerClose}
            />
          )}
          {select === "Admin" && (
            <DashboardAdmin
              open={open}
              handleDrawerOpen={handleDrawerOpen}
              handleDrawerClose={handleDrawerClose}
            />
          )}
          {select === "OpsSpvr" && (
            <DashboardOpsSpvr
              open={open}
              handleDrawerOpen={handleDrawerOpen}
              handleDrawerClose={handleDrawerClose}
            />
          )}
          {select === "AdminManager" && (
            <DashboardAdminManager
              open={open}
              handleDrawerOpen={handleDrawerOpen}
              handleDrawerClose={handleDrawerClose}
            />
          )}
          {select === "Manager" && (
            <DashboardManager
              open={open}
              handleDrawerOpen={handleDrawerOpen}
              handleDrawerClose={handleDrawerClose}
            />
          )}
          {select === "Director" && (
            <DashboardDirector
              open={open}
              handleDrawerOpen={handleDrawerOpen}
              handleDrawerClose={handleDrawerClose}
            />
          )}
        </Flex>
      </Router>
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
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
}));
