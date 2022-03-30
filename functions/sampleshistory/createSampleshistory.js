const { table } = require("./airtable-sampleshistory");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { ...fields } = JSON.parse(event.body);
  try {
    const createdSamplehistory = await table.create([{ fields }]);
    return formattedReturn(200, createdSamplehistory);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
