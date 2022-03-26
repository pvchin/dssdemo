import React from "react";
import * as emailjs from "emailjs-com";
import { useCustomToast } from "../helpers/useCustomToast";

const SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICEID;
const TEMPLATE_ID = "template_1y8odlq";
const USER_ID = process.env.REACT_APP_EMAILJS_USERID;

const EmailSent = ({ setEmailStatus }) => {

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
};

export default EmailSent;
