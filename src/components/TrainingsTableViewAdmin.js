import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import {
  Box,
  Grid,
  GridItem,
  Icon,
  Heading,
  IconButton,
  Spacer,
  Stack,
} from "@chakra-ui/react";
import { EditIcon, EmailIcon, ViewIcon } from "@chakra-ui/icons";
import { useHistory } from "react-router-dom";
import { differenceInDays, addDays } from "date-fns";
import { List, ListItem, ListItemText } from "@material-ui/core";
import { selector, useRecoilState, useRecoilValueLoadable } from "recoil";
import { loginLevelState } from "./data/atomdata";
import { useEmployeesContext } from "../context/employees_context";
import { useLeavesContext } from "../context/leaves_context";
import { leaves_url } from "../utils/constants";
import { useTrainings } from "./trainings/useTrainings";
import { useEmployees } from "./employees/useEmployees";

const drawerWidth = 240;

const TrainingsTableViewAdmin = () => {
  const classes = useStyles();
  const history = useHistory();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const { trainings, filter, setFilter, setTrainingId } = useTrainings();
  const [loginLevel, setLoginLevel] = useRecoilState(loginLevelState);
  const today = Date().toLocaleString();
  const { employees, setEmployeeId } = useEmployees();
  const {
    editEmployeeID,
    employees_loading,
    //deleteEmployee,
    //loadEmployees,
    setEditEmployeeID,
    setIsEditingOn,
    setIsEditingOff,
    resetSingleEmployee,
    resetEmployees,
    //getSingleEmployee,
  } = useEmployeesContext();

  // useEffect(() => {
  //   setFilter(loginLevel.loginUserId);
  // }, []);

  const handleOnClick = (id) => {
    resetSingleEmployee();
    resetEmployees();
    setEditEmployeeID(id);
    setIsEditingOn();
    setEmployeeId(id);

    history.push("/singleemployee");
  };

  return (
    <List className={classes.root}>
      <Grid container direction="row">
        <Stack direction="row">
          <Heading as="h4" size="md">
            Trainings Schedule Expiry Within 90 days
          </Heading>
          <Spacer />
          <IconButton
            // variant="outline"
            size="md"
            aria-label="Edit"
            icon={<EditIcon />}
            onClick={() => history.push("/allemployees")}
          />
        </Stack>

        {trainings
          .filter(
            (i) =>
              differenceInDays(new Date(i.expiry_date), new Date(today)) < 90 &&
              differenceInDays(new Date(today), new Date(i.expiry_date)) < 0
          )
          .map((row) => {
            return (
              <Grid templateColumns="repeat(13, 1fr)" gap={3} p={1}>
                <GridItem colSpan={1}>
                  <Box w="100%">
                    <IconButton
                      size="sm"
                      aria-label="Edit"
                      icon={<ViewIcon />}
                      onClick={() => handleOnClick(row.empid)}
                    />
                  </Box>
                </GridItem>
                <GridItem colSpan={3}>
                  <Box w="100%">{row.name}</Box>
                </GridItem>
                <GridItem colSpan={3}>
                  <Box w="100%">{row.course}</Box>
                </GridItem>
                <GridItem colSpan={3}>
                  <Box w="100%">{row.institute}</Box>
                </GridItem>
                <GridItem colSpan={3}>
                  <Box w="100%">{row.expiry_date}</Box>
                </GridItem>
              </Grid>
              // <ListItem key={row.id}>
              //   <Grid item sm={3} align="center">
              //     <ListItemText>{row.name}</ListItemText>
              //   </Grid>
              //   <Grid item sm={3} align="center">
              //     <ListItemText>{row.institute}</ListItemText>
              //   </Grid>
              //   <Grid item sm={3} align="center">
              //     <ListItemText>{row.course}</ListItemText>
              //   </Grid>
              //   <Grid item sm={3} align="center">
              //     <ListItemText>{row.expiry_date}</ListItemText>
              //   </Grid>
              // </ListItem>
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

export default TrainingsTableViewAdmin;
