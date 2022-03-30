const { table } = require("./airtable-itemshistory");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { ...fields } = JSON.parse(event.body);
  try {
    const createdItemhistory = await table.create([{ fields }]);
    return formattedReturn(200, createdItemhistory);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
