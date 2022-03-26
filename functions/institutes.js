const formattedReturn = require("./formattedReturn");
const getInstitutes = require("./institutesTable/getInstitutes");
const createInstitute = require("./institutesTable/createInstitute");
const deleteInstitute = require("./institutesTable/deleteInstitute");
const updateInstitute = require("./institutesTable/updateInstitute");
exports.handler = async (event) => {
  if (event.httpMethod === "GET") {
    return await getInstitutes(event);
  } else if (event.httpMethod === "POST") {
    return await createInstitute(event);
  } else if (event.httpMethod === "PUT") {
    return await updateInstitute(event);
  } else if (event.httpMethod === "DELETE") {
    return await deleteInstitute(event);
  } else {
    console.log(event.httpMethod);
    return formattedReturn(405, {});
  }
};
