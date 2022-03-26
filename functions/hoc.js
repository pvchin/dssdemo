const formattedReturn = require("./formattedReturn");
const getHoc = require("./hocTable/getHoc");
const createHoc = require("./hocTable/createHoc");
const deleteHoc = require("./hocTable/deleteHoc");
const updateHoc = require("./hocTable/updateHoc");
exports.handler = async (event) => {
  if (event.httpMethod === "GET") {
    return await getHoc(event);
  } else if (event.httpMethod === "POST") {
    return await createHoc(event);
  } else if (event.httpMethod === "PUT") {
    return await updateHoc(event);
  } else if (event.httpMethod === "DELETE") {
    return await deleteHoc(event);
  } else {
    console.log(event.httpMethod);
    return formattedReturn(405, {});
  }
};
