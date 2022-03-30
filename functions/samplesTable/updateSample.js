const { table } = require("./airtable-samples");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { id, ...fields } = JSON.parse(event.body);
  try {
    const updatedSample = await table.update([{ id, fields }]);
    return formattedReturn(200, updatedSample);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
