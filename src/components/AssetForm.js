import React from "react";
import { Button, Icon, TextField, Paper, Typography } from "@material-ui/core";
import MaterialTable, { MTableToolbar } from "material-table";
import { makeStyles } from "@material-ui/core/styles";
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
import { useRecoilState } from "recoil";
import * as emailjs from "emailjs-com";
import QRCode from "react-qr-code";
import { loginLevelState } from "./data/atomdata";
import MenuItem from "@material-ui/core/MenuItem";
import { useEmployeesContext } from "../context/employees_context";
import { useExpensesContext } from "../context/expenses_context";
import { Controller, useForm } from "react-hook-form";
import { useCustomToast } from "../helpers/useCustomToast";
import { useAssets } from "./assets/useAssets";
import { useAddAsset } from "./assets/useAddAsset"
import { useDeleteAsset } from "./assets/useDeleteAsset";
import { useUpdateAsset } from "./assets/useUpdateAsset"
import { useAssetshistory } from "./assetshistory/useAssetshistory";


const SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICEID;
const TEMPLATE_ID = "template_1y8odlq";
const USER_ID = process.env.REACT_APP_EMAILJS_USERID;

const initial_values = {
  assetno: "",
  desp: "",
  date: "",
  type: "",
  client: "",
  remark: "",
  status: "",
 
};

const columns = [
  { title: "Asset No", field: "assetno", editable: "never" },

  {
    title: "Description",
    field: "desp",
    editable: "never",
  },
  {
    title: "Date",
    field: "date",
    editable: "never",
  },
  {
    title: "Type",
    field: "type",
    editable: "never",
  },
  {
    title: "Client",
    field: "client",
    editable: "never",
  },
  {
    title: "Status",
    field: "status",
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
  const { assets } = useAssets();
  const { assetshistory} = useAssetshistory()
  const updateAssets = useUpdateAsset();
  const addAssets = useAddAsset();
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
      updateAssets({ id: editExpenseID, ...data });
    } else {
      addAssets({ empid: loginLevel.loginUserId, ...data });
      handleSentEmail(data);
    }

    handleDialogClose();
  };

  return (
    <div>
      <Paper className={classes.root}>
        <Typography variant="h5" component="h3">
          ASSET ITEM
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
                    <HStack>
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
                                label="Asset No"
                                id="margin-normal3"
                                name="assetno"
                                defaultValue={formdata.assetno}
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
                        {isExpenseEditing && <QRCode value={formdata.assetno} size="50" />}
                      </div>
                    </HStack>
                    <div>
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
                        // rules={{ required: "Reason is required" }}
                      />
                    </div>

                    <div>
                      <Controller
                        name="expiry"
                        control={control}
                        defaultValue={formdata.expiry}
                        render={({
                          field: { onChange, value },
                          fieldState: { error },
                        }) => {
                          return (
                            <TextField
                              label="Expiry Date"
                              //type="date"
                              id="margin-normal2"
                              name="expiry"
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
                        //rules={{ required: "From Date is required" }}
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
                      <Controller
                        name="status"
                        control={control}
                        defaultValue={formdata.status}
                        render={({
                          field: { onChange, value },
                          fieldState: { error },
                        }) => {
                          return (
                            <TextField
                              label="Status"
                              id="margin-normal5"
                              name="status"
                              defaultValue={formdata.status}
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
                      data={assetshistory}
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
    width: 400,
  },
}));

export default ExpenseForm;
