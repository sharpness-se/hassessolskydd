import React, { useEffect, useState } from "react";
import { baseUrl } from "../settings/baseUrl";
import { Row } from "react-table";

import {
  useReactTable,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  AccessorFn,
  ColumnDef,
} from "@tanstack/react-table";
import { Customer } from "../components/searchBar/CustomSearch";

type Order = { customerNumber: string; firstContact: string; id: string };

type OrderInfo = { order: Order; customer: Customer };
interface RowType {
  id: string; // Adjust the type according to your data structure
  original: OrderInfo; // Adjust the type according to your data structure
  // Add other properties as needed based on your actual data structure
}

export default function SearchOrderPage() {
  const [orderList, setOrderList] = useState<OrderInfo[]>([]);
  const columnHelper = createColumnHelper<OrderInfo>();

  const columns = [
    columnHelper.accessor(
      (row) => `${row.customer.firstname} ${row.customer.lastname}`,
      { id: "name", header: "Customer" }
    ),
    columnHelper.accessor((row) => `${row.order.customerNumber.slice(0,12)}`, {
      id: "customerNumber",
      header: "Customer Id",
    }),
    columnHelper.accessor((row) => `${row.order.firstContact.slice(0, 10)}`, {
      id: "firstContact",
      header: "Date",
    }),
    columnHelper.accessor((row) => `${row.order.id}`, {
      id: "id",
      header: "Order ID",
    }),
    columnHelper.accessor((row) => `${row.customer.city}`, {
      id: "region",
      header: "Region",
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
        Se Ordrar
      </h1>

      <div className="table-auto w-full rounded-lg p-10 bg-white shadow-md">
      {/* <h2 className="text-xl font-bold text-gray-700 mb-3">Sök Ordrar</h2> */}

        <table className="h-full w-full border-spacing-4 min-h-[20em] p-2">
          <thead >
            {table.getHeaderGroups().map((headerGroup) => {
              return (
                <tr key={headerGroup.id} className="text-sm">
                  {headerGroup.headers.map((header) => {
                    return (
                      <th id={header.id} className="text-left pl-2">
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
          <tbody className="">
            {table.getRowModel().rows.map((row) => {
              return (
                <tr
                  key={row.id}
                  className="shadow-lg hover:bg-blue-600 hover:font-sm hover:text-white"
                >
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td key={cell.id} className="text-[16px] mx-1 flex-wrap pl-2">
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
