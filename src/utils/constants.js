export const employees_url = "/api/employees";
export const wpexpiry_url = "/api/wpexpiryview";
export const leaves_url = "/api/leaves";
export const onleaves_url = "/api/onleavesview";
export const expenses_url = "/api/expenses";
export const unpaidexpenses_url = "/api/unpaidexpenses";
export const dailyallowances_url = "/api/dailyallowances";
export const dailyallowsdetls_url = "/api/dailyallowsdetls";
export const unpaiddailyallows_url = "/api/unpaiddailyallows";
export const pendingdailyallowsdetls_url = "/api/pendingdailyallowsdetls";
export const periods_url = "/api/periods";
export const payslips_url = "/api/payslips";
export const payslipitems_url = "/api/payslipitems";
export const payitems_url = "/api/payitems";
export const payrun_url = "/api/payrun";
export const allowances_url = "/api/allowances";
export const deductions_url = "/api/deductions";
export const departments_url = "/api/departments";
export const institutes_url = "/api/institutes";
export const currency_url = "/api/currency";
export const designations_url = "/api/designations";
export const payslipearnings_url = "/api/payslipearnings";
export const payslipdeductions_url = "/api/payslipdeductions";
export const family_url = "/api/family";
export const educations_url = "/api/educations";
export const experiences_url = "/api/experiences";
export const trainings_url = "/api/trainings";
export const hoc_url = "/api/hoc";
export const hocwhat_url = "/api/hocwhat";
export const hocwhatdetails_url = "/api/hocwhatdetails";
export const hocwhy_url = "/api/hocwhy";
export const hocwhydetails_url = "/api/hocwhydetails";
export const hoclookup_url = "/api/hoclookup";
export const hoclocation_url = "/api/hoclocation";
export const hoccategory_url = "/api/hoccategory";
export const yearendleavebal_url = "/api/yearendleavebal";
export const items_url = "/api/items";
export const itemshistory_url = "/api/itemshistory";
export const assets_url = "/api/assets";
export const assetshistory_url = "/api/assetshistory";
export const samples_url = "/api/samples";
export const sampleshistory_url = "/api/sampleshistory";
export const payroll_endmonth_day = "25";

export const items = [
  {
    itemno: "A112233",
    desp: "Bottle A112233",
    expiry: "20230-2-21",
    qty: 10,
    minqty: 15,
    tobeexpiry: false,
    toorder: true,
    status: "In Stock",
    supplier: "ABC Supplier",
    despatched: "",
    receiveddate: "",
  },
  {
    itemno: "B223311",
    desp: "Bottle B223311",
    expiry: "2022-04-23",
    qty: 5,
    minqty: 10,
    toorder: true,
    tobeexpiry: false,
    status: "In Stock",
    supplier: "BB Supplier",
    despatched: "",
    receiveddate: "",
  },
  {
    itemno: "D111222",
    desp: "Bottle D111222",
    expiry: "2022-04-13",
    qty: 15,
    minqty: 10,
    toorder: false,
    tobeexpiry: true,
    status: "In Stock",
    supplier: "ABC Supplier",
    despacthed: "",
    receiveddate: "",
  },
  {
    itemno: "E222222",
    desp: "Bottle E222222",
    expiry: "2022-03-31",
    qty: 25,
    minqty: 5,
    tobeexpiry: true,
    toorder: false,
    status: "Despatched",
    supplier: "BB Supplier",
    despatched: "Operation Department",
    receiveddate: "",
  },
  {
    itemno: "F000111",
    desp: "Bottle F00011",
    expiry: "2022-06-23",
    qty: 30,
    minqty: 15,
    tobeexpiry: false,
    toorder: false,
    status: "Despatched",
    supplier: "ABC Supplier",
    despatched: "Marketing Department",
    receiveddate: "",
  },
  {
    itemno: "G111000",
    desp: "Bottle G111000",
    expiry: "2023-03-23",
    qty: 30,
    minqty: 10,
    tobeexpiry: false,
    toorder: false,
    status: "In Stock",
    supplier: "ABC Supplier",
    receiveddate: "",
  },
  {
    itemno: "H1112220",
    desp: "Bottle H111222",
    expiry: "2023-02-13",
    qty: 30,
    minqty: 10,
    tobeexpiry: false,
    toorder: false,
    status: "In Progress",
    supplier: "BB Supplier",
    despatched: "Warehouse",
    receiveddate: "2022-03-10",
  },
  {
    itemno: "I2222220",
    desp: "Bottle I222222",
    expiry: "2022-12-11",
    qty: 30,
    minqty: 10,
    tobeexpiry: false,
    toorder: false,
    status: "In Progress",
    supplier: "BB Supplier",
    despatched: "Marketing Department",
    receiveddate: "2022-03-15",
  },
];

export const assets = [
  {
    itemno: "AA1122",
    desp: "Bottle AA1122",
    expiry: "2023-02-21",
    qty: 10,
    minqty: 15,
    tobeexpiry: false,
    toorder: true,
    status: "In Stock",
    supplier: "ABC Supplier",
    despatched: "",
    despatchdate: "",
    receiveddate: "",
  },
  {
    itemno: "AB2233",
    desp: "Bottle AB2233",
    expiry: "2022-04-23",
    qty: 5,
    minqty: 10,
    toorder: true,
    tobeexpiry: false,
    status: "In Stock",
    supplier: "BB Supplier",
    despatched: "",
    despatchdate: "",
    receiveddate: "",
  },
  {
    itemno: "AD1112",
    desp: "Bottle AD1112",
    expiry: "2022-04-13",
    qty: 15,
    minqty: 10,
    toorder: false,
    tobeexpiry: true,
    status: "In Stock",
    supplier: "ABC Supplier",
    despacthed: "",
    despatchdate: "",
    receiveddate: "",
  },
  {
    itemno: "AE2222",
    desp: "Bottle AE2222",
    expiry: "2022-03-31",
    qty: 25,
    minqty: 5,
    tobeexpiry: true,
    toorder: false,
    status: "Despatched",
    supplier: "BB Supplier",
    despatched: "Operation Department",
    despatchdate: "2022-01-05",
    receiveddate: "",
  },
  {
    itemno: "AF0001",
    desp: "Bottle AF0001",
    expiry: "2022-06-23",
    qty: 30,
    minqty: 15,
    tobeexpiry: false,
    toorder: false,
    status: "Despatched",
    supplier: "ABC Supplier",
    despatched: "Marketing Department",
    despatchdate: "2022-02-22",
    receiveddate: "",
  },
  {
    itemno: "AG1110",
    desp: "Bottle AG1110",
    expiry: "2023-03-23",
    qty: 30,
    minqty: 10,
    tobeexpiry: false,
    toorder: false,
    status: "In Stock",
    supplier: "ABC Supplier",
    despatchdate: "",
    receiveddate: "",
  },
  {
    itemno: "AH11122",
    desp: "Bottle AH1112",
    expiry: "2023-02-13",
    qty: 30,
    minqty: 10,
    tobeexpiry: false,
    toorder: false,
    status: "In Progress",
    supplier: "BB Supplier",
    despatched: "Warehouse",
    despatchdate: "",
    receiveddate: "2022-03-10",
  },
  {
    itemno: "AI22222",
    desp: "Bottle AI2222",
    expiry: "2022-12-11",
    qty: 30,
    minqty: 10,
    tobeexpiry: false,
    toorder: false,
    status: "In Progress",
    supplier: "BB Supplier",
    despatched: "Marketing Department",
    despatchdate: "",
    receiveddate: "2022-03-15",
  },
  {
    itemno: "AJ32222",
    desp: "Bottle AJ3222",
    expiry: "2022-11-11",
    qty: 30,
    minqty: 10,
    tobeexpiry: false,
    toorder: false,
    status: "Despatched",
    supplier: "BB Supplier",
    despatched: "Warehouse",
    despatchdate: "2022-01-31",
    receiveddate: "2022-03-15",
  },
];

export const headLeaveTableCells = [
  {
    name: "name",
    numeric: false,
    disablePadding: true,
    label: "Name",
  },
  {
    name: "from_date",
    numeric: false,
    disablePadding: true,
    label: "From Date",
  },
  { name: "to_date", numeric: false, disablePadding: true, label: "To Date" },
  {
    name: "no_of_days",
    numeric: false,
    disablePadding: true,
    label: "No of Days",
  },
  {
    name: "status",
    numeric: false,
    disablePadding: true,
    label: "Status",
  },
];

export const periods = [
  { name: "2021-01", monthenddate: "2021-01-25" },
  { name: "2021-02", monthenddate: "2021-02-25" },
  { name: "2021-03", monthenddate: "2021-03-25" },
  { name: "2021-04", monthenddate: "2021-04-25" },
  { name: "2021-05", monthenddate: "2021-05-25" },
  { name: "2021-06", monthenddate: "2021-06-25" },
  { name: "2021-07", monthenddate: "2021-07-25" },
  { name: "2021-08", monthenddate: "2021-08-25" },
  { name: "2021-09", monthenddate: "2021-09-25" },
  { name: "2021-10", monthenddate: "2021-10-25" },
  { name: "2021-11", monthenddate: "2021-11-25" },
  { name: "2021-12", monthenddate: "2021-12-25" },
];
