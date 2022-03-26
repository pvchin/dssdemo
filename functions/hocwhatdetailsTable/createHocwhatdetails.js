const { table } = require("./airtable-hocwhatdetails");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { ...fields } = JSON.parse(event.body);
  try {
    const createdHocWhatdetails = await table.create([{ fields }]);
    return formattedReturn(200, createdHocWhatdetails);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
