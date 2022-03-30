import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory, Link } from "react-router-dom";
import { Button, Heading, HStack, Text, Tooltip } from "@chakra-ui/react";
import Toolbar from "@material-ui/core/Toolbar";
//import Tooltip from "@material-ui/core/Tooltip";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ExitToApplication from "@material-ui/icons/ExitToApp";
import Badge from "@material-ui/core/Badge";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { useRecoilState } from "recoil";
import { loginLevelState } from "./data/atomdata";
import { useUser } from "./user/useUser";
import App from "../utils/firebase";

const drawerWidth = 240;

const Appbanner = ({
  handleDrawerOpen,
  handleDrawerClose,
  handleSelect,
  open,
  title,
}) => {
  let history = useHistory();
  const classes = useStyles();
  const { user, clearUser } = useUser();
  const [loginLevel, setLoginLevel] = useRecoilState(loginLevelState);

  const handleExit = (e) => {
    e.preventDefault();
    setLoginLevel({ ...loginLevel, login: false });
    clearUser();
    App.auth().signOut();
    history.push("/");
  };

  return (
    <AppBar
      position="absolute"
      className={clsx(classes.appBar, open && classes.appBarShift)}
    >
      <Toolbar className={classes.toolbar}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          className={classes.title}
        >
          {title}
        </Typography>
        {/* <Heading size="md">
          {title}
        </Heading> */}
        <HStack justifyContent="flex-start" px={2}>
          <Button
            colorScheme="white"
            aria-label="Staff"
            onClick={() => {
              history.push("/");
              handleSelect("Staff");
            }}
          >
            <Heading size="sm">Staff</Heading>
          </Button>
          {/* {loginLevel.loginRole > 1 && loginLevel.loginRole !== 3 && (
            <Button
              colorScheme="white"
              aria-label="Admin"
              onClick={() => {
                history.push("/");
                handleSelect("Admin");
              }}
            >
              <Heading size="sm">Admin</Heading>
            </Button>
          )} */}
          {/* {loginLevel.loginRole > 2 && (
            <Button
              colorScheme="white"
              aria-label="Ops Supervisor"
              onClick={() => {
                history.push("/");
                handleSelect("OpsSpvr");
              }}
            >
              <Heading size="sm">Ops Supervisor</Heading>
            </Button>
          )} */}
          {/* {loginLevel.loginRole > 3 && (
            <Button
              colorScheme="white"
              aria-label="Admin Manager"
              onClick={() => {
                history.push("/");
                handleSelect("AdminManager");
              }}
            >
              <Heading size="sm">Admin Manager</Heading>
            </Button>
          )} */}
          {loginLevel.loginRole > 4 && (
            <Button
              colorScheme="white"
              aria-label="Manager"
              onClick={() => {
                history.push("/");
                handleSelect("Manager");
              }}
            >
              <Heading size="sm">Manager</Heading>
            </Button>
          )}
          {loginLevel.loginRole > 5 && (
            <Button
              colorScheme="white"
              aria-label="Director"
              onClick={() => {
                history.push("/");
                handleSelect("Director");
              }}
            >
              <Heading size="sm">Director</Heading>
            </Button>
          )}
        </HStack>
        <HStack>
          {/* <Text fontSize="18"> */}
          {loginLevel.loginUser && (
            <Heading size="sm">{loginLevel.loginEmail}!</Heading>
          )}
          {/* </Text> */}
        </HStack>
        {/* <IconButton color="inherit">
          <Badge badgeContent={0} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton> */}

        <Tooltip label="Logout">
          <IconButton color="inherit" onClick={(e) => handleExit(e)}>
            <ExitToApplication />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
}));

export default Appbanner;
