const { table } = require("./airtable-assetshistory");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { id } = JSON.parse(event.body);
  try {
    const deletedAssethistory = await table.destroy(id);
    return formattedReturn(200, deletedAssethistory);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
