const formattedReturn = require("./formattedReturn");
const getHocwhatdetails = require("./hocwhatdetailsTable/getHocwhatdetails");
const createHocwhatdetails = require("./hocwhatdetailsTable/createHocwhatdetails");
const deleteHocwhatdetails = require("./hocwhatdetailsTable/deleteHocwhatdetails");
const updateHocwhatdetails = require("./hocwhatdetailsTable/updateHocwhatdetails");
exports.handler = async (event) => {
  if (event.httpMethod === "GET") {
    return await getHocwhatdetails(event);
  } else if (event.httpMethod === "POST") {
    return await createHocwhatdetails(event);
  } else if (event.httpMethod === "PUT") {
    return await updateHocwhatdetails(event);
  } else if (event.httpMethod === "DELETE") {
    return await deleteHocwhatdetails(event);
  } else {
    console.log(event.httpMethod);
    return formattedReturn(405, {});
  }
};
