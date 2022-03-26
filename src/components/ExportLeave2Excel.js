import React from "react";
//import ReactExport from "react-data-export";
import { Button } from "@chakra-ui/react";

// const ExcelFile = ReactExport.ExcelFile;
// const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
//const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const cols = [
  // { title: "Headings", width: { wpx: 80 } }, //pixels width
  // { title: "Text Style", width: { wch: 40 } }, //char width
  // { title: "Colors", width: { wpx: 90 } },
  { title: "Name", width: { wch: 100 } },
  { title: "From Date", width: { wch: 40 } },
  { title: "To Date", width: { wch: 40 } },
  { title: "No of Days", width: { wch: 40 } },
  { title: "Reason", width: { wch: 100 } },
  { title: "Status", width: { wch: 100 } },
];

const cols1 = [
  { title: "Name", width: { wch: 50 } },
  { title: "From Date", width: { wch: 10 } },
  { title: "To Date", width: { wch: 10 } },
  { title: "No of Days", width: { wch: 10 } },
  { title: "Reason", width: { wch: 50 } },
  { title: "Status", width: { wch: 50 } },
];

const cols2 = [
  { title: "Name" },
  { title: "From Date" },
  { title: "To Date" },
  { title: "No of Days" },
  { title: "Reason" },
  { title: "Status" },
];

const data = [
  [
    { value: "H1", style: { font: { sz: "24", bold: true } } },
    { value: "Bold", style: { font: { bold: true } } },
    {
      value: "Red",
      style: {
        fill: { patternType: "solid", fgColor: { rgb: "FFFF0000" } },
      },
    },
  ],
  [
    { value: "H2", style: { font: { sz: "18", bold: true } } },
    { value: "underline", style: { font: { underline: true } } },
    {
      value: "Blue",
      style: {
        fill: { patternType: "solid", fgColor: { rgb: "FF0000FF" } },
      },
    },
  ],
  [
    { value: "H3", style: { font: { sz: "14", bold: true } } },
    { value: "italic", style: { font: { italic: true } } },
    {
      value: "Green",
      style: {
        fill: { patternType: "solid", fgColor: { rgb: "FF00FF00" } },
      },
    },
  ],
  [
    { value: "H4", style: { font: { sz: "12", bold: true } } },
    { value: "strike", style: { font: { strike: true } } },
    {
      value: "Orange",
      style: {
        fill: { patternType: "solid", fgColor: { rgb: "FFF86B00" } },
      },
    },
  ],
  [
    { value: "H5", style: { font: { sz: "10.5", bold: true } } },
    { value: "outline", style: { font: { outline: true } } },
    {
      value: "Yellow",
      style: {
        fill: { patternType: "solid", fgColor: { rgb: "FFFFFF00" } },
      },
    },
  ],
  [
    { value: "H6", style: { font: { sz: "7.5", bold: true } } },
    { value: "shadow", style: { font: { shadow: true } } },
    {
      value: "Light Blue",
      style: {
        fill: { patternType: "solid", fgColor: { rgb: "FFCCEEFF" } },
      },
    },
  ],
];

const data1 = [
  [
    {
      value: "Johson Michael Angelo",
      style: {
        font: { sz: "12" },
        alignment: {
          wrapText: true,
          horizontal: "center",
          vertical: "top",
        },
      },
    },
    {
      value: "2021-12-04",
      style: {
        font: { sz: "12" },
        numFmt: "dd/mm/yyyy",
        alignment: {
          wrapText: true,
          horizontal: "center",
          vertical: "top",
        },
      },
    },
    {
      value: "2021-12-04",
      style: {
        font: { sz: "12" },
        alignment: {
          wrapText: true,
          horizontal: "center",
          vertical: "top",
        },
      },
    },
    {
      value: 3,
      style: {
        font: { sz: "12" },
        alignment: {
          wrapText: true,
          horizontal: "center",
          vertical: "top",
        },
      },
    },
    {
      value: "Holiday",
      style: {
        font: { sz: "12" },
        alignment: {
          wrapText: true,
          horizontal: "center",
          vertical: "top",
        },
      },
    },
    {
      value: "Approved",
      style: {
        font: { sz: "12" },
        alignment: {
          wrapText: true,
          horizontal: "center",
          vertical: "top",
        },
      },
    },
  ],
  [
    {
      value: "David",
      style: {
        font: { sz: "12" },
        alignment: {
          wrapText: true,
          horizontal: "center",
          vertical: "top",
        },
      },
    },
    {
      value: "2021-12-11",
      style: {
        font: { sz: "12" },
        alignment: {
          wrapText: true,
          horizontal: "center",
          vertical: "top",
        },
      },
    },
    {
      value: "2021-12-14",
      style: {
        font: { sz: "12" },
        alignment: {
          wrapText: true,
          horizontal: "center",
          vertical: "top",
        },
      },
    },
    {
      value: 3,
      style: {
        font: { sz: "12" },
        alignment: {
          wrapText: true,
          horizontal: "center",
          vertical: "top",
        },
      },
    },
    {
      value: "Holiday",
      style: {
        font: { sz: "12" },
        alignment: {
          wrapText: true,
          horizontal: "center",
          vertical: "top",
        },
      },
    },
    {
      value: "Approved",
      style: {
        font: { sz: "12" },
        alignment: {
          wrapText: true,
          horizontal: "center",
          vertical: "top",
        },
      },
    },
  ],
];
const multiDataSet = [
  {
    columns: cols2,
    data: data1,
  },
];

const ExportLeave2Excel = ({ filename, dataset, title }) => {
  return (
    <div>test</div>
    // <ExcelFile element={<Button>Export to Excel</Button>} filename={filename}>
    //   <ExcelSheet dataSet={multiDataSet} name="Leave" />
    // </ExcelFile>
    // <ExcelFile element={<Button>Export to Excel</Button>} filename={filename}>
    //   <ExcelSheet data={dataset} name={title}>
    //     <ExcelColumn label="Name" value="name" />
    //     <ExcelColumn label="From Date" value="from_date" />
    //     <ExcelColumn label="To Date" value="to_date" />
    //     <ExcelColumn label="No of Days" value="no_of_days" />
    //     <ExcelColumn label="Reason" value="reason" />
    //     <ExcelColumn label="Status" value="status" />
    //   </ExcelSheet>
    // </ExcelFile>
  );
};

export default ExportLeave2Excel;
