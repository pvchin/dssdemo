const { table } = require("./airtable-expenses");
const formattedReturn = require("../formattedReturn");

module.exports = async (event) => {
  const { id, fv, fi, pr, m, y, sm } = event.queryStringParameters;
  // const { id, filterValue, filterField } = event.queryStringParameters;
  // console.log(filterValue, filterField);

  if (id) {
    const expense = await table.find(id);
    const formattedExpenses = { id: expense.id, ...expense.fields };
    if (expense.error) {
      return {
        statusCode: 404,
        body: `No Expense with id: ${id}`,
      };
    }

    return formattedReturn(200, formattedExpenses);
  }
  if (fv) {
    const expenses = await table
      .select({ view: "sortedview", filterByFormula: `empid = '${fv}'` })
      .firstPage();
    const formattedExpenses = expenses.map((expense) => ({
      id: expense.id,
      ...expense.fields,
    }));

    return formattedReturn(200, formattedExpenses);
  }

  if (fi) {
    const expenses = await table
      .select({
        view: "sortedview",
        filterByFormula: `status = '${fi}'`,
      })
      .firstPage();
    const formattedExpenses = expenses.map((expense) => ({
      id: expense.id,
      ...expense.fields,
    }));

    return formattedReturn(200, formattedExpenses);
  }

  if (pr) {
    const expenses = await table
      .select({ view: "sortedview", filterByFormula: `payrun = '${pr}'` })
      .firstPage();
    const formattedExpenses = expenses.map((expense) => ({
      id: expense.id,
      ...expense.fields,
    }));

    return formattedReturn(200, formattedExpenses);
  }

  // //filterByFormula: `MONTH(date) = ${m}`
  if (m) {
    const expenses = await table
      .select({
        view: "sortedview",
        filterByFormula: `AND(MONTH(date)=${m},YEAR(date)=${y})`,
      })
      .firstPage();
    const formattedExpenses = expenses.map((expense) => ({
      id: expense.id,
      ...expense.fields,
    }));

    return formattedReturn(200, formattedExpenses);
  }

  if (sm) {
    const expenses = await table
      .select({
        view: "summaryview",
      })
      .firstPage();
    const formattedExpenses = expenses.map((expense) => ({
      id: expense.id,
      ...expense.fields,
    }));

    return formattedReturn(200, formattedExpenses);
  }

  try {
    const expenses = await table.select().firstPage();
    const formattedExpenses = expenses.map((expense) => ({
      id: expense.id,
      ...expense.fields,
    }));

    return formattedReturn(200, formattedExpenses);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
