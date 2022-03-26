const { table } = require("./airtable-hoc");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { ...fields } = JSON.parse(event.body);
  try {
    const createdHoc = await table.create([{ fields }]);
    return formattedReturn(200, createdHoc);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
