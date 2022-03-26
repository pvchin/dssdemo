import React, { useState, useEffect, useMemo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useCustomToast } from "../helpers/useCustomToast";
//import { useTable } from "react-table";
import ReactWhatsapp from "react-whatsapp";
import * as emailjs from "emailjs-com";
import axios from "axios";
import clsx from "clsx";
import Table from "../helpers/TableContainer";
import { Box, Image } from "@chakra-ui/react";
import Paper from "@material-ui/core/Paper";
import { Cloudinary, Transformation } from "@cloudinary/base";
import {
  //Image,
  AdvancedImage,
  accessibility,
  responsive,
} from "@cloudinary/react";
// Import required actions.
import { thumbnail, scale } from "@cloudinary/base/actions/resize";
import { byRadius } from "@cloudinary/base/actions/roundCorners";
import { sepia } from "@cloudinary/base/actions/effect";
import { source } from "@cloudinary/base/actions/overlay";
import { opacity, brightness } from "@cloudinary/base/actions/adjust";
import { byAngle } from "@cloudinary/base/actions/rotate";
import { format } from "@cloudinary/base/actions/delivery";
// Import required qualifiers.
import { face } from "@cloudinary/base/qualifiers/focusOn";
import { focusOn } from "@cloudinary/base/qualifiers/gravity";
import { image } from "@cloudinary/base/qualifiers/source";
import { Position } from "@cloudinary/base/qualifiers/position";
import { southEast } from "@cloudinary/base/qualifiers/compass";
import { compass } from "@cloudinary/base/qualifiers/gravity";
import { png } from "@cloudinary/base/qualifiers/format";

const drawerWidth = 240;
const SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICEID;
const TEMPLATE_ID = "template_1y8odlq";
const USER_ID = process.env.REACT_APP_EMAILJS_USERID;

const Example = () => {
  const classes = useStyles();
  const toast = useCustomToast();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const [data, setData] = useState([]);
  const myCld = new Cloudinary({ cloudName: "dlmzwvakr" });
  const myImage = myCld.image("sample");
  const [emailstatus, setEmailStatus] = useState("");

  useEffect(() => {
    axios("http://api.tvmaze.com/search/shows?q=girls")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // Apply the transformation.
  myImage
    .resize(thumbnail().width(150).height(150).gravity(focusOn(face()))) // Crop the image.
    .roundCorners(byRadius(20)) // Round the corners.
    .effect(sepia()) // Apply a sepia effect.
    .overlay(
      // Overlay the Cloudinary logo.
      source(
        image("cloudinary_icon_blue").transformation(
          new Transformation()
            .resize(scale(50)) // Resize the logo.
            .adjust(opacity(60)) // Adjust the opacity of the logo.
            .adjust(brightness(200))
        ) // Adjust the brightness of the logo.
      ).position(
        new Position().gravity(compass(southEast())).offsetX(5).offsetY(5)
      ) // Position the logo.
    )
    .rotate(byAngle(10)) // Rotate the result.
    .delivery(format(png())); // Deliver as PNG. */

  const columns = useMemo(() => [
    {
      Header: "TV Show",
      columns: [
        {
          Header: "Name",
          accessor: "show.name",
        },
        {
          Header: "Language",
          accessor: "show.language",
        },
        {
          Header: "Official Site",
          accessor: "show.officialSite",
          Cell: ({ cell: { value } }) =>
            value ? <a href={value}>{value}</a> : "-",
        },
        {
          Header: "Status",
          accessor: "show.status",
        },
        {
          Header: "Premiered",
          accessor: "show.premiered",
          Cell: ({ cell: { value } }) => value || "-",
        },
        {
          Header: "Time",
          accessor: "show.schedule.time",
          Cell: ({ cell: { value } }) => value || "-",
        },
      ],
    },
  ]);

  const handleButtonClick = () => {
    var data = {
      to_name: "pvchin",
      to_email: "pvchinbn@gmail.com",
      message: "This is a reminder!!",
      cc_to: "pvchinbn@yahoo.com",
    };

    emailjs.send(SERVICE_ID, TEMPLATE_ID, data, USER_ID).then(
      function (response) {
        console.log(response.status, response.text);
        setEmailStatus("success");
        
      },
      function (err) {
        console.log(err);
        setEmailStatus("failure");
      }
    );
    console.log("email", emailstatus)
    if (emailstatus === "success") {
       toast({
         title: "Invalid email or password!",
         status: "warning",
       });
    } 
  };

  return (
    <paper className={fixedHeightPaper} style={{ backgroundColor: "white" }}>
      <section className={classes.section}>
        {/* <Image
          cloudName="dlmzwvakr"
          secure="true"
          upload_preset="advtrade"
          publicId="smartsecurity-ss3_d21ecw.jpg"
        >
          <Transformation
            width="400"
            height="250"
            gravity="face"
            crop="thumb"
          />
        </Image> */}
        {/* <div>
          <AdvancedImage cldImg={myImage} />
        </div>{" "} */}

        <Image
          boxSize="200px"
          src="https://res.cloudinary.com/dlmzwvakr/image/upload/v1626538637/advtrade/smartsecurity-ss3_d21ecw.jpg"
          alt="Dan Abramov"
        />
        <div className="App">
          <h1>
            <center>React Table Demo</center>
          </h1>
          <Table columns={columns} data={data} />
          <button onClick={handleButtonClick}>Send Email</button>
        </div>
      </section>
    </paper>
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
  section: {
    width: "90vw",
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
}));

export default Example;
