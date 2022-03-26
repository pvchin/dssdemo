const { table } = require("./airtable-hoclookup");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { ...fields } = JSON.parse(event.body);
  try {
    const createdHocLookup = await table.create([{ fields }]);
    return formattedReturn(200, createdHocLookup);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
