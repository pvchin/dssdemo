const formattedReturn = require("./formattedReturn");
const getYearendleavebal = require("./yearendleavebalTable/getYearendleavebal");
const createYearendleavebal = require("./yearendleavebalTable/createYearendleavebal");
const deleteYearendleavebal = require("./yearendleavebalTable/deleteYearendleavebal");
const updateYearendleavebal = require("./yearendleavebalTable/updateYearendleavebal");
exports.handler = async (event) => {
  if (event.httpMethod === "GET") {
    return await getYearendleavebal(event);
  } else if (event.httpMethod === "POST") {
    return await createYearendleavebal(event);
  } else if (event.httpMethod === "PUT") {
    return await updateYearendleavebal(event);
  } else if (event.httpMethod === "DELETE") {
    return await deleteYearendleavebal(event);
  } else {
    console.log(event.httpMethod);
    return formattedReturn(405, {});
  }
};
