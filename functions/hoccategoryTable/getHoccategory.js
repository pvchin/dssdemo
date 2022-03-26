const { table } = require("./airtable-hoccategory");
const formattedReturn = require("../formattedReturn");

module.exports = async (event) => {
  const { id, fv } = event.queryStringParameters;
  //const { id, filterValue, filterField } = event.queryStringParameters;

  if (id) {
    const hoccategory = await table.find(id);
    const formattedHoccategory = { id: hoccategory.id, ...hoccategory.fields };
    if (hoccategory.error) {
      return {
        statusCode: 404,
        body: `No HOC Category with id: ${id}`,
      };
    }

    return formattedReturn(200, formattedHoccategory);
  }
  try {
    if (fv) {
      // const { id, linkid, ...fields } = JSON.parse(event.body);
      // console.log(linkid);
      const hoccategory = await table
        .select({ filterByFormula: `empid = '${fv}'` })
        .firstPage();
      const formattedHoccategory = hoccategory.map((e) => ({
        id: e.id,
        ...e.fields,
      }));

      return formattedReturn(200, formattedHoccategory);
    }
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }

  try {
    const hoccategory = await table.select().firstPage();
    const formattedHoccategory = hoccategory.map((e) => ({
      id: e.id,
      ...e.fields,
    }));

    return formattedReturn(200, formattedHoccategory);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
