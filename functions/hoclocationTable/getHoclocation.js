const { table } = require("./airtable-hoclocation");
const formattedReturn = require("../formattedReturn");

module.exports = async (event) => {
  const { id, fv } = event.queryStringParameters;
  //const { id, filterValue, filterField } = event.queryStringParameters;

  if (id) {
    const hoclocation = await table.find(id);
    const formattedHoclocation = { id: hoclocation.id, ...hoclocation.fields };
    if (hoclocation.error) {
      return {
        statusCode: 404,
        body: `No HOC Location with id: ${id}`,
      };
    }

    return formattedReturn(200, formattedHoclocation);
  }
  try {
    if (fv) {
      // const { id, linkid, ...fields } = JSON.parse(event.body);
      // console.log(linkid);
      const hoclocation1 = await table
        .select({
          view: "sortedview",
          filterByFormula: `group = 'A'`,
        })
        .firstPage();
      const hoclocation2 = await table
        .select({
          view: "sortedview",
          filterByFormula: `group = 'B'`,
        })
        .firstPage();
      const hoclocation3 = await table
        .select({
          view: "sortedview",
          filterByFormula: `group = 'C'`,
        })
        .firstPage();
      const hoclocation4 = await table
        .select({
          view: "sortedview",
          filterByFormula: `group = 'D'`,
        })
        .firstPage();
      const hoclocation5 = await table
        .select({
          view: "sortedview",
          filterByFormula: `group = 'E'`,
        })
        .firstPage();
      const hoclocation6 = await table
        .select({
          view: "sortedview",
          filterByFormula: `group = 'F'`,
        })
        .firstPage();
      const hoclocation7 = await table
        .select({
          view: "sortedview",
          filterByFormula: `group = 'G'`,
        })
        .firstPage();
      const hoclocation = [
        ...hoclocation1,
        ...hoclocation2,
        ...hoclocation3,
        ...hoclocation4,
        ...hoclocation5,
        ...hoclocation6,
        ...hoclocation7,
      ];
      const formattedHoclocation = hoclocation.map((e) => ({
        id: e.id,
        ...e.fields,
      }));

      return formattedReturn(200, formattedHoclocation);
    }
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }

  try {
    let records = [];

    // called for every page of records
    const processPage = (partialRecords, fetchNextPage) => {
      //console.log("partial", partialRecords)
      records = [...records, ...partialRecords];
      fetchNextPage();
    };
    // called when all the records have been retrieved
    const processRecords = (err) => {
      if (err) {
        console.error(err);
        return;
      }
    };

    table
      .select({
        view: "sortedview",
        pageSize: 24,
      })
      .eachPage(processPage, processRecords);
    //console.log("loc", records)
    // const formattedHoclocation = records.map((e) => ({
    //   id: e.id,
    //   ...e.fields,
    // }));
    // console.log("loc", records)
    // return formattedReturn(200, formattedHoclocation);
    return formattedReturn(200, records);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
