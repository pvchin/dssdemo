import React, { useState } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { HStack, Button, Text } from "@chakra-ui/react"
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import DashboardIcon from "@material-ui/icons/Dashboard";
import FlightIcon from "@material-ui/icons/Flight";
import PeopleIcon from "@material-ui/icons/People";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
//import LayersIcon from "@material-ui/icons/Layers";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import MoneyIcon from "@material-ui/icons/Money";
import {
  FaFileInvoiceDollar,
  FaPeopleCarry,
  FaCommentsDollar,
} from "react-icons/fa";
// import Collapse from "@material-ui/core/Collapse";
// import ExpandLess from "@material-ui/icons/ExpandLess";
// import ExpandMore from "@material-ui/icons/ExpandMore";

const drawerWidth = 0;

const MenuListItemsStaff = () => {
  const classes = useStyles();
  const [openPay, setOpenPay] = useState(false);
  const [openTable, setOpenTable] = useState(false);

  const handleClickPay = () => {
    setOpenPay(!openPay);
  };

  const handleClickTable = () => {
    setOpenTable(!openTable);
  };

  return (
    <div className={classes.content}>
      <ListSubheader align="center" className={classes.itemIcon}>
        <Text color="blue" fontSize="21" fontWeight="bold">
          Staff
        </Text>
      </ListSubheader>

      <Link to="/">
        <ListItem button>
          <ListItemIcon className={classes.itemIcon}>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText
            primary="Dashboard"
            className={classes.categoryHeaderPrimary}
          />
        </ListItem>
      </Link>

      <Link to="/assets">
        <ListItem button>
          <ListItemIcon className={classes.itemIcon}>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText
            primary="Assets Table"
            className={classes.categoryHeaderPrimary}
          />
        </ListItem>
      </Link>

      <Link to="/despatch">
        <ListItem button>
          <ListItemIcon className={classes.itemIcon}>
            <FlightIcon />
          </ListItemIcon>
          <ListItemText
            primary="Desptaching Items"
            className={classes.categoryHeaderPrimary}
          />
        </ListItem>
      </Link>
      

      <Link to="/receive">
        <ListItem button>
          <ListItemIcon className={classes.itemIcon}>
            <FaFileInvoiceDollar size="20" />
          </ListItemIcon>
          <ListItemText
            primary="Receiging Items"
            className={classes.categoryHeaderPrimary}
          />
        </ListItem>
      </Link>

      {/* <Link to="/hoc">
        <ListItem button>
          <ListItemIcon className={classes.itemIcon}>
            <FaFileInvoiceDollar size="20" />
          </ListItemIcon>
          <ListItemText
            primary="Reports"
            className={classes.categoryHeaderPrimary}
          />
        </ListItem>
      </Link> */}

      {/* <Link to="/trainings">
        <ListItem button>
          <ListItemIcon className={classes.itemIcon}>
            <FaPeopleCarry size="20" />
          </ListItemIcon>
          <ListItemText
            primary="Trainings"
            className={classes.categoryHeaderPrimary}
          />
        </ListItem>
      </Link> */}

      {/* <Link to="/dailyallowances">
        <ListItem button>
          <ListItemIcon className={classes.itemIcon}>
            <FaCommentsDollar size="20" />
          </ListItemIcon>
          <ListItemText
            primary="Site Allowances"
            className={classes.categoryHeaderPrimary}
          />
        </ListItem>
      </Link> */}

      {/* <Link to="/payslips">
        <ListItem button>
          <ListItemIcon className={classes.itemIcon}>
            <MonetizationOnIcon />
          </ListItemIcon>
          <ListItemText
            primary="Tables"
            className={classes.categoryHeaderPrimary}
          />
        </ListItem>
      </Link> */}
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  mainHeader: {
    fontSize: 24,
    color: "primary",
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  categoryHeader: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  categoryHeaderPrimary: {
    color: "primary",
  },
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  item: {
    paddingTop: 1,
    paddingBottom: 1,
    color: "primary",
    "&:hover,&:focus": {
      backgroundColor: "rgba(255, 255, 255, 0.08)",
    },
  },
  itemCategory: {
    backgroundColor: "#232f3e",
    boxShadow: "0 -1px 0 #404854 inset",
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  firebase: {
    fontSize: 24,
    color: theme.palette.common.orange,
  },
  itemActiveItem: {
    color: "primary",
  },
  itemPrimary: {
    fontSize: "inherit",
  },
  itemIcon: {
    minWidth: "auto",
    marginRight: theme.spacing(2),
    color: "primary",
  },
  divider: {
    marginTop: theme.spacing(2),
  },
}));

export default MenuListItemsStaff;
