const { table } = require("./airtable-hocwhy");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { id } = JSON.parse(event.body);
  try {
    const deletedHocWhy = await table.destroy(id);
    return formattedReturn(200, deletedHocWhy);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
