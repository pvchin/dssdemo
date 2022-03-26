const { table } = require("./airtable-hocwhydetails");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { ...fields } = JSON.parse(event.body);
  try {
    const createdHocWhydetails = await table.create([{ fields }]);
    return formattedReturn(200, createdHocWhydetails);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
