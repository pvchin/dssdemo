const { table } = require("./airtable-assets");
const formattedReturn = require("../formattedReturn");

module.exports = async (event) => {
  const { id, fv } = event.queryStringParameters;
  // const { id, filterValue, filterField } = event.queryStringParameters;
  // console.log(filterValue, filterField);

  if (id) {
    const asset = await table.find(id);
    const formattedAsset = { id: asset.id, ...asset.fields };
    if (asset.error) {
      return {
        statusCode: 404,
        body: `No Asset with id: ${id}`,
      };
    }

    return formattedReturn(200, formattedAsset);
  }

  try {
    const asset = await table.select().firstPage();
    const formattedAsset = asset.map((item) => ({
      id: item.id,
      ...item.fields,
    }));

    return formattedReturn(200, formattedAsset);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
