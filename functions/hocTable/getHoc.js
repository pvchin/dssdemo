const { table } = require("./airtable-hoc");
const formattedReturn = require("../formattedReturn");

module.exports = async (event) => {
  const { id, fv, m, y } = event.queryStringParameters;
  //const { id, filterValue, filterField } = event.queryStringParameters;

  if (id) {
    const hoc = await table.find(id);
    const formattedHoc = { id: hoc.id, ...hoc.fields };
    if (hoc.error) {
      return {
        statusCode: 404,
        body: `No HOC with id: ${id}`,
      };
    }

    return formattedReturn(200, formattedHoc);
  }

  try {
    if (fv) {
      // const { id, linkid, ...fields } = JSON.parse(event.body);
      // console.log(linkid);
      const hoc = await table
        .select({ filterByFormula: `empid = '${fv}'` })
        .firstPage();
      const formattedHoc = hoc.map((e) => ({
        id: e.id,
        ...e.fields,
      }));

      return formattedReturn(200, formattedHoc);
    }
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }

  if (m) {
    const hoc = await table
      .select({
        view: "sortedview",
        filterByFormula: `AND(MONTH(raisedon)=${m},YEAR(raisedon)=${y})`,
      })
      .firstPage();
    const formattedHoc = hoc.map((rec) => ({
      id: rec.id,
      ...rec.fields,
    }));

    return formattedReturn(200, formattedHoc);
  }

  try {
    const hoc = await table
      .select({
        view: "sortedview",
      })
      .firstPage();
    const formattedHoc = hoc.map((e) => ({
      id: e.id,
      ...e.fields,
    }));

    return formattedReturn(200, formattedHoc);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
