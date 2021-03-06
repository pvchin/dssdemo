const { table } = require("./airtable-assetshistory");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { id, ...fields } = JSON.parse(event.body);
  try {
    const updatedAssethistory = await table.update([{ id, fields }]);
    return formattedReturn(200, updatedAssethistory);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
