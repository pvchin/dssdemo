import React from "react";
import { Button, Icon, TextField, Paper, Typography } from "@material-ui/core";
import MaterialTable, { MTableToolbar } from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Heading,
  Divider,
  FormControl,
  Grid,
  GridItem,
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
  InputLeftElement,
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
import { useSamples } from "./samples/useSamples";
import { useAddSample } from "./samples/useAddSample";
import { useDeleteSample } from "./samples/useDeleteSample";
import { useUpdateSample } from "./samples/useUpdateSample";
import { useSampleshistory } from "./sampleshistory.js/useSampleshistory";

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
   const field_width = "138";
  const { samples } = useSamples();
  const { sampleshistory } = useSampleshistory();
  const updateSample = useUpdateSample();
  const addSample = useAddSample();
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
      updateSample({ id: editExpenseID, ...data });
    } else {
      addSample({ empid: loginLevel.loginUserId, ...data });
      handleSentEmail(data);
    }

    handleDialogClose();
  };

  return (
    <div>
      <Paper className={classes.root}>
        <Typography variant="h5" component="h3">
          SAMPLE ITEMS
        </Typography>
        {/* <Typography component="p">Expense Claim Application</Typography> */}
        <Box>
          <SimpleGrid>
            <Tabs>
              <TabList>
                <Tab>Details</Tab>
                <Tab>Findings</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <HStack>
                      <FormControl>
                        <Controller
                          control={control}
                          name="sampleid"
                          defaultValue={formdata.sampleid}
                          render={({ field: { onChange, value, ref } }) => (
                            <InputGroup>
                              <HStack w="100%" py={1}>
                                <InputLeftAddon
                                  children="Sample Id"
                                  minWidth={field_width}
                                />
                                <Input
                                  name="sampleid"
                                  value={value}
                                  width="full"
                                  onChange={onChange}
                                  borderColor="gray.400"
                                  //textTransform="capitalize"
                                  ref={ref}
                                  placeholder="sample id"
                                />
                              </HStack>
                            </InputGroup>
                          )}
                        />
                      </FormControl>

                      {/* <div>
                        {isExpenseEditing && <QRCode value={formdata.assetno} size="50" />}
                      </div> */}
                    </HStack>
                    <div>
                      <FormControl>
                        <Controller
                          control={control}
                          name="desp"
                          defaultValue={formdata.desp}
                          render={({ field: { onChange, value, ref } }) => (
                            <InputGroup>
                              <HStack w="100%" py={1}>
                                <InputLeftAddon
                                  children="Description"
                                  minWidth={field_width}
                                />
                                <Input
                                  name="desp"
                                  value={value}
                                  width="full"
                                  onChange={onChange}
                                  borderColor="gray.400"
                                  //textTransform="capitalize"
                                  ref={ref}
                                  placeholder="description"
                                />
                              </HStack>
                            </InputGroup>
                          )}
                        />
                      </FormControl>
                    </div>

                    <div>
                      <FormControl>
                        <Controller
                          control={control}
                          name="assetno"
                          defaultValue={formdata.assetno}
                          render={({ field: { onChange, value, ref } }) => (
                            <InputGroup>
                              <HStack w="100%" py={1}>
                                <InputLeftAddon
                                  children="Asset No"
                                  minWidth={field_width}
                                />
                                <Input
                                  name="assetno"
                                  value={value}
                                  width="full"
                                  onChange={onChange}
                                  borderColor="gray.400"
                                  //textTransform="capitalize"
                                  ref={ref}
                                  placeholder="asset no"
                                />
                              </HStack>
                            </InputGroup>
                          )}
                        />
                      </FormControl>
                    </div>
                    <div>
                      <FormControl>
                        <Controller
                          control={control}
                          name="client"
                          defaultValue={formdata.client}
                          render={({ field: { onChange, value, ref } }) => (
                            <InputGroup>
                              <HStack w="100%" py={1}>
                                <InputLeftAddon
                                  children="Client"
                                  minWidth={field_width}
                                />
                                <Select
                                  name="client"
                                  value={value}
                                  width="full"
                                  onChange={onChange}
                                  borderColor="gray.400"
                                  //textTransform="capitalize"
                                  ref={ref}
                                  //placeholder="category"
                                >
                                  <option value="Marketing Department">Marketing Department</option>
                                  <option value="Operation Department">Operation Department</option>
                                  <option value="Warehouse">Warehouse</option>
                                </Select>
                              </HStack>
                            </InputGroup>
                          )}
                        />
                      </FormControl>
                    </div>
                    <div>
                      <FormControl>
                        <Controller
                          control={control}
                          name="recdate"
                          defaultValue={formdata.recdate}
                          render={({ field: { onChange, value, ref } }) => (
                            <InputGroup>
                              <HStack w="100%" py={1}>
                                <InputLeftAddon
                                  children="Received Date"
                                  minWidth={field_width}
                                />
                                <Input
                                  name="recdate"
                                  type="date"
                                  value={value}
                                  width="full"
                                  onChange={onChange}
                                  borderColor="gray.400"
                                  //textTransform="capitalize"
                                  ref={ref}
                                  placeholder="received date"
                                />
                              </HStack>
                            </InputGroup>
                          )}
                        />
                      </FormControl>
                    </div>

                    {/* <div>
                      <FormControl>
                        <Controller
                          control={control}
                          name="status"
                          defaultValue={formdata.status}
                          render={({ field: { onChange, value, ref } }) => (
                            <InputGroup>
                              <HStack w="100%" py={1}>
                                <InputLeftAddon
                                  children="Status"
                                  minWidth={field_width}
                                />
                                <Select
                                  name="status"
                                  value={value}
                                  width="full"
                                  onChange={onChange}
                                  borderColor="gray.400"
                                  //textTransform="capitalize"
                                  ref={ref}
                                  //placeholder="category"
                                >
                                  <option value="In Progress">
                                    In Progress
                                  </option>
                                  <option value="Completed">Completed</option>
                                </Select>
                              </HStack>
                            </InputGroup>
                          )}
                        />
                      </FormControl>
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
                </TabPanel>
                <TabPanel>
                  <Box>
                    <form onSubmit={handleSubmit(onSubmit)}>
                     
                      <div>
                        <FormControl>
                          <Controller
                            control={control}
                            name="testmethod"
                            defaultValue={formdata.testmethod}
                            render={({ field: { onChange, value, ref } }) => (
                              <InputGroup>
                                <HStack w="100%" py={1}>
                                  <InputLeftAddon
                                    children="Test Method"
                                    minWidth={field_width}
                                  />
                                  <Select
                                    name="testmethod"
                                    value={value}
                                    width="full"
                                    onChange={onChange}
                                    borderColor="gray.400"
                                    //textTransform="capitalize"
                                    ref={ref}
                                    //placeholder="category"
                                  >
                                    <option value="Method A">Method A</option>
                                    <option value="Method C">Method B</option>
                                    <option value="Method C">Method C</option>
                                  </Select>
                                </HStack>
                              </InputGroup>
                            )}
                          />
                        </FormControl>
                      </div>
                       <div>
                        <FormControl>
                          <Controller
                            control={control}
                            name="datapath"
                            defaultValue={formdata.datapath}
                            render={({ field: { onChange, value, ref } }) => (
                              <InputGroup>
                                <HStack w="100%" py={1}>
                                  <InputLeftAddon
                                    children="Data Path"
                                    minWidth={field_width}
                                  />
                                  <Input
                                    name="datapath"
                                    value={value}
                                    type="file"
                                    width="full"
                                    onChange={onChange}
                                    borderColor="gray.400"
                                    //textTransform="capitalize"
                                    ref={ref}
                                    placeholder="data path"
                                  />
                                </HStack>
                              </InputGroup>
                            )}
                          />
                        </FormControl>
                      </div>
                      <div></div>
                      <div>
                        <FormControl>
                          <Controller
                            control={control}
                            name="results"
                            defaultValue={formdata.results}
                            render={({ field: { onChange, value, ref } }) => (
                              <InputGroup>
                                <HStack w="100%" py={1}>
                                  <InputLeftAddon
                                    children="Results"
                                    minWidth={field_width}
                                  />
                                  <Input
                                    name="results"
                                    value={value}
                                    width="full"
                                    onChange={onChange}
                                    borderColor="gray.400"
                                    //textTransform="capitalize"
                                    ref={ref}
                                    placeholder="results"
                                  />
                                </HStack>
                              </InputGroup>
                            )}
                          />
                        </FormControl>
                      </div>
                      <div>
                        <FormControl>
                          <Controller
                            control={control}
                            name="conclusion"
                            defaultValue={formdata.conclusion}
                            render={({ field: { onChange, value, ref } }) => (
                              <InputGroup>
                                <HStack w="100%" py={1}>
                                  <InputLeftAddon
                                    children="Conclusion"
                                    minWidth={field_width}
                                  />
                                  <Input
                                    name="conclusion"
                                    value={value}
                                    width="full"
                                    onChange={onChange}
                                    borderColor="gray.400"
                                    //textTransform="capitalize"
                                    ref={ref}
                                    placeholder="conclusion"
                                  />
                                </HStack>
                              </InputGroup>
                            )}
                          />
                        </FormControl>
                      </div>

                      <div>
                        <FormControl>
                          <Controller
                            control={control}
                            name="status"
                            defaultValue={formdata.status}
                            render={({ field: { onChange, value, ref } }) => (
                              <InputGroup>
                                <HStack w="100%" py={1}>
                                  <InputLeftAddon
                                    children="Status"
                                    minWidth={field_width}
                                  />
                                  <Select
                                    name="status"
                                    value={value}
                                    width="full"
                                    onChange={onChange}
                                    borderColor="gray.400"
                                    //textTransform="capitalize"
                                    ref={ref}
                                    //placeholder="category"
                                  >
                                    <option value="In Progress">
                                      In Progress
                                    </option>
                                    <option value="Completed">Completed</option>
                                  </Select>
                                </HStack>
                              </InputGroup>
                            )}
                          />
                        </FormControl>
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
