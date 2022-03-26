const { table } = require("./airtable-yearendleavebal");
const formattedReturn = require("../formattedReturn");

module.exports = async (event) => {
  const { id, fv, em } = event.queryStringParameters;
  // const { id, filterValue, filterField } = event.queryStringParameters;
  // console.log(filterValue, filterField);

  if (id) {
    const yearendleavebal = await table.find(id);
    const formattedYearendleavebal = {
      id: yearendleavebal.id,
      ...yearendleavebal.fields,
    };
    if (yearendleavebal.error) {
      return {
        statusCode: 404,
        body: `No Year End Leave Bal with id: ${id}`,
      };
    }

    return formattedReturn(200, formattedYearendleavebal);
  }

  if (fv) {
    const yearendleavebal = await table
      .select({ filterByFormula: `year = '${fv}'` })
      .firstPage();
    const formattedYearendleavebal = yearendleavebal.map((rec) => ({
      id: rec.id,
      ...rec.fields,
    }));

    return formattedReturn(200, formattedYearendleavebal);
  }

  if (em) {
    const yearendleavebal = await table
      .select({ filterByFormula: `empid = '${em}'` })
      .firstPage();
    const formattedYearendleavebal = yearendleavebal.map((rec) => ({
      id: rec.id,
      ...rec.fields,
    }));

    return formattedReturn(200, formattedYearendleavebal);
  }

  try {
    const yearendleavebal = await table.select().firstPage();
    const formattedYearendleavebal = yearendleavebal.map((rec) => ({
      id: rec.id,
      ...rec.fields,
    }));

    return formattedReturn(200, formattedYearendleavebal);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
