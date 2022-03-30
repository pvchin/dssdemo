import React, { useState } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Text } from "@chakra-ui/react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import DashboardIcon from "@material-ui/icons/Dashboard";
import FlightIcon from "@material-ui/icons/Flight";
import PeopleIcon from "@material-ui/icons/People";
import LayersIcon from "@material-ui/icons/Layers";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import MoneyIcon from "@material-ui/icons/Money";
import {
  FaFileInvoiceDollar,
  FaPeopleCarry,
  FaCommentsDollar,
} from "react-icons/fa";
import { List } from "@material-ui/core";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

const MenuListItems = () => {
  const classes = useStyles();
  const [openItem, setOpenItem] = useState(false);
  const [openItemTable, setOpenItemTable] = useState(false);
  const [openAsset, setOpenAsset] = useState(false);
  const [openAssetTable, setOpenAssetTable] = useState(false);
  const [openSample, setOpenSample] = useState(false);
  const [openSampleTable, setOpenSampleTable] = useState(false);

  const handleClickItem = () => {
    setOpenItem(!openItem);
  };

  const handleClickItemTable = () => {
    setOpenItemTable(!openItemTable);
  };

  const handleClickAsset = () => {
    setOpenAsset(!openAsset);
  };

  const handleClickAssetTable = () => {
    setOpenAssetTable(!openAssetTable);
  };

  const handleClickSample = () => {
    setOpenSample(!openSample);
  };

  const handleClickSampleTable = () => {
    setOpenSampleTable(!openSampleTable);
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

      {/* <Link to="/allemployees">
        <ListItem button>
          <ListItemIcon className={classes.itemIcon}>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText
            primary="All Employees"
            className={classes.categoryHeaderPrimary}
          />
        </ListItem>
      </Link> */}

      {/* <Link to="/leave">
        <ListItem button>
          <ListItemIcon className={classes.itemIcon}>
            <FlightIcon />
          </ListItemIcon>
          <ListItemText
            primary="Leave"
            className={classes.categoryHeaderPrimary}
          />
        </ListItem>
      </Link> */}
      <ListItem button onClick={handleClickItemTable}>
        <ListItemIcon className={classes.itemIcon}>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="Items" className={classes.item} />
        {openItemTable ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={openItemTable} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Link to="/items">
            <ListItem button className={classes.nested}>
              <ListItemIcon></ListItemIcon>
              <ListItemText primary="Items Table" className={classes.item} />
            </ListItem>
          </Link>
        </List>
      </Collapse>

      <ListItem button onClick={handleClickAssetTable}>
        <ListItemIcon className={classes.itemIcon}>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="Assets" className={classes.item} />
        {openAssetTable ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={openAssetTable} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Link to="/assets">
            <ListItem button className={classes.nested}>
              <ListItemIcon></ListItemIcon>
              <ListItemText primary="Assets Table" className={classes.item} />
            </ListItem>
          </Link>
          <Link to="/despatch">
            <ListItem button className={classes.nested}>
              <ListItemIcon></ListItemIcon>
              <ListItemText
                primary="Despatching Assets"
                className={classes.item}
              />
            </ListItem>
          </Link>
        </List>
      </Collapse>

      <ListItem button onClick={handleClickSampleTable}>
        <ListItemIcon className={classes.itemIcon}>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="Sampless" className={classes.item} />
        {openSampleTable ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={openSampleTable} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Link to="/samples">
            <ListItem button className={classes.nested}>
              <ListItemIcon></ListItemIcon>
              <ListItemText primary="Samples Table" className={classes.item} />
            </ListItem>
          </Link>
          {/* <Link to="/receive">
            <ListItem button className={classes.nested}>
              <ListItemIcon></ListItemIcon>
              <ListItemText
                primary="Receiving Samples"
                className={classes.item}
              />
            </ListItem>
          </Link> */}
        </List>
      </Collapse>

      {/* <Link to="/expenses">
        <ListItem button>
          <ListItemIcon className={classes.itemIcon}>
            <ShoppingCartIcon />
          </ListItemIcon>
          <ListItemText
            primary="Expenses"
            className={classes.categoryHeaderPrimary}
          />
        </ListItem>
      </Link> */}

      {/* <Link to="/tables">
        <ListItem button>
          <ListItemIcon className={classes.itemIcon}>
            <LayersIcon />
          </ListItemIcon>
          <ListItemText
            primary="Tables"
            className={classes.categoryHeaderPrimary}
          />
        </ListItem>
      </Link> */}

      {/* <Link to="/example">
        <ListItem button>
          <ListItemIcon className={classes.itemIcon}>
            <LayersIcon />
          </ListItemIcon>
          <ListItemText
            primary="Example"
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

export default MenuListItems;
