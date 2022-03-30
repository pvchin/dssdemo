const formattedReturn = require("./formattedReturn");
const getSamples = require("./samplesTable/getSamples");
const createdSample = require("./samplesTable/createSample");
const deleteSample = require("./samplesTable/deleteSample");
const updateSample = require("./samplesTable/updateSample");
exports.handler = async (event) => {
  if (event.httpMethod === "GET") {
    return await getSamples(event);
  } else if (event.httpMethod === "POST") {
    return await createdSample(event);
  } else if (event.httpMethod === "PUT") {
    return await updateSample(event);
  } else if (event.httpMethod === "DELETE") {
    return await deleteSample(event);
  } else {
    console.log(event.httpMethod);
    return formattedReturn(405, {});
  }
};
