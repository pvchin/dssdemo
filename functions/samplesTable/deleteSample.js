const { table } = require("./airtable-samples");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { id } = JSON.parse(event.body);
  try {
    const deletedSample = await table.destroy(id);
    return formattedReturn(200, deletedSample);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
