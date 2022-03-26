const { table } = require("./airtable-institutes");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { ...fields } = JSON.parse(event.body);
  try {
    const createdInstitute = await table.create([{ fields }]);
    return formattedReturn(200, createdInstitute);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
