import React, { useState, useEffect } from "react";
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
import { useHoc } from "./hoc/useHoc";
import { useAddHoc } from "./hoc/useAddHoc";
import { useDeleteHoc } from "./hoc/useDeleteHoc";
import { useUpdateHoc } from "./hoc/useUpdateHoc";
import { useHoccategory } from "./hoccategory/useHoccategory";
import { useHocwhat } from "./hocwhat/useHocwhat";
import { useHocwhatdetails } from "./hocwhatdetails/useHocwhatdetails";
import { useHocwhy } from "./hocwhy/useHocwhy";
import { useHocwhydetails } from "./hocwhydetails/useHocwhydetails";
import { useHoclocation } from "./hoclocation/useHoclocation";

const SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICEID;
const TEMPLATE_ID = "template_1y8odlq";
const USER_ID = process.env.REACT_APP_EMAILJS_USERID;

const HocForm = ({ formdata, setFormdata, handleDialogClose, isEditId }) => {
  const classes = useStyles();
  const toast = useCustomToast();
  const { hoc, filter, setFilter, setHocId } = useHoc();
  const { hocwhat } = useHocwhat();
  const { hocwhatdetails, setHocwhatdetailsId } = useHocwhatdetails();
  const { hocwhy, setHocwhyId } = useHocwhy();
  const { hocwhydetails, setHocwhydetailsId } = useHocwhydetails();
  const { hoccategory } = useHoccategory();
  const { hoclocation, setHoclocationId } = useHoclocation();
  const updateHoc = useUpdateHoc();
  const addHoc = useAddHoc();
  const [loginLevel, setLoginLevel] = useRecoilState(loginLevelState);
  const [category, setCategory] = useState("" || formdata.category);
  const [whatstatus, setWhatstatus] = useState("" || formdata.what);
  const [whystatus, setWhystatus] = useState("" || formdata.why);

  const { handleSubmit, control } = useForm({
    defaultValues: {
      ...formdata,
    },
  });

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

    if (data.id) {
      const { id, tableData, ...fields } = data;
      updateHoc({ id, ...fields });
    } else {
      const { tableData, ...fields } = data;
      addHoc({ ...fields, empid: loginLevel.loginUserId });
      //handleSentEmail(data);
    }

    handleDialogClose();
  };

  useEffect(() => {
    setHoclocationId("C");
  },[])

  useEffect(() => {
    if (whatstatus === "") {
      setHocwhatdetailsId((prev) => (prev = "none"));
    } else {
      setHocwhatdetailsId((prev) => (prev = whatstatus));
    }
  }, [whatstatus]);

  useEffect(() => {
    if (category === "Positive Act") {
      setHocwhyId((prev) => (prev = "none"));
      setHocwhydetailsId((prev) => (prev = "none"));
    } else {
      setHocwhydetailsId((prev) => (prev = whystatus));
    }
  }, [whystatus, category]);

  return (
    <div>
      <Paper className={classes.root}>
        <Typography variant="h5" component="h3">
          HOC FORM
        </Typography>
        <Typography component="p">HOC Form</Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Controller
              name="findings"
              control={control}
              defaultValue={formdata.findings}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => {
                return (
                  <TextField
                    label="What is/are the findings?"
                    id="margin-findings"
                    name="findings"
                    defaultValue={formdata.findings}
                    className={classes.textField}
                    onChange={onChange}
                    multiline
                    rows={2}
                    error={!!error}
                    helperText={error ? error.message : null}
                  ></TextField>
                );
              }}
              rules={{ required: "Findings is required" }}
            />
          </div>
          <div>
            <Controller
              name="risks"
              control={control}
              defaultValue={formdata.risks}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => {
                return (
                  <TextField
                    label="What is/are the potential hazard(s)/risk(s)?"
                    id="margin-risks"
                    name="risks"
                    defaultValue={formdata.risks}
                    className={classes.textField}
                    onChange={onChange}
                    multiline
                    rows={2}
                    error={!!error}
                    helperText={error ? error.message : null}
                  ></TextField>
                );
              }}
              rules={{ required: "Potential hazard/risk is required" }}
            />
          </div>
          <div>
            <Controller
              name="category"
              control={control}
              defaultValue={formdata.category}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => {
                return (
                  <TextField
                    label="Type/Category"
                    //type="date"
                    id="margin-category"
                    name="formdata.category"
                    value={value}
                    className={classes.textField}
                    onChange={(e) => {
                      onChange(e.target.value);
                      setCategory((prev) => (prev = e.target.value));
                    }}
                    error={!!error}
                    helperText={error ? error.message : null}
                    // InputLabelProps={{
                    //   shrink: true,
                    // }}
                    select
                  >
                    <MenuItem value="">None</MenuItem>
                    {hoccategory &&
                      hoccategory.map((rec) => {
                        return (
                          <MenuItem key={rec.id} value={rec.description}>
                            {rec.description}
                          </MenuItem>
                        );
                      })}
                  </TextField>
                );
              }}
              rules={{ required: "Category is required" }}
            />
          </div>

          <div>
            <Controller
              name="what"
              control={control}
              defaultValue={formdata.what}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => {
                return (
                  <TextField
                    label="What"
                    id="margin-what"
                    name="what"
                    defaultValue={formdata.what}
                    className={classes.textField}
                    onChange={(e) => {
                      onChange(e.target.value);
                      setWhatstatus((prev) => (prev = e.target.value));
                    }}
                    error={!!error}
                    helperText={error ? error.message : null}
                    select
                  >
                    <MenuItem value="">None</MenuItem>
                    {hocwhat &&
                      hocwhat
                        .filter((r) => {
                          if (category === "Positive Act") {
                            return r.positiveact;
                          } else {
                            return r.unsafeact;
                          }
                        })
                        .map((rec) => {
                          return (
                            <MenuItem key={rec.id} value={rec.description}>
                              {rec.description}
                            </MenuItem>
                          );
                        })}
                  </TextField>
                );
              }}
              //rules={{ required: "What is required" }}
            />
          </div>
          <div>
            <Controller
              name="what_details"
              control={control}
              defaultValue={formdata.what_details}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => {
                return (
                  <TextField
                    label="What Details"
                    id="margin-whatdetails"
                    name="what_details"
                    defaultValue={formdata.what_details}
                    value={value}
                    className={classes.textField}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                    select
                  >
                    <MenuItem value="">None</MenuItem>
                    {hocwhatdetails &&
                      hocwhatdetails
                        //.filter((r) => r.group === "What Details")
                        .map((rec) => {
                          return (
                            <MenuItem key={rec.id} value={rec.description}>
                              {rec.description}
                            </MenuItem>
                          );
                        })}
                  </TextField>
                );
              }}
              //rules={{ required: "What detail is required" }}
            />
          </div>
          <div>
            <Controller
              name="why"
              control={control}
              defaultValue={formdata.why}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => {
                return (
                  <TextField
                    label="Why"
                    //type="number"
                    id="standard-why"
                    name="why"
                    defaultValue={formdata.why}
                    className={classes.textField}
                    //onChange={onChange}
                    onChange={(e) => {
                      onChange(e.target.value);
                      setWhystatus((prev) => (prev = e.target.value));
                    }}
                    error={!!error}
                    helperText={error ? error.message : null}
                    select
                  >
                    <MenuItem value="">None</MenuItem>
                    {hocwhy &&
                      hocwhy
                        //.filter((r) => category === "Positive Art")
                        .map((rec) => {
                          return (
                            <MenuItem key={rec.id} value={rec.description}>
                              {rec.description}
                            </MenuItem>
                          );
                        })}
                  </TextField>
                );
              }}
              //rules={{ required: "Why is required" }}
            />
          </div>
          <div>
            <Controller
              name="why_details"
              control={control}
              defaultValue={formdata.why_details}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => {
                return (
                  <TextField
                    label="Why Details"
                    id="margin-whydetails"
                    name="why_details"
                    defaultValue={formdata.why_details}
                    className={classes.textField}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                    select
                  >
                    <MenuItem value="">None</MenuItem>
                    {hocwhydetails &&
                      hocwhydetails.map((rec) => {
                        return (
                          <MenuItem key={rec.id} value={rec.description}>
                            {rec.description}
                          </MenuItem>
                        );
                      })}
                  </TextField>
                );
              }}
              //rules={{ required: "Why detail is required" }}
            />
          </div>
          <div>
            <Controller
              name="discussion"
              control={control}
              defaultValue={formdata.discussion}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => {
                return (
                  <TextField
                    label="Did a conversation take place?"
                    id="margin-discussion"
                    name="discussion"
                    defaultValue={formdata.discussion}
                    className={classes.textField}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                    select
                  >
                    <MenuItem value="Yes">Yes</MenuItem>
                    <MenuItem value="No">No</MenuItem>
                  </TextField>
                );
              }}
              //rules={{ required: "Status is required" }}
            />
          </div>
          <div>
            <Controller
              name="action"
              control={control}
              defaultValue={formdata.action}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => {
                return (
                  <TextField
                    label="Was there an agreed remedial/corrective or preventive action? "
                    id="margin-action"
                    name="action"
                    defaultValue={formdata.action}
                    className={classes.textField}
                    onChange={onChange}
                    multiline
                    rows={2}
                    error={!!error}
                    helperText={error ? error.message : null}
                  ></TextField>
                );
              }}
              //rules={{ required: "Status is required" }}
            />
          </div>
          <div>
            <Controller
              name="isfollowup"
              control={control}
              defaultValue={formdata.isfollowup}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => {
                return (
                  <TextField
                    label="Follow-up required?"
                    id="standard-isfollowup"
                    name="isfollowup"
                    defaultValue={formdata.isfollowup}
                    className={classes.textField}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                    select
                  >
                    <MenuItem value="Yes">Yes</MenuItem>
                    <MenuItem value="No">No</MenuItem>
                  </TextField>
                );
              }}
              //rules={{ required: "IC No required" }}
            />
          </div>
          <div>
            <Controller
              name="isworkrelated"
              control={control}
              defaultValue={formdata.isworkrelated}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => {
                return (
                  <TextField
                    label="Work Related?"
                    id="margin-workrelated"
                    name="isworkrelated"
                    defaultValue={formdata.isworkrelated}
                    className={classes.textField}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                    select
                  >
                    <MenuItem value="Yes">Yes</MenuItem>
                    <MenuItem value="No">No</MenuItem>
                  </TextField>
                );
              }}
              //rules={{ required: "Status is required" }}
            />
          </div>
          <div>
            <Controller
              name="raisedby"
              control={control}
              defaultValue={formdata.raisedby}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => {
                return (
                  <TextField
                    label="Raised By"
                    id="margin-raisedby"
                    name="raisedby"
                    defaultValue={formdata.raisedby}
                    className={classes.textField}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                    inputProps={{ readOnly: true }}
                  ></TextField>
                );
              }}
              //rules={{ required: "Status is required" }}
            />
          </div>
          <div>
            <Controller
              name="raisedon"
              control={control}
              defaultValue={formdata.raisedon}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => {
                return (
                  <TextField
                    label="Raised On"
                    id="margin-raisedon"
                    name="raisedon"
                    type="date"
                    defaultValue={formdata.raisedon}
                    className={classes.textField}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  ></TextField>
                );
              }}
              //rules={{ required: "Status is required" }}
            />
          </div>
          <div>
            <Controller
              name="company"
              control={control}
              defaultValue={formdata.company}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => {
                return (
                  <TextField
                    label="Company"
                    id="margin-company"
                    name="company"
                    defaultValue={formdata.company}
                    className={classes.textField}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                    inputProps={{ readOnly: true }}
                  ></TextField>
                );
              }}
              //rules={{ required: "Status is required" }}
            />
          </div>
          <div>
            <Controller
              name="location"
              control={control}
              defaultValue={formdata.location}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => {
                return (
                  <TextField
                    label="Location"
                    id="margin-location"
                    name="location"
                    defaultValue={formdata.location}
                    className={classes.textField}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                    select
                  >
                    <MenuItem value="">None</MenuItem>
                    {hoclocation &&
                      hoclocation.map((rec) => {
                        return (
                          <MenuItem key={rec.id} value={rec.name}>
                            {rec.name}
                          </MenuItem>
                        );
                      })}
                  </TextField>
                );
              }}
              //rules={{ required: "Status is required" }}
            />
          </div>
          {/* <div>
            <Controller
              name="department"
              control={control}
              defaultValue={formdata.department}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => {
                return (
                  <TextField
                    label="Department"
                    id="margin-department"
                    name="department"
                    defaultValue={formdata.department}
                    className={classes.textField}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                  ></TextField>
                );
              }}
              //rules={{ required: "Status is required" }}
            />
          </div> */}
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
    padding: theme.spacing(3, 2),
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 500,
  },
}));

export default HocForm;
