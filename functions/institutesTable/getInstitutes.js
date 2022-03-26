const { table } = require("./airtable-institutes");
const formattedReturn = require("../formattedReturn");

module.exports = async (event) => {
  const { id, filterValue } = event.queryStringParameters;
  // const { id, filterValue, filterField } = event.queryStringParameters;
  // console.log(filterValue, filterField);

  if (id) {
    const institute = await table.find(id);
    const formattedInstitutes = { id: institute.id, ...institute.fields };
    if (institute.error) {
      return {
        statusCode: 404,
        body: `No Institute with id: ${id}`,
      };
    }

    return formattedReturn(200, formattedInstitutes);
  }
  
  try {
    const institutes = await table.select().firstPage();
    const formattedInstitutes = institutes.map((item) => ({
      id: item.id,
      ...item.fields,
    }));

    return formattedReturn(200, formattedInstitutes);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
