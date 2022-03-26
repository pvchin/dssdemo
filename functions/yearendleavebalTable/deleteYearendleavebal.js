const { table } = require("./airtable-yearendleavebal");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { id } = JSON.parse(event.body);
  try {
    const deletedYearendleavebal = await table.destroy(id);
    return formattedReturn(200, deletedYearendleavebal);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
