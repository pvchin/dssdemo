const { table } = require("./airtable-items");
const formattedReturn = require("../formattedReturn");

module.exports = async (event) => {
  const { id, fv } = event.queryStringParameters;
  // const { id, filterValue, filterField } = event.queryStringParameters;
  // console.log(filterValue, filterField);

  if (id) {
    const item = await table.find(id);
    const formattedItem = { id: item.id, ...item.fields };
    if (item.error) {
      return {
        statusCode: 404,
        body: `No Item with id: ${id}`,
      };
    }

    return formattedReturn(200, formattedItem);
  }

  try {
    const asset = await table.select().firstPage();
    const formattedItem = asset.map((item) => ({
      id: item.id,
      ...item.fields,
    }));

    return formattedReturn(200, formattedItem);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
