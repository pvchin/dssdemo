const formattedReturn = require("./formattedReturn");
const getHocwhydetails = require("./hocwhydetailsTable/getHocwhydetails");
const createHocwhydetails = require("./hocwhydetailsTable/createHocwhydetails");
const deleteHocwhydetails = require("./hocwhydetailsTable/deleteHocwhydetails");
const updateHocwhydetails = require("./hocwhydetailsTable/updateHocwhydetails");
exports.handler = async (event) => {
  if (event.httpMethod === "GET") {
    return await getHocwhydetails(event);
  } else if (event.httpMethod === "POST") {
    return await createHocwhydetails(event);
  } else if (event.httpMethod === "PUT") {
    return await updateHocwhydetails(event);
  } else if (event.httpMethod === "DELETE") {
    return await deleteHocwhydetails(event);
  } else {
    console.log(event.httpMethod);
    return formattedReturn(405, {});
  }
};
