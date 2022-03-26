import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { useHistory } from "react-router-dom";
import { differenceInDays } from "date-fns";
import {
  Box,
  Grid,
  Heading,
  GridItem,
  Icon,
  IconButton,
  Stack,
  Spacer,
} from "@chakra-ui/react";

import { LineChart, Line } from 'recharts';


import { TextField, Paper, Container } from "@material-ui/core";
import CardLayout from "../helpers/CardLayout";
import CardLayout2 from "../helpers/CardLayout2";
import CardLayout3 from "../helpers/CardLayout3";
import Copyright from "./Copyright";
import { CustomDialog } from "../helpers/CustomDialog";
import { useRecoilState } from "recoil";
import { loginLevelState } from "./data/atomdata";

import { useEmployeesContext } from "../context/employees_context";
import { useLeavesContext } from "../context/leaves_context";
import { useExpensesContext } from "../context/expenses_context";
import { usePayslipsContext } from "../context/payslips_context";
import { useDailyAllowancesContext } from "../context/dailyallowances_context";
import LeaveTableViewStaff from "./LeaveTableViewStaff";
import TrainingsTableViewStaff from "./TrainingsTableViewStaff";
import LeaveTableAdmin from "./LeaveTableManager";
import ExpenseTableViewStaff from "./ExpenseTableViewStaff";
import ExpenseTableAdmin from "./ExpenseTableAdmin";
import PayslipTableViewStaff from "./PayslipTableViewStaff";
import PayslipTableAdmin from "./PayslipTableAdmin";
import DailyAllowancesTableViewStaff from "./DailyAllowancesTableViewStaff";
import DailyAllowancesTableAdmin from "./DailyAllowancesTableAdmin";
import OnLeavesViewStaff from "./OnLeavesViewStaff";
import WPExpiryViewStaff from "./WPExpiryViewStaff";
import { useEmployees } from "./employees/useEmployees";
import { useSingleEmployee } from "./employees/useSingleEmployee";
import { EditIcon, ViewIcon } from "@chakra-ui/icons";
import { items, assets } from "../utils/constants";

const drawerWidth = 240;

const FILTERSTRING = "Pending";

const HomeStaff = () => {
  let history = useHistory();
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const [loginLevel, setLoginLevel] = useRecoilState(loginLevelState);
  const { employees, setFilter, setEmployeeId } = useEmployees();
  const { singleemployee, setSingleEmployeeId } = useSingleEmployee();
  const [leavesdata, setLeavesdata] = useState([]);
  const [isLeaveDialogOpen, setIsLeaveDialogOpen] = useState(false);
  const [expensesdata, setExpensesdata] = useState([]);
  const [isExpenseDialogOpen, setIsExpenseDialogOpen] = useState(false);
  const [payslipsdata, setPayslipsdata] = useState([]);
  const [isPayslipDialogOpen, setIsPayslipDialogOpen] = useState(false);
  const [dailyallowancesdata, setDailyAllowancesdata] = useState([]);
  const [isDailyAllowancesDialogOpen, setIsDailyAllowancesDialogOpen] =
    useState(false);
  const today = Date().toLocaleString();

  const { leaves, loadPendingLeaves } = useLeavesContext();
  const { expenses, loadPendingExpenses } = useExpensesContext();
  const { payslips, loadPendingPayslips } = usePayslipsContext();
  const { dailyallowances, loadPendingDailyAllowances } =
    useDailyAllowancesContext();
  const { isEditing, setEditEmployeeID, setIsEditingOn } =
    useEmployeesContext();

  
  
  
  const handleLeaveDialogOpen = () => {
    setLeavesdata([]);
    setLeavesdata([...leaves]);
    setIsLeaveDialogOpen(true);
  };

  const handleLeaveDialogClose = () => {
    setIsLeaveDialogOpen(false);
    //loadPendingLeaves(FILTERSTRING);
  };

  const handleExpenseDialogOpen = () => {
    setExpensesdata([]);
    setExpensesdata([...expenses]);
    setIsExpenseDialogOpen(true);
  };

  const handleExpenseDialogClose = () => {
    setIsExpenseDialogOpen(false);
    //loadPendingExpenses(FILTERSTRING);
  };

  const handlePayslipDialogOpen = () => {
    setPayslipsdata([]);
    setPayslipsdata([...payslips]);
    setIsPayslipDialogOpen(true);
  };

  const handlePayslipDialogClose = () => {
    setIsPayslipDialogOpen(false);
    //loadPendingPayslips(FILTERSTRING);
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

  useEffect(() => {
    setEditEmployeeID(loginLevel.loginUserId);
    setIsEditingOn();
  }, []);

  const data = [{ name: "Page A", uv: 400, pv: 2400, amt: 2400 }];

  
  return (
    <div>
      <div className={classes.appBarSpacer} />
      <div style={{ paddingLeft: 50 }}>
        {/* <h2>Welcome Staff {loginLevel.loginUser}!</h2>
        <h3>Dashboard</h3> */}
      </div>
      <Container maxWidth="xl" className={classes.container}>
        <Stack direction="column">
          <Box>
            {/* <CardLayout2> */}
            <LineChart width={400} height={400} data={data}>
              <Line type="monotone" dataKey="uv" stroke="#8884d8" />
            </LineChart>
            {/* </CardLayout2> */}
          </Box>
          <Box>
            <CardLayout2>
              <Grid direction="row">
                <Stack direction="row">
                  <Heading as="h4" size="md">
                    Assets Testing In Progress
                  </Heading>
                  <Spacer />
                  <IconButton
                    // variant="outline"
                    size="md"
                    aria-label="Edit"
                    icon={<EditIcon />}
                    onClick={() => history.push("/leave")}
                  />
                </Stack>
                <Grid templateColumns="repeat(25, 1fr)" gap={3} p={1}>
                  <GridItem colSpan={3}>
                    <Box w="100%">
                      <Heading size="sm">Item No</Heading>
                    </Box>
                  </GridItem>
                  <GridItem colSpan={6}>
                    <Box w="100%">
                      <Heading size="sm">Description</Heading>
                    </Box>
                  </GridItem>
                  <GridItem colSpan={3}>
                    <Box w="100%">
                      <Heading size="sm">Received Date</Heading>
                    </Box>
                  </GridItem>
                  <GridItem colSpan={3}>
                    <Box w="100%">
                      <Heading size="sm">From</Heading>
                    </Box>
                  </GridItem>
                  <Box w="100%" colSpan={3}>
                    <Heading size="sm">Overdue in Days</Heading>
                  </Box>
                </Grid>
                {assets
                  .filter((r) => r.status === "In Progress")
                  .map((row) => {
                    const overdue = differenceInDays(
                      new Date(today),
                      new Date(row.receiveddate)
                    );
                    return (
                      <Grid
                        key={row.id}
                        templateColumns="repeat(25, 1fr)"
                        gap={3}
                        p={1}
                      >
                        <GridItem colSpan={3}>
                          <Box w="100%">{row.itemno}</Box>
                        </GridItem>
                        <GridItem colSpan={6}>
                          <Box w="100%">{row.desp}</Box>
                        </GridItem>
                        <GridItem colSpan={3}>
                          <Box w="100%">{row.receiveddate}</Box>
                        </GridItem>
                        <GridItem colSpan={3}>
                          <Box w="100%">{row.despatched}</Box>
                        </GridItem>
                        <GridItem colSpan={10}>
                          <Box w="100%">{overdue}</Box>
                        </GridItem>
                      </Grid>
                    );
                  })}
              </Grid>
            </CardLayout2>
          </Box>
          <Box>
            <CardLayout2>
              <Grid direction="row">
                <Stack direction="row">
                  <Heading as="h4" size="md">
                    Assets to be expired in 30 days
                  </Heading>
                  <Spacer />
                  <IconButton
                    // variant="outline"
                    size="md"
                    aria-label="Edit"
                    icon={<EditIcon />}
                    onClick={() => history.push("/leave")}
                  />
                </Stack>
                <Grid templateColumns="repeat(20, 1fr)" gap={3} p={1}>
                  <GridItem colSpan={3}>
                    <Box w="100%">
                      <Heading size="sm">Item No</Heading>
                    </Box>
                  </GridItem>
                  <GridItem colSpan={10}>
                    <Box w="100%">
                      <Heading size="sm">Description</Heading>
                    </Box>
                  </GridItem>
                  <GridItem colSpan={3}>
                    <Box w="100%">
                      <Heading size="sm">Expired Date</Heading>
                    </Box>
                  </GridItem>
                  <GridItem colSpan={4}>
                    <Box w="100%">
                      <Heading size="sm">Status</Heading>
                    </Box>
                  </GridItem>
                </Grid>
                {assets
                  .filter((r) => r.tobeexpiry)
                  .map((row) => {
                    return (
                      <Grid
                        key={row.id}
                        templateColumns="repeat(20, 1fr)"
                        gap={3}
                        p={1}
                      >
                        <GridItem colSpan={3}>
                          <Box w="100%">{row.itemno}</Box>
                        </GridItem>
                        <GridItem colSpan={10}>
                          <Box w="100%">{row.desp}</Box>
                        </GridItem>
                        <GridItem colSpan={3}>
                          <Box w="100%">{row.expiry}</Box>
                        </GridItem>
                        <GridItem colSpan={4}>
                          <Box w="100%">{row.status}</Box>
                        </GridItem>
                      </Grid>
                    );
                  })}
              </Grid>
            </CardLayout2>
          </Box>
          <Box>
            <CardLayout2>
              <Grid direction="row">
                <Stack direction="row">
                  <Heading as="h4" size="md">
                    Items below minimum level
                  </Heading>
                  <Spacer />
                  <IconButton
                    // variant="outline"
                    size="md"
                    aria-label="Edit"
                    icon={<EditIcon />}
                    onClick={() => history.push("/leave")}
                  />
                </Stack>
                <Grid templateColumns="repeat(25, 1fr)" gap={3} p={1}>
                  <GridItem colSpan={3}>
                    <Box w="100%">
                      <Heading size="sm">Item No</Heading>
                    </Box>
                  </GridItem>
                  <GridItem colSpan={6}>
                    <Box w="100%">
                      <Heading size="sm">Description</Heading>
                    </Box>
                  </GridItem>
                  <GridItem colSpan={3}>
                    <Box w="100%">
                      <Heading size="sm">Qty On Hand</Heading>
                    </Box>
                  </GridItem>
                  <GridItem colSpan={3}>
                    <Box w="100%">
                      <Heading size="sm">Min Level</Heading>
                    </Box>
                  </GridItem>
                  <Box w="100%">
                    <Heading size="sm">Supplier</Heading>
                  </Box>
                </Grid>
                {items
                  .filter((r) => r.toorder)
                  .map((row) => {
                    return (
                      <Grid
                        key={row.id}
                        templateColumns="repeat(25, 1fr)"
                        gap={3}
                        p={1}
                      >
                        <GridItem colSpan={3}>
                          <Box w="100%">{row.itemno}</Box>
                        </GridItem>
                        <GridItem colSpan={6}>
                          <Box w="100%">{row.desp}</Box>
                        </GridItem>
                        <GridItem colSpan={3}>
                          <Box w="100%">{row.qty}</Box>
                        </GridItem>
                        <GridItem colSpan={3}>
                          <Box w="100%">{row.minqty}</Box>
                        </GridItem>
                        <GridItem colSpan={10}>
                          <Box w="100%">{row.supplier}</Box>
                        </GridItem>
                      </Grid>
                    );
                  })}
              </Grid>
            </CardLayout2>
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

export default HomeStaff;
