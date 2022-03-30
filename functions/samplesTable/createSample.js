const { table } = require("./airtable-samples");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { ...fields } = JSON.parse(event.body);
  try {
    const createdSample = await table.create([{ fields }]);
    return formattedReturn(200, createdSample);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
