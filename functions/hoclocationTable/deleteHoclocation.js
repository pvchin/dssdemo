const { table } = require("./airtable-hoclocation");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { id } = JSON.parse(event.body);
  try {
    const deletedHocLocation = await table.destroy(id);
    return formattedReturn(200, deletedHocLocation);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
