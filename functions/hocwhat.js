const formattedReturn = require("./formattedReturn");
const getHocwhat = require("./hocwhatTable/getHocwhat");
const createHocwhat = require("./hocwhatTable/createHocwhat");
const deleteHocwhat = require("./hocwhatTable/deleteHocwhat");
const updateHocwhat = require("./hocwhatTable/updateHocwhat");
exports.handler = async (event) => {
  if (event.httpMethod === "GET") {
    return await getHocwhat(event);
  } else if (event.httpMethod === "POST") {
    return await createHocwhat(event);
  } else if (event.httpMethod === "PUT") {
    return await updateHocwhat(event);
  } else if (event.httpMethod === "DELETE") {
    return await deleteHocwhat(event);
  } else {
    console.log(event.httpMethod);
    return formattedReturn(405, {});
  }
};
