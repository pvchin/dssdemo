const { table } = require("./airtable-hocwhydetails");
const formattedReturn = require("../formattedReturn");

module.exports = async (event) => {
  const { id, fv } = event.queryStringParameters;
  //const { id, filterValue, filterField } = event.queryStringParameters;

  if (id) {
    const hocwhydetails = await table.find(id);
    const formattedHocwhydetails = {
      id: hocwhydetails.id,
      ...hocwhydetails.fields,
    };
    if (hocwhydetails.error) {
      return {
        statusCode: 404,
        body: `No HOC Why Details with id: ${id}`,
      };
    }

    return formattedReturn(200, formattedHocwhydetails);
  }
  try {
    if (fv) {
      // const { id, linkid, ...fields } = JSON.parse(event.body);
      // console.log(linkid);
      const hocwhydetails = await table
        .select({
          view: "sortedview",
          filterByFormula: `why = '${fv}'`,
        })
        .firstPage();
      const formattedHocWhydetails = hocwhydetails.map((e) => ({
        id: e.id,
        ...e.fields,
      }));

      return formattedReturn(200, formattedHocWhydetails);
    }
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }

  try {
    const hocwhydetails = await table
      .select({
        view: "sortedview",
      })
      .firstPage();
    const formattedHocWhydetails = hocwhydetails.map((e) => ({
      id: e.id,
      ...e.fields,
    }));

    return formattedReturn(200, formattedHocWhydetails);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
