import React, { useState, useEffect } from "react";
import MaterialTable, { MTableToolbar } from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Icon, TextField, MenuItem, Select } from "@material-ui/core";
import { useRecoilState } from "recoil";
import { loginLevelState } from "./data/atomdata";
import { useEmployeesContext } from "../context/employees_context";
import { useTrainingsContext } from "../context/trainings_context";
import { useTrainings } from "./trainings/useTrainings";
import { useInstitutes } from "./institutes/useInstitutes";
import { useUpdateTrainings } from "./trainings/useUpdateTrainings";
import { useAddTrainings } from "./trainings/useAddTrainings";
import { useDeleteTrainings } from "./trainings/useDeleteTrainings";


export default function Emp_Training({
  trainingdata,
  setTrainingdata,
  handleDialogClose,
}) {
  const classes = useStyles();
  const { trainings, filter, setFilter, setTrainingId } = useTrainings();
  const { institutes } = useInstitutes();
  const [loginLevel, setLoginLevel] = useRecoilState(loginLevelState);
  const updateTrainings = useUpdateTrainings();
  const addTrainings = useAddTrainings();
  const deleteTrainings = useDeleteTrainings();
  const { editEmployeeID } = useEmployeesContext();
  // const {
  //   //getSingleBatchTraining,
  //   //singlebatch_training,
  //   //addTraining,
  //   //deleteTraining,
  //   //updateTraining,
  //   //singlebatch_training_loading,
  // } = useTrainingsContext();

const columns = [
  {
    title: "Institute",
    field: "institute",
    editComponent: (props) => (
      <TextField
        //defaultValue={props.value || null}
        onChange={(e) => props.onChange(e.target.value)}
        style={{ width: 100 }}
        value={props.value}
        select
      >
        <MenuItem value="">None</MenuItem>
        {institutes &&
          institutes.map((r) => {
            return <MenuItem value={r.name}>{r.name}</MenuItem>;
          })}
      </TextField>
    ),
  },
  {
    title: "Course",
    field: "course",
  },
  {
    title: "From Date",
    field: "from_date",
    type: "date",
    dateSetting: { locale: "en-GB" },
    editComponent: (props) => (
      <TextField
        defaultValue={props.value || new Date()}
        onChange={(e) => props.onChange(e.target.value)}
        type="date"
      />
    ),
  },
  {
    title: "To Date",
    field: "to_date",
    type: "date",
    dateSetting: { locale: "en-GB" },
    editComponent: (props) => (
      <TextField
        defaultValue={props.value || new Date()}
        onChange={(e) => props.onChange(e.target.value)}
        type="date"
      />
    ),
  },
  {
    title: "Expiry Date",
    field: "expiry_date",
    type: "date",
    dateSetting: { locale: "en-GB" },
    editComponent: (props) => (
      <TextField
        defaultValue={props.value || new Date()}
        onChange={(e) => props.onChange(e.target.value)}
        type="date"
      />
    ),
  },
];

  useEffect(() => {
    setTrainingId(editEmployeeID);
  }, []);

  const add_Training = (data) => {
    addTrainings({
      ...data,
      name: loginLevel.loginUser,
      empid: editEmployeeID,
    });
  };

  const delete_Training = (data) => {
    const { id } = data;
    deleteTrainings(id);
  };

  const update_Training = (data) => {
    const { id, rec_id, tableData, ...fields } = data;
    updateTrainings({ id, ...fields });
  };

  return (
    <div className={classes.root}>
      <div style={{ maxWidth: "100%", paddingTop: "5px" }}>
        <MaterialTable
          columns={columns}
          data={trainings}
          title="Training"
          editable={{
            onRowAdd: (newData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  add_Training(newData);
                  resolve();
                }, 1000);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  update_Training(newData);
                  resolve();
                }, 1000);
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  delete_Training(oldData);
                  resolve();
                }, 1000);
              }),
          }}
          options={{
            filtering: true,
            headerStyle: {
              backgroundColor: "orange",
              color: "primary",
            },
            showTitle: true,
          }}
          components={{
            Toolbar: (props) => (
              <div>
                <MTableToolbar {...props} />
              </div>
            ),
          }}
        />
      </div>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 0,
  },
}));
