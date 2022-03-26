const { table } = require("./airtable-hocwhatdetails");
const formattedReturn = require("../formattedReturn");

module.exports = async (event) => {
  const { id, fv } = event.queryStringParameters;
  //const { id, filterValue, filterField } = event.queryStringParameters;

  if (id) {
    const hocwhatdetails = await table.find(id);
    const formattedHocwhatdetails = {
      id: hocwhatdetails.id,
      ...hocwhatdetails.fields,
    };
    if (hocwhatdetails.error) {
      return {
        statusCode: 404,
        body: `No HOC What Details with id: ${id}`,
      };
    }

    return formattedReturn(200, formattedHocwhatdetails);
  }
  try {
    if (fv) {
      // const { id, linkid, ...fields } = JSON.parse(event.body);
      // console.log(linkid);
      const hocwhatdetails = await table
        .select({
          view: "sortedview",
          filterByFormula: `what = '${fv}'`,
        })
        .firstPage();
      const formattedHocWhatdetails = hocwhatdetails.map((e) => ({
        id: e.id,
        ...e.fields,
      }));

      return formattedReturn(200, formattedHocWhatdetails);
    }
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }

  try {
    const hocwhatdetails = await table
      .select({ view: "sortedview" })
      .firstPage();
    const formattedHocWhatdetails = hocwhatdetails.map((e) => ({
      id: e.id,
      ...e.fields,
    }));

    return formattedReturn(200, formattedHocWhatdetails);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
