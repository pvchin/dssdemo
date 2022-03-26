const { table } = require("./airtable-hocwhat");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { ...fields } = JSON.parse(event.body);
  try {
    const createdHocWhat = await table.create([{ fields }]);
    return formattedReturn(200, createdHocWhat);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
