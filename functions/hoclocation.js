const formattedReturn = require("./formattedReturn");
const getHoclocation = require("./hoclocationTable/getHoclocation");
const createHoclocation = require("./hoclocationTable/createHoclocation");
const deleteHoclocation = require("./hoclocationTable/deleteHoclocation");
const updateHoclocation = require("./hoclocationTable/updateHoclocation");
exports.handler = async (event) => {
  if (event.httpMethod === "GET") {
    return await getHoclocation(event);
  } else if (event.httpMethod === "POST") {
    return await createHoclocation(event);
  } else if (event.httpMethod === "PUT") {
    return await updateHoclocation(event);
  } else if (event.httpMethod === "DELETE") {
    return await deleteHoclocation(event);
  } else {
    console.log(event.httpMethod);
    return formattedReturn(405, {});
  }
};
