const { table } = require("./airtable-sampleshistory");
const formattedReturn = require("../formattedReturn");

module.exports = async (event) => {
  const { id, fv } = event.queryStringParameters;
  // const { id, filterValue, filterField } = event.queryStringParameters;
  // console.log(filterValue, filterField);

  if (id) {
    const samplehistory = await table.find(id);
    const formattedSamplehistory = { id: samplehistory.id, ...samplehistory.fields };
    if (samplehistory.error) {
      return {
        statusCode: 404,
        body: `No Sample with id: ${id}`,
      };
    }

    return formattedReturn(200, formattedSamplehistory);
  }

  try {
    const sampleshistory = await table.select().firstPage();
    const formattedSamplehistory = sampleshistory.map((item) => ({
      id: item.id,
      ...item.fields,
    }));

    return formattedReturn(200, formattedSamplehistory);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
