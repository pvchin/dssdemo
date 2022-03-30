const { table } = require("./airtable-items");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { ...fields } = JSON.parse(event.body);
  try {
    const createdItem = await table.create([{ fields }]);
    return formattedReturn(200, createdItem);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
