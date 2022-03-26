const { table } = require("./airtable-hoc");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { id } = JSON.parse(event.body);
  try {
    const deletedHoc = await table.destroy(id);
    return formattedReturn(200, deletedHoc);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
