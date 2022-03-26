import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import axios from "axios";
import * as emailjs from "emailjs-com";
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
import { differenceInDays, addDays } from "date-fns";
import { useHistory } from "react-router-dom";
import { useRecoilState } from "recoil";
import { List, ListItem, ListItemText } from "@material-ui/core";
import { loginLevelState } from "./data/atomdata";
import { useEmployeesContext } from "../context/employees_context";
import { useEmployees } from "./employees/useEmployees";
import { useUser } from "./user/useUser";
import { useCustomToast } from "../helpers/useCustomToast";

const drawerWidth = 240;
const SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICEID;
const TEMPLATE_ID = "template_1y8odlq";
const USER_ID = process.env.REACT_APP_EMAILJS_USERID;

const columns = [
  {
    title: "Name",
    field: "name",
    editable: "never",
  },
  {
    title: "Work Permit No",
    field: "workpermitno",
    editable: "never",
  },
  {
    title: "Work Permit Expiry",
    field: "workpermit_expirydate",
    type: "date",
    dateSetting: { locale: "en-GB" },
    editable: "never",
  },
];

const WPExpiryViewAdmin = () => {
  const classes = useStyles();
  const toast = useCustomToast();
  const history = useHistory();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const { employees, setFilter, setEmployeeId } = useEmployees();
  const [emaildata, setEmailData] = useState([]);
  const { user } = useUser();
  const [loginLevel, setLoginLevel] = useRecoilState(loginLevelState);
  const [userdata, setUserdata] = useState([]);
  const today = Date().toLocaleString();
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
  const emp = employees.filter(
    (i) =>
      differenceInDays(new Date(i.workpermit_expirydate), new Date(today)) < 90
  );
  const handleEmailButtonClick = () => {
    console.log("data", emp);
    var data = {
      to_name: "pvchin",
      to_email: "pvchinbn@gmail.com",
      message:
        "This is a reminder on your work permit being expired within 90 days!!",
      cc_to: "pvchinbn@yahoo.com",
    };

    emailjs.send(SERVICE_ID, TEMPLATE_ID, data, USER_ID).then(
      function (response) {
        console.log(response.status, response.text);
        toast({
          title: `Email has sent successfully to ${data.to_email}!`,
          status: "success",
        });
      },
      function (err) {
        console.log(err);
        toast({
          title: `Email has fail to send to ${data.to_email}!`,
          status: "warning",
        });
      }
    );
  };

  const handleOnClick = (id) => {
    resetSingleEmployee();
    resetEmployees();
    setEditEmployeeID(id);
    setIsEditingOn();
    setEmployeeId(id);

    history.push("/singleemployee");
  };

  // useEffect(() => {
  //   setFilter(user.id);
  // }, []);

  return (
    <List className={classes.root}>
      <Grid container direction="row">
        {/* <Heading as="h4" size="md">
          Work Permit Expiry Within 90 days
          <IconButton
            variant="outline"
            colorScheme="teal"
            aria-label="Email"
            icon={<EmailIcon />}
            size="lg"
            w={6}
            h={6}
            s={5}
            onClick={() => handleEmailButtonClick()}
          />
        </Heading> */}
        <Stack direction="row">
          <Heading as="h4" size="md">
            Work Permit Expiry Within 90 days
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
        {emp.map((row) => {
          return (
            <Grid templateColumns="repeat(13, 1fr)" gap={3} p={1}>
              <GridItem colSpan={1}>
                <Box w="100%">
                  <IconButton
                    size="sm"
                    aria-label="Edit"
                    icon={<ViewIcon />}
                    onClick={()=>handleOnClick(row.id)}
                  />
                </Box>
              </GridItem>
              <GridItem colSpan={3}>
                <Box w="100%">{row.name}</Box>
              </GridItem>
              <GridItem colSpan={3}>
                <Box w="100%">{row.workpermitno}</Box>
              </GridItem>
              <GridItem colSpan={3}>
                <Box w="100%">{row.workpermit_expirydate}</Box>
              </GridItem>
            </Grid>
            // <ListItem key={row.id}>
            //   <Grid item sm={4} align="center">
            //     <ListItemText>{row.name}</ListItemText>
            //   </Grid>
            //   <Grid item sm={4} align="center">
            //     <ListItemText>{row.workpermitno}</ListItemText>
            //   </Grid>
            //   <Grid item sm={4} align="center">
            //     <ListItemText>{row.workpermit_expirydate}</ListItemText>
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

export default WPExpiryViewAdmin;
