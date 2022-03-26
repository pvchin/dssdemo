const { table } = require("./airtable-currency");
const formattedReturn = require("../formattedReturn");

module.exports = async (event) => {
  const { id, fv } = event.queryStringParameters;
  // const { id, filterValue, filterField } = event.queryStringParameters;
  // console.log(filterValue, filterField);

  if (id) {
    const currency = await table.find(id);
    const formattedCurrency = { id: currency.id, ...currency.fields };
    if (currency.error) {
      return {
        statusCode: 404,
        body: `No Currency with id: ${id}`,
      };
    }

    return formattedReturn(200, formattedCurrency);
  }

  try {
    const currency = await table.select().firstPage();
    const formattedCurrency = currency.map((item) => ({
      id: item.id,
      ...item.fields,
    }));

    return formattedReturn(200, formattedCurrency);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
