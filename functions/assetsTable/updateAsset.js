const { table } = require("./airtable-assets");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { id, ...fields } = JSON.parse(event.body);
  try {
    const updatedAsset = await table.update([{ id, fields }]);
    return formattedReturn(200, updatedAsset);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
