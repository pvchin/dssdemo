import React, { useState, useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import dayjs from "dayjs";
import { useHistory } from "react-router-dom";
import * as emailjs from "emailjs-com";
import MaterialTable, { MTableToolbar } from "material-table";
import { FiSave, FiCheckCircle, FiMail } from "react-icons/fi";
import { useCustomToast } from "../helpers/useCustomToast";
//import { Button} from "@material-ui/core"
import {
  Box,
  Button,
  Divider,
  Grid,
  GridItem,
  Flex,
  Heading,
  Stack,
  Spacer,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Wrap,
  WrapItem,
  useDisclosure,
} from "@chakra-ui/react";
import PayForm from "./PayForm";
import PaySummary from "./PaySummary";
//import PrintPaySummary from "./PrintPaySummary";
import { useEmployees } from "./employees/useEmployees";
import { usePayrun } from "./payrun/usePayrun";
import { useUpdatePayrun } from "./payrun/useUpdatePayrun";
import { usePayslipsBatch } from "./payslips/usePayslipsBatch";
import { useUpdatePayslips } from "./payslips/useUpdatePayslips";
import { usePayslipsContext } from "../context/payslips_context";
import { useTablesContext } from "../context/tables_context";
import { useSetRecoilState, useRecoilState } from "recoil";
import {
  payrunState,
  paydataState,
  payrunIdState,
  payrunStatusState,
} from "./data/atomdata";
import { useRecoilValue } from "recoil";

const drawerWidth = 240;
const SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICEID;
const TEMPLATE_ID = "template_1y8odlq";
const USER_ID = process.env.REACT_APP_EMAILJS_USERID;

const initial_formdata = {
  name: "",
  period: "",
  pay_date: null,
  payrun: "",
  bank_name: "",
  bank_acno: "",
  salary_currency: "BND",
  currency_rate: 1,
  tap_acno: "",
  scp_acno: "",
  tap_checkbox: false,
  empid: "",
  status: "",
  allows_type1: "",
  allows_type1amt: "",
  allows_type2: "",
  allows_type2amt: "",
  allows_type3: " ",
  allows_type3amt: 0,
  allows_type4: "",
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

  wages: 0,
  tap_amount: 0,
  scp_amount: 0,
  total_allowances: 0,
  total_deductions: 0,
  site_allows: 0,
  expenses_claims: 0,
  nett_pay: 0,

  wages_bnd: 0,
  site_allows_bnd: 0,
  expenses_claims_bnd: 0,
  total_allowances_bnd: 0,
  total_deductions_bnd: 0,
  tap_amount_bnd: 0,
  scp_amount_bnd: 0,
  nett_pay_bnd: 0,
};

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const columns = [
  {
    title: "Name",
    field: "name",
    editable: "never",
    cellStyle: {
      width: 280,
      maxWidth: 280,
    },
  },
];

const Payrunbatch = () => {
  let history = useHistory();
  const classes = useStyles();
  const toast = useCustomToast();
  const componentRef = useRef();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  //const { register, handleSubmit, control, setValue, reset, watch } = useForm();

  const {
    //payrun,
    getSingleBatchPayslip,
    //singlebatchpayslip,
    payslip_period,
    //updatePayslip,
    //updatePayrun,
    singlebatch_payslip_loading,
    singlebatch_payslip_error,
  } = usePayslipsContext();
  const { payslipsbatch, psbpayrunId, setPSBPayrunId } = usePayslipsBatch();
  const { employees } = useEmployees();
  const { payrun } = usePayrun();
  const updatePayslip = useUpdatePayslips();
  const updatePayrun = useUpdatePayrun();
  const { loadPayitems, payitems } = useTablesContext();
  const [payrundata, setPayrundata] = useRecoilState(payrunState);
  const [payrunId, setPayrunId] = useRecoilState(payrunIdState);
  const [payrunstatus, setPayrunStatus] = useRecoilState(payrunStatusState);
  const [loadFormdata, setLoadFormdata] = useState(false);
  const [loadUpdatedata, setLoadUpdatedata] = useState(false);
  const [formdata, setFormdata] = useState(initial_formdata);
  const [rowindex, setRowIndex] = useState(0);
  const [emponclick, setEmponclick] = useState(false);
  const [showSumm, setShowSumm] = useState(false);
  const [isCalc, setIsCalc] = useState(false);
  const [isStart, setIsStart] = useState(true);
  const [isShow, setIsShow] = useState(false);
  const [tabno, setTabno] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const singlebatchpayslip = payslipsbatch;

  useEffect(() => {
    loadPayitems();
    setEmponclick(true);
    // getSingleBatchPayslip(payslip_period);
  }, []);

  useEffect(() => {
    setRowIndex(0);
    // handleEmpButtonClick(0);
    setEmponclick(false);
  }, [emponclick]);

  useEffect(() => {
    setLoadFormdata(false);
  }, [loadUpdatedata]);

  useEffect(() => {
    setPSBPayrunId(payslip_period);
    //setIsCalc(true);
  }, [psbpayrunId]);

  useEffect(() => {
    calcPayrunTotals();
    setIsCalc(false);
  }, [isCalc]);

  // useEffect(() => {
  //   handleEmpButtonClick(0);
  //   setIsLoad(false);
  // }, [isLoad]);

  const handleShowSumm = (e) => {
    e.preventDefault();
    setShowSumm(!showSumm);
  };

  const handlePrintSummary = (e) => {
    e.preventDefault();
    if (payrundata.status === "Verified" || payrundata.status === "Approved") {
      exportPdfTable(singlebatchpayslip);
    } else {
      // save individual payslips
      saveIndividualPayslips();
      // save payrun
      updatePayrun({
        id: payrunId,
        totalpayroll: payrundata.totalpayroll,
        totalwages: payrundata.totalwages,
        totaltap: payrundata.totaltap,
        totalscp: payrundata.totalscp,
        totalallows: payrundata.totalallows,
        totaldeducts: payrundata.totaldeducts,
        totalsitesallows: payrundata.totalsiteallows,
        totalexpensesclaims: payrundata.totalexpensesclaims,
      });
      exportPdfTable(singlebatchpayslip);
    }
  };

  const exportPdfTable = (singlebatchpayslip) => {
    // PrintPaySummary((singlebatchpayslip = { singlebatchpayslip }));
  };

  const handleSavePayslips = (e) => {
    e.preventDefault();

    //calcPayrunTotals();
    // eslint-disable-next-line no-lone-blocks
    // {
    //   singlebatchpayslip.forEach((rec) => {
    //     const { id, rec_id, tableData, ...fields } = rec;
    //     updatePayslip({ id, ...fields });
    //   });
    // }
    // save individual payslips
    saveIndividualPayslips();

    //update payrun
    handleSavePayrun();
    toast({
      title: "Changes have been saved!",
      status: "success",
    });
    history.push("/payslip");
  };

  const saveIndividualPayslips = () => {
    singlebatchpayslip.forEach((rec) => {
      const { id, rec_id, tableData, ...fields } = rec;
      updatePayslip({ id, ...fields });
    });
  };

  const calcPayrunTotals = () => {
    // if (!psbpayrunId) {
    //   return null;
    // }
    const tmpbatch = singlebatchpayslip
      .filter((r) => r.payrun === payslip_period)
      .map((rec) => {
        return { ...rec };
      });
    //console.log("recalc", tmpbatch);

    const totalpayroll = tmpbatch.reduce((acc, item) => {
      const value = isNaN(item.nett_pay_bnd) ? 0 : item.nett_pay_bnd;
      return acc + Math.round((value + Number.EPSILON) * 100) / 100;
    }, 0);
    const totalwages = tmpbatch.reduce((acc, item, index) => {
      const value = isNaN(item.wages_bnd) ? 0 : item.wages_bnd;
      return acc + Math.round((value + Number.EPSILON) * 100) / 100;
    }, 0);
    const totaltap = tmpbatch.reduce((acc, item) => {
      const value = isNaN(item.tap_amount_bnd) ? 0 : item.tap_amount_bnd;
      return acc + Math.round((value + Number.EPSILON) * 100) / 100;
    }, 0);

    const totalscp = tmpbatch.reduce((acc, item) => {
      const value = isNaN(item.scp_amount_bnd) ? 0 : item.scp_amount_bnd;
      return acc + Math.round((value + Number.EPSILON) * 100) / 100;
    }, 0);

    const totalallows = tmpbatch.reduce((acc, item) => {
      const value = isNaN(item.total_allowances_bnd)
        ? 0
        : item.total_allowances_bnd;
      return acc + Math.round((value + Number.EPSILON) * 100) / 100;
    }, 0);

    const totaldeducts = tmpbatch.reduce((acc, item) => {
      const value = isNaN(item.total_deductions_bnd)
        ? 0
        : item.total_deductions_bnd;
      return acc + Math.round((value + Number.EPSILON) * 100) / 100;
    }, 0);

    const totalsiteallows = tmpbatch.reduce((acc, item) => {
      const value = isNaN(item.site_allows_bnd) ? 0 : item.site_allows_bnd;
      return acc + Math.round((value + Number.EPSILON) * 100) / 100;
    }, 0);

    const totalexpensesclaims = tmpbatch.reduce((acc, item) => {
      const value = isNaN(item.expenses_claims_bnd)
        ? 0
        : item.expenses_claims_bnd;
      return acc + Math.round((value + Number.EPSILON) * 100) / 100;
    }, 0);

    setPayrundata({
      ...payrundata,
      totalpayroll: totalpayroll,
      totalwages: totalwages,
      totaltap: totaltap,
      totalscp: totalscp,
      totalallows: totalallows,
      totaldeducts: totaldeducts,
      totalsiteallows: totalsiteallows,
      totalexpensesclaims: totalexpensesclaims,
    });
  };

  const handleSavePayrun = () => {
    if (payrundata.status === "Verified" || payrundata.status === "Approved") {
      toast({
        title: `This payroll batch has been ${payrundata.status}! No changes can be made!`,
        status: "warning",
      });
      return <div></div>;
    }

    const tmppayrun = payrun.filter((r) => r.payrun === payslip_period);
    //console.log("paysave", tmppayrun[0].id);
    // eslint-disable-next-line no-lone-blocks
    console.log("paybatch", payslip_period, payrundata);
    updatePayrun({
      id: tmppayrun[0].id,
      totalpayroll: payrundata.totalpayroll,
      totalwages: payrundata.totalwages,
      totaltap: payrundata.totaltap,
      totalscp: payrundata.totalscp,
      totalallows: payrundata.totalallows,
      totaldeducts: payrundata.totaldeducts,
      totalsitesallows: payrundata.totalsiteallows,
      totalexpensesclaims: payrundata.totalexpensesclaims,
    });
    history.push("/payslip");
  };

  const handleVerifyPayslips = (e) => {
    e.preventDefault();
    setPayrundata({ ...payrundata, status: "Verified" });
    setPayrunStatus("Verified");
    // save individual payslips
    saveIndividualPayslips();
    // save payrun
    updatePayrun({
      id: payrunId,
      status: "Verified",
      totalpayroll: payrundata.totalpayroll,
      totalwages: payrundata.totalwages,
      totaltap: payrundata.totaltap,
      totalscp: payrundata.totalscp,
      totalallows: payrundata.totalallows,
      totaldeducts: payrundata.totaldeducts,
      totalsitesallows: payrundata.totalsiteallows,
      totalexpensesclaims: payrundata.totalexpensesclaims,
    });
    toast({
      title: "Batch has been verified!",
      status: "success",
    });
  };

  const handleEmpButtonClick = (index) => {
    const paydata = singlebatchpayslip[index];
    setFormdata(initial_formdata);
    setFormdata({ ...initial_formdata, ...paydata });
    setFormdata({ ...initial_formdata, ...paydata });
    setLoadFormdata(true);
  };

  const handleTabChange = (index) => {
    setTabno(index);
    if (index === 1) {
      calcPayrunTotals();
    }
    setIsShow(false);
  };

  useEffect(() => {
    if (tabno === 1) {
      setIsShow(true);
    } else {
      setIsShow(false);
    }
  }, [tabno]);

  const SentEmailModal = () => {
    return (
      <Box>
        <MaterialTable
          columns={columns}
          data={payslipsbatch}
          title="Employees"
          options={{
            filtering: false,
            search: false,
            toolbar: true,
            selection: true,
            pageSize: 10,
            headerStyle: {
              backgroundColor: "#daad86",
              color: "primary",
            },
            showTitle: true,
          }}
          components={{
            Toolbar: (props) => (
              <div>
                <MTableToolbar {...props} />
                <div style={{ padding: "5px 10px" }}>
                  <Button
                    colorScheme="blue"
                    isDisabled={payrundata.status !== "Approve" ? true : false}
                    onClick={() => handleSentEmail()}
                    leftIcon={<FiMail color="white" fontSize="1.5em" />}
                  >
                    Email
                  </Button>
                </div>
              </div>
            ),
          }}
        />
      </Box>
    );
  };

  const handleSentEmail = (data) => {
    const mth = months[payslip_period.substring(6, 7)];
    const yr = payslip_period.substring(0, 4);

    payslipsbatch.forEach((pay) => {
      if (pay.tableData.checked) {
        const { name, empid } = pay;
        const emp = employees
          .filter((r) => r.id === empid)
          .map((rec) => {
            return { ...rec };
          });

        var emaildata = {
          to_name: name,
          to_email: emp[0].email,
          message: `Your payroll for the month of ${mth} ${yr} has been transfered. Please login in to view your payslip!`,
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
      }
    });
  };

  return (
    <Flex
      marginLeft={4}
      marginTop={70}
      w="98%"
      h="100%"
      style={{ backgroundColor: "lightcyan" }}
    >
      <Grid templateRows="repeat(10,1fr)" templateColumns="repeat(1,1fr)">
        <GridItem rowSpan={1} colSpan={1}>
          <Grid templateRows="repeat(1,1fr)" templateColumns="repeat(10,1fr)">
            <GridItem rowSpan={1} colSpan={2}></GridItem>
            <GridItem rowSpan={1} colSpan={4}>
              <Box textAlign="center" alignItems="center">
                <Heading pl="10" pt={2}>
                  Payroll
                </Heading>
              </Box>
            </GridItem>
            <GridItem rowSpan={1} colSpan={4} pt={0}>
              <Box pt="2" pr={5} alignItems="right" align="right">
                <Stack spacing={4} direction="row" align="center" pl={150}>
                  <Button
                    width="800px"
                    colorScheme="blue"
                    isDisabled={
                      payrundata.status === "Verified" ||
                      payrundata.status === "Approved" ||
                      !isShow
                        ? true
                        : false
                    }
                    onClick={(e) => handleSavePayslips(e)}
                    leftIcon={<FiSave color="white" fontSize="1.5em" />}
                  >
                    Save/Exit
                  </Button>
                  <Button
                    isDisabled={!isShow}
                    width="500px"
                    colorScheme="blue"
                    onClick={(e) => handlePrintSummary(e)}
                    leftIcon={<FiSave color="white" fontSize="1.5em" />}
                  >
                    Print
                  </Button>

                  <Button
                    width="500px"
                    colorScheme="blue"
                    isDisabled={
                      payrundata.status === "Verified" ||
                      payrundata.status === "Approved" ||
                      payrundata.status === "New" ||
                      !isShow
                        ? true
                        : false
                    }
                    onClick={(e) => handleVerifyPayslips(e)}
                    leftIcon={<FiCheckCircle color="white" fontSize="1.5em" />}
                  >
                    Verify
                  </Button>
                  <Button
                    width="500px"
                    colorScheme="blue"
                    isDisabled={payrundata.status !== "Approved" ? true : false}
                    onClick={onOpen}
                    leftIcon={<FiMail color="white" fontSize="1.5em" />}
                  >
                    Email
                  </Button>
                </Stack>
              </Box>
            </GridItem>
          </Grid>
          <Divider
            style={{ border: "1px solid lightgrey" }}
            orientation="horizontal"
            colorScheme="red"
            variant="solid"
          />
        </GridItem>

        <Tabs defaultIndex={0} onChange={(index) => handleTabChange(index)}>
          <TabList marginLeft={4}>
            <Tab>
              <Box>
                <Heading size="sm">Details</Heading>
              </Box>
            </Tab>
            <Tab>
              <Box>
                <Heading size="sm">Summary</Heading>
              </Box>
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Grid
                templateRows="repeat(1,1fr)"
                templateColumns="repeat(10,1fr)"
              >
                <GridItem colSpan={2}>
                  <Box textAlign="center" p={4}>
                    <Heading size="sm" alignItems="center">
                      Employees
                    </Heading>
                  </Box>
                  <Divider backgroundColor="white" />
                  <Box h="550" border="2px solid white" backgroundColor="cyan.100" overflow="scroll">
                    {/* {payslipsbatch &&
                      payslipsbatch.map((item, index) => {
                        return (
                          <div>
                            <Button
                              className={classes.empbtn}
                              variant="outlined"
                              // ${index === value && "activebtn"}
                              onClick={(e) => {
                                setRowIndex(index);
                                handleEmpButtonClick(index);
                              }}
                            >
                              <div key={item.id}> {item.name}</div>
                            </Button>
                            <Divider
                              variant="fullWidth"
                              className={classes.divider}
                            />
                          </div>
                        );
                      })} */}
                    <Table variant="simple">
                      {/* <Thead>
                        <Tr>
                          <Th>Employees</Th>
                        </Tr>
                      </Thead> */}
                      <Tbody>
                        {payslipsbatch.map((item, index) => {
                          return (
                            <div>
                              <Button
                                //className={classes.empbtn}
                                fontSize={{
                                  base: "10px",
                                  md: "10px",
                                  lg: "12px",
                                  xl: "16px",
                                }}
                                variant="outlined"
                                height={[
                                  `${item.name.length > 30 ? "60px" : "40px"}`,
                                  "40px",
                                ]}
                                style={{
                                  whiteSpace: "normal",
                                  wordWrap: "break-word",
                                }}
                                // ${index === value && "activebtn"}
                                onClick={(e) => {
                                  setRowIndex(index);
                                  setIsStart(false);
                                  handleEmpButtonClick(index);
                                }}
                              >
                                <Text align="left">{item.name}</Text>
                              </Button>
                              <Divider backgroundColor="white" />
                            </div>
                          );
                        })}
                      </Tbody>
                    </Table>
                  </Box>
                </GridItem>
                <GridItem colSpan={8}>
                  <PayForm
                    formdata={formdata}
                    setFormdata={setFormdata}
                    loadFormdata={loadFormdata}
                    setLoadFormdata={setLoadFormdata}
                    payitems={payitems}
                    setLoadUpdatedata={setLoadUpdatedata}
                    singlebatchpayslip={singlebatchpayslip}
                    rowindex={rowindex}
                    isCalc={isCalc}
                    isStart={isStart}
                    setIsStart={setIsStart}
                    setIsCalc={setIsCalc}
                  />
                </GridItem>
              </Grid>
            </TabPanel>
            <TabPanel>
              <PaySummary
                payrundata={payrundata}
                singlebatchpayslip={singlebatchpayslip}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Grid>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          {/* <ModalHeader>Sending EMail Notifications</ModalHeader> */}
          <ModalCloseButton />
          <ModalBody>
            <SentEmailModal />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
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
    paddingTop: theme.spacing(10),
    // display: "flex",
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    border: "1px solid",
    width: "100%",
    color: "primary",
    bcakgroundColor: "white",
  },
  card: {
    backgroundColor: "white",
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
  empscenter: {
    width: "80vw",
    margin: "0 auto",
    maxWidth: "var(--max-width)",
    flexDirection: "row",
  },
  empcontainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: "4rem",
    flexWrap: "wrap",
  },
  empbtn: {
    background: "transparent",
    borderColor: "transparent",
    textTransform: "capitalize",
    fontSize: "1rem",
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
  empinfo: {
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
}));

export default Payrunbatch;
