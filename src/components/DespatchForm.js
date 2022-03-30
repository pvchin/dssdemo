import React from "react";
import { Button, Icon, TextField, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useRecoilState } from "recoil";
import * as emailjs from "emailjs-com";
import { loginLevelState } from "./data/atomdata";
import MenuItem from "@material-ui/core/MenuItem";
import { useEmployeesContext } from "../context/employees_context";
import { useExpensesContext } from "../context/expenses_context";
import { Controller, useForm } from "react-hook-form";
import { useCustomToast } from "../helpers/useCustomToast";
import { useExpenses } from "./expenses/useExpenses";
import { useAddExpenses } from "./expenses/useAddExpenses";
import { useDeleteExpenses } from "./expenses/useDeleteExpenses";
import { useUpdateExpenses } from "./expenses/useUpdateExpenses";

const SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICEID;
const TEMPLATE_ID = "template_1y8odlq";
const USER_ID = process.env.REACT_APP_EMAILJS_USERID;

const initial_values = {
  name: "",
  date: "",
  purchased_date: "",
  purchased_from: "",
  description: "",
  remark: "",
  status: "Pending",
  amount: 0,
};

const ExpenseForm = ({ formdata, setFormdata, handleDialogClose }) => {
  const classes = useStyles();
  const toast = useCustomToast();
  const { expenses, filter, setFilter, setExpenseId } = useExpenses();
  const updateExpenses = useUpdateExpenses();
  const addExpenses = useAddExpenses();
  const [loginLevel, setLoginLevel] = useRecoilState(loginLevelState);
  const { isExpenseEditing, editExpenseID } = useExpensesContext();

  const { handleSubmit, control } = useForm();

  const handleSentEmail = (data) => {
    const { date } = data;
    //console.log("expense form", loginLevel);
    var emaildata = {
      to_name: loginLevel.loginUser,
      to_email: loginLevel.loginEmail,
      message: `Your expenses claim application dated on ${date} has been successfully submitted for approval`,
      cc_to: loginLevel.reporting_email,
    };

    emailjs.send(SERVICE_ID, TEMPLATE_ID, emaildata, USER_ID).then(
      function (response) {
        console.log(response.status, response.text);
        toast({
          title: `Email has sent successfully to ${emaildata.to_email}!`,
          status: "success",
        });
      },
      function (err) {
        console.log(err);
        toast({
          title: `Email has fail to send to ${emaildata.to_email}!`,
          status: "warning",
        });
      }
    );
  };

  const onSubmit = (data, e) => {
    e.preventDefault();
    if (isExpenseEditing) {
      updateExpenses({ id: editExpenseID, ...data });
    } else {
      addExpenses({ empid: loginLevel.loginUserId, ...data });
      handleSentEmail(data);
    }

    handleDialogClose();
  };

  return (
    <div>
      <Paper className={classes.root}>
        <Typography variant="h5" component="h3">
          DESPATCH ITEMS
        </Typography>
        {/* <Typography component="p">Expense Claim Application</Typography> */}

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* <div>
            <Controller
              name="itemno"
              control={control}
              defaultValue={formdata.itemno}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => {
                return (
                  <TextField
                    label="Item No"
                    id="margin-normal3"
                    name="itemno"
                    defaultValue={formdata.itemno}
                    className={classes.textField}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                    inputProps={{ readOnly: true }}
                  />
                );
              }}
              rules={{ required: "Reason is required" }}
            />
          </div> */}
          {/* <div>
            <Controller
              name="desp"
              control={control}
              defaultValue={formdata.itemno}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => {
                return (
                  <TextField
                    label="Description"
                    id="margin-normal3"
                    name="desp"
                    defaultValue={formdata.itemno}
                    className={classes.textField}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                  />
                );
              }}
              rules={{ required: "Reason is required" }}
            />
          </div> */}

          <div>
            <Controller
              name="despatched"
              control={control}
              defaultValue={formdata.expiry}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => {
                return (
                  <TextField
                    label="Despatch To"
                    //type="date"
                    id="margin-normal2"
                    name="despatched"
                    value={value}
                    className={classes.textField}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    select
                  >
                    <MenuItem value="Warehouse">Warehouse</MenuItem>
                    <MenuItem value="Operation Department">
                      Operation Deparment
                    </MenuItem>
                    <MenuItem value="Marketing Department">
                      Marketing Department
                    </MenuItem>
                  </TextField>
                );
              }}
              //rules={{ required: "From Date is required" }}
            />
          </div>

          <div>
            <Controller
              name="despatchdate"
              control={control}
              defaultValue={formdata.despatchdate}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => {
                return (
                  <TextField
                    label="Despatch Date"
                    id="margin-normal5"
                    name="despatchdate"
                    type="date"
                    defaultValue={formdata.despatchdate}
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
              // rules={{ required: "Reason is required" }}
            />
          </div>
          <div>
            <Controller
              name="remark"
              control={control}
              defaultValue={formdata.remark}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => {
                return (
                  <TextField
                    label="Remark"
                    id="margin-normal5"
                    name="remark"
                    defaultValue={formdata.remark}
                    className={classes.textField}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                  />
                );
              }}
              // rules={{ required: "Reason is required" }}
            />
          </div>

          <div>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
              //onClick={() => handleSubmit(onSubmit)()}
            >
              Save <Icon className={classes.rightIcon}>send</Icon>
            </Button>
          </div>
        </form>
      </Paper>
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
    padding: theme.spacing(0, 2),
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 400,
  },
}));

export default ExpenseForm;
