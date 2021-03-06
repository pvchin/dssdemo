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
import { useAddItem } from "./items/useAddItem";
import { useDeleteItem } from "./items/useDeleteItem";
import { useUpdateItem } from "./items/useUpdateItem";
import { useItems } from "./items/useItems";
import ItemForm from "./ItemForm"

const initial_form = {
  name: "",
  date: "",
  purchased_from: "",
  description: "",
  status: "Pending",
  amount: 0,
};

const columns = [
  { title: "Asset No", field: "itemno", editable: "never" },

  {
    title: "Description",
    field: "desp",
    editable: "never",
  },
  {
    title: "Price",
    field: "uprice",
    type: "currency",
    editable: "never",
  },
  {
    title: "Qty Onhand",
    field: "qty",
    type: "numeric",
    editable: "never",
  },
  {
    title: "Min Qty Level",
    field: "minqty",
    type: "numeric",
    editable: "never",
  },
];

export default function ExpenseTable() {
  const classes = useStyles();
  const toast = useCustomToast();
  const [isLoad, setIsLoad] = useState(false);
   const { items } = useItems()
  const updateItem = useUpdateItem();
  const addItem = useAddItem();
  const deleteItem = useDeleteItem()
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

  const add_Item = async (data) => {
    // const { id } = data;
    setFormdata(initial_form);
    setFormdata(initial_form);
    setIsExpenseEditingOff();
    handleDialogOpen();
    // history.push("/singleexpense");
  };

  const update_Item = async (data) => {
    const { id } = data;
    setFormdata({ ...data });
    setFormdata({ ...data });
    setEditExpenseID(id);
    setIsExpenseEditingOn();
    handleDialogOpen();

    // history.push("/singleexpense");
  };

  const delete_Item = (data) => {
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
    deleteItem(id);
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
              Items Table
            </Heading>
          </Box>
          <Divider />
          <Tabs>
            <TabList>
              <Tab>On Hand</Tab>
              <Tab>On Order</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <MaterialTable
                  columns={columns}
                  data={items}
                  title="Items Table"
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
                        update_Item(rowData);
                      },
                    }),
                    (rowData) => ({
                      //disabled: rowData.status !== "Pending",
                      icon: "delete",
                      tooltip: "Delete Record",
                      onClick: (event, rowData) => {
                        delete_Item(rowData);
                      },
                    }),
                    {
                      icon: "add",
                      tooltip: "Add Record",
                      isFreeAction: true,
                      onClick: (event, rowData) => {
                        add_Item(rowData);
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
                  data={items.filter((r) => r.status === "On Order")}
                  title="Items Table"
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
                        update_Item(rowData);
                      },
                    }),
                    (rowData) => ({
                      disabled: rowData.status !== "Pending",
                      icon: "delete",
                      tooltip: "Delete Record",
                      onClick: (event, rowData) => {
                        delete_Item(rowData);
                      },
                    }),
                    {
                      icon: "add",
                      tooltip: "Add Record",
                      isFreeAction: true,
                      onClick: (event, rowData) => {
                        add_Item(rowData);
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
          <ItemForm
            formdata={formdata}
            setFormdata={setFormdata}
            handleDialogClose={handleDialogClose}
          />
        </CustomDialog>

        <AlertDialogBox
          onClose={handleAlertClose}
          onConfirm={handleOnDeleteConfirm}
          isOpen={isAlertOpen}
          title="Delete Item"
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
