const formattedReturn = require("./formattedReturn");
const getItemshistory = require("./itemshistoryTable/getItemshistory");
const createdItemhistory = require("./itemshistoryTable/createItemshistory");
const deleteItemhistory = require("./itemshistoryTable/deleteItemshistory");
const updateItemhistory = require("./itemshistoryTable/updateItemshistory");
exports.handler = async (event) => {
  if (event.httpMethod === "GET") {
    return await getItemshistory(event);
  } else if (event.httpMethod === "POST") {
    return await createdItemhistory(event);
  } else if (event.httpMethod === "PUT") {
    return await updateItemhistory(event);
  } else if (event.httpMethod === "DELETE") {
    return await deleteItemhistory(event);
  } else {
    console.log(event.httpMethod);
    return formattedReturn(405, {});
  }
};
