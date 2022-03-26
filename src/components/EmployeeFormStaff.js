import React, { useState, useEffect } from "react";
import {
  Button,
  Icon,
  TextField,
  Paper,
  Typography,
  Grid,
  Divider,
} from "@material-ui/core";
//import { Alert, AlertTitle } from "@material-ui/lab";
import CurrencyTextField from "@unicef/material-ui-currency-textfield";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import { useCustomToast } from "../helpers/useCustomToast";
import { selector, useRecoilState, useRecoilValueLoadable } from "recoil";
import { loginLevelState } from "./data/atomdata";
import { useEmployeesContext } from "../context/employees_context";
import { Controller, useForm } from "react-hook-form";

import { useEmployees } from "./employees/useEmployees";
import { useSingleEmployee } from "./employees/useSingleEmployee";
import { useUpdateEmployees } from "./employees/useUpdateEmployees";
// import EmpFamilyStaff from "./EmpFamilyStaff";
// import EmpEducationsStaff from "./EmpEducationsStaff";
// import EmpExperiencesStaff from "./EmpExperiencesStaff";
import EmpFamily from "./EmpFamily";
import EmpEducations from "./EmpEducations";
import EmpExperiences from "./EmpExperiences";
import EmpTrainings from "./EmpTrainings";
import App from "../utils/firebase";

const initial_values = {
  name: "",
  birthdate: null,
  empno: "",
  gender: "",
  ic_no: "",
  email: "",
  age: 0,
  basic_salary: 0,
  salary_currency: "BND",
  bank_name: "",
  bank_acno: "",
  nationality: "",
  address: "",
  leave_bal: 0,
  leave_bf: 0,
  leave_entitled: 0,
  tap_acno: "",
  scp_acno: "",
  date_of_join: null,
  date_of_resign: null,
  designation: "",
  department: "",
  passportno: "",
  passport_expirydate: null,
  workpermitno: "",
  workpermit_expirydate: null,
  siteallows_fee: 0,
  perdiem_fee: 0,
  reporting_to: "",
  reporting_email: "",
};

const EmployeeForm = () => {
  const classes = useStyles();
  const toast = useCustomToast();
  const { employees, setFilter } = useEmployees();
  const { singleemployee, setSingleEmployeeId } = useSingleEmployee();
  const updateEmployees = useUpdateEmployees();
  const [empage, setEmpage] = useState(0);
  const [reportemail, setReportEmail] = useState("");
  const [loginLevel, setLoginLevel] = useRecoilState(loginLevelState);
  const {
    isEditing,
    //single_employee,
    editEmployeeID,
    getSingleEmployee,
    single_employee_loading,
  } = useEmployeesContext();

  const {
    name,
    empno,
    birthdate,
    ic_no,
    gender,
    age,
    email,
    nationality,
    address,
    basic_salary,
    salary_currency,
    bank_name,
    bank_acno,
    tap_acno,
    scp_acno,
    leave_bf,
    leave_entitled,
    date_of_join,
    date_of_resign,
    designation,
    department,
    passportno,
    passport_expirydate,
    workpermitno,
    workpermit_expirydate,
    siteallows_fee,
    perdiem_fee,
    reporting_to,
    reporting_email,
  } = singleemployee || initial_values;
  const { handleSubmit, control } = useForm({
    defaultValues: {
      singleemployee,
    },
  });
  console.log("single employee", singleemployee);
  const handleReportingTo = (name) => {
    const emp = employees
      .filter((f) => f.name === name)
      .map((r) => {
        return { ...r };
      });
    setReportEmail(emp[0].email);
  };

  const onSubmit = (data) => {
    updateEmployees({ id: editEmployeeID, ...data });
  };

  const Reset_PW = () => {
    try {
      App.auth().sendPasswordResetEmail(email);
      toast({
        title: `Reset Password sent to ${email}!`,
        status: "success",
      });
    } catch (error) {
      toast({
        title: `Fail to reset password on ${email}!`,
        status: "warning",
      });
      console.log(error);
    }
  };

  const calculateAge = (dob) => {
    var today = new Date();
    var birthDate = new Date(dob);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  useEffect(() => {
    setSingleEmployeeId(loginLevel.loginUserId);
  }, []);

  useEffect(() => {
    let age = calculateAge(birthdate);
    setEmpage(age);
    setReportEmail(reporting_email);
  }, []);

  if (single_employee_loading) {
    return (
      <div>
        <h2>Loading... </h2>
      </div>
    );
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Paper className={classes.root}>
          <Grid container className={classes.root} spacing={15}>
            <div>
              <Typography variant="h5" component="h3">
                EMPLOYEE FORM
              </Typography>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.button}
              >
                Submit <Icon className={classes.rightIcon}>send</Icon>
              </Button>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={Reset_PW}
              >
                Reset PW <Icon className={classes.rightIcon}>send</Icon>
              </Button>
            </div>
          </Grid>
          <Divider className={classes.divider} />
          <Grid item xs={12}>
            <div>
              <div>
                <Controller
                  name="name"
                  control={control}
                  defaultValue={name}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => {
                    return (
                      <TextField
                        label="Name"
                        id="standard-name"
                        name="name"
                        value={name}
                        className={classes.textField}
                        onChange={onChange}
                        error={!!error}
                        helperText={error ? error.message : null}
                      />
                    );
                  }}
                  rules={{ required: "Name required" }}
                />
                <Controller
                  name="empno"
                  control={control}
                  defaultValue={empno}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => {
                    return (
                      <TextField
                        label="Emp No"
                        id="standard-empno"
                        name="empno"
                        value={empno}
                        className={classes.textField}
                        onChange={onChange}
                        error={!!error}
                        helperText={error ? error.message : null}
                      />
                    );
                  }}
                  //rules={{ required: "Name required" }}
                />
              </div>
              <div>
                <Controller
                  name="email"
                  control={control}
                  defaultValue={email}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => {
                    return (
                      <TextField
                        label="Email"
                        id="standard-email"
                        name="email"
                        value={email}
                        className={classes.textField}
                        onChange={onChange}
                        error={!!error}
                        helperText={error ? error.message : null}
                      />
                    );
                  }}
                  rules={{ required: "Email is required" }}
                />

                <Controller
                  name="ic_no"
                  control={control}
                  defaultValue={ic_no}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => {
                    return (
                      <TextField
                        label="IC No"
                        id="standard-icno"
                        name="ic_no"
                        value={ic_no}
                        className={classes.textField}
                        onChange={onChange}
                        error={!!error}
                        helperText={error ? error.message : null}
                      />
                    );
                  }}
                  //rules={{ required: "IC No required" }}
                />
              </div>
              <div>
                <Controller
                  name="birthdate"
                  control={control}
                  defaultValue={birthdate}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => {
                    return (
                      <TextField
                        label="Birth Date"
                        id="standard-birthdate"
                        name="birthdate"
                        type="date"
                        value={birthdate}
                        className={classes.textField}
                        onChange={(e) => {
                          onChange(e.target.value);
                          let age = calculateAge(e.target.value);
                          console.log("emp", birthdate, age);
                          setEmpage(age);
                        }}
                        error={!!error}
                        helperText={error ? error.message : null}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      ></TextField>
                    );
                  }}
                  //rules={{ required: "IC No required" }}
                />

                <Controller
                  name="age"
                  control={control}
                  //defaultValue={age}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => {
                    return (
                      <TextField
                        label="Age"
                        type="number"
                        id="standard-age"
                        name="age"
                        value={empage}
                        className={classes.textField}
                        //onChange={onChange}
                        onChange={(e) => {
                          onChange(parseInt(e.target.value, 10));
                        }}
                        error={!!error}
                        helperText={error ? error.message : null}
                        inputProps={{ readOnly: true }}
                      />
                    );
                  }}
                  //rules={{ required: "IC No required" }}
                />
              </div>
              <div>
                <Controller
                  name="passportno"
                  control={control}
                  defaultValue={passportno}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => {
                    return (
                      <TextField
                        label="Passport No"
                        id="stanrad-ppno"
                        name="passportno"
                        value={passportno}
                        className={classes.textField}
                        onChange={onChange}
                        error={!!error}
                        helperText={error ? error.message : null}
                      />
                    );
                  }}
                  //rules={{ required: "Name required" }}
                />
                <Controller
                  name="passport_expirydate"
                  control={control}
                  defaultValue={passport_expirydate}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => {
                    return (
                      <TextField
                        label="Passport Expiry Date"
                        id="standard-ppexpiry"
                        name="passport_expirydate"
                        type="date"
                        value={passport_expirydate}
                        className={classes.textField}
                        onChange={onChange}
                        error={!!error}
                        helperText={error ? error.message : null}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    );
                  }}
                  //rules={{ required: "Name required" }}
                />
              </div>
              <div>
                <Controller
                  name="nationality"
                  control={control}
                  defaultValue={nationality}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => {
                    return (
                      <TextField
                        label="Nationality"
                        id="standard-nationality"
                        name="nationality"
                        value={nationality}
                        className={classes.textField}
                        onChange={onChange}
                        error={!!error}
                        helperText={error ? error.message : null}
                      />
                    );
                  }}
                  //rules={{ required: "IC No required" }}
                />
                <Controller
                  name="gender"
                  control={control}
                  defaultValue={gender}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => {
                    return (
                      <TextField
                        label="Gender"
                        id="standard-gender"
                        name="gender"
                        value={gender}
                        className={classes.textField}
                        onChange={onChange}
                        error={!!error}
                        helperText={error ? error.message : null}
                        select
                      >
                        <MenuItem value="Male">Male</MenuItem>
                        <MenuItem value="Female">Female</MenuItem>
                      </TextField>
                    );
                  }}
                  //rules={{ required: "IC No required" }}
                />
              </div>
              <div>
                <Controller
                  name="address"
                  control={control}
                  defaultValue={address}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => {
                    return (
                      <TextField
                        label="Address"
                        id="standard-address"
                        name="address"
                        value={address}
                        className={classes.textField}
                        onChange={onChange}
                        error={!!error}
                        helperText={error ? error.message : null}
                      />
                    );
                  }}
                  //rules={{ required: "IC No required" }}
                />
              </div>
            </div>

            <Divider className={classes.divider} />
            <div>
              <div>
                <Controller
                  name="basic_salary"
                  control={control}
                  defaultValue={basic_salary}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => {
                    return (
                      <CurrencyTextField
                        label="Basic Salary"
                        variant="standard"
                        value={basic_salary}
                        currencySymbol="$"
                        outputFormat="number"
                        decimalCharacter="."
                        digitGroupSeparator=","
                        decimalPlaces="2"
                        className={classes.textField}
                        id="standard-basicsalary"
                        name="basic_pay"
                        //onChange={onChange}
                        onChange={(e) => {
                          onChange(parseFloat(e.target.value, 10));
                        }}
                        error={!!error}
                        helperText={error ? error.message : null}
                        inputProps={{ readOnly: true }}
                      />
                    );
                  }}
                  //rules={{ required: "IC No required" }}
                />
                <Controller
                  name="salary_currency"
                  control={control}
                  defaultValue={salary_currency}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => {
                    return (
                      <TextField
                        label="Currency"
                        id="standard-currency"
                        name="salary_currency"
                        value={salary_currency}
                        className={classes.textField}
                        onChange={onChange}
                        error={!!error}
                        helperText={error ? error.message : null}
                        inputProps={{ readOnly: true }}
                        select
                      >
                        <MenuItem value="BND">BND</MenuItem>
                        <MenuItem value="MYR">MYR</MenuItem>
                        <MenuItem value="USD">USD</MenuItem>
                      </TextField>
                    );
                  }}
                  //rules={{ required: "IC No required" }}
                />
              </div>
              <div>
                <Controller
                  name="siteallows_fee"
                  control={control}
                  defaultValue={siteallows_fee}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => {
                    return (
                      <CurrencyTextField
                        label="Site Allowances Fee"
                        variant="standard"
                        value={siteallows_fee}
                        currencySymbol="$"
                        outputFormat="number"
                        decimalCharacter="."
                        digitGroupSeparator=","
                        decimalPlaces="2"
                        className={classes.textField}
                        id="standard-siteallowances"
                        name="siteallows_fee"
                        //onChange={onChange}
                        onChange={(e) => {
                          onChange(parseFloat(e.target.value, 10));
                        }}
                        error={!!error}
                        helperText={error ? error.message : null}
                        inputProps={{ readOnly: true }}
                      />
                    );
                  }}
                  //rules={{ required: "IC No required" }}
                />
                <Controller
                  name="perdiem_fee"
                  control={control}
                  defaultValue={perdiem_fee}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => {
                    return (
                      <CurrencyTextField
                        label="Per Diem Fee"
                        variant="standard"
                        value={perdiem_fee}
                        currencySymbol="$"
                        outputFormat="number"
                        decimalCharacter="."
                        digitGroupSeparator=","
                        decimalPlaces="2"
                        className={classes.textField}
                        id="standard-perdiem"
                        name="perdiem_fee"
                        //onChange={onChange}
                        onChange={(e) => {
                          onChange(parseFloat(e.target.value, 10));
                        }}
                        error={!!error}
                        helperText={error ? error.message : null}
                        inputProps={{ readOnly: true }}
                      />
                    );
                  }}
                  //rules={{ required: "IC No required" }}
                />
              </div>
              <div>
                <Controller
                  name="bank_name"
                  control={control}
                  defaultValue={bank_name}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => {
                    return (
                      <TextField
                        label="Bank Name"
                        id="standard-bankname"
                        name="bank_name"
                        value={bank_name}
                        className={classes.textField}
                        onChange={onChange}
                        error={!!error}
                        helperText={error ? error.message : null}
                      />
                    );
                  }}
                  //rules={{ required: "Email is required" }}
                />

                <Controller
                  name="bank_acno"
                  control={control}
                  defaultValue={bank_acno}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => {
                    return (
                      <TextField
                        label="Bank Ac No"
                        id="standard-bankacno"
                        name="bank_acno"
                        value={bank_acno}
                        className={classes.textField}
                        onChange={onChange}
                        error={!!error}
                        helperText={error ? error.message : null}
                      />
                    );
                  }}
                  // rules={{ required: "Email is required" }}
                />
              </div>
              <div>
                <Controller
                  name="tap_acno"
                  control={control}
                  defaultValue={tap_acno}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => {
                    return (
                      <TextField
                        label="TAP Ac No"
                        id="standard-tapacno"
                        name="tap_acno"
                        value={tap_acno}
                        className={classes.textField}
                        onChange={onChange}
                        error={!!error}
                        helperText={error ? error.message : null}
                      />
                    );
                  }}
                  //rules={{ required: "Email is required" }}
                />

                <Controller
                  name="scp_acno"
                  control={control}
                  defaultValue={scp_acno}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => {
                    return (
                      <TextField
                        label="SCP Ac No"
                        id="standard-scpacno"
                        name="scp_acno"
                        value={scp_acno}
                        className={classes.textField}
                        onChange={onChange}
                        error={!!error}
                        helperText={error ? error.message : null}
                      />
                    );
                  }}
                  //rules={{ required: "Email is required" }}
                />
              </div>
              <div>
                <Controller
                  name="workpermitno"
                  control={control}
                  defaultValue={workpermitno}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => {
                    return (
                      <TextField
                        label="Work Permit No"
                        id="standard-wpno"
                        name="workpermitno"
                        value={workpermitno}
                        className={classes.textField}
                        onChange={onChange}
                        error={!!error}
                        helperText={error ? error.message : null}
                      />
                    );
                  }}
                  //rules={{ required: "Name required" }}
                />
                <Controller
                  name="workpermit_expirydate"
                  control={control}
                  defaultValue={workpermit_expirydate}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => {
                    return (
                      <TextField
                        label="Work Permit Expiry Date"
                        id="standard-wpexpiry"
                        name="workpermit_expirydate"
                        type="date"
                        value={workpermit_expirydate}
                        className={classes.textField}
                        onChange={onChange}
                        error={!!error}
                        helperText={error ? error.message : null}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    );
                  }}
                  //rules={{ required: "Name required" }}
                />
              </div>
              <Divider className={classes.divider} />
              <div>
                <Controller
                  name="date_of_join"
                  control={control}
                  defaultValue={date_of_join}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => {
                    return (
                      <TextField
                        label="Joining Date"
                        id="standard-joindate"
                        name="date_of_join"
                        type="date"
                        value={date_of_join}
                        className={classes.textField}
                        onChange={onChange}
                        error={!!error}
                        helperText={error ? error.message : null}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    );
                  }}
                  //rules={{ required: "Email is required" }}
                />
                <Controller
                  name="date_of_resign"
                  control={control}
                  defaultValue={date_of_resign}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => {
                    return (
                      <TextField
                        label="Resign Date"
                        id="standard-resigndate"
                        name="date_of_resign"
                        type="date"
                        value={date_of_resign}
                        className={classes.textField}
                        onChange={onChange}
                        error={!!error}
                        helperText={error ? error.message : null}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    );
                  }}
                  //rules={{ required: "Email is required" }}
                />
              </div>
              <div>
                <Controller
                  name="leave_entitled"
                  control={control}
                  defaultValue={leave_entitled}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => {
                    return (
                      <TextField
                        label="Annual Leaves Entitled"
                        id="standard-annualleave"
                        name="leave_entitled"
                        type="numeric"
                        value={leave_entitled}
                        className={classes.textField}
                        onChange={onChange}
                        error={!!error}
                        helperText={error ? error.message : null}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        inputProps={{ readOnly: true }}
                      />
                    );
                  }}
                  //rules={{ required: "Email is required" }}
                />
                <Controller
                  name="leave_bf"
                  control={control}
                  defaultValue={leave_bf}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => {
                    return (
                      <TextField
                        label="Leaves B/F"
                        id="standard-leavebal"
                        name="leave_bf"
                        type="numeric"
                        value={leave_bf}
                        className={classes.textField}
                        onChange={onChange}
                        error={!!error}
                        helperText={error ? error.message : null}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        inputProps={{ readOnly: true }}
                      />
                    );
                  }}
                  //rules={{ required: "Email is required" }}
                />
              </div>
              <div>
                <Controller
                  name="designation"
                  control={control}
                  defaultValue={designation}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => {
                    return (
                      <TextField
                        label="Designation"
                        id="standard-designation"
                        name="designation"
                        value={designation}
                        className={classes.textField}
                        onChange={onChange}
                        error={!!error}
                        helperText={error ? error.message : null}
                      />
                    );
                  }}
                  //rules={{ required: "Email is required" }}
                />
                <Controller
                  name="department"
                  control={control}
                  defaultValue={department}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => {
                    return (
                      <TextField
                        label="Department"
                        id="standard-department"
                        name="department"
                        value={department}
                        className={classes.textField}
                        onChange={onChange}
                        error={!!error}
                        helperText={error ? error.message : null}
                      />
                    );
                  }}
                  //rules={{ required: "Email is required" }}
                />
              </div>
              <div>
                <Controller
                  name="reporting_to"
                  control={control}
                  defaultValue={reporting_to}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => {
                    return (
                      <TextField
                        label="Reporting To"
                        id="standard-reportingto"
                        name="reporting_to"
                        value={reporting_to}
                        className={classes.textField}
                        onChange={(e) => {
                          onChange(e.target.value);
                          handleReportingTo(e.target.value);
                        }}
                        error={!!error}
                        helperText={error ? error.message : null}
                        select
                      >
                        <MenuItem value="">None</MenuItem>
                        {employees &&
                          employees.map((r) => {
                            return <MenuItem value={r.name}>{r.name}</MenuItem>;
                          })}
                      </TextField>
                    );
                  }}
                  //rules={{ required: "Email is required" }}
                />
                <Controller
                  name="reporting_email"
                  control={control}
                  defaultValue={reportemail}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => {
                    return (
                      <TextField
                        label="Reporting Email"
                        id="standard-reportingemail"
                        name="reporting_email"
                        value={reportemail}
                        className={classes.textField}
                        onChange={onChange}
                        error={!!error}
                        helperText={error ? error.message : null}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        InputProps={{
                          readOnly: true,
                        }}
                      ></TextField>
                    );
                  }}
                  //rules={{ required: "Email is required" }}
                />
              </div>
              <Divider className={classes.divider} />
            </div>
          </Grid>
          <Divider />
        </Paper>
      </form>

      <Grid xs={12}>
        <EmpFamily />
      </Grid>
      <Grid xs={12}>
        <EmpEducations />
      </Grid>
      <Grid xs={12}>
        <EmpExperiences />
      </Grid>
      <Grid xs={12}>
        <EmpTrainings />
      </Grid>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  leftIcon: {
    marginRight: theme.spacing(1),
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
  },
  iconSmall: {
    fontSize: 20,
  },
  root: {
    padding: theme.spacing(3, 2),
  },
  container: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  divider: {
    padding: 4,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 350,
  },
}));

export default EmployeeForm;
