import React, { useMemo } from "react";

import { useTable, useRowSelect } from "react-table";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  Input,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  chakra,
} from "@chakra-ui/react";
import { useEmployees } from "./employees/useEmployees";

// const Styles = styled.div`
//   padding: 1rem;

//   table {
//     border-spacing: 0;
//     border: 1px solid black;

//     tr {
//       :last-child {
//         td {
//           border-bottom: 0;
//         }
//       }
//     }

//     th,
//     td {
//       margin: 0;
//       padding: 0.5rem;
//       border-bottom: 1px solid black;
//       border-right: 1px solid black;

//       :last-child {
//         border-right: 0;
//       }
//     }
//   }
// `;

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
      <div>
        <input
          style={{ fontSize: "90px", height: "50px", width: "50px" }}
          type="checkbox"
          ref={resolvedRef}
          {...rest}
        />
      </div>
    );
  }
);

function PayTable({ columns, data, state, setState }) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
    state: { selectedRowIds },
  } = useTable(
    {
      columns,
      data,
    },
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        // Let's make a column for selection
        {
          id: "selection",
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <Box fontSize="20">
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            </Box>
          ),
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ]);
    }
  );

  const handleSubmit = () => {
    console.log("select", selectedFlatRows);
  };

  React.useEffect(() => {
    setState(selectedFlatRows)
  },[selectedFlatRows])

  // Render the UI for your table
  return (
    <>
      <Table colorScheme="whiteAlpha" variant="simple" {...getTableProps()}>
        <Thead fontSize="16" position="sticky" top="1" bgColor="blue.200">
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {rows.slice(0, 10).map((row, i) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <Td
                      margin="0"
                      p="1"
                      borderBottom="1px solid black"
                      //borderRight="1px solid black"
                      fontSize="15"
                      bgColor="whiteAlpha.400"
                      {...cell.getCellProps()}
                    >
                      {cell.render("Cell")}
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      <Button variant="solid" onClick={handleSubmit}>
        Submit
      </Button>
      {/* <p>Selected Rows: {Object.keys(selectedRowIds).length}</p>
      <pre>
        <code>
          {JSON.stringify(
            {
              selectedRowIds: selectedRowIds,
              "selectedFlatRows[].original": selectedFlatRows.map(
                (d) => d.original
              ),
            },
            null,
            2
          )}
        </code>
      </pre> */}
    </>
  );
}

function PayRunTable() {
  const [state,setState] = React.useState({})
  const columns = React.useMemo(() => [
    {
      Header: "Name",
      accessor: "name",
    },
  ]);

  const { employees } = useEmployees();
  console.log("select", state)
  return <PayTable columns={columns} data={employees} state={state} setState={setState} />;
}

export default PayRunTable;
