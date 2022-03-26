const { table } = require("./airtable-yearendleavebal");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { id, ...fields } = JSON.parse(event.body);
  try {
    const updatedYearendleavebal = await table.update([{ id, fields }]);
    return formattedReturn(200, updatedYearendleavebal);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
