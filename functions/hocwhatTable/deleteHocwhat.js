const { table } = require("./airtable-hocwhat");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { id } = JSON.parse(event.body);
  try {
    const deletedHocWhat = await table.destroy(id);
    return formattedReturn(200, deletedHocWhat);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
