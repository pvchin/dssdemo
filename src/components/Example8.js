import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { format, addMonths, getMonth } from "date-fns";
import axios from "axios";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Stack,
} from "@chakra-ui/react";
import { employees_url } from "../utils/constants";
import Dayz from "dayz";
// could also import the sass if you have a loader at dayz/dayz.scss
import "dayz/dist/dayz.css";
import moment from "moment";

const EVENTS = new Dayz.EventsCollection([
  {
    content: "A short event",
    range: moment.range(moment("2021-09-08"), moment("2021-09-14")),
  },
  {
    content: "Have lunch with Jayden",
    range: moment.range(moment("2021-09-18"), moment("2021-09-24")),
  },
  {
    content: "A Longer Event",
    range: moment.range(moment("2021-09-22"), moment("2021-09-24")),
  },
]);

const Example = () => {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const [paydata, setPaydata] = useState([]);
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [value, setValue] = useState("2021-09-11");
  const [month, setMonth] = useState("");
  const date = moment("2021-09-11");

  const ColoredDateCellWrapper = ({ children }) =>
    React.cloneElement(React.Children.only(children), {
      style: {
        backgroundColor: "lightblue",
      },
    });

  const handleNext = () => {
    const today = new Date(value);
    const newDate = addMonths(today, 1);
    const newToday = format(newDate, "yyyy-MM-dd");
    const month = newDate.toLocaleString("default", { month: "long" });
    console.log("date", today, newDate, newToday, month);
    setValue(newToday);
    setMonth(month);
  };

  const handlePrev = () => {
    const today = new Date(value);
    const newDate = addMonths(today, -1);
    const newToday = format(newDate, "yyyy-MM-dd");
    const month = newDate.toLocaleString("default", { month: "long" });
    console.log("date", today, newDate, newToday);
    setValue(newToday);
    setMonth(month);
  };

  return (
    <Box
      display="block"
      h="600"
      w="container.xl"
      px="15"
      mt="100"
      overflow="scroll"
    >
      <HStack>
        <Box align="flex-start">
          <Button variant="solid" type="button" onClick={handlePrev}>
            Prev
          </Button>
        </Box>
        <Box pl="40%" pr="40%">
          <Heading size="md">{month}</Heading>
        </Box>
        <Box align="flex-end">
          <Button variant="solid" type="button" onClick={handleNext}>
            Next
          </Button>
        </Box>
      </HStack>
      <Dayz display="month" date={moment(value)} events={EVENTS} />
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
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
    padding: theme.spacing(10),
    // display: "flex",
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    border: "1px solid",
    width: "100%",
    color: "primary",
    bcakgroundColor: "black",
  },
  card: {
    backgroundColor: "black",
  },
  card_body: {
    padding: "0",
  },

  section: {
    width: "70vw",
    margin: "5rem auto",
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
  jobscenter: {
    width: "80vw",
    margin: "0 auto",
    maxWidth: "var(--max-width)",
    flexDirection: "row",
  },
  btncontainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: "4rem",
    flexWrap: "wrap",
  },
  jobbtn: {
    background: "transparent",
    borderColor: "transparent",
    textTransform: "capitalize",
    fontSize: "1.25rem",
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
  jobinfo: {
    fontWeight: "400",
  },

  dash_widget_icon: {
    backgroundColor: "white",
    borderRadius: "100%",
    color: "#ff9b44",
    display: "inline-block",
    float: "left",
    fontSize: "30px",
    height: "60px",
    lineHeight: "60px",
    marginRight: "10px",
    textAlign: "center",
    width: "60px",
  },
  dash_widget_info: {
    textAlign: "right",
  },
}));

export default Example;
