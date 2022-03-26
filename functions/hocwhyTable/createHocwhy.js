const { table } = require("./airtable-hocwhy");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { ...fields } = JSON.parse(event.body);
  try {
    const createdHocWhy = await table.create([{ fields }]);
    return formattedReturn(200, createdHocWhy);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
