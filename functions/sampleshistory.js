const formattedReturn = require("./formattedReturn");
const getSampleshistory = require("./sampleshistoryTable/getSampleshistory");
const createdSamplehistory = require("./sampleshistoryTable/createSampleshistory");
const deleteSamplehistory = require("./sampleshistoryTable/deleteSampleshistory");
const updateSamplehistory = require("./sampleshistoryTable/updateSampleshistory");
exports.handler = async (event) => {
  if (event.httpMethod === "GET") {
    return await getSampleshistory(event);
  } else if (event.httpMethod === "POST") {
    return await createdSamplehistory(event);
  } else if (event.httpMethod === "PUT") {
    return await updateSamplehistory(event);
  } else if (event.httpMethod === "DELETE") {
    return await deleteSamplehistory(event);
  } else {
    console.log(event.httpMethod);
    return formattedReturn(405, {});
  }
};
