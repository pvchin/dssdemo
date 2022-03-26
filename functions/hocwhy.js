const formattedReturn = require("./formattedReturn");
const getHocwhy = require("./hocwhyTable/getHocwhy");
const createHocwhy = require("./hocwhyTable/createHocwhy");
const deleteHocwhy = require("./hocwhyTable/deleteHocwhy");
const updateHocwhy = require("./hocwhyTable/updateHocwhy");
exports.handler = async (event) => {
  if (event.httpMethod === "GET") {
    return await getHocwhy(event);
  } else if (event.httpMethod === "POST") {
    return await createHocwhy(event);
  } else if (event.httpMethod === "PUT") {
    return await updateHocwhy(event);
  } else if (event.httpMethod === "DELETE") {
    return await deleteHocwhy(event);
  } else {
    console.log(event.httpMethod);
    return formattedReturn(405, {});
  }
};
