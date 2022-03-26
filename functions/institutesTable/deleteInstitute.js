const { table } = require("./airtable-institutes");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { id } = JSON.parse(event.body);
  try {
    const deletedInstitute = await table.destroy(id);
    return formattedReturn(200, deletedInstitute);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
