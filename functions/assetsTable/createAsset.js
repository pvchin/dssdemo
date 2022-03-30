const { table } = require("./airtable-assets");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { ...fields } = JSON.parse(event.body);
  try {
    const createdAsset = await table.create([{ fields }]);
    return formattedReturn(200, createdAsset);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
