const { table } = require("./airtable-itemshistory");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { id } = JSON.parse(event.body);
  try {
    const deletedItemhistory = await table.destroy(id);
    return formattedReturn(200, deletedItemhistory);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
