import React, { useState, useEffect } from "react";
import MaterialTable, { MTableToolbar } from "material-table";
import { TextField, MenuItem, Button, Icon } from "@material-ui/core";
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
import { makeStyles } from "@material-ui/core/styles";
import { useRecoilState } from "recoil";
import { loginLevelState } from "./data/atomdata";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckIcon from "@material-ui/icons/Check";
import SearchIcon from "@material-ui/icons/Search";
import CheckCircleOutlineOutlinedIcon from "@material-ui/icons/CheckCircleOutlineOutlined";
import ExpenseForm from "./ExpenseForm";
import { useCustomToast } from "../helpers/useCustomToast";
import { useExpensesContext } from "../context/expenses_context";
import { useEmployeesContext } from "../context/employees_context";
import { CustomDialog } from "../helpers/CustomDialog";
import { AlertDialogBox } from "../helpers/AlertDialogBox";
import { useSamples } from "./samples/useSamples";
import { useAddSample } from "./samples/useAddSample";
import { useDeleteSample } from "./samples/useDeleteSample";
import { useUpdateSample } from "./samples/useUpdateSample";
import SamplesForm from "./SamplesForm";

const initial_form = {
  sampleid: "",
  desp: "",
  date: "",
  type: "",
  client: "",
  remark: "",
  status: "",
};

const columns = [
  { title: "Sample Id", field: "sampleid", editable: "never" },

  {
    title: "Description",
    field: "desp",
    editable: "never",
  },
  {
    title: "Test Method",
    field: "testmethod",
    editable: "never",
  },
  {
    title: "Results",
    field: "results",
    editable: "never",
  },
  {
    title: "Conclusion",
    field: "conclusion",
    editable: "never",
  },
  {
    title: "Status",
    field: "status",
    editable: "never",
  },
];

const columns_despatch = [
  { title: "Asset No", field: "assetno", editable: "never" },

  {
    title: "Description",
    field: "desp",
    editable: "never",
  },
  {
    title: "Despatch To",
    field: "despatched",
    editable: "never",
  },

  {
    title: "Despatched Date",
    field: "despatchdate",
    editable: "never",
  },

  {
    title: "Status",
    field: "status",
    editComponent: (props) => (
      <TextField
        //defaultValue={props.value || null}
        onChange={(e) => props.onChange(e.target.value)}
        style={{ width: 100 }}
        value={props.value}
        select
      >
        <MenuItem value="Pending">Pending</MenuItem>
        <MenuItem value="Approve">Approve</MenuItem>
        <MenuItem value="Reject">Reject</MenuItem>
        <MenuItem value="Cancel">Cancel</MenuItem>
      </TextField>
    ),
  },
];

const columns_inprogress = [
  { title: "Asset No", field: "assetno", editable: "never" },

  {
    title: "Description",
    field: "desp",
    editable: "never",
  },
  {
    title: "Received From",
    field: "despatched",
    editable: "never",
  },
  {
    title: "Received Date",
    field: "receiveddate",
    editable: "never",
  },
  {
    title: "Status",
    field: "status",
    editComponent: (props) => (
      <TextField
        //defaultValue={props.value || null}
        onChange={(e) => props.onChange(e.target.value)}
        style={{ width: 100 }}
        value={props.value}
        select
      >
        <MenuItem value="Pending">Pending</MenuItem>
        <MenuItem value="Approve">Approve</MenuItem>
        <MenuItem value="Reject">Reject</MenuItem>
        <MenuItem value="Cancel">Cancel</MenuItem>
      </TextField>
    ),
  },
];

export default function ExpenseTable() {
  const classes = useStyles();
  const toast = useCustomToast();
  const [isLoad, setIsLoad] = useState(false);
  const { samples } = useSamples();
  const updateSample = useUpdateSample();
  const addSample = useAddSample();
  const deleteSample = useDeleteSample();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [expensesdata, setExpensesdata] = useState([]);
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [formdata, setFormdata] = useState(initial_form);
  const [loginLevel, setLoginLevel] = useRecoilState(loginLevelState);
  const { editEmployeeID } = useEmployeesContext();
  const {
    //expenses,
    editExpenseID,
    updateExpense,
    addExpense,
    deleteExpense,
    setEditExpenseID,
    setIsExpenseEditingOn,
    setIsExpenseEditingOff,
  } = useExpensesContext();

  // useEffect(() => {
  //   setFilter(loginLevel.loginUserId);
  // }, []);

  const add_Expense = async (data) => {
    // const { id } = data;
    setFormdata(initial_form);
    setFormdata(initial_form);
    setIsExpenseEditingOff();
    handleDialogOpen();
    // history.push("/singleexpense");
  };

  const update_Expense = async (data) => {
    const { id } = data;
    setFormdata({ ...data });
    setFormdata({ ...data });
    setEditExpenseID(id);
    setIsExpenseEditingOn();
    handleDialogOpen();

    // history.push("/singleexpense");
  };

  const delete_Expense = (data) => {
    const { id } = data;
    setEditExpenseID(id);
    handleAlertOpen();

    // deleteExpense(id);
    // loadExpenses();
  };

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleAlertOpen = () => {
    setIsAlertOpen(true);
  };

  const handleAlertClose = () => {
    setIsAlertOpen(false);
  };

  const handleOnDeleteConfirm = () => {
    const id = editExpenseID;
    deleteSample(id);
  };

  return (
    <div className={classes.root}>
      <Box
        maxW="x3"
        padding="4"
        width="100%"
        height="700"
        borderColor="blue.500"
        borderWidth="1px"
        borderRadius="lg"
        overflow="scroll"
      >
        <SimpleGrid>
          <Box>
            <Heading as="h2" size="lg">
              Samples Table
            </Heading>
          </Box>
          <Divider />
          <Tabs>
            <TabList>
              <Tab>In Progress</Tab>
              <Tab>Completed</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <MaterialTable
                  columns={columns}
                  data={samples.filter((r) => r.status === "In Progress")}
                  title="Samples Table"
                  icons={{
                    Add: (props) => <AddIcon />,
                    Edit: (props) => <CheckCircleOutlineOutlinedIcon />,
                    Delete: (props) => <DeleteIcon />,
                    Clear: (props) => <DeleteIcon />,
                    Check: (props) => <CheckIcon />,
                    Search: (props) => <SearchIcon />,
                    ResetSearch: (props) => <DeleteIcon />,
                  }}
                  actions={[
                    (rowData) => ({
                      //disabled: rowData.status !== "Pending",
                      icon: "edit",
                      tooltip: "Edit Record",
                      onClick: (event, rowData) => {
                        update_Expense(rowData);
                      },
                    }),
                    (rowData) => ({
                      //disabled: rowData.status !== "Pending",
                      icon: "delete",
                      tooltip: "Delete Record",
                      onClick: (event, rowData) => {
                        delete_Expense(rowData);
                      },
                    }),
                    {
                      icon: "add",
                      tooltip: "Add Record",
                      isFreeAction: true,
                      onClick: (event, rowData) => {
                        add_Expense(rowData);
                      },
                    },
                  ]}
                  options={{
                    filtering: true,
                    headerStyle: {
                      backgroundColor: "orange",
                      color: "#FFF",
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
              </TabPanel>
              <TabPanel>
                <MaterialTable
                  columns={columns}
                  data={samples.filter((r) => r.status === "Completed")}
                  title="Samples Table"
                  icons={{
                    Add: (props) => <AddIcon />,
                    Edit: (props) => <CheckCircleOutlineOutlinedIcon />,
                    Delete: (props) => <DeleteIcon />,
                    Clear: (props) => <DeleteIcon />,
                    Check: (props) => <CheckIcon />,
                    Search: (props) => <SearchIcon />,
                    ResetSearch: (props) => <DeleteIcon />,
                  }}
                  actions={[
                    (rowData) => ({
                      disabled: rowData.status !== "Pending",
                      icon: "edit",
                      tooltip: "Edit Record",
                      onClick: (event, rowData) => {
                        update_Expense(rowData);
                      },
                    }),
                    (rowData) => ({
                      disabled: rowData.status !== "Pending",
                      icon: "delete",
                      tooltip: "Delete Record",
                      onClick: (event, rowData) => {
                        delete_Expense(rowData);
                      },
                    }),
                    {
                      icon: "add",
                      tooltip: "Add Record",
                      isFreeAction: true,
                      onClick: (event, rowData) => {
                        add_Expense(rowData);
                      },
                    },
                  ]}
                  options={{
                    filtering: true,
                    headerStyle: {
                      backgroundColor: "orange",
                      color: "#FFF",
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
              </TabPanel>
            </TabPanels>
          </Tabs>
        </SimpleGrid>
      </Box>

      <div style={{ maxWidth: "100%", paddingTop: "5px" }}>
        {/* <MaterialTable
          columns={columns}
          data={items}
          title="Assets Table"
          icons={{
            Add: (props) => <AddIcon />,
            Edit: (props) => <CheckCircleOutlineOutlinedIcon />,
            Delete: (props) => <DeleteIcon />,
            Clear: (props) => <DeleteIcon />,
            Check: (props) => <CheckIcon />,
            Search: (props) => <SearchIcon />,
            ResetSearch: (props) => <DeleteIcon />,
          }}
        
          actions={[
            (rowData) => ({
              disabled: rowData.status !== "Pending",
              icon: "edit",
              tooltip: "Edit Record",
              onClick: (event, rowData) => {
                update_Expense(rowData);
              },
            }),
            (rowData) => ({
              disabled: rowData.status !== "Pending",
              icon: "delete",
              tooltip: "Delete Record",
              onClick: (event, rowData) => {
                delete_Expense(rowData);
              },
            }),
            {
              icon: "add",
              tooltip: "Add Record",
              isFreeAction: true,
              onClick: (event, rowData) => {
                add_Expense(rowData);
              },
            },
          ]}
          options={{
            filtering: true,
            headerStyle: {
              backgroundColor: "orange",
              color: "#FFF",
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
        /> */}
        <CustomDialog
          isOpen={isDialogOpen}
          handleClose={handleDialogClose}
          title=""
          showButton={true}
          isFullscreen={false}
          isFullwidth={false}
        >
          <SamplesForm
            formdata={formdata}
            setFormdata={setFormdata}
            handleDialogClose={handleDialogClose}
          />
        </CustomDialog>

        <AlertDialogBox
          onClose={handleAlertClose}
          onConfirm={handleOnDeleteConfirm}
          isOpen={isAlertOpen}
          title="Delete Asset Item"
        >
          <h2>Are you sure you want to delete ?</h2>
        </AlertDialogBox>
      </div>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 0,
  },
}));