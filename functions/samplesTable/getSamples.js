const { table } = require("./airtable-samples");
const formattedReturn = require("../formattedReturn");

module.exports = async (event) => {
  const { id, fv } = event.queryStringParameters;
  // const { id, filterValue, filterField } = event.queryStringParameters;
  // console.log(filterValue, filterField);

  if (id) {
    const sample = await table.find(id);
    const formattedSample = { id: sample.id, ...sample.fields };
    if (sample.error) {
      return {
        statusCode: 404,
        body: `No Sample with id: ${id}`,
      };
    }

    return formattedReturn(200, formattedSample);
  }

  try {
    const asset = await table.select().firstPage();
    const formattedSample = asset.map((item) => ({
      id: item.id,
      ...item.fields,
    }));

    return formattedReturn(200, formattedSample);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
