import React, { useState, useEffect } from "react";
import {
  Button,
  Icon,
  TextField,
  Paper,
  Typography,
  Grid,
  Divider,
  FormControlLabel,
  Checkbox,
  MenuItem,
} from "@material-ui/core";
import currency from "currency.js";
import { useBoolean } from "@chakra-ui/hooks";
import CurrencyTextField from "@unicef/material-ui-currency-textfield";
import { makeStyles } from "@material-ui/core/styles";
import { useEmployeesContext } from "../context/employees_context";
import { Controller, useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { loginLevelState } from "./data/atomdata";
import { editEmployeeIdState } from "./data/atomdata";
import { useAllEmployees } from "./employees/useAllEmployees";
import { useEmployees } from "./employees/useEmployees";
import { useAddEmployees } from "./employees/useAddEmployees";
import { useUpdateEmployees } from "./employees/useUpdateEmployees";
import { useDepartments } from "./departments/useDepartments";
import { useDesignations } from "./designations/useDesignations";
import { useCurrency } from "./currency/useCurrency";
import EmpFamily from "./EmpFamily";
import EmpEducations from "./EmpEducations";
import EmpExperiences from "./EmpExperiences";
import EmpTrainings from "./EmpTrainings";

const initial_values = {
  name: "",
  gender: "",
  ic_no: "",
  email: "",
  birthdate: null,
  age: 0,
  nationality: "",
  address: "",
  leave_bal: 0,
  leave_bf: 0,
  leave_entitled: 0,
  basic_salary: 0,
  salary_currency: "BND",
  bank_name: "",
  bank_acno: "",
  tap_checkbox: true,
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
  empno: "",
  reporting_to: "",
  reporting_email: "",
};

const EmployeeForm = () => {
  const classes = useStyles();
  const { employees, employeeId, setEmployeeId } = useEmployees();
  const { allemployees, setAllEmpId } = useAllEmployees();
  const addEmployees = useAddEmployees();
  const updateEmployees = useUpdateEmployees();
  //const currencyRate = useCurrency()
  const { designations } = useDesignations();
  const { departments } = useDepartments();
  const [reportemail, setReportEmail] = useState("");
  const [empage, setEmpage] = useState(0);
  const [checktap, setCheckTap] = useState(false);
  const [empId, setEmpId] = useRecoilState(editEmployeeIdState);
  const { handleSubmit, control, setValue, register } = useForm();
  const [loginLevel, setLoginLevel] = useRecoilState(loginLevelState);
  const { isEditing, editEmployeeID } = useEmployeesContext();
  const single_employee = allemployees
    .filter((r) => r.id === editEmployeeID)
    .map((r) => {
      return { ...r };
    });
  const {
    name,
    ic_no,
    gender,
    birthdate,
    age,
    email,
    nationality,
    address,
    leave_bal,
    leave_entitled,
    leave_bf,
    basic_salary,
    salary_currency,
    bank_name,
    bank_acno,
    tap_checkbox,
    tap_acno,
    scp_acno,
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
    empno,
    reporting_to,
    reporting_email,
  } = single_employee[0] || initial_values;

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
      updateEmployees({
        id: editEmployeeID,
        ...data,
        reporting_email: reportemail,
      });
    } else {
      addEmployees({ ...data, reporting_email: reportemail });
    }
  };

  useEffect(() => {
    let age = calculateAge(birthdate);
    setEmpage(age);
    setCheckTap(tap_checkbox);
    setReportEmail(reporting_email);
  }, []);

  useEffect(() => {
    setAllEmpId("111");
  }, []);

  if (!allemployees) {
    return <h2>Loading ...</h2>;
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
                        id="standard-name"
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
                        defaultValue={empno}
                        name="empno"
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
                        id="standard-icno"
                        defaultValue={ic_no}
                        name="ic_no"
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
                        defaultValue={birthdate}
                        className={classes.textField}
                        //onChange={onChange}
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
                  defaultValue={empage}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => {
                    return (
                      <TextField
                        label="Age"
                        type="number"
                        id="standard-age"
                        name="empage"
                        //defaultValue={age}
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
                        id="standard-passportno"
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
                        id="standard-ppexpiry"
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
                        id="standard-gender"
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
                        <CurrencyTextField
                          label="Basic Salary"
                          variant="standard"
                          value={basic_salary}
                          currencySymbol="$"
                          outputFormat="string"
                          decimalCharacter="."
                          digitGroupSeparator=","
                          decimalPlaces="2"
                          className={classes.textField}
                          id="standard-basicsalary"
                          name="basic_salary"
                          //onChange={onChange}
                          onChange={(e) => {
                            onChange(parseFloat(currency(e.target.value), 10));
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
                          onChange={onChange}
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
                            onChange(parseFloat(currency(e.target.value), 10));
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
                            onChange(parseFloat(currency(e.target.value), 10));
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
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => {
                    return (
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="tap_checkbox"
                            defaultValue={tap_checkbox}
                            checked={checktap}
                            type="checkbox"
                            onChange={(e) => {
                              onChange(e.target.checked);
                              setCheckTap(e.target.checked);
                            }}
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
                        id="standard-tapno"
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
                        id="standard-scpno"
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
                        id="standard-bankname"
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
                        id="standard-backacno"
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
                        id="standard-workpermitno"
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
                        id="standard-workpermitexpiry"
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
                        id="standard-joiningdate"
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
                        id="standard-resindate"
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
                        onChange={(e) =>
                          onChange(parseFloat(e.target.value, 10))
                        }
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
                        defaultValue={leave_bf}
                        className={classes.textField}
                        onChange={(e) =>
                          onChange(parseFloat(e.target.value, 10))
                        }
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
                        id="standard-designation"
                        name="designation"
                        defaultValue={designation}
                        className={classes.textField}
                        onChange={onChange}
                        error={!!error}
                        helperText={error ? error.message : null}
                        select
                      >
                        <MenuItem value="">None</MenuItem>
                        {designations &&
                          designations.map((r) => {
                            return (
                              <MenuItem key={r.id} value={r.name}>
                                {r.name}
                              </MenuItem>
                            );
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
                        id="standard-department"
                        name="department"
                        defaultValue={department}
                        className={classes.textField}
                        onChange={onChange}
                        error={!!error}
                        helperText={error ? error.message : null}
                        select
                      >
                        <MenuItem value="">None</MenuItem>
                        {departments &&
                          departments.map((r) => {
                            return (
                              <MenuItem key={r.id} value={r.name}>
                                {r.name}
                              </MenuItem>
                            );
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
                            return (
                              <MenuItem key={r.id} value={r.name}>
                                {r.name}
                              </MenuItem>
                            );
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

      <div>
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
