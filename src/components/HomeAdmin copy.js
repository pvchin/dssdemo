import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { useHistory } from "react-router-dom";
import {
  Box,
  Divider,
  Heading,
  Stack,
  SimpleGrid,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import { TextField, Grid, Paper, Container } from "@material-ui/core";
import CardLayout from "../helpers/CardLayout";
import CardLayout2 from "../helpers/CardLayout2";
import CardLayout3 from "../helpers/CardLayout3";
import Copyright from "../components/Copyright";
import { useEmployees } from "./employees/useEmployees";
import { CustomDialog } from "../helpers/CustomDialog";
import { useRecoilState } from "recoil";
import { loginLevelState } from "./data/atomdata";
import { useLeavesContext } from "../context/leaves_context";
import { useExpensesContext } from "../context/expenses_context";
import { usePayslipsContext } from "../context/payslips_context";
import { useDailyAllowancesContext } from "../context/dailyallowances_context";
import LeaveTableViewAdmin from "./LeaveTableViewAdmin";
import LeaveTableAdmin from "./LeaveTableManager";
//import ExpenseTableView from "./ExpenseTableView";
import ExpenseTableAdmin from "./ExpenseTableAdmin";
//import PayslipTableView from "./PayslipTableView";
import PayslipTableAdmin from "./PayslipTableAdmin";
//import DailyAllowancesTableView from "./DailyAllowancesTableView";
import DailyAllowancesTableAdmin from "./DailyAllowancesTableAdmin";
import TrainingsTableViewAdmin from "./TrainingsTableViewAdmin";
import WPExpiryViewAdmin from "./WPExpiryViewAdmin";
import EmployeeTableLeaveView from "./EmployeeTableLeaveView";

const drawerWidth = 240;

const FILTERSTRING = "Pending";

const EmployeeView = () => {
  let history = useHistory();
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const { employees } = useEmployees();
  const [loginLevel, setLoginLevel] = useRecoilState(loginLevelState);
  const [leavesdata, setLeavesdata] = useState([]);
  const [isLeaveDialogOpen, setIsLeaveDialogOpen] = useState(false);
  const [expensesdata, setExpensesdata] = useState([]);
  const [isExpenseDialogOpen, setIsExpenseDialogOpen] = useState(false);
  const [payslipsdata, setPayslipsdata] = useState([]);
  const [isPayslipDialogOpen, setIsPayslipDialogOpen] = useState(false);
  const [dailyallowancesdata, setDailyAllowancesdata] = useState([]);
  const [isDailyAllowancesDialogOpen, setIsDailyAllowancesDialogOpen] =
    useState(false);

  const { leaves, loadPendingLeaves } = useLeavesContext();
  const { expenses, loadPendingExpenses } = useExpensesContext();
  const { payslips, loadPendingPayslips } = usePayslipsContext();
  const { dailyallowances, loadPendingDailyAllowances } =
    useDailyAllowancesContext();

  const handleLeaveDialogOpen = () => {
    setLeavesdata([]);
    setLeavesdata([...leaves]);
    setIsLeaveDialogOpen(true);
  };

  const handleLeaveDialogClose = () => {
    setIsLeaveDialogOpen(false);
    loadPendingLeaves(FILTERSTRING);
  };

  const handleExpenseDialogOpen = () => {
    setExpensesdata([]);
    setExpensesdata([...expenses]);
    setIsExpenseDialogOpen(true);
  };

  const handleExpenseDialogClose = () => {
    setIsExpenseDialogOpen(false);
    loadPendingExpenses(FILTERSTRING);
  };

  const handlePayslipDialogOpen = () => {
    setPayslipsdata([]);
    setPayslipsdata([...payslips]);
    setIsPayslipDialogOpen(true);
  };

  const handlePayslipDialogClose = () => {
    setIsPayslipDialogOpen(false);
    loadPendingPayslips(FILTERSTRING);
  };

  const handleDailyAllowancesDialogOpen = () => {
    setDailyAllowancesdata([]);
    setDailyAllowancesdata([...dailyallowances]);
    setIsDailyAllowancesDialogOpen(true);
  };

  const handleDailyAllowancesDialogClose = () => {
    setIsDailyAllowancesDialogOpen(false);
    loadPendingDailyAllowances(FILTERSTRING);
  };

  return (
    <div>
      <div className={classes.appBarSpacer} />
      <div style={{ paddingLeft: 50 }}>
        {/* <h2>Welcome {loginLevel.loginUser}!</h2>
        <h3>Dashboard</h3> */}
      </div>
      <Container maxWidth="full" className={classes.container}>
        <Stack direction="column">
          <Box>
            <CardLayout2>
              <LeaveTableViewAdmin />
            </CardLayout2>
          </Box>
          <Box>
            <CardLayout2>
              <WPExpiryViewAdmin />
            </CardLayout2>
          </Box>
          <Box>
            <CardLayout2>
              <TrainingsTableViewAdmin />
            </CardLayout2>
          </Box>
          <Box
            maxW="x3"
            padding="4"
            width="100%"
            height="750"
            borderColor="blue.500"
            borderWidth="1px"
            borderRadius="lg"
            overflow="scroll"
          >
            <SimpleGrid>
              <Box>
                <Heading as="h2" size="lg">
                  Employees
                </Heading>
              </Box>
              <Divider />
              <Box>
                <Tabs isLazy>
                  <TabList>
                    {/* <Tab>Chart</Tab>
                <Tab>Summary</Tab> */}
                    <Tab>Details</Tab>
                  </TabList>
                  <TabPanels>
                    <TabPanel>
                      <EmployeeTableLeaveView />
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </Box>
              <Divider />
            </SimpleGrid>
          </Box>
        </Stack>

        <Box pt={4}>
          <Copyright />
        </Box>
        <CustomDialog
          isOpen={isLeaveDialogOpen}
          handleClose={handleLeaveDialogClose}
          title=""
          showButton={true}
          isFullscreen={false}
          isFullwidth={false}
        >
          <LeaveTableAdmin
            setLeavesdata={setLeavesdata}
            leavesdata={leavesdata}
            handleDialogClose={handleLeaveDialogClose}
          />
        </CustomDialog>
        <CustomDialog
          isOpen={isExpenseDialogOpen}
          handleClose={handleExpenseDialogClose}
          title=""
          showButton={true}
          isFullscreen={false}
          isFullwidth={false}
        >
          <ExpenseTableAdmin
            setExpensesdata={setExpensesdata}
            expensesdata={expensesdata}
            handleDialogClose={handleExpenseDialogClose}
          />
        </CustomDialog>
        <CustomDialog
          isOpen={isPayslipDialogOpen}
          handleClose={handlePayslipDialogClose}
          title=""
          showButton={true}
          isFullscreen={true}
          isFullwidth={false}
        >
          <PayslipTableAdmin
            setPayslipsdata={setPayslipsdata}
            payslipsdata={payslipsdata}
            handleDialogClose={handlePayslipDialogClose}
          />
        </CustomDialog>
        <CustomDialog
          isOpen={isDailyAllowancesDialogOpen}
          handleClose={handleDailyAllowancesDialogClose}
          title=""
          showButton={true}
          isFullscreen={true}
          isFullwidth={false}
        >
          <DailyAllowancesTableAdmin
            setDailyAllowancesdata={setDailyAllowancesdata}
            dailyallowancesdata={dailyallowancesdata}
            handleDialogClose={handleDailyAllowancesDialogClose}
          />
        </CustomDialog>
      </Container>
    </div>
  );
};

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

export default EmployeeView;
