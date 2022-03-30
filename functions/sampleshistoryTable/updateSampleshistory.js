const { table } = require("./airtable-sampleshistory");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { id, ...fields } = JSON.parse(event.body);
  try {
    const updatedSamplehistory = await table.update([{ id, fields }]);
    return formattedReturn(200, updatedSamplehistory);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
