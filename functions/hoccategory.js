const formattedReturn = require("./formattedReturn");
const getHoccategory = require("./hoccategoryTable/getHoccategory");
const createHoccategory = require("./hoccategoryTable/createHoccategory");
const deleteHoccategory = require("./hoccategoryTable/deleteHoccategory");
const updateHoccategory = require("./hoccategoryTable/updateHoccategory");
exports.handler = async (event) => {
  if (event.httpMethod === "GET") {
    return await getHoccategory(event);
  } else if (event.httpMethod === "POST") {
    return await createHoccategory(event);
  } else if (event.httpMethod === "PUT") {
    return await updateHoccategory(event);
  } else if (event.httpMethod === "DELETE") {
    return await deleteHoccategory(event);
  } else {
    console.log(event.httpMethod);
    return formattedReturn(405, {});
  }
};
