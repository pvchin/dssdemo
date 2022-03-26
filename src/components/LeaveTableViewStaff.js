import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import axios from "axios";
import { useHistory } from "react-router-dom";
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

const drawerWidth = 240;

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
  //const [userdata, setUserdata] = useRecoilState(userdatastate);
  //const ExpensesDetails = useRecoilValueLoadable(fetchExpensesDetails);
  //const { state, contents } = ExpensesDetails;
  const { editEmployeeID } = useEmployeesContext();
  const { leaves_loading, leaves_error, loadEmpLeaves } = useLeavesContext();

  useEffect(() => {
    setFilter(loginLevel.loginUserId);
  }, []);

  return (
    <List className={classes.root}>
      <Grid direction="row">
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
          .filter((i) => i.status === "Pending")
          .map((row) => {
            return (
              <Grid
                key={row.id}
                templateColumns="repeat(12, 1fr)"
                gap={3}
                p={1}
              >
                <GridItem colSpan={3}>
                  <Box w="100%">{row.from_date}</Box>
                </GridItem>
                <GridItem colSpan={3}>
                  <Box w="100%">{row.to_date}</Box>
                </GridItem>
                <GridItem colSpan={3}>
                  <Box w="100%">{row.reason}</Box>
                </GridItem>
                <GridItem colSpan={3}>
                  <Box w="100%">{row.status}</Box>
                </GridItem>
              </Grid>
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
