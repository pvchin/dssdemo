const { table } = require("./airtable-hoclocation");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { ...fields } = JSON.parse(event.body);
  try {
    const createdHocLocation = await table.create([{ fields }]);
    return formattedReturn(200, createdHocLocation);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
