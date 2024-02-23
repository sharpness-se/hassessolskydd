import React, { useEffect, useState } from "react";
import { baseUrl } from "../settings/baseUrl";

import {
  useReactTable,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  ColumnSort,
} from "@tanstack/react-table";
import { Customer } from "../components/searchBar/CustomSearch";
import Navbar from "../components/NavbarComponent";
import { useNavigate } from "react-router-dom";

export type Order = {
  customerNumber: string;
  firstContact: string;
  id: string;
};

export type OrderInfo = { order: Order; customer: Customer };

export default function SearchOrderPage() {
  const [orderList, setOrderList] = useState<(OrderInfo | Customer)[]>([]);
  const orderColumnHelper = createColumnHelper<OrderInfo | Customer>();
  const [filteredList, setFilteredList] =
    useState<(OrderInfo | Customer)[]>(orderList);
  const [sorting, setSorting] = React.useState<ColumnSort[]>([]);
  const [showOrder, setShowOrder] = useState(true);
  const navigate = useNavigate();
  const columns = [
    orderColumnHelper.accessor(
      (row) => {
        if ("customer" in row) {
          return `${row.customer.firstname} ${row.customer.lastname}`;
        }
        return `${row.firstname} ${row.lastname}`;
      },
      { id: "name", header: "Customer" },
    ),
    orderColumnHelper.accessor(
      (row) => {
        if ("order" in row) {
          return `${row.order.customerNumber}`;
        }
        return `${row.customerNumber}`;
      },
      { id: "customerNumber", header: "Customer Id" },
    ),
    orderColumnHelper.accessor(
      (row) => {
        if ("order" in row) {
          return `${row.order.firstContact.slice(0, 10)}`;
        }
        return `${row.phoneNumber}`;
      },
      {
        id: showOrder ? "firstContact" : "phoneNumber",
        header: showOrder ? "Date" : "Telefon",
      },
    ),
    orderColumnHelper.accessor(
      (row) => {
        if ("order" in row) {
          return `${row.order.id}`;
        }
        return `${row.email}`;
      },
      {
        id: showOrder ? "id" : "email",
        header: showOrder ? "Order Id" : "Email",
      },
    ),
    orderColumnHelper.accessor(
      (row) => {
        if ("customer" in row) {
          return `${row.customer.city}`;
        }
        return `${row.city}`;
      },
      { id: "region", header: "Region" },
    ),
  ];

  useEffect(() => {
    function prepareUrl(url: string) {
      return encodeURI(url);
    }
    console.log(showOrder);
    const fetchData: (showOrderData: boolean) => Promise<void> = async (
      showOrderData,
    ) => {
      let encodedURL = "";
      if (showOrderData) {
        encodedURL = prepareUrl(`${baseUrl}/api/order/all`);
      } else {
        encodedURL = prepareUrl(`${baseUrl}/api/customers`);
      }

      try {
        const response = await fetch(encodedURL, {
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
          setFilteredList(data);
          console.table(data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchData(showOrder);
  }, [showOrder]);

  const table = useReactTable({
    data: filteredList,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting: sorting,
    },
    onSortingChange: setSorting,
  });

  const filterOrders = (input: string) => {
    const filteredArray = orderList.filter((item) => {
      let customerName;
      if ("customer" in item) {
        customerName = `${item.customer.firstname} ${item.customer.lastname} ${item.customer.customerNumber} ${item.customer.city} ${item.order.id} ${item.order.firstContact}`;
      } else {
        customerName = `${item.firstname} ${item.lastname} ${item.customerNumber} ${item.city} ${item.email} ${item.phoneNumber}`;
      }
      return customerName.toLowerCase().includes(input?.toLowerCase() || "");
    });

    return filteredList.length > 0
      ? setFilteredList(filteredArray)
      : setFilteredList(orderList);
  };

  return (
    <>
      <Navbar title="Se Ordrar" />
      <div className="flex min-h-screen flex-col items-center p-20 xl:px">
        <div className="flex justify-left w-full">
          <input
            className="appearance-none text-gray-700 border shadow-md rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white w-[20em]"
            placeholder={`${showOrder ? "Sök order..." : "Sök kund..."}`}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              filterOrders(e.target.value);
            }}
          />
        </div>
        <div className="flex items-start w-full">
          <button
            className={` ${showOrder ? "bg-white font-bold" : "bg-gray-400 text-white"} px-6 py-2 rounded-t `}
            onClick={() => {
              setShowOrder(true);
            }}
          >
            Ordrar
          </button>
          <button
            className={` ${showOrder ? "bg-gray-400 text-white" : "bg-white font-bold"} px-6 py-2  rounded-t `}
            onClick={() => setShowOrder(false)}
          >
            Kunder
          </button>
        </div>
        <div className="bg-white p-5 w-full rounded-r-lg rounded-bl-lg">
          <div className="w-full h-[500px] max-h-[500px] overflow-scroll overflow-hidden">
            <table className="w-full border-spacing-4 p-2">
              <thead className="bg-blue-500 sticky top-0">
                {table.getHeaderGroups().map((headerGroup) => {
                  return (
                    <tr key={headerGroup.id} className="text-md text-white">
                      {headerGroup.headers.map((header) => {
                        const isSorted = header.column.getIsSorted();
                        const sortIcon =
                          isSorted === "asc"
                            ? " 🔼"
                            : isSorted === "desc"
                              ? " 🔽"
                              : null;
                        return (
                          <th
                            key={header.id}
                            className="text-left p-5"
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext(),
                                )}

                            {sortIcon}
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
                      className="hover:bg-blue-600 hover:font-sm hover:text-white"
                      onClick={() => {
                        if ((row.original as Customer).customerNumber)
                          navigate(
                            `/customer/${(row.original as Customer).customerNumber}`,
                          );
                      }}
                    >
                      {row.getVisibleCells().map((cell, index) => {
                        return (
                          <td
                            key={cell.id}
                            className="text-[16px] p-5 min-w-[6em]"
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext(),
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
      </div>
    </>
  );
}
