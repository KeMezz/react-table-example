import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import { useState } from "react";
import { tableData } from "./tableData";
import "./App.css";

function App() {
  const [data] = useState([...tableData]);

  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor("name", {
      header: "이름",
      size: 60,
    }),
    columnHelper.accessor("phone", {
      header: "휴대폰",
      size: 300,
      enableSorting: false,
      cell: ({ renderValue }) =>
        renderValue().replace(/(\d{3})(\d{3,4})(\d{4})/, "$1-$2-$3"),
    }),
    columnHelper.accessor("birth", {
      header: "생년월일",
      size: 80,
    }),
    columnHelper.accessor("register_date", {
      header: "등록일",
      size: 120,
    }),
    columnHelper.accessor("last_edit_date", {
      header: "최종수정일",
      size: 120,
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <table>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                style={{
                  width: header.getSize(),
                  cursor: header.column.getCanSort() ? "pointer" : "default",
                }}
                onClick={header.column.getToggleSortingHandler()}
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                {
                  {
                    asc: <FaSortUp />,
                    desc: <FaSortDown />,
                  }[header.column.getIsSorted()]
                }
                {header.column.getCanSort() && !header.column.getIsSorted() ? (
                  <FaSort />
                ) : null}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default App;
