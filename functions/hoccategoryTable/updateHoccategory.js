const { table } = require("./airtable-hoccategory");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { id, rec_id, ...fields } = JSON.parse(event.body);
  try {
    const updatedHocCategory = await table.update([{ id, fields }]);
    return formattedReturn(200, updatedHocCategory);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
