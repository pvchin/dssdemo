const { table } = require("./airtable-items");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { id, ...fields } = JSON.parse(event.body);
  try {
    const updatedItem = await table.update([{ id, fields }]);
    return formattedReturn(200, updatedItem);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
