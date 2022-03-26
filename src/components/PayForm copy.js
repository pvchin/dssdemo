import React, { useState, useEffect } from "react";
import {
  Button,
  ButtonGroup,
  Grid,
  Icon,
  Input,
  TextField,
  FormControlLabel,
  Divider,
  ListSubheader,
  MenuItem,
  Select,
  NativeSelect,
  InputLabel,
} from "@material-ui/core";
import { Box, Checkbox, Heading, Text } from "@chakra-ui/react";
import currency from "currency.js";
import CurrencyTextField from "@unicef/material-ui-currency-textfield";
import { Autocomplete } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import { usePayslipsBatch } from "./payslips/usePayslipsBatch";
import { useUpdatePayslips } from "./payslips/useUpdatePayslips";
import { usePayslipsContext } from "../context/payslips_context";
import { useAllowances } from "./allowances/useAllowances";

const initial_state = [
  {
    name: "",
    period: "",
    date: "",
    payrun: "",
    bank_name: "",
    bank_acno: "",
    tap_acno: "",
    scp_acno: "",
    empid: "",
    status: "",
    allows_type1: " ",
    allows_type1amt: 0,
    allows_type2: " ",
    allows_type2amt: 0,
    allows_type3: " ",
    allows_type3amt: 0,
    allows_type4: " ",
    allows_type4amt: 0,
    allows_type5: " ",
    allows_type5amt: 0,
    allows_type6: " ",
    allows_type6amt: 0,
    allows_type7: " ",
    allows_type7amt: 0,
    allows_type8: " ",
    allows_type8amt: 0,
    deducts_type1: " ",
    deducts_type1amt: 0,
    deducts_type2: " ",
    deducts_type2amt: 0,
    deducts_type3: " ",
    deducts_type3amt: 0,
    deducts_type4: " ",
    deducts_type4amt: 0,
    deducts_type5: " ",
    deducts_type5amt: 0,
    deducts_type6: " ",
    deducts_type6amt: 0,
    deducts_type7: " ",
    deducts_type7amt: 0,
    deducts_type8: " ",
    deducts_type8amt: 0,
    tap_checkbox: false,
    salary_currency: " ",
    currency_rate: 1,

    wages: 0,
    nett_pay: 0,
    tap_amount: 0,
    scp_amount: 0,
    total_allowances: 0,
    total_deductions: 0,
    site_allows: 0,
    expenses_claims: 0,

    nett_pay_bnd: 0,
    wages_bnd: 0,
    site_allows_bnd: 0,
    expenses_claims_bnd: 0,
    tap_amount_bnd: 0,
    scp_amount_bnd: 0,
    total_allowances_bnd: 0,
    total_deductions_bnd: 0,
  },
];

const PayForm = ({
  formdata,
  setFormdata,
  loadFormdata,
  setLoadFormdata,
  payitems,
  setLoadUpdatedata,
  rowindex,
  isCalc,
  isStart,
  setIsStart,
  setIsCalc,
  singlebatchpayslip,
}) => {
  const classes = useStyles();
  const [state, setState] = useState(initial_state);
  const { allowances } = useAllowances();
  //const { payslipsbatch, psbpayrunId, setPSBPayrunId } = usePayslipsBatch();
  //const updatePayslips = useUpdatePayslips();
  //const { singlebatchpayslip } = usePayslipsContext();
  const [isLoad, setIsLoad] = useState(false);

  useEffect(() => {
    setState(initial_state);
    setState({ ...formdata });
    setLoadFormdata(false);
  }, [loadFormdata]);

  useEffect(() => {
    if (state) {
      handleCalc();
      setIsLoad(false);
    }
  }, [isLoad]);

  const Update_Empdata = ({ name, value }) => {
    let data = singlebatchpayslip[rowindex];
    data[name] = value;

    //console.log("update data", data);
    //console.log("update payslip", singlebatchpayslip[rowindex]);
  };

  const handleChange = (e) => {
    e.preventDefault();

    const { name, type, value } = e.target;
    let val =
      type === "number"
        ? isNaN(value) || value === undefined
          ? 0
          : parseFloat(value)
        : value;

    //setFormInput({ [name]: val });
    setState({ ...state, [name]: val });
    Update_Empdata({ name: name, value: val });
    setIsLoad(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleCalc();
  };

  const handleCalc = (e) => {
    //console.log("start", isStart)
    if (isStart) {
      return;
    }
    if (!usePayslipsBatch) {
      return;
    }
    if (!singlebatchpayslip) {
      return;
    }
    if (!state) {
      return;
    }
    var wages = 0,
      totalTAP = 0,
      totalSCP = 0,
      nettPay = 0.0,
      allows = 0,
      deducts = 0,
      siteallows = 0,
      expsclaims = 0,
      wagesbnd = 0,
      totalTAPbnd = 0,
      totalSCPbnd = 0,
      nettPaybnd = 0,
      allowsbnd = 0,
      deductsbnd = 0,
      siteallowsbnd = 0,
      expsclaimsbnd = 0;
    let data = singlebatchpayslip[rowindex];
    if (!data) {
      return false;
    }
    wages = isNaN(state.wages) || state.wages === undefined ? 0 : state.wages;
    console.log("Wages", wages);
    totalTAP = state.tap_checkbox ? Math.ceil(wages * 0.05) : 0;
    totalSCP = state.tap_checkbox
      ? Math.round((wages + Number.EPSILON) * 0.035 * 100) / 100
      : 0;
    if (totalSCP > 98) {
      totalSCP = 98;
    }
    siteallows = parseFloat(isNaN(state.site_allows) ? 0 : state.site_allows);
    expsclaims = parseFloat(
      isNaN(state.expenses_claims) ? 0 : state.expenses_claims
    );

    allows =
      parseFloat(isNaN(state.allows_type3amt) ? 0 : state.allows_type3amt) +
      parseFloat(isNaN(state.allows_type4amt) ? 0 : state.allows_type4amt) +
      parseFloat(isNaN(state.allows_type5amt) ? 0 : state.allows_type5amt) +
      parseFloat(isNaN(state.allows_type6amt) ? 0 : state.allows_type6amt) +
      parseFloat(isNaN(state.allows_type7amt) ? 0 : state.allows_type7amt) +
      parseFloat(isNaN(state.allows_type8amt) ? 0 : state.allows_type8amt);

    deducts =
      parseFloat(isNaN(state.deducts_type1amt) ? 0 : state.deducts_type1amt) +
      parseFloat(isNaN(state.deducts_type2amt) ? 0 : state.deducts_type2amt) +
      parseFloat(isNaN(state.deducts_type3amt) ? 0 : state.deducts_type3amt) +
      parseFloat(isNaN(state.deducts_type4amt) ? 0 : state.deducts_type4amt) +
      parseFloat(isNaN(state.deducts_type5amt) ? 0 : state.deducts_type5amt) +
      parseFloat(isNaN(state.deducts_type6amt) ? 0 : state.deducts_type6amt) +
      parseFloat(isNaN(state.deducts_type7amt) ? 0 : state.deducts_type7amt) +
      parseFloat(isNaN(state.deducts_type8amt) ? 0 : state.deducts_type8amt);

    allows = isNaN(allows) ? 0 : allows;
    deducts = isNaN(deducts) ? 0 : deducts;

    nettPay =
      wages + siteallows + expsclaims - totalTAP - totalSCP + allows - deducts;

    wagesbnd =
      Math.round((wages + Number.EPSILON) * state.currency_rate * 100) / 100;
    allowsbnd =
      Math.round((allows + Number.EPSILON) * state.currency_rate * 100) / 100;
    deductsbnd =
      Math.round((deducts + Number.EPSILON) * state.currency_rate * 100) / 100;
    totalTAPbnd =
      Math.round((totalTAP + Number.EPSILON) * state.currency_rate * 100) / 100;
    totalSCPbnd =
      Math.round((totalSCP + Number.EPSILON) * state.currency_rate * 100) / 100;
    siteallowsbnd =
      Math.round((siteallows + Number.EPSILON) * state.currency_rate * 100) /
      100;
    expsclaimsbnd =
      Math.round((expsclaims + Number.EPSILON) * state.currency_rate * 100) /
      100;
    nettPaybnd =
      Math.round((nettPay + Number.EPSILON) * state.currency_rate * 100) / 100;

    setState({
      ...state,
      wages: wages,
      total_allowances: allows,
      total_deductions: deducts,
      tap_amount: totalTAP,
      scp_amount: totalSCP,
      site_allows: siteallows,
      expenses_claims: expsclaims,
      nett_pay: nettPay,
      wages_bnd: wagesbnd,
      total_allowances_bnd: allowsbnd,
      total_deductions_bnd: deductsbnd,
      tap_amount_bnd: totalTAPbnd,
      scp_amount_bnd: totalSCPbnd,
      site_allows_bnd: siteallowsbnd,
      expenses_claims_bnd: expsclaimsbnd,
      nett_pay_bnd: nettPaybnd,
    });

    //update employee data
    //data.wages = state.wages;
    data.tap_amount = totalTAP;
    data.scp_amount = totalSCP;
    data.total_allowances = allows;
    data.total_deductions = deducts;
    data.site_allows = siteallows;
    data.expenses_claims = expsclaims;
    data.nett_pay = nettPay;
    data.wages_bnd = wagesbnd;
    data.site_allows_bnd = siteallowsbnd;
    data.expenses_claims_bnd = expsclaimsbnd;
    data.total_allowances_bnd = allowsbnd;
    data.total_deductions_bnd = deductsbnd;
    data.nett_pay_bnd = nettPaybnd;
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <Grid container direction="row" style={{ border: "1px solid white" }}>
        <Grid item sm={4} align="center" style={{ border: "1px solid white" }}>
          <Text as="u" fontSize="md">
            <Heading size="sm">Allowances</Heading>
          </Text>
        </Grid>

        <Grid item sm={4} align="center" style={{ border: "1px solid white" }}>
          <Text as="u" fontSize="md">
            <Heading size="sm">Deductions</Heading>
          </Text>
        </Grid>
        <Grid item sm={4} align="center" style={{ border: "1px solid white" }}>
          <Text as="u" fontSize="md">
            <Heading size="sm">Summary</Heading>
            <Heading size="sm">({state.name})</Heading>
          </Text>
        </Grid>
      </Grid>
      <Grid container direction="row" style={{ border: "1px solid white" }}>
        <Grid item sm={4} align="center" style={{ border: "1px solid white" }}>
          <Grid container direction="row" style={{ border: "1px solid white" }}>
            <Grid
              item
              sm={8}
              align="center"
              style={{ border: "1px solid white" }}
            >
              <Box>
                <Text fontSize="sm">Description</Text>
              </Box>
              <div>
                <TextField
                  label="Allowance"
                  name="allows_type1"
                  variant="filled"
                  type="text"
                  value={state.allows_type1}
                  onChange={handleChange}
                  style={{ width: "100%" }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    readOnly: true,
                  }}
                ></TextField>
              </div>
              <div>
                <TextField
                  label="Allowance"
                  name="allows_type2"
                  variant="filled"
                  type="text"
                  displayEmpty
                  defaultValue=""
                  value={state.allows_type2}
                  onChange={handleChange}
                  style={{ width: "100%" }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    readOnly: true,
                  }}
                ></TextField>
              </div>
              <div>
                <InputLabel
                  htmlFor="deduct-customized-native-simple"
                  className={classes.formLabel}
                >
                  Allowance
                </InputLabel>
                <NativeSelect
                  name="allows_type3"
                  value={state.allows_type3}
                  style={{
                    padding: 4,
                    marginLeft: 5,
                    width: "100%",
                    textAlign: "left",
                  }}
                  onChange={handleChange}
                >
                  <option value="">None</option>
                  {payitems
                    .filter(function (item) {
                      return item.pay_type === "Allowances";
                    })
                    .map((row) => {
                      return (
                        <option key={row.id} value={row.name}>
                          {row.name}
                        </option>
                      );
                    })}
                </NativeSelect>
              </div>
              <div>
                <InputLabel
                  htmlFor="deduct-customized-native-simple"
                  className={classes.formLabel}
                >
                  Allowance
                </InputLabel>
                <NativeSelect
                  name="allows_type4"
                  value={state.allows_type4}
                  style={{
                    padding: 4,
                    marginLeft: 5,
                    width: "100%",
                    textAlign: "left",
                  }}
                  onChange={handleChange}
                >
                  <option value="">None</option>
                  {payitems
                    .filter(function (item) {
                      return item.pay_type === "Allowances";
                    })
                    .map((row) => {
                      return (
                        <option key={row.id} value={row.name}>
                          {row.name}
                        </option>
                      );
                    })}
                </NativeSelect>
              </div>
              <div>
                <InputLabel
                  htmlFor="deduct-customized-native-simple"
                  className={classes.formLabel}
                >
                  Allowance
                </InputLabel>
                <NativeSelect
                  name="allows_type5"
                  value={state.allows_type5}
                  style={{
                    padding: 4,
                    marginLeft: 5,
                    width: "100%",
                    textAlign: "left",
                  }}
                  onChange={handleChange}
                >
                  <option value="">None</option>
                  {payitems
                    .filter(function (item) {
                      return item.pay_type === "Allowances";
                    })
                    .map((row) => {
                      return (
                        <option key={row.id} value={row.name}>
                          {row.name}
                        </option>
                      );
                    })}
                </NativeSelect>
              </div>
              <div>
                <InputLabel
                  htmlFor="deduct-customized-native-simple"
                  className={classes.formLabel}
                >
                  Allowance
                </InputLabel>
                <NativeSelect
                  name="allows_type6"
                  value={state.allows_type6}
                  style={{
                    padding: 4,
                    marginLeft: 5,
                    width: "100%",
                    textAlign: "left",
                  }}
                  onChange={handleChange}
                >
                  <option value="">None</option>
                  {payitems
                    .filter(function (item) {
                      return item.pay_type === "Allowances";
                    })
                    .map((row) => {
                      return (
                        <option key={row.id} value={row.name}>
                          {row.name}
                        </option>
                      );
                    })}
                </NativeSelect>
              </div>
              <div>
                <InputLabel
                  htmlFor="deduct-customized-native-simple"
                  className={classes.formLabel}
                >
                  Allowance
                </InputLabel>
                <NativeSelect
                  name="allows_type7"
                  value={state.allows_type7}
                  style={{
                    padding: 4,
                    marginLeft: 5,
                    width: "100%",
                    textAlign: "left",
                  }}
                  onChange={handleChange}
                >
                  <option value="">None</option>
                  {payitems
                    .filter(function (item) {
                      return item.pay_type === "Allowances";
                    })
                    .map((row) => {
                      return (
                        <option key={row.id} value={row.name}>
                          {row.name}
                        </option>
                      );
                    })}
                </NativeSelect>
              </div>
              <div>
                <InputLabel
                  htmlFor="deduct-customized-native-simple"
                  className={classes.formLabel}
                >
                  Allowance
                </InputLabel>
                <NativeSelect
                  name="allows_type8"
                  value={state.allows_type8}
                  style={{
                    padding: 4,
                    marginLeft: 5,
                    width: "100%",
                    textAlign: "left",
                  }}
                  onChange={handleChange}
                >
                  <option value="">None</option>
                  {payitems
                    .filter(function (item) {
                      return item.pay_type === "Allowances";
                    })
                    .map((row) => {
                      return (
                        <option key={row.id} value={row.name}>
                          {row.name}
                        </option>
                      );
                    })}
                </NativeSelect>
              </div>
              <Box p={2}>
                <Checkbox
                  isInvalid={!state.tap_checkbox}
                  isChecked={state.tap_checkbox}
                  colorScheme="red"
                  size="md"
                >
                  <Heading size="sm">TAP/SCP Contribution</Heading>
                </Checkbox>
              </Box>
            </Grid>
            <Grid
              item
              sm={4}
              align="center"
              style={{ border: "1px solid white" }}
            >
              <Box>
                <Text fontSize="sm">
                  {state.salary_currency ? state.salary_currency : "BND"}
                </Text>
              </Box>
              <div>
                <TextField
                  label="Amount"
                  name="site_allows"
                  variant="filled"
                  type="number"
                  value={state.site_allows}
                  onChange={handleChange}
                  style={{ width: "100%" }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                ></TextField>
              </div>
              <div>
                <TextField
                  label="Amount"
                  name="expenses_claims"
                  variant="filled"
                  type="number"
                  value={state.expenses_claims}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                ></TextField>
              </div>

              <div>
                <TextField
                  label="Amount"
                  name="allows_type3amt"
                  variant="filled"
                  type="number"
                  min="0"
                  max="9999"
                  step="any"
                  value={state.allows_type3amt}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  errorText={""}
                ></TextField>
              </div>
              <div>
                <TextField
                  label="Amount"
                  name="allows_type4amt"
                  variant="filled"
                  type="number"
                  value={state.allows_type4amt}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                ></TextField>
              </div>
              <div>
                <TextField
                  label="Amount"
                  name="allows_type5amt"
                  variant="filled"
                  type="number"
                  value={state.allows_type5amt}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                ></TextField>
              </div>
              <div>
                <TextField
                  label="Amount"
                  name="allows_type6amt"
                  variant="filled"
                  type="number"
                  value={state.allows_type6amt}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                ></TextField>
              </div>
              <div>
                <TextField
                  label="Amount"
                  name="allows_type7amt"
                  variant="filled"
                  type="number"
                  value={state.allows_type7amt}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                ></TextField>
              </div>
              <div>
                <TextField
                  label="Amount"
                  name="allows_type8amt"
                  variant="filled"
                  type="number"
                  value={state.allows_type8amt}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                ></TextField>
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item sm={4} align="center" style={{ border: "1px solid white" }}>
          <Grid container direction="row" style={{ border: "1px solid white" }}>
            <Grid
              item
              sm={8}
              align="center"
              style={{ border: "1px solid white" }}
            >
              <Box>
                <Text fontSize="sm">Description</Text>
              </Box>
              <div>
                <InputLabel
                  htmlFor="deduct-customized-native-simple"
                  className={classes.formLabel}
                >
                  Deduction
                </InputLabel>

                <NativeSelect
                  name="deducts_type1"
                  value={state.deducts_type1}
                  style={{
                    padding: 4,
                    marginLeft: 5,
                    width: "100%",
                    textAlign: "left",
                  }}
                  onChange={handleChange}
                >
                  <option value="">None</option>
                  {payitems
                    .filter(function (item) {
                      return item.pay_type === "Deductions";
                    })
                    .map((row) => {
                      return (
                        <option key={row.id} value={row.name}>
                          {row.name}
                        </option>
                      );
                    })}
                </NativeSelect>
              </div>
              <div>
                <InputLabel
                  htmlFor="deduct-customized-native-simple"
                  className={classes.formLabel}
                >
                  Deduction
                </InputLabel>
                <NativeSelect
                  name="deducts_type2"
                  value={state.deducts_type2}
                  style={{
                    padding: 4,
                    marginLeft: 5,
                    width: "100%",
                    textAlign: "left",
                  }}
                  onChange={handleChange}
                >
                  <option value="">None</option>
                  {payitems
                    .filter(function (item) {
                      return item.pay_type === "Deductions";
                    })
                    .map((row) => {
                      return (
                        <option key={row.id} value={row.name}>
                          {row.name}
                        </option>
                      );
                    })}
                </NativeSelect>
              </div>
              <div>
                <InputLabel
                  htmlFor="deduct-customized-native-simple"
                  className={classes.formLabel}
                >
                  Deduction
                </InputLabel>
                <NativeSelect
                  name="deducts_type3"
                  value={state.deducts_type3}
                  style={{
                    padding: 4,
                    marginLeft: 5,
                    width: "100%",
                    textAlign: "left",
                  }}
                  onChange={handleChange}
                >
                  <option value="">None</option>
                  {payitems
                    .filter(function (item) {
                      return item.pay_type === "Deductions";
                    })
                    .map((row) => {
                      return (
                        <option key={row.id} value={row.name}>
                          {row.name}
                        </option>
                      );
                    })}
                </NativeSelect>
              </div>
              <div>
                <InputLabel
                  htmlFor="deduct-customized-native-simple"
                  className={classes.formLabel}
                >
                  Deduction
                </InputLabel>
                <NativeSelect
                  name="deducts_type4"
                  value={state.deducts_type4}
                  style={{
                    padding: 4,
                    marginLeft: 5,
                    width: "100%",
                    textAlign: "left",
                  }}
                  onChange={handleChange}
                >
                  <option value="">None</option>
                  {payitems
                    .filter(function (item) {
                      return item.pay_type === "Deductions";
                    })
                    .map((row) => {
                      return (
                        <option key={row.id} value={row.name}>
                          {row.name}
                        </option>
                      );
                    })}
                </NativeSelect>
              </div>
              <div>
                <InputLabel
                  htmlFor="deduct-customized-native-simple"
                  className={classes.formLabel}
                >
                  Deduction
                </InputLabel>
                <NativeSelect
                  name="deducts_type5"
                  value={state.deducts_type5}
                  style={{
                    padding: 4,
                    marginLeft: 5,
                    width: "100%",
                    textAlign: "left",
                  }}
                  onChange={handleChange}
                >
                  <option value="">None</option>
                  {payitems
                    .filter(function (item) {
                      return item.pay_type === "Deductions";
                    })
                    .map((row) => {
                      return (
                        <option key={row.id} value={row.name}>
                          {row.name}
                        </option>
                      );
                    })}
                </NativeSelect>
              </div>
              <div>
                <InputLabel
                  htmlFor="deduct-customized-native-simple"
                  className={classes.formLabel}
                >
                  Deduction
                </InputLabel>
                <NativeSelect
                  name="deducts_type6"
                  value={state.deducts_type6}
                  style={{
                    padding: 4,
                    marginLeft: 5,
                    width: "100%",
                    textAlign: "left",
                  }}
                  onChange={handleChange}
                >
                  <option value="">None</option>
                  {payitems
                    .filter(function (item) {
                      return item.pay_type === "Deductions";
                    })
                    .map((row) => {
                      return (
                        <option key={row.id} value={row.name}>
                          {row.name}
                        </option>
                      );
                    })}
                </NativeSelect>
              </div>
              <div>
                <InputLabel
                  htmlFor="deduct-customized-native-simple"
                  className={classes.formLabel}
                >
                  Deduction
                </InputLabel>
                <NativeSelect
                  name="deducts_type7"
                  value={state.deducts_type7}
                  style={{
                    padding: 4,
                    marginLeft: 5,
                    width: "100%",
                    textAlign: "left",
                  }}
                  onChange={handleChange}
                >
                  <option value="">None</option>
                  {payitems
                    .filter(function (item) {
                      return item.pay_type === "Deductions";
                    })
                    .map((row) => {
                      return (
                        <option key={row.id} value={row.name}>
                          {row.name}
                        </option>
                      );
                    })}
                </NativeSelect>
              </div>
              <div>
                <InputLabel
                  htmlFor="deduct-customized-native-simple"
                  className={classes.formLabel}
                >
                  Deduction
                </InputLabel>
                <NativeSelect
                  name="deducts_type8"
                  value={state.deducts_type8}
                  style={{
                    padding: 4,
                    marginLeft: 5,
                    width: "100%",
                    textAlign: "left",
                  }}
                  onChange={handleChange}
                >
                  <option value="">None</option>
                  {payitems
                    .filter(function (item) {
                      return item.pay_type === "Deductions";
                    })
                    .map((row) => {
                      return (
                        <option key={row.id} value={row.name}>
                          {row.name}
                        </option>
                      );
                    })}
                </NativeSelect>
              </div>
              {state.salary_currency !== "BND" && (
                <Box p={2}>
                  <Text fontSize="md">
                    <Heading size="sm">
                      Exchange Rate: {state.currency_rate}
                    </Heading>
                  </Text>
                </Box>
              )}
            </Grid>
            <Grid
              item
              sm={4}
              align="center"
              style={{ border: "1px solid white" }}
            >
              <Box>
                <Text fontSize="sm">
                  {state.salary_currency ? state.salary_currency : "BND"}
                </Text>
              </Box>
              <div>
                <TextField
                  label="Amount"
                  name="deducts_type1amt"
                  variant="filled"
                  type="number"
                  inputProps={{ minLength: 0 }}
                  value={state.deducts_type1amt}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>
              <div>
                <TextField
                  label="Amount"
                  name="deducts_type2amt"
                  variant="filled"
                  type="number"
                  value={state.deducts_type2amt}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>
              <div>
                <TextField
                  label="Amount"
                  name="deducts_type3amt"
                  variant="filled"
                  type="number"
                  value={state.deducts_type3amt}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>
              <div>
                <TextField
                  label="Amount"
                  name="deducts_type4amt"
                  variant="filled"
                  type="number"
                  value={state.deducts_type4amt}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>
              <div>
                <TextField
                  label="Amount"
                  name="deducts_type5amt"
                  variant="filled"
                  type="number"
                  value={state.deducts_type5amt}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>
              <div>
                <TextField
                  label="Amount"
                  name="deducts_type6amt"
                  variant="filled"
                  type="number"
                  value={state.deducts_type6amt}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>
              <div>
                <TextField
                  label="Amount"
                  name="deducts_type7amt"
                  variant="filled"
                  type="number"
                  value={state.deducts_type7amt}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>
              <div>
                <TextField
                  label="Amount"
                  name="deducts_type8amt"
                  variant="filled"
                  type="number"
                  value={state.deducts_type8amt}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item sm={4} align="center" style={{ border: "1px solid white" }}>
          <Grid container direction="row" style={{ border: "1px solid white" }}>
            {/* <div>
            <h3>{state.name}</h3>
          </div> */}
            <Grid
              item
              sm={
                !state.salary_currency || state.salary_currency === "BND"
                  ? 12
                  : 6
              }
              align="center"
              style={{ border: "1px solid white" }}
            >
              <Box>
                <Text fontSize="sm">
                  {state.salary_currency ? state.salary_currency : "BND"}
                </Text>
              </Box>
              <Divider variant="fullWidth" className={classes.divider} />
              <div>
                <TextField
                  label="Wages"
                  name="wages"
                  variant="filled"
                  type="number"
                  value={state.wages}
                  onChange={handleChange}
                  style={{ width: "100%" }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  // InputProps={{
                  //   readOnly: true,
                  //   min: 0,
                  // }}
                />
              </div>
              <div>
                <TextField
                  label="TAP Amount"
                  name="tap_amount"
                  variant="filled"
                  type="number"
                  value={currency(state.tap_amount)}
                  onChange={handleChange}
                  style={{ width: "100%" }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </div>
              <div>
                <TextField
                  label="SCP Amount"
                  name="scp_amount"
                  variant="filled"
                  type="number"
                  value={currency(state.scp_amount)}
                  onChange={handleChange}
                  style={{ width: "100%" }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </div>
              <div>
                <TextField
                  label="Site Allowances"
                  name="siteallows"
                  variant="filled"
                  type="number"
                  value={currency(state.site_allows)}
                  onChange={handleChange}
                  style={{ width: "100%" }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </div>
              <div>
                <TextField
                  label="Expenses Claims"
                  name="expclaims"
                  variant="filled"
                  type="number"
                  value={currency(state.expenses_claims)}
                  onChange={handleChange}
                  style={{ width: "100%" }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </div>
              <div>
                <TextField
                  label="Total Allowances"
                  name="total_allowances"
                  variant="filled"
                  type="number"
                  value={currency(state.total_allowances)}
                  onChange={handleChange}
                  style={{ width: "100%" }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </div>
              <div>
                <TextField
                  label="Total Deductions"
                  name="total_deductions"
                  variant="filled"
                  type="number"
                  value={currency(state.total_deductions)}
                  onChange={handleChange}
                  style={{ width: "100%" }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </div>
              <div>
                <TextField
                  label="Nett Pay"
                  name="nett_pay"
                  variant="filled"
                  type="number"
                  value={currency(state.nett_pay)}
                  onChange={handleChange}
                  style={{ width: "100%" }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </div>
              {/* <div>
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.tap_checkbox}
                  onChange={handleChange}
                  name="tap_checkbox"
                />
              }
              label="TAP/SCP Contribution"
            />
          </div> */}
              <div>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  style={{ marginLeft: 10 }}
                  onClick={handleCalc}
                >
                  Calc <Icon className={classes.rightIcon}>send</Icon>
                </Button>
              </div>
            </Grid>
            {state.salary_currency && state.salary_currency !== "BND" && (
              <Grid
                item
                sm={6}
                align="center"
                style={{ border: "1px solid white" }}
              >
                <Divider variant="fullWidth" className={classes.divider} />
                <Box>
                  <Text fontSize="sm">
                    {" "}
                    {state.salary_currency ? "BND" : "BND"}
                  </Text>
                </Box>
                <div>
                  <TextField
                    label="Wages"
                    name="wages"
                    variant="filled"
                    type="number"
                    value={currency(state.wages_bnd)}
                    onChange={handleChange}
                    style={{ width: "100%" }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </div>

                <div>
                  <TextField
                    label="TAP Amount"
                    name="tap_amount"
                    variant="filled"
                    type="number"
                    value={currency(state.tap_amount_bnd)}
                    onChange={handleChange}
                    style={{ width: "100%" }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </div>
                <div>
                  <TextField
                    label="SCP Amount"
                    name="scp_amount"
                    variant="filled"
                    type="number"
                    value={currency(state.scp_amount_bnd)}
                    onChange={handleChange}
                    style={{ width: "100%" }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </div>
                <div>
                  <TextField
                    label="Site Allowances"
                    name="siteallows"
                    variant="filled"
                    type="number"
                    value={currency(state.site_allows_bnd)}
                    onChange={handleChange}
                    style={{ width: "100%" }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </div>
                <div>
                  <TextField
                    label="Expenses Claims"
                    name="expclaims"
                    variant="filled"
                    type="number"
                    value={currency(state.expenses_claims_bnd)}
                    onChange={handleChange}
                    style={{ width: "100%" }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </div>
                <div>
                  <TextField
                    label="Total Allowances"
                    name="total_allowances"
                    variant="filled"
                    type="number"
                    value={currency(state.total_allowances_bnd)}
                    onChange={handleChange}
                    style={{ width: "100%" }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </div>
                <div>
                  <TextField
                    label="Total Deductions"
                    name="total_deductions"
                    variant="filled"
                    type="number"
                    value={currency(state.total_deductions_bnd)}
                    onChange={handleChange}
                    style={{ width: "100%" }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </div>
                <div>
                  <TextField
                    label="Nett Pay"
                    name="nett_pay"
                    variant="filled"
                    type="number"
                    value={currency(state.nett_pay_bnd)}
                    onChange={handleChange}
                    style={{ width: "100%" }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </div>
              </Grid>
            )}
          </Grid>
        </Grid>
        {/* <button>Submit</button> */}
      </Grid>
    </form>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  button: {
    margin: theme.spacing(1),
  },
  container: {
    margin: 0,
    padding: 0,
    width: "80vw",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill,250px)",
    gridAutoRows: "10px",
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
    justifyContent: "center",
    backgroundColor: "primary",
  },
  fixedHeight: {
    height: 800,
  },
  paper: {
    padding: theme.spacing(10),
    // display: "flex",
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    border: "1px solid",
    width: "100%",
    color: "primary",
    bcakgroundColor: "black",
  },
  card: {
    backgroundColor: "black",
  },
  section: {
    width: "80vw",
    margin: "1rem auto",
    maxWidth: "var(--max-width)",
  },
  underline: {
    width: "5rem",
    height: "0.25rem",
    marginBottom: "1.25rem",
    background: "var(--clr-primary-5)",
    marginLeft: "auto",
    marginRight: "auto",
  },
  title: {
    marginbottom: "4rem",
    textAlign: "center",
  },
  jobscenter: {
    width: "80vw",
    margin: "0 auto",
    maxWidth: "var(--max-width)",
    flexDirection: "row",
  },
  btncontainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: "4rem",
    flexWrap: "wrap",
  },
  jobbtn: {
    background: "transparent",
    borderColor: "transparent",
    textTransform: "capitalize",
    fontSize: "1.25rem",
    letterSpacing: "var(--spacing)",
    margin: "0 0.5rem",
    transition: "var(--transition)",
    cursor: "pointer",
    padding: "0.25rem 0",
    lineHeight: "1",
    outlineColor: "var(--clr-primary-10)",
    "&:hover": {
      color: "var(--clr-primary-5)",
      boxShadow: "0 2px var(--clr-primary-5)",
    },
  },
  activebtn: {
    color: "var(--clr-primary-5)",
    boxShadow: "0 2px var(--clr-primary-5)",
  },
  jobinfo: {
    fontWeight: "400",
  },
  divider: {
    // Theme Color, or use css color in quote
    background: "white",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 350,
  },
  divContainer: {
    display: "flex",
    flexDirection: "row",
  },
  formLabel: {
    fontSize: 12,
    textAlign: "left",
    marginLeft: 8,
    marginTop: 5,
  },
}));

export default PayForm;
