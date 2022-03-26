import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { useHistory } from "react-router-dom";
import { differenceInDays, differenceInMonths } from "date-fns";
import axios from "axios";
import MaterialTable from "material-table";
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
import { EditIcon, ViewIcon } from "@chakra-ui/icons";
import { List, ListItem, ListItemText } from "@material-ui/core";
import { selector, useRecoilState, useRecoilValueLoadable } from "recoil";
import { loginLevelState } from "./data/atomdata";
import { useEmployeesContext } from "../context/employees_context";
import { useLeavesContext } from "../context/leaves_context";
import { leaves_url } from "../utils/constants";
import { useLeaves } from "./leaves/useLeaves";
import { CustomDialog } from "../helpers/CustomDialog";
import LeaveFormAdmin from "./LeaveFormAdmin";

const drawerWidth = 240;

const initial_form = {
  name: "",
  to_date: "",
  from_date: "",
  reason: "",
  status: "Pending",
  no_of_days: 0,
  leave_bal: 0,
};

// const fetchExpensesDetails = selector({
//   key: "fetchExpensesDetailsSelector",
//   get: async ({ get }) => {
//     try {
//       const { data } = await axios.get(expenses_url);
//       const wpexpirydata = data;

//       return data;
//     } catch (error) {
//       throw error;
//     }
//   },
// });

const LeaveTableViewStaff = () => {
  const classes = useStyles();
  const history = useHistory();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const { leaves, filter, setFilter, setLeaveId } = useLeaves();
  const [loginLevel, setLoginLevel] = useRecoilState(loginLevelState);
  const [userdata, setUserdata] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  //const [userdata, setUserdata] = useRecoilState(userdatastate);
  //const ExpensesDetails = useRecoilValueLoadable(fetchExpensesDetails);
  //const { state, contents } = ExpensesDetails;
  const { editEmployeeID } = useEmployeesContext();
  const [formdata, setFormdata] = useState(initial_form);
  const { leaves_loading, leaves_error, loadEmpLeaves } = useLeavesContext();
  const today = Date().toLocaleString();
  const {
    // leaves,
    editLeaveID,
    deleteLeave,
    loadLeaves,
    getSingleLeave,
    setEditLeaveID,
    setIsLeaveEditingOn,
    setIsLeaveEditingOff,
    resetSingleLeave,
  } = useLeavesContext();

  const handleOnClick = (data) => {
    setFormdata({ ...data });
    setFormdata({ ...data });
    setEditLeaveID(data.id);
    setIsLeaveEditingOn();
    handleDialogOpen()
    //history.push("/singleleave");
  };

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    // if (isLeaveEditing) {
    //   loadEmpLeaves(editEmployeeID);
    // }
  };
  return (
    <List className={classes.root}>
      <Grid container direction="row">
        <Stack direction="row">
          <Heading as="h4" size="md">
            Leaves Schedule
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

        {leaves
          .filter(
            (i) =>
              i.status === "Approve" &&
              differenceInDays(new Date(i.from_date), new Date(today)) < 60 &&
              differenceInDays(new Date(i.to_date), new Date(today)) < 60 &&
              differenceInDays(new Date(i.from_date), new Date(today)) > 0
          )
          .map((row) => {
            return (
              <>
                <Grid templateColumns="repeat(13, 1fr)" gap={3} p={1}>
                  <GridItem colSpan={1}>
                    <Box w="100%">
                      <IconButton
                        size="sm"
                        aria-label="Edit"
                        icon={<ViewIcon />}
                        onClick={() => handleOnClick(row)}
                      />
                    </Box>
                  </GridItem>
                  <GridItem colSpan={3}>
                    <Box w="100%">{row.name}</Box>
                  </GridItem>
                  <GridItem colSpan={3}>
                    <Box w="100%">{row.from_date}</Box>
                  </GridItem>
                  <GridItem colSpan={3}>
                    <Box w="100%">{row.to_date}</Box>
                  </GridItem>
                  <GridItem colSpan={3}>
                    <Box w="100%">{row.reason}</Box>
                  </GridItem>
                </Grid>
                <CustomDialog
                  isOpen={isDialogOpen}
                  handleClose={handleDialogClose}
                  title=""
                  showButton={true}
                  isFullscree={false}
                >
                  <LeaveFormAdmin
                    formdata={formdata}
                    setFormdata={setFormdata}
                    handleDialogClose={handleDialogClose}
                  />
                </CustomDialog>
              </>
            );
          })}
      </Grid>
    </List>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 0,
  },
}));

export default LeaveTableViewStaff;
