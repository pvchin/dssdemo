import React from "react";
import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import { useCurrency } from "./currency/useCurrency";
import { useUpdateCurrency } from "./currency/useUpdateCurrency";
import { useDeleteCurrency } from "./currency/useDeleteCurrency";
import { useAddCurrency } from "./currency/useAddCurrency";

const columns = [
  {
    title: "Currency",
    field: "currency",
  },
  {
    title: "Rate",
    field: "rate",
  },
];

export default function UpdateCurrency() {
  const classes = useStyles();
  const { currency } = useCurrency();
  const updateCurrency = useUpdateCurrency();
  const deleteCurrency = useDeleteCurrency();
  const addCurrency = useAddCurrency();

  const update_Currency = (data) => {
    const { id, rec_id, rate, ...fields } = data;
    const ratevalue = parseFloat(rate);
    updateCurrency({ id, rate: ratevalue, ...fields });
  };

  const add_Currency = (data) => {
    const { rate, ...fields } = data;
    const ratevalue = parseFloat(rate);
    addCurrency({ rate: ratevalue, ...fields });
  };

  const delete_Currency = (data) => {
    const { id } = data;
    deleteCurrency(id);
  };

  return (
    <div className={classes.root}>
      <div style={{ maxWidth: "100%", paddingTop: "5px" }}>
        <MaterialTable
          columns={columns}
          data={currency}
          title="Currency Tables"
          editable={{
            onRowAdd: (newData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  add_Currency(newData);
                  resolve();
                }, 1000);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  update_Currency(newData);
                  resolve();
                }, 1000);
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  delete_Currency(oldData);
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
