const { table } = require("./airtable-assetshistory");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { ...fields } = JSON.parse(event.body);
  try {
    const createdAssethistory = await table.create([{ fields }]);
    return formattedReturn(200, createdAssethistory);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
