import React, { useEffect} from "react";
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

export default function UpdateDeductions() {
  const classes = useStyles();
  const { payitems, setPayItemId } = usePayItems();
  const updatePayItems = useUpdatePayItems();
  const deletePayItems = useDeletePayItems();
  const addPayItems = useAddPayItems();

    
  const update_Deduction = (data) => {
    const { id, rec_id, ...fields } = data;
    updatePayItems({ id, ...fields });
  };

  const add_Deduction = (data) => {
    const fields = {...data, pay_type:"Deductions"}
    addPayItems(fields);
  };

  const delete_Deduction = (data) => {
    const { id } = data;
    deletePayItems(id);
  };

  useEffect(() => {
    setPayItemId("Deductions");
  }, []);

  return (
    <div className={classes.root}>
      <div style={{ maxWidth: "100%", paddingTop: "5px" }}>
        <MaterialTable
          columns={columns}
          data={payitems}
          title="Deductions"
          editable={{
            onRowAdd: (newData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  add_Deduction(newData);
                  resolve();
                }, 1000);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  update_Deduction(newData);
                  resolve();
                }, 1000);
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  delete_Deduction(oldData);
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
