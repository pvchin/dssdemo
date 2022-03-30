const { table } = require("./airtable-assets");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { id } = JSON.parse(event.body);
  try {
    const deletedAsset = await table.destroy(id);
    return formattedReturn(200, deletedAsset);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
