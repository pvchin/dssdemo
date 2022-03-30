const { table } = require("./airtable-itemshistory");
const formattedReturn = require("../formattedReturn");

module.exports = async (event) => {
  const { id, fv } = event.queryStringParameters;
  // const { id, filterValue, filterField } = event.queryStringParameters;
  // console.log(filterValue, filterField);

  if (id) {
    const itemhistory = await table.find(id);
    const formattedItemhistory = { id: itemhistory.id, ...itemhistory.fields };
    if (itemhistory.error) {
      return {
        statusCode: 404,
        body: `No Item history with id: ${id}`,
      };
    }

    return formattedReturn(200, formattedItemhistory);
  }

  try {
    const itemshistory = await table.select().firstPage();
    const formattedItemhistory = itemshistory.map((item) => ({
      id: item.id,
      ...item.fields,
    }));

    return formattedReturn(200, formattedItemhistory);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
