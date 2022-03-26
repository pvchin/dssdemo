const formattedReturn = require("./formattedReturn");
const getHoclookup = require("./hoclookupTable/getHoclookup");
const createHoclookup = require("./hoclookupTable/createHoclookup");
const deleteHoclookup = require("./hoclookupTable/deleteHoclookup");
const updateHoclookup = require("./hoclookupTable/updateHoclookup");
exports.handler = async (event) => {
  if (event.httpMethod === "GET") {
    return await getHoclookup(event);
  } else if (event.httpMethod === "POST") {
    return await createHoclookup(event);
  } else if (event.httpMethod === "PUT") {
    return await updateHoclookup(event);
  } else if (event.httpMethod === "DELETE") {
    return await deleteHoclookup(event);
  } else {
    console.log(event.httpMethod);
    return formattedReturn(405, {});
  }
};
