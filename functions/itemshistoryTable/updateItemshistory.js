const { table } = require("./airtable-itemshistory");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { id, ...fields } = JSON.parse(event.body);
  try {
    const updatedItemhistory = await table.update([{ id, fields }]);
    return formattedReturn(200, updatedItemhistory);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
