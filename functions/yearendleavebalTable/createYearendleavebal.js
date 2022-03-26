const { table } = require("./airtable-yearendleavebal");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { ...fields } = JSON.parse(event.body);
  try {
    const createdYearendleavebal = await table.create([{ fields }]);
    return formattedReturn(200, createdYearendleavebal);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
