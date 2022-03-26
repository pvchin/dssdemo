const { table } = require("./airtable-hoccategory");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { id } = JSON.parse(event.body);
  try {
    const deletedHocCategory = await table.destroy(id);
    return formattedReturn(200, deletedHocCategory);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
