const { table } = require("./airtable-currency");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { id, ...fields } = JSON.parse(event.body);
  try {
    const updatedCurrency = await table.update([{ id, fields }]);
    return formattedReturn(200, updatedCurrency);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
