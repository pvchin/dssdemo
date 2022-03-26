import React, { useEffect } from "react";
import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import { usePayItems } from "./payitems/usePayItems";
import { useUpdatePayItems } from "./payitems/useUpdatePayItems";
import { useDeletePayItems } from "./payitems/useDeletePayItems";
import { useAddPayItems } from "./payitems/useAddPayItems";

const columns = [
  {
    title: "Name",
    field: "name",
  },
];

export default function UpdateAllowances() {
  const classes = useStyles();
  const { payitems, setPayItemId } = usePayItems();
  const updatePayItems = useUpdatePayItems();
  const deletePayItems = useDeletePayItems();
  const addPayItems = useAddPayItems();

  const update_Allowance = (data) => {
    const { id, rec_id, ...fields } = data;
    updatePayItems({ id, ...fields });
  };

  const add_Allowance = async (data) => {
    const fields = { ...data, pay_type: "Allowances" };
    addPayItems(fields);
  };

  const delete_Allowance = (data) => {
    const { id } = data;
    deletePayItems(id);
  };

  useEffect(() => {
    setPayItemId("Allowances");
  }, []);

  return (
    <div className={classes.root}>
      <div style={{ maxWidth: "100%", paddingTop: "5px" }}>
        <MaterialTable
          columns={columns}
          data={payitems}
          title="Allowances"
          editable={{
            onRowAdd: (newData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  add_Allowance(newData);
                  resolve();
                }, 1000);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  update_Allowance(newData);
                  resolve();
                }, 1000);
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  delete_Allowance(oldData);
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
