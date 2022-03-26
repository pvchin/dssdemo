import React, { useMemo } from "react";
import {
  Box,
  Divider,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  chakra,
} from "@chakra-ui/react";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { useTable, useSortBy, useRowSelect } from "react-table";
import { formatPrice } from "../helpers/Utils";

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef()
    const resolvedRef = ref || defaultRef

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate
    }, [resolvedRef, indeterminate])

    return (
      <>
        <input type="checkbox" ref={resolvedRef} {...rest} />
      </>
    )
  }
)

export default function PayRunTable({ columns, data }) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, selectedFlatRows, state: {selectedRowIds} } =
    useTable({ columns, data },
      useSortBy,
      useRowSelect,
      hooks => {
        hooks.visibleColumns.push(columns => [
          {
            id: 'selection',
            Header: ({ getToggleAllRowsSelectedProps }) => (
              <div>
                <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
              </div>
            ),
            Cell: ({ row }) => (
              <div>
                <IndeterminateCheckbox { ...row.getToggleRowsSelectedProps()} />
              </div>
            ),
          },
          ...columns,
        ])
      }
    
    );

  return (
    <Table
      border="1px solid black"
      colorScheme="whiteAlpha"
      variant="simple"
      {...getTableProps()}
    >
      <Thead position="sticky" top="1" bgColor="blue.200">
        {headerGroups.map((headerGroup) => (
          <Tr  {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <Th
                {...column.getHeaderProps(column.getSortByToggleProps())}
                isNumeric={column.isNumeric}
              >
                {column.render("Header")}
                <chakra.span pl="4">
                  {column.isSorted ? (
                    column.isSortedDesc ? (
                      <TriangleDownIcon aria-label="sorted descending" />
                    ) : (
                      <TriangleUpIcon aria-label="sorted ascending" />
                    )
                  ) : null}
                </chakra.span>
              </Th>
            ))}
          </Tr>
        ))}
      </Thead>

      <Tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <Tr bgColor="gray.50" {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <Td
                  borderBottom="1px solid black"
                  borderRight="1px solid black"
                  bgColor="whiteAlpha.400"
                  {...cell.getCellProps()}
                  isNumeric={cell.column.isNumeric}
                >
                  {cell.render("Cell")}
                </Td>
              ))}
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
}
