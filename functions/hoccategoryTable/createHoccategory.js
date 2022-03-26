const { table } = require("./airtable-hoccategory");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { ...fields } = JSON.parse(event.body);
  try {
    const createdHoccategory = await table.create([{ fields }]);
    return formattedReturn(200, createdHoccategory);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
