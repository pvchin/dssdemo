const { table } = require("./airtable-assetshistory");
const formattedReturn = require("../formattedReturn");

module.exports = async (event) => {
  const { id, fv } = event.queryStringParameters;
  // const { id, filterValue, filterField } = event.queryStringParameters;
  // console.log(filterValue, filterField);

  if (id) {
    const assethistory = await table.find(id);
    const formattedAssethistory = { id: assethistory.id, ...assethistory.fields };
    if (assethistory.error) {
      return {
        statusCode: 404,
        body: `No Asset history with id: ${id}`,
      };
    }

    return formattedReturn(200, formattedAssethistory);
  }

  try {
    const assethistory = await table.select().firstPage();
    const formattedAssethistory = assethistory.map((item) => ({
      id: item.id,
      ...item.fields,
    }));

    return formattedReturn(200, formattedAssethistory);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
