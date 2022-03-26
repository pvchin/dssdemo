import React, { useState } from "react";
import {
  Button,
  Icon,
  TextField,
  Paper,
  Typography,
  Grid,
  Divider,
  Checkbox,
  FormControlLabel,
} from "@material-ui/core";

import { Alert } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import { useEmployeesContext } from "../context/employees_context";
import { Controller, useForm, setValue } from "react-hook-form";
import { useRecoilState } from "recoil";
import { loginLevelState } from "./data/atomdata";
import { useEmployees } from "./employees/useEmployees";
import { useAddEmployees } from "./employees/useAddEmployees";
import { useUpdateEmployees } from "./employees/useUpdateEmployees";
import { useDepartments } from "./departments/useDepartments";
import { useDesignations } from "./designations/useDesignations";
import App from "../utils/firebase";

// import EmpFamily from "./EmpFamily";
// import EmpEducations from "./EmpEducations";
// import EmpExperiences from "./EmpExperiences";
// import EmpTrainings from "./EmpTrainings";

const initial_values = {
  name: "",
  gender: "",
  ic_no: "",
  email: "",
  age: 0,
  birthdate: null,
  address: "",
  nationality: "",
  basic_salary: 0,
  salary_currency: "BND",
  bank_name: "",
  bank_acno: "",
  tap_checkbox: true,
  tap_acno: "",
  scp_acno: "",
  date_of_join: null,
  date_of_resign: null,
  leave_bal: 0,
  leave_bf: 0,
  leave_entitled: 0,
  leave_cd: 0,
  designation: "",
  department: "",
  passportno: "",
  passport_expirydate: null,
  workpermitno: "",
  workpermit_expirydate: null,
  siteallows_fee: 0,
  perdiem_fee: 0,
  role: 1,
  password: "abc123*",
  empno: "",
  reporting_to: "",
  reporting_email: "",
};

const EmployeeFormNew = () => {
  const classes = useStyles();
  const {
    isEditing,
    single_employee,
    updateEmployee,
    //addEmployee,
    editEmployeeID,
    single_employee_loading,
  } = useEmployeesContext();
  const {
    name,
    ic_no,
    gender,
    age,
    birthdate,
    email,
    address,
    nationality,
    basic_salary,
    salary_currency,
    bank_name,
    bank_acno,
    tap_checkbox,
    tap_acno,
    scp_acno,
    leave_bal,
    leave_bf,
    leave_cd,
    leave_entitled,
    password,
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
  } = single_employee || initial_values;
  const addEmployees = useAddEmployees();
  const updateEmployees = useUpdateEmployees();
  const { employees } = useEmployees();
  const { designations } = useDesignations();
  const { departments } = useDepartments();
  const [empage, setEmpage] = useState(0);
  const [reportemail, setReportEmail] = useState("");
  const [checktap, setCheckTap] = useState(false);
  //const [alert, setAlert] = useState(false);
  const { handleSubmit, control } = useForm();
  const [loginLevel, setLoginLevel] = useRecoilState(loginLevelState);
  console.log("emplevel", loginLevel);

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

  const handleReportingTo = (name) => {
    const emp = employees
      .filter((f) => f.name === name)
      .map((r) => {
        return { ...r };
      });
    setReportEmail(emp[0].email);
  };

  const onSubmit = (data) => {
    if (isEditing) {
      updateEmployees({ id: editEmployeeID, ...data });
    } else {
      addEmployees({ password: "abc123*", role: 1, ...data });
      try {
        App.auth().createUserWithEmailAndPassword(email, "abc123*");
      } catch (error) {
        console.log(error);
      }
    }
    // setAlert(true);
    // setTimeout(() => {
    //   setAlert(false);
    // }, 3000);
    //loadEmployees();
    // <Alert severity="success">
    //   <AlertTitle>Success</AlertTitle>
    //   This is a success alert — <strong>check it out!</strong>
    // </Alert>;
    //history.push("/allemployees");
  };

  if (single_employee_loading) {
    return <div>Loading...</div>;
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
                        id="margin-normal"
                        name="name"
                        defaultValue={name}
                        className={classes.textField}
                        onChange={onChange}
                        error={!!error}
                        helperText={error ? error.message : null}
                      />
                    );
                  }}
                  rules={{ required: "Name required" }}
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
                        id="margin-normal"
                        name="email"
                        defaultValue={email}
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
                        id="margin-normal"
                        name="ic_no"
                        defaultValue={ic_no}
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
                        id="margin-birthdate"
                        name="birthdate"
                        type="date"
                        defaultValue={birthdate}
                        className={classes.textField}
                        //onChange={onChange}
                        onChange={(e) => {
                          onChange(parseInt(e.target.value, 10));
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
                  defaultValue={empage}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => {
                    return (
                      <TextField
                        label="Age"
                        type="number"
                        id="standard-number-age"
                        name="empage"
                        value={empage}
                        className={classes.textField}
                        //onChange={onChange}
                        onChange={(e) => {
                          onChange(parseInt(e.target.value, 10));
                        }}
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
                        id="margin-normal"
                        name="passportno"
                        defaultValue={passportno}
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
                        id="margin-normal"
                        name="passport_expirydate"
                        type="date"
                        defaultValue={passport_expirydate}
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
                        defaultValue={nationality}
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
                        id="margin-normal"
                        name="gender"
                        defaultValue={gender}
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
                        defaultValue={address}
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
                {loginLevel.loginLevel !== "Admin" && (
                  <Controller
                    name="basic_salary"
                    control={control}
                    defaultValue={basic_salary}
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => {
                      return (
                        <TextField
                          label="Basic Salary"
                          type="number"
                          id="standard-number"
                          name="basic_pay"
                          defaultValue={basic_salary}
                          className={classes.textField}
                          //onChange={onChange}
                          onChange={(e) => {
                            onChange(parseInt(e.target.value, 10));
                          }}
                          error={!!error}
                          helperText={error ? error.message : null}
                        />
                      );
                    }}
                    //rules={{ required: "IC No required" }}
                  />
                )}
                {loginLevel.loginLevel !== "Admin" && (
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
                          defaultValue={salary_currency}
                          className={classes.textField}
                          //onChange={onChange}
                          onChange={(e) => {
                            onChange(parseInt(e.target.value, 10));
                          }}
                          error={!!error}
                          helperText={error ? error.message : null}
                          select
                        >
                          <MenuItem value="BND">BND</MenuItem>
                          <MenuItem value="USD">USD</MenuItem>
                          <MenuItem value="MYR">MYR</MenuItem>
                        </TextField>
                      );
                    }}
                    //rules={{ required: "IC No required" }}
                  />
                )}
              </div>
              <div>
                {loginLevel.loginLevel !== "Admin" && (
                  <Controller
                    name="siteallows_fee"
                    control={control}
                    defaultValue={siteallows_fee}
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => {
                      return (
                        <TextField
                          label="Site Allowances Fee"
                          type="number"
                          id="standard-number"
                          name="siteallows_fee"
                          defaultValue={siteallows_fee}
                          className={classes.textField}
                          //onChange={onChange}
                          onChange={(e) => {
                            onChange(parseInt(e.target.value, 10));
                          }}
                          error={!!error}
                          helperText={error ? error.message : null}
                        />
                      );
                    }}
                    //rules={{ required: "IC No required" }}
                  />
                )}
                {loginLevel.loginLevel !== "Admin" && (
                  <Controller
                    name="perdiem_fee"
                    control={control}
                    defaultValue={perdiem_fee}
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => {
                      return (
                        <TextField
                          label="Per Diem Fee"
                          type="number"
                          id="standard-number"
                          name="perdiem_fee"
                          defaultValue={perdiem_fee}
                          className={classes.textField}
                          //onChange={onChange}
                          onChange={(e) => {
                            onChange(parseInt(e.target.value, 10));
                          }}
                          error={!!error}
                          helperText={error ? error.message : null}
                        />
                      );
                    }}
                    //rules={{ required: "IC No required" }}
                  />
                )}
              </div>

              <div>
                <Controller
                  name="tap_checkbox"
                  control={control}
                  defaultValue={tap_checkbox}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => {
                    return (
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={tap_checkbox}
                            onChange={onChange}
                            name="tap_checkbox"
                          />
                        }
                        label="TAP/SCP Contribution"
                      />
                    );
                  }}
                  //rules={{ required: "IC No required" }}
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
                        id="margin-normal"
                        name="tap_acno"
                        defaultValue={tap_acno}
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
                        id="margin-normal"
                        name="scp_acno"
                        defaultValue={scp_acno}
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
                        id="margin-normal"
                        name="bank_name"
                        defaultValue={bank_name}
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
                        id="margin-normal"
                        name="bank_acno"
                        defaultValue={bank_acno}
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
                        id="margin-normal"
                        name="workpermitno"
                        defaultValue={workpermitno}
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
                        id="margin-normal"
                        name="workpermit_expirydate"
                        type="date"
                        defaultValue={workpermit_expirydate}
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
                        id="margin-normal"
                        name="date_of_join"
                        type="date"
                        defaultValue={date_of_join}
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
                        id="margin-normal"
                        name="date_of_resign"
                        type="date"
                        defaultValue={date_of_resign}
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
                        defaultValue={leave_entitled}
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
                  name="leave_bal"
                  control={control}
                  defaultValue={leave_bal}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => {
                    return (
                      <TextField
                        label="Leaves Balance"
                        id="standard-leavebal"
                        name="leave_bal"
                        type="numeric"
                        defaultValue={leave_bal}
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
                        id="margin-normal"
                        name="designation"
                        defaultValue={designation}
                        className={classes.textField}
                        onChange={onChange}
                        error={!!error}
                        helperText={error ? error.message : null}
                        select
                      >
                        {designations &&
                          designations.map((r) => {
                            return <MenuItem value={r.name}>{r.name}</MenuItem>;
                          })}
                      </TextField>
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
                        id="margin-normal"
                        name="department"
                        defaultValue={department}
                        className={classes.textField}
                        onChange={onChange}
                        error={!!error}
                        helperText={error ? error.message : null}
                        select
                      >
                        {departments &&
                          departments.map((r) => {
                            return <MenuItem value={r.name}>{r.name}</MenuItem>;
                          })}
                      </TextField>
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
                        defaultValue={reporting_to}
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

      {/* <div>
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
      </div> */}
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

export default EmployeeFormNew;
