const { table } = require("./airtable-hocwhydetails");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { id } = JSON.parse(event.body);
  try {
    const deletedHocWhydetails = await table.destroy(id);
    return formattedReturn(200, deletedHocWhydetails);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
