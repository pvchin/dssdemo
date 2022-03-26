import React from "react";
import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import { useInstitutes } from "./institutes/useInstitutes";
import { useUpdateInstitutes } from "./institutes/useUpdateInstitutes";
import { useDeleteInstitutes } from "./institutes/useDeleteInstitutes";
import { useAddInstitutes } from "./institutes/useAddInstitutes";

const columns = [
  {
    title: "Name",
    field: "name",
  },
];

export default function UpdateInstitutes() {
  const classes = useStyles();
  const { institutes } = useInstitutes();
  const updateInstitutes = useUpdateInstitutes();
  const deleteInstitutes = useDeleteInstitutes();
  const addInstitutes = useAddInstitutes();

  const update_Institute = (data) => {
    const { id, rec_id, ...fields } = data;
    updateInstitutes({ id, ...fields });
  };

  const add_Institute = (data) => {
    addInstitutes(data);
  };

  const delete_Institute = (data) => {
    const { id } = data;
    deleteInstitutes(id);
  };

  return (
    <div className={classes.root}>
      <div style={{ maxWidth: "100%", paddingTop: "5px" }}>
        <MaterialTable
          columns={columns}
          data={institutes}
          title="Institutes"
          editable={{
            onRowAdd: (newData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  add_Institute(newData);
                  resolve();
                }, 1000);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  update_Institute(newData);

                  resolve();
                }, 1000);
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  delete_Institute(oldData);
                  resolve();
                }, 1000);
              }),
          }}
          options={{
            filtering: true,
            headerStyle: {
              backgroundColor: "#90CDF4",
              color: "primary",
            },
            showTitle: true,
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
