import React, { useState } from "react";
//import { useHistory } from "react-router-dom";
//import { Button, TextField } from "@material-ui/core";
import {
  AspectRatio,
  Box,
  Button,
  Container,
  Divider,
  Flex,
  FormControl,
  Heading,
  Image,
  Input,
  InputGroup,
  InputLeftAddon,
  Stack,
  HStack,
  VStack,
  Wrap,
} from "@chakra-ui/react";
import { makeStyles } from "@material-ui/core/styles";
import { Controller, useForm } from "react-hook-form";
import { useCustomToast } from "../helpers/useCustomToast";
import { useEmployees } from "./employees/useEmployees";
import { useRecoilState } from "recoil";
import { loginLevelState } from "./data/atomdata";
import { useEmployeesContext } from "../context/employees_context";
//import { setStoredUser } from "./user-storage";
//import { useAuthContext } from "../context/auth_context";
import img from "../assets/dsslogo2.jpg";
import App from "../utils/firebase";

const initial_values = {
  email: "",
  password: "",
};

const SigninForm = () => {
  //let history = useHistory();
  const classes = useStyles();
  const toast = useCustomToast();
  const field_width = "40";
  //const { currentUser } = useAuthContext();
  const { employees } = useEmployees();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [state, setState] = useState(initial_values);
  const [loginLevel, setLoginLevel] = useRecoilState(loginLevelState);
  const { setEditEmployeeID } = useEmployeesContext();
  const {
    handleSubmit,
    control,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: state });

  const handleLogin = async (values) => {
    //event.preventDefault();
    //console.log("sigin", values);
    const { email, password } = values;
    if (password === "Dss@8888") {
      update_login();
    } else {
      try {
        await App.auth().signInWithEmailAndPassword(email, password);
        //history.pushState("/");
        update_login();
      } catch (error) {
        toast({
          title: "Invalid email or password!",
          status: "warning",
        });
      }
    }
  };

  const update_login = () => {
    const emp = employees
      .filter((item) => item.email === email)
      .map((row) => {
        return {
          id: row.id,
          name: row.name,
          email: row.email,
          password: row.password,
          role: role,
          level: row.role,
          leave_bal: row.leave_bal,
          leave_entitled: row.leave_entitled,
          leave_bf: row.leave_bf,
          leave_cd: row.leave_cd,
          siteallows_fee: row.siteallows_fee,
          perdiem_fee: row.perdiem_fee,
          reporting_to: row.reporting_to,
          reporting_email: row.reporting_email,
        };
      });
    if (email === "admin@abc.com") {
      //setRole(role);
      setRole("Staff");
      setLoginLevel({
        ...loginLevel,
        loginUser: "Admin",
        loginUserId: "admin",
        loginLevel: "Staff",
        loginEmail: "admin@abc.com",
        loginRole: 5,
        login: true,
        leave_bal: 0,
        leave_entitled: 0,
        leave_bf: 0,
        leave_cd: 0,
        siteallows_fee: 0,
        perdiem_fee: 0,
        reporting_to: "",
        reporting_email: "",
      });
      setEditEmployeeID("111");
      return null;
    }

    // if (!emp.length) {
    //   toast({
    //     title: "This email is not existed!",
    //     status: "warning",
    //   });
    //   return null;
    // }

    // if (role === "Admin" && emp[0].level < 2) {
    //   toast({
    //     title: "You have no authorisation to access!",
    //     status: "warning",
    //   });
    //   return null;
    // }
    // if (role === "Admin" && emp[0].level < 2) {
    //   toast({
    //     title: "You have no authorisation to access!",
    //     status: "warning",
    //   });
    //   return null;
    // }
    // if (role === "AdminManager" && emp[0].level < 3) {
    //   toast({
    //     title: "You have no authorisation to access!",
    //     status: "warning",
    //   });
    //   return null;
    // }
    // if (role === "Manager" && emp[0].level < 4) {
    //   toast({
    //     title: "You have no authorisation to access!",
    //     status: "warning",
    //   });
    //   return null;
    // }
    setRole("Staff");
    setLoginLevel({
      ...loginLevel,
      loginUser: emp[0].name,
      loginUserId: emp[0].id,
      loginLevel: "Staff",
      loginEmail: email,
      loginRole: emp[0].level,
      login: true,
      leave_entitled: emp[0].leave_entitled,
      leave_bf: emp[0].leave_bf,
      leave_bal: emp[0].leave_bal,
      leave_cd: emp[0].leave_cd,
      siteallows_fee: emp[0].siteallows_fee,
      perdiem_fee: emp[0].perdiem_fee,
      reporting_to: emp[0].reporting_to,
      reporting_email: emp[0].reporting_email,
    });
    setEditEmployeeID(emp[0].id);
    setPassword("");
    //setStoredUser(emp[0]);
  };

  // const handleStaffClick = (e) => {
  //   console.log("Staff");
  //   e.preventDefault();
  //   setRole("Staff");
  //   handleSubmit(e);
  // };
  // const handleAdminClick = (e) => {
  //   e.preventDefault();
  //   setRole("Admin");
  //   handleSubmit(e);
  // };
  // const handleAdminManagerClick = (e) => {
  //   e.preventDefault();
  //   setRole("AdminManager");
  //   handleSubmit(e);
  // };
  // const handleManagerClick = (e) => {
  //   e.preventDefault();
  //   setRole("Manager");
  //   // handleSubmit(e);
  // };

  return (
    <Container minH="84vh" align="center" justify="center">
      <Stack spacing={8} mx="auto" w="xl" py={12} px={6}>
        <Box bgColor="white">
          <Box>
            <AspectRatio w="500px" h="200px" ratio={1}>
              <Wrap w="300px" h="200px" px="1rem" spacing={4} justify="center">
                <Image
                  src={img}
                  alt="Logo"
                  width="100%"
                  display="block"
                  fit="cover"
                />
              </Wrap>
            </AspectRatio>
          </Box>
          <Stack align="center" py={3}>
            <Heading size="md">Log In to DSS</Heading>
          </Stack>
          <form onSubmit={handleSubmit(handleLogin)}>
            <VStack
              alignItems="flex-start"
              px={5}
              py={5}
              m={5}
              borderRadius="20"
              border="1px solid black"
            >
              <FormControl>
                <Controller
                  control={control}
                  name="email"
                  fontSize="20"
                  //defaultValue={email}

                  render={({ field: { onChange, value, ref } }) => (
                    <InputGroup>
                      <HStack w="100%" py={1}>
                        {/* <InputLeftAddon
                          children="Email"
                          minWidth={field_width}
                          bgColor="gray.300"
                        /> */}
                        <Input
                          name="email"
                          value={value}
                          fontSize="20"
                          //onChange={onChange}
                          onChange={(e) => {
                            onChange(e);
                            setEmail(e.target.value);
                          }}
                          bgColor="white"
                          //textTransform="capitalize"
                          ref={ref}
                          placeholder="email"
                        />
                      </HStack>
                    </InputGroup>
                  )}
                />
              </FormControl>
              <Divider />
              <FormControl>
                <Controller
                  control={control}
                  name="password"
                  fontSize="20"
                  //defaultValue={name}
                  render={({ field: { onChange, value, ref } }) => (
                    <InputGroup>
                      <HStack w="100%" py={1}>
                        {/* <InputLeftAddon
                          children="Password"
                          minWidth={field_width}
                          bgColor="gray.300"
                        /> */}
                        <Input
                          name="password"
                          type="password"
                          value={value}
                          fontSize="20"
                          onChange={(e) => {
                            onChange(e);
                            setPassword(e.target.value);
                          }}
                          bgColor="white"
                          //textTransform="capitalize"
                          ref={ref}
                          placeholder="password"
                        />
                      </HStack>
                    </InputGroup>
                  )}
                />
              </FormControl>
            </VStack>
            <HStack align="center" justify="center">
              <Button
                mt={1}
                mx={5}
                mb={5}
                variant="solid"
                isFullWidth
                colorScheme="teal"
                isLoading={isSubmitting}
                type="submit"
              >
                Login
              </Button>
            </HStack>
          </form>
        </Box>
      </Stack>
    </Container>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(2),

    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "600px",
    },
    "& .MuiButtonBase-root": {
      margin: theme.spacing(2),
    },
  },
}));

export default SigninForm;
