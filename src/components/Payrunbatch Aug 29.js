import React, { useState, useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Heading, Text } from "@chakra-ui/react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { useHistory } from "react-router-dom";
import { useCustomToast } from "../helpers/useCustomToast";
import {
  Button,
  ButtonGroup,
  Paper,
  Grid,
  Icon,
  Divider,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import PayForm from "./PayForm";
import PaySummary from "./PaySummary";
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

const Payrunbatch = () => {
  let history = useHistory();
  const classes = useStyles();
  const toast = useCustomToast();
  const componentRef = useRef();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  //const { register, handleSubmit, control, setValue, reset, watch } = useForm();

  const {
    payrun,
    getSingleBatchPayslip,
    //singlebatchpayslip,
    payslip_period,
    //updatePayslip,
    updatePayrun,
    singlebatch_payslip_loading,
    singlebatch_payslip_error,
  } = usePayslipsContext();
  const { payslipsbatch, psbpayrunId, setPSBPayrunId } = usePayslipsBatch();
  const updatePayslip = useUpdatePayslips();
  const { loadPayitems, payitems } = useTablesContext();
  const [payrundata, setPayrundata] = useRecoilState(payrunState);
  const [payrunId, setPayrunId] = useRecoilState(payrunIdState);
  const [payrunstatus, setPayrunStatus] = useRecoilState(payrunStatusState);
  const [loadFormdata, setLoadFormdata] = useState(false);
  const [loadUpdatedata, setLoadUpdatedata] = useState(false);
  const [formdata, setFormdata] = useState([]);
  const [rowindex, setRowIndex] = useState(0);
  const [emponclick, setEmponclick] = useState(false);
  const [showSumm, setShowSumm] = useState(false);
  const [isCalc, setIsCalc] = useState(false);
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
    setIsCalc(true);
  }, [psbpayrunId]);

  useEffect(() => {
    calcPayrunTotals();
    setIsCalc(false);
  }, [isCalc]);

  const handleShowSumm = (e) => {
    e.preventDefault();
    setShowSumm(!showSumm);
  };

  const handlePrintSummary = (e) => {
    e.preventDefault();
  };

  const handleSavePayslips = (e) => {
    e.preventDefault();
    // eslint-disable-next-line no-lone-blocks
    {
      singlebatchpayslip.forEach((rec) => {
        const { id, rec_id, tableData, ...fields } = rec;
        updatePayslip({ id, ...fields });
      });
    }
    //update payrun
    handleSavePayrun();
    toast({
      title: "Changes have been saved!",
      status: "success",
    });
  };

  const calcPayrunTotals = () => {
    if (!psbpayrunId) {
      return null;
    }
    console.log("calc", singlebatchpayslip);
    const totalpayroll = singlebatchpayslip.reduce((acc, item) => {
      const value = isNaN(item.nett_pay_bnd) ? 0 : item.nett_pay_bnd;
      return acc + Math.round((value + Number.EPSILON) * 100) / 100;
    }, 0);
    const totalwages = singlebatchpayslip.reduce((acc, item, index) => {
      const value = isNaN(item.wages_bnd) ? 0 : item.wages_bnd;
      return acc + Math.round((value + Number.EPSILON) * 100) / 100;
    }, 0);
    const totaltap = singlebatchpayslip.reduce((acc, item) => {
      const value = isNaN(item.tap_amount_bnd) ? 0 : item.tap_amount_bnd;
      return acc + Math.round((value + Number.EPSILON) * 100) / 100;
    }, 0);

    const totalscp = singlebatchpayslip.reduce((acc, item) => {
      const value = isNaN(item.scp_amount_bnd) ? 0 : item.scp_amount_bnd;
      return acc + Math.round((value + Number.EPSILON) * 100) / 100;
    }, 0);

    const totalallows = singlebatchpayslip.reduce((acc, item) => {
      const value = isNaN(item.total_allowances_bnd)
        ? 0
        : item.total_allowances_bnd;
      return acc + Math.round((value + Number.EPSILON) * 100) / 100;
    }, 0);

    const totaldeducts = singlebatchpayslip.reduce((acc, item) => {
      const value = isNaN(item.total_deductions_bnd)
        ? 0
        : item.total_deductions_bnd;
      return acc + Math.round((value + Number.EPSILON) * 100) / 100;
    }, 0);

    const totalsiteallows = singlebatchpayslip.reduce((acc, item) => {
      const value = isNaN(item.site_allows_bnd) ? 0 : item.site_allows_bnd;
      return acc + Math.round((value + Number.EPSILON) * 100) / 100;
    }, 0);

    const totalexpensesclaims = singlebatchpayslip.reduce((acc, item) => {
      const value = isNaN(item.expenses_claims_bnd)
        ? 0
        : item.expenses_claims_bnd;
      return acc + Math.round((value + Number.EPSILON) * 100) / 100;
    }, 0);

    //console.log("total", totalwages);
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
    // eslint-disable-next-line no-lone-blocks
    updatePayrun({
      id: payrunId,
      totalpayroll: payrundata.totalpayroll,
      totalwages: payrundata.totalwages,
      totaltap: payrundata.totaltap,
      totalscp: payrundata.totalscp,
      totalallows: payrundata.totalallows,
      totaldeducts: payrundata.totaldeducts,
      totalsitesallows: payrundata.totalsitesallows,
      totalexpensesclaims: payrundata.totalexpensesclaims,
    });
  };

  const handleVerifyPayslips = (e) => {
    e.preventDefault();
    setPayrunStatus("Verified");
    updatePayrun({ id: payrunId, status: "Verified" });
    toast({
      title: "Batch has been verified!",
      status: "success",
    });
  };

  const handleEmpButtonClick = (index) => {
    const paydata = singlebatchpayslip[index];
    setFormdata({ ...paydata });
    setFormdata({ ...paydata });
    setLoadFormdata(true);
  };

  // if (singlebatch_payslip_loading) {
  //   return (
  //     <Paper className={fixedHeightPaper} style={{ backgroundColor: "black" }}>
  //       <div>
  //         <h2>Loading...Payslips</h2>
  //       </div>
  //     </Paper>
  //   );
  // }

  // if (singlebatch_payslip_error) {
  //   return (
  //     <Paper className={fixedHeightPaper} style={{ backgroundColor: "black" }}>
  //       <div>
  //         <h2>Internet connection problem!</h2>
  //       </div>
  //     </Paper>
  //   );
  // }

  return (
    <Paper
      className={fixedHeightPaper}
      style={{ backgroundColor: "lightcyan" }}
    >
      <section className={classes.section}>
        <Grid container direction="row" style={{ border: "1px solid black" }}>
          <Grid
            item
            sm={2}
            align="center"
            style={{ border: "1px solid black" }}
          >
            <Heading as="h4" size="md">
              Employees
            </Heading>
          </Grid>
          <Grid item sm={10} style={{ border: "1px solid black" }}>
            <div
              style={{
                marginLeft: 14,
                display: "inline-flex",
                flexDirection: "row",
              }}
            >
              <div
                style={{
                  marginLeft: 14,
                  display: "inline-flex",
                  flexDirection: "row",
                }}
              >
                <Heading as="h4" size="md">
                  Payroll Details
                </Heading>
              </div>

              <div style={{ marginTop: 10, marginLeft: 20 }}></div>
            </div>
          </Grid>
          <Grid
            item
            sm={2}
            align="center"
            style={{ border: "1px solid black" }}
          >
            <div>
              {payslipsbatch &&
                payslipsbatch.map((item, index) => {
                  return (
                    <div>
                      <Button
                        className={classes.empbtn}
                        name="empButton"
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
                })}
            </div>
          </Grid>
          <Grid
            item
            sm={10}
            align="center"
            style={{ border: "1px solid black" }}
          >
            <Grid
              container
              direction="row"
              style={{ border: "1px solid black" }}
            >
              <Grid
                item
                sm={12}
                align="left"
                style={{ border: "1px solid black" }}
              >
                <div style={{ padding: 5 }}>
                  <ButtonGroup
                    color="primary"
                    aria-label="outlined primary button group"
                  >
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      onClick={(e) => handleShowSumm(e)}
                      style={{ marginLeft: 10 }}
                    >
                      Details <Icon className={classes.rightIcon}>send</Icon>
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      onClick={(e) => handleShowSumm(e)}
                      className={classes.button}
                      style={{ marginLeft: 10 }}
                    >
                      Summary <Icon className={classes.rightIcon}>send</Icon>
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      style={{ marginLeft: 5 }}
                      onClick={(e) => handleSavePayslips(e)}
                    >
                      Save <Icon className={classes.rightIcon}>send</Icon>
                    </Button>
                    {/* <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      style={{ marginLeft: 5 }}
                      onClick={(e) => handlePrintSummary(e)}
                    >
                      Print <Icon className={classes.rightIcon}>send</Icon>
                    </Button> */}
                    {payrunId && (
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        style={{ marginLeft: 5 }}
                        onClick={(e) => handleVerifyPayslips(e)}
                      >
                        Verify <Icon className={classes.rightIcon}>send</Icon>
                      </Button>
                    )}
                  </ButtonGroup>
                </div>
              </Grid>
            </Grid>
            {!showSumm && (
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
                setIsCalc={setIsCalc}
              />
            )}
            {showSumm && (
              <PaySummary
                payrundata={payrundata}
                singlebatchpayslip={singlebatchpayslip}
              />
            )}
          </Grid>
        </Grid>
      </section>
    </Paper>
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
