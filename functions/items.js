const formattedReturn = require("./formattedReturn");
const getItems = require("./itemsTable/getItems");
const createdItem = require("./itemsTable/createItem");
const deleteItem = require("./itemsTable/deleteItem");
const updateItem = require("./itemsTable/updateItem");
exports.handler = async (event) => {
  if (event.httpMethod === "GET") {
    return await getItems(event);
  } else if (event.httpMethod === "POST") {
    return await createdItem(event);
  } else if (event.httpMethod === "PUT") {
    return await updateItem(event);
  } else if (event.httpMethod === "DELETE") {
    return await deleteItem(event);
  } else {
    console.log(event.httpMethod);
    return formattedReturn(405, {});
  }
};
