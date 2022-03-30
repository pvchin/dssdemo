const formattedReturn = require("./formattedReturn");
const getAssets = require("./assetsTable/getAssets");
const createdAsset = require("./assetsTable/createAsset");
const deleteAsset = require("./assetsTable/deleteAsset");
const updateAsset = require("./assetsTable/updateAsset");
exports.handler = async (event) => {
  if (event.httpMethod === "GET") {
    return await getAssets(event);
  } else if (event.httpMethod === "POST") {
    return await createdAsset(event);
  } else if (event.httpMethod === "PUT") {
    return await updateAsset(event);
  } else if (event.httpMethod === "DELETE") {
    return await deleteAsset(event);
  } else {
    console.log(event.httpMethod);
    return formattedReturn(405, {});
  }
};
