const { table } = require("./airtable-hocwhat");
const formattedReturn = require("../formattedReturn");

module.exports = async (event) => {
  const { id, f1, f2, f3 } = event.queryStringParameters;
  //const { id, filterValue, filterField } = event.queryStringParameters;

  if (id) {
    const hocwhat = await table.find(id);
    const formattedHocwhat = { id: hocwhat.id, ...hocwhat.fields };
    if (hocwhat.error) {
      return {
        statusCode: 404,
        body: `No HOC What with id: ${id}`,
      };
    }

    return formattedReturn(200, formattedHocwhat);
  }
  try {
    if (f1) {
      // const { id, linkid, ...fields } = JSON.parse(event.body);
      // console.log(linkid);
      const hocwhat = await table
        .select({
          view: "sortedview",
          filterByFormula: `AND(unsafeact='${f1}',positiveact='${f2}')`,
        })
        .firstPage();
      const formattedHocWhat = hocwhat.map((e) => ({
        id: e.id,
        ...e.fields,
      }));

      return formattedReturn(200, formattedHocWhat);
    }
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }

  try {
    const hocwhat = await table.select({ view: "sortedview" }).firstPage();
    const formattedHocWhat = hocwhat.map((e) => ({
      id: e.id,
      ...e.fields,
    }));

    return formattedReturn(200, formattedHocWhat);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
