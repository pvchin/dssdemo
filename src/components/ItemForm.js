import React from "react";
import { Button, Icon, TextField, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MaterialTable, { MTableToolbar } from "material-table";
import CurrencyTextField from "@unicef/material-ui-currency-textfield";
import currency from "currency.js";
import { useRecoilState } from "recoil";
import * as emailjs from "emailjs-com";
import QRCode from "react-qr-code";
import {
  Box,
  Heading,
  Divider,
  Grid,
  GridItem,
  HStack,
  Select,
  SimpleGrid,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  //ModalHeader,
  //ModalFooter,
  ModalBody,
  ModalCloseButton,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useDisclosure,
} from "@chakra-ui/react";
import { loginLevelState } from "./data/atomdata";
import MenuItem from "@material-ui/core/MenuItem";
import { useEmployeesContext } from "../context/employees_context";
import { useExpensesContext } from "../context/expenses_context";
import { Controller, useForm } from "react-hook-form";
import { useCustomToast } from "../helpers/useCustomToast";
import { useExpenses } from "./expenses/useExpenses";
import { useAddItem } from "./items/useAddItem";
import { useDeleteItem } from "./items/useDeleteItem";
import { useUpdateItem } from "./items/useUpdateItem";
import { useItemshistory } from "./itemshistory/useItemshistory";

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

const columns = [
  { title: "Item No", field: "itemno", editable: "never" },

  {
    title: "Date",
    field: "transdate",
    type: "date",
    editable: "never",
  },
  {
    title: "Type",
    field: "type",
    editable: "never",
  },
  {
    title: "Price",
    field: "uprice",
    type: "numeric",
    editable: "never",
  },
  {
    title: "Qty",
    field: "qty",
    type: "numeric",
    editable: "never",
  },
  {
    title: "Amount",
    field: "amount",
    type: "numeric",
    editable: "never",
  },
 
  {
    title: "Remark",
    field: "remark",
    editable: "never",
  },
];

const ExpenseForm = ({ formdata, setFormdata, handleDialogClose }) => {
  const classes = useStyles();
  const toast = useCustomToast();
  const { expenses, filter, setFilter, setExpenseId } = useExpenses();
  const updateItem = useUpdateItem();
  const addItem = useAddItem();
  const { itemshistory }  = useItemshistory()
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
      updateItem({ id: editExpenseID, ...data });
    } else {
      addItem({ ...data });
    }

    handleDialogClose();
  };

  return (
    <div>
      <Paper className={classes.root}>
        <Typography variant="h5" component="h3">
          ITEM
        </Typography>
        {/* <Typography component="p">Expense Claim Application</Typography> */}
        <Box>
          <SimpleGrid>
            <Tabs>
              <TabList>
                <Tab>Details</Tab>
                <Tab isDisabled={!isExpenseEditing}>History</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
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
                            />
                          );
                        }}
                        // rules={{ required: "Reason is required" }}
                      />
                    </div>

                    <div>
                      <Controller
                        name="desp"
                        control={control}
                        defaultValue={formdata.desp}
                        render={({
                          field: { onChange, value },
                          fieldState: { error },
                        }) => {
                          return (
                            <TextField
                              label="Description"
                              id="margin-normal3"
                              name="desp"
                              defaultValue={formdata.desp}
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
                      <Controller
                        name="uprice"
                        control={control}
                        defaultValue={formdata.uprice}
                        render={({
                          field: { onChange, value },
                          fieldState: { error },
                        }) => {
                          return (
                            <TextField
                              label="Unit Price"
                              type="number"
                              id="standard-number1"
                              name="uprice"
                              defaultValue={formdata.uprice}
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
                        name="qty"
                        control={control}
                        defaultValue={formdata.qty}
                        render={({
                          field: { onChange, value },
                          fieldState: { error },
                        }) => {
                          return (
                            <TextField
                              label="Qty Onhand"
                              type="number"
                              id="standard-number1"
                              name="qty"
                              defaultValue={formdata.qty}
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
                        name="minqty"
                        control={control}
                        defaultValue={formdata.minqty}
                        render={({
                          field: { onChange, value },
                          fieldState: { error },
                        }) => {
                          return (
                            <TextField
                              label="Minimum Qty"
                              type="number"
                              id="standard-number1"
                              name="minqty"
                              defaultValue={formdata.minqty}
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
                    {/* <div>
            <Controller
              name="date"
              control={control}
              defaultValue={formdata.date}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => {
                return (
                  <TextField
                    label="Date"
                    type="date"
                    id="margin-normal2"
                    name="formdata.date"
                    value={value}
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
              rules={{ required: "From Date is required" }}
            />
          </div> */}

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
                </TabPanel>
                <TabPanel>
                  <Box>
                    <MaterialTable
                      columns={columns}
                      data={itemshistory}
                      title="Assets Table"
                      // icons={{
                      //   Add: (props) => <AddIcon />,
                      //   Edit: (props) => <CheckCircleOutlineOutlinedIcon />,
                      //   Delete: (props) => <DeleteIcon />,
                      //   Clear: (props) => <DeleteIcon />,
                      //   Check: (props) => <CheckIcon />,
                      //   Search: (props) => <SearchIcon />,
                      //   ResetSearch: (props) => <DeleteIcon />,
                      // }}

                      options={{
                        filtering: true,
                        headerStyle: {
                          backgroundColor: "orange",
                          color: "#FFF",
                        },
                        showTitle: true,
                      }}
                      components={{}}
                    />
                  </Box>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </SimpleGrid>
        </Box>
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
    width: 300,
  },
}));

export default ExpenseForm;
