const { table } = require("./airtable-currency");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { id } = JSON.parse(event.body);
  try {
    const deletedCurrency = await table.destroy(id);
    return formattedReturn(200, deletedCurrency);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
