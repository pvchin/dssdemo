const { table } = require("./airtable-hocwhatdetails");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { id } = JSON.parse(event.body);
  try {
    const deletedHocWhatdetails = await table.destroy(id);
    return formattedReturn(200, deletedHocWhatdetails);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
