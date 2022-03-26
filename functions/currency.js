const formattedReturn = require("./formattedReturn");
const getCurrency = require("./currencyTable/getCurrency");
const createdCurrency = require("./currencyTable/createCurrency");
const deleteCurrency = require("./currencyTable/deleteCurrency");
const updateCurrency = require("./currencyTable/updateCurrency");
exports.handler = async (event) => {
  if (event.httpMethod === "GET") {
    return await getCurrency(event);
  } else if (event.httpMethod === "POST") {
    return await createdCurrency(event);
  } else if (event.httpMethod === "PUT") {
    return await updateCurrency(event);
  } else if (event.httpMethod === "DELETE") {
    return await deleteCurrency(event);
  } else {
    console.log(event.httpMethod);
    return formattedReturn(405, {});
  }
};
