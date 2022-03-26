const { table } = require("./airtable-hoclookup");
const formattedReturn = require("../formattedReturn");

module.exports = async (event) => {
  const { id, fv } = event.queryStringParameters;
  //const { id, filterValue, filterField } = event.queryStringParameters;

  if (id) {
    const hoclookup = await table.find(id);
    const formattedHoclookup = { id: hoclookup.id, ...hoclookup.fields };
    if (hoclookup.error) {
      return {
        statusCode: 404,
        body: `No HOC Lookup with id: ${id}`,
      };
    }

    return formattedReturn(200, formattedHoclookup);
  }
  try {
    if (fv) {
      // const { id, linkid, ...fields } = JSON.parse(event.body);
      // console.log(linkid);
      const hoclookup = await table
        .select({ filterByFormula: `empid = '${fv}'` })
        .firstPage();
      const formattedHoclookup = hoclookup.map((e) => ({
        id: e.id,
        ...e.fields,
      }));

      return formattedReturn(200, formattedHoclookup);
    }
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }

  try {
    const hoclookup = await table.select().firstPage();
    const formattedHoclookup = hoclookup.map((e) => ({
      id: e.id,
      ...e.fields,
    }));

    return formattedReturn(200, formattedHoclookup);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
