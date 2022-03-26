const { table } = require("./airtable-hocwhydetails");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { id, rec_id, ...fields } = JSON.parse(event.body);
  try {
    const updatedHocWhydetails = await table.update([{ id, fields }]);
    return formattedReturn(200, updatedHocWhydetails);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
