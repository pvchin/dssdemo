const { table } = require("./airtable-sampleshistory");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { id } = JSON.parse(event.body);
  try {
    const deletedSamplehistory = await table.destroy(id);
    return formattedReturn(200, deletedSamplehistory);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
