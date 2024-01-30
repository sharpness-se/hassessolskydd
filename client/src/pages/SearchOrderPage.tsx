import React, { useEffect, useState } from "react";
import { baseUrl } from "../settings/baseUrl";
import {
  useReactTable,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  AccessorFn,
} from "@tanstack/react-table";

type Order = { customerNumber: string; firstContact: string; id: string };

export default function SearchOrderPage() {
  const [orderList, setOrderList] = useState<Order[]>([]);
  const columnHelper = createColumnHelper<Order>();

  const columns = [
    columnHelper.accessor((row) => `${row.customerNumber}`, {
      id: "customerNumber",
      header: "Customer Id",
    }),
    columnHelper.accessor((row) => `${row.firstContact.slice(0, 10)}`, {
      id: "firstContact",
      header: "Date",
    }),
    columnHelper.accessor((row) => `${row.id}`, {
      id: "id",
      header: "Order ID",
    }),
  ];

  useEffect(() => {
    const fetchData: () => Promise<void> = async () => {
      const prepareUrl = () => {
        const url = `${baseUrl}/api/order/all`;
        return encodeURI(url);
      };
      try {
        const response = await fetch(prepareUrl(), {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.status === 204) {
          console.log("No Customers Found!");
        } else {
          const data = await response.json();
          setOrderList(data);
          console.table(data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const table = useReactTable({
    data: orderList, // Renamed 'orderList' to 'data'
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="flex min-h-screen flex-col items-center p-20 xl:px">
      <h1 data-test="search-heading" className="text-5xl mb-11 min-w-max">
        Sök Ordrar
      </h1>

      <div className="w-full rounded-lg p-10 bg-white shadow-md">
        <h2 className="text-xl font-bold text-gray-700 mb-3">Sök Ordrar</h2>

        <table className="table-auto border-separate border-spacing-2 border border-slate-400">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => {
              return (
                <tr key={headerGroup.id} className="text-sm text-left">
                  {headerGroup.headers.map((header) => {
                    return (
                      <th id={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </th>
                    );
                  })}
                </tr>
              );
            })}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => {
              return (
                <tr key={row.id} className="border">
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td
                        key={cell.id}
                        className="px-5 py-1 text-[10px] border border-cyan-800"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
