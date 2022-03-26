import React, { useState } from "react";
//import { useHistory } from "react-router-dom";
import { Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useCustomToast } from "../helpers/useCustomToast";
import { useEmployees } from "./employees/useEmployees";
import { useRecoilState } from "recoil";
import { loginLevelState } from "./data/atomdata";
import { useEmployeesContext } from "../context/employees_context";
//import { setStoredUser } from "./user-storage";
//import { useAuthContext } from "../context/auth_context";
import App from "../utils/firebase";

const SigninForm = () => {
  //let history = useHistory();
  const classes = useStyles();
  const toast = useCustomToast();
  //const { currentUser } = useAuthContext();
  const { employees } = useEmployees();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const [loginLevel, setLoginLevel] = useRecoilState(loginLevelState);
  const { setEditEmployeeID } = useEmployeesContext();

  const handleLogin = async (event) => {
    event.preventDefault();
    //console.log("sigin", email, password);
    //const { email, password } = event.target.elements;
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
          siteallows_fee: row.siteallows_fee,
          perdiem_fee: row.perdiem_fee,
          reporting_to: row.reporting_to,
          reporting_email: row.reporting_email,
        };
      });
    if (email === "admin@abc.com") {
      setRole(role);
      setLoginLevel({
        ...loginLevel,
        loginUser: "Admin",
        loginUserId: "admin",
        loginLevel: role,
        loginEmail: "admin@abc.com",
        login: true,
        leave_bal: 0,
        siteallows_fee: 0,
        perdiem_fee: 0,
        reporting_to: "",
        reporting_email: "",
      });
      setEditEmployeeID("111");
      return null;
    }

    if (!emp.length) {
      toast({
        title: "This email is not existed!",
        status: "warning",
      });
      return null;
    }

    if (role === "Admin" && emp[0].level < 2) {
      toast({
        title: "You have no authorisation to access!",
        status: "warning",
      });
      return null;
    }
    if (role === "Admin" && emp[0].level < 2) {
      toast({
        title: "You have no authorisation to access!",
        status: "warning",
      });
      return null;
    }
    if (role === "AdminManager" && emp[0].level < 3) {
      toast({
        title: "You have no authorisation to access!",
        status: "warning",
      });
      return null;
    }
    if (role === "Manager" && emp[0].level < 4) {
      toast({
        title: "You have no authorisation to access!",
        status: "warning",
      });
      return null;
    }

    setLoginLevel({
      ...loginLevel,
      loginUser: emp[0].name,
      loginUserId: emp[0].id,
      loginLevel: role,
      loginEmail: email,
      login: true,
      leave_bal: emp[0].leave_bal,
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
    <form className={classes.root} onSubmit={handleLogin}>
      <div style={{ textAlign: "center" }}>
        <TextField
          label="Email"
          variant="filled"
          type="email"
          required
          style={{ width: 350 }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          variant="filled"
          type="password"
          style={{ width: 350 }}
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div style={{ textAlign: "center" }}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={(e) => setRole("Staff")}
        >
          Staff
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={(e) => setRole("Admin")}
        >
          Admin
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={(e) => setRole("AdminManager")}
        >
          Admin Manager
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={(e) => setRole("Manager")}
        >
          Manager
        </Button>
      </div>
    </form>
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
