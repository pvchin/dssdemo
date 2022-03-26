const { table } = require("./airtable-hocwhy");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { id, rec_id, ...fields } = JSON.parse(event.body);
  try {
    const updatedHocWhy = await table.update([{ id, fields }]);
    return formattedReturn(200, updatedHocWhy);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
