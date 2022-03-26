import React, { useState, useEffect } from "react";
import MaterialTable, { MTableToolbar } from "material-table";
import { TextField, MenuItem, Button, Icon } from "@material-ui/core";
import {
  Box,
  Heading,
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
import LeaveForm from "./LeaveForm";
import { CustomDialog } from "../helpers/CustomDialog";
import { AlertDialogBox } from "../helpers/AlertDialogBox";
import CustomAlertDialog from "../helpers/CustomAlertDialog";
import { useLeavesContext } from "../context/leaves_context";
import { useEmployeesContext } from "../context/employees_context";
import { useLeaves } from "./leaves/useLeaves";
import { useAddLeaves } from "./leaves/useAddLeaves";
import { useDeleteLeaves } from "./leaves/useDeleteLeaves";
import { useUpdateLeaves } from "./leaves/useUpdateLeaves";
import { useSingleEmployee } from "./employees/useSingleEmployee";


const initial_form = {
  name: "",
  to_date: "",
  from_date: "",
  reason: "",
  status: "Pending",
  no_of_days: 0,
  leave_bal: 0,
};

const columns = [
  {
    title: "Item No",
    field: "itemno",
    editable: "never",
  },
  {
    title: "From Date",
    field: "from_date",
    type: "date",
    dateSetting: { locale: "en-GB" },
    editable: "never",
  },
  {
    title: "To Date",
    field: "to_date",
    type: "date",
    dateSetting: { locale: "en-GB" },
    editable: "never",
  },
  {
    title: "Leave Balance",
    field: "leave_bal",
    type: "numeric",
    editable: "never",
  },
  {
    title: "No of Days",
    field: "no_of_days",
    type: "numeric",
    editable: "never",
  },
  {
    title: "Reason",
    field: "reason",
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
        <MenuItem value="Approved">Approved</MenuItem>
        <MenuItem value="Rejected">Rejected</MenuItem>
        <MenuItem value="Cancel">Cancel</MenuItem>
      </TextField>
    ),
  },
];

// const AlertBox = ({ isOpen, onClose, cancelRef, heading, children }) => {
//   return (
//     <AlertDialog
//       isOpen={isOpen}
//       leastDestructiveRef={cancelRef}
//       onClose={onClose}
//     >
//       <AlertDialogOverlay>
//         <AlertDialogContent>
//           <AlertDialogHeader fontSize="lg" fontWeight="bold">
//             {heading}
//           </AlertDialogHeader>

//           <AlertDialogBody>{children}</AlertDialogBody>

//           <AlertDialogFooter>
//             <Button ref={cancelRef} onClick={onClose}>
//               Cancel
//             </Button>
//             <Button colorScheme="red" onClick={onClose} ml={3}>
//               Delete
//             </Button>
//           </AlertDialogFooter>
//         </AlertDialogContent>
//       </AlertDialogOverlay>
//     </AlertDialog>
//   );
// };

export default function LeaveTableStaff() {
  const classes = useStyles();
  const { singleemployee, setSingleEmployeeId } = useSingleEmployee();
  const { leaves, setLeaveYr, setLeaveId } = useLeaves();
  const updateLeaves = useUpdateLeaves();
  const addLeaves = useAddLeaves();
  const deleteLeaves = useDeleteLeaves();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [loginLevel, setLoginLevel] = useRecoilState(loginLevelState);
  const [formdata, setFormdata] = useState(initial_form);
  const [leavestate, setLeaveState] = useState({});
  const [isLoad, setIsLoad] = useState(true);
  const { editEmployeeID } = useEmployeesContext();
  const {
    editLeaveID,
    setEditLeaveID,
    setIsLeaveEditingOn,
    setIsLeaveEditingOff,
  } = useLeavesContext();
  const [isOpen, setIsOpen] = React.useState(false);
  const [isLeaveYear, setLeaveYear] = useState(true);
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef();
  const [selectleaveyear, setSelectLeaveYear] = useState("");
  const currentyear = new Date().getFullYear();
  //const YEAR = new Date().getFullYear();

  useEffect(() => {
    setSelectLeaveYear(currentyear);
  }, []);

  useEffect(() => {
    setLeaveId(loginLevel.loginUserId);
    setLeaveYr(selectleaveyear ? selectleaveyear : currentyear);
    setIsLoad(false);
  }, [isLoad]);

  useEffect(() => {
    if (leaves) {
      Calc_Leave();
    }
  }, [JSON.stringify(leaves)]);

  const Calc_Leave = () => {
    const { leave_bf, leave_entitled, leave_cd } = loginLevel;
    const leaveTaken = leaves.reduce((acc, item) => {
      if (item.status === "Approved") {
        return acc + item.no_of_days;
      } else {
        return acc;
      }
    }, 0);
    const leavePending = leaves.reduce((acc, item) => {
      if (item.status === "Pending") {
        return acc + item.no_of_days;
      } else {
        return acc;
      }
    }, 0);
    const leaveEntitled = isNaN(leave_entitled) ? 0 : leave_entitled;
    const leaveBf = isNaN(leave_bf) ? 0 : leave_bf;
    const leaveCd = isNaN(leave_cd) ? 0 : leave_cd;
    const leaveTotal = leaveBf + leaveEntitled;
    const bal = leaveBf + leaveEntitled - leaveCd - leaveTaken;
    const rec = {
      leave_bf: leaveBf,
      leave_entitled: leaveEntitled,
      leave_total: leaveTotal,
      leave_cd: leaveCd,
      leave_taken: leaveTaken + leaveCd,
      leave_pending: leavePending,
      leave_bal: bal,
    };
    setLeaveState(rec);
  };

  const update_Leave = async (data) => {
    const { id } = data;
    setFormdata({ ...data });
    setFormdata({ ...data });
    setEditLeaveID(id);
    setIsLeaveEditingOn();
    handleDialogOpen();
    //history.push("/singleleave");
  };

  const add_Leave = async (data) => {
    // const { id } = data;
    setEditLeaveID("");
    setFormdata(initial_form);
    setIsLeaveEditingOff();
    handleDialogOpen();
    //history.push("/singleleave");
  };

  const delete_Leave = (data) => {
    const { id } = data;
    console.log("delete leave", id);
    setEditLeaveID(id);
    setIsAlertOpen(true);
    //handleAlertOpen();
    //deleteLeave(id);
    //loadLeaves();
  };

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);

    // if (isLeaveEditing) {
    //   loadEmpLeaves(editEmployeeID);
    // }
  };

  const handleAlertOpen = () => {
    setIsAlertOpen(true);
  };

  const handleAlertClose = () => {
    setIsAlertOpen(false);
  };

  const handleOnDeleteConfirm = () => {
    const id = editLeaveID;
    deleteLeaves(id);
  };

  const UpdateLeaveYear = (e) => {
    setSelectLeaveYear((prev) => (prev = e.target.value));
    setIsLoad(true);
  };

  return (
    <div className={classes.root}>
      {/* <h1>Expenses Claims Application</h1> */}
    
      <Box>
        <Grid
          p={1}
          h="100px"
          templateRows="repeat(2, 1fr)"
          templateColumns="repeat(12, 1fr)"
          gap={6}
          border="1px solid blue"
          bg="gray.200"
        >
          <GridItem colSpan={2} align="center">
            <Heading pt={3} size="xs">
              Leave Entitlement
            </Heading>
          </GridItem>
          <GridItem colSpan={2} align="center">
            <Heading pt={3} size="xs">
              Leave Carried Forward
            </Heading>
          </GridItem>
          <GridItem colSpan={2} align="center">
            <Heading pt={3} size="xs">
              Total Leaves Days
            </Heading>
          </GridItem>
          <GridItem colSpan={2} align="center">
            <Heading pt={3} size="xs">
              Leave Taken
            </Heading>
          </GridItem>
          <GridItem colSpan={2} align="center">
            <Heading pt={3} size="xs">
              Leave Pending
            </Heading>
          </GridItem>
          <GridItem colSpan={2} align="center">
            <Heading pt={3} size="xs">
              Balance Leave Days
            </Heading>
          </GridItem>

          <GridItem colSpan={2} bg="white" align="center">
            <Text fontSize="20">{leavestate.leave_entitled} </Text>
          </GridItem>
          <GridItem colSpan={2} bg="white" align="center">
            <Text fontSize="20">{leavestate.leave_bf}</Text>
          </GridItem>
          <GridItem colSpan={2} bg="white" align="center">
            <Text fontSize="20">{leavestate.leave_total} </Text>
          </GridItem>
          <GridItem colSpan={2} bg="white" align="center">
            <Text fontSize="20">{leavestate.leave_taken}</Text>
          </GridItem>
          <GridItem colSpan={2} bg="white" align="center">
            <Text fontSize="20">{leavestate.leave_pending}</Text>
          </GridItem>
          <GridItem colSpan={2} bg="white" align="center">
            <Text fontSize="20">{leavestate.leave_bal}</Text>
          </GridItem>
        </Grid>
      </Box>
      <Box maxW="100%" pt={5} h={600} overflow="scroll">
        <MaterialTable
          columns={columns}
          data={leaves}
          title="Leave Application"
          icons={{
            Add: (props) => <AddIcon />,
            Edit: (props) => <EditIcon />,
            Delete: (props) => <DeleteIcon />,
            Clear: (props) => <DeleteIcon />,
            Check: (props) => <CheckIcon />,
            Search: (props) => <SearchIcon />,
            ResetSearch: (props) => <DeleteIcon />,
          }}
          // editable={{
          //   isEditable: (rowData) => rowData.status === "Pending",
          //   isDeletable: (rowData) => rowData.status === "Pending",
          //   onRowAdd: (newData) =>
          //     new Promise((resolve, reject) => {
          //       setTimeout(() => {
          //         add_Leave(newData);
          //         resolve();
          //       }, 1000);
          //     }),
          //   onRowUpdate: (newData, oldData) =>
          //     new Promise((resolve, reject) => {
          //       setTimeout(() => {
          //         update_Leave(newData);
          //         resolve();
          //       }, 1000);
          //     }),
          //   onRowDelete: (oldData) =>
          //     new Promise((resolve, reject) => {
          //       setTimeout(() => {
          //         delete_Leave(oldData);
          //         resolve();
          //       }, 1000);
          //     }),
          // }}
          actions={[
            (rowData) => ({
              disabled: rowData.status !== "Pending",
              icon: "edit",
              tooltip: "Edit Record",
              onClick: (event, rowData) => {
                update_Leave(rowData);
              },
            }),
            (rowData) => ({
              disabled: rowData.status !== "Pending",
              icon: "delete",
              tooltip: "Delete Record",
              onClick: (event, rowData) => {
                delete_Leave(rowData);
              },
            }),
            {
              icon: "add",
              tooltip: "Add Record",
              isFreeAction: true,
              onClick: (event, rowData) => {
                add_Leave(rowData);
              },
            },
          ]}
          options={{
            filtering: true,
            paging: false,
            headerStyle: {
              backgroundColor: "orange",
              color: "primary",
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
        <CustomDialog
          isOpen={isDialogOpen}
          handleClose={handleDialogClose}
          title=""
          showButton={true}
          isFullscree={false}
        >
          <LeaveForm
            formdata={formdata}
            leavestate={leavestate}
            setFormdata={setFormdata}
            handleDialogClose={handleDialogClose}
          />
        </CustomDialog>

        {/* <CustomAlertDialog
          isOpen={isAlertOpen}
          cancelRef={cancelRef}
          onClose={handleAlertClose}
          onConfirm={handleOnDeleteConfirm}
          title="DELETE"
        >
          <Heading size="sm">Are you sure you want to delete ?</Heading>
        </CustomAlertDialog> */}
        <AlertDialogBox
          onClose={handleAlertClose}
          onConfirm={handleOnDeleteConfirm}
          isOpen={isAlertOpen}
          title="Delete Leave"
        >
          <h2>Are you sure you want to delete ?</h2>
        </AlertDialogBox>
        {/* <AlertBox
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={() => onClose()}
          heading="DELETE"
        >
          <h2>Are you sure you want to delete?</h2>
        </AlertBox> */}
      </Box>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 0,
  },
}));
