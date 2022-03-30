const formattedReturn = require("./formattedReturn");
const getAssetshistory = require("./assetshistoryTable/getAssetshistory");
const createdAssethistory = require("./assetshistoryTable/createAssetshistory");
const deleteAssethistory = require("./assetshistoryTable/deleteAssetshistory");
const updateAssethistory = require("./assetshistoryTable/updateAssetshistory");
exports.handler = async (event) => {
  if (event.httpMethod === "GET") {
    return await getAssetshistory(event);
  } else if (event.httpMethod === "POST") {
    return await createdAssethistory(event);
  } else if (event.httpMethod === "PUT") {
    return await updateAssethistory(event);
  } else if (event.httpMethod === "DELETE") {
    return await deleteAssethistory(event);
  } else {
    console.log(event.httpMethod);
    return formattedReturn(405, {});
  }
};
