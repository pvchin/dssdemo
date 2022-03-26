const { table } = require("./airtable-hocwhy");
const formattedReturn = require("../formattedReturn");

module.exports = async (event) => {
  const { id, fv } = event.queryStringParameters;
  //const { id, filterValue, filterField } = event.queryStringParameters;

  if (id) {
    const hocwhy = await table.find(id);
    const formattedHocwhy = { id: hocwhy.id, ...hocwhy.fields };
    if (hocwhy.error) {
      return {
        statusCode: 404,
        body: `No HOC Why with id: ${id}`,
      };
    }

    return formattedReturn(200, formattedHocwhy);
  }
  try {
    if (fv) {
      // const { id, linkid, ...fields } = JSON.parse(event.body);
      // console.log(linkid);
      const hocwhy = await table
        .select({
          view: "sortedview",
          filterByFormula: `description = '${fv}'`,
        })
        .firstPage();
      const formattedHocWhy = hocwhy.map((e) => ({
        id: e.id,
        ...e.fields,
      }));

      return formattedReturn(200, formattedHocWhy);
    }
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }

  try {
      const hocwhy = await table
        .select({
          view: "sortedview",
        })
        .firstPage();
    const formattedHocWhy = hocwhy.map((e) => ({
      id: e.id,
      ...e.fields,
    }));

    return formattedReturn(200, formattedHocWhy);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
