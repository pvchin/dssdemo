const { table } = require("./airtable-currency");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { ...fields } = JSON.parse(event.body);
  try {
    const createdCurrency = await table.create([{ fields }]);
    return formattedReturn(200, createdCurrency);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
