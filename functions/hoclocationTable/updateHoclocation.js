const { table } = require("./airtable-hoclocation");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { id, rec_id, ...fields } = JSON.parse(event.body);
  try {
    const updatedHocLocation = await table.update([{ id, fields }]);
    return formattedReturn(200, updatedHocLocation);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
