import React, { useEffect, useState, useCallback } from "react";
import { Customer } from "../components/searchBar/MuiSearchBarComponent";
import { baseUrl } from "../settings/baseUrl";
import { useParams } from "react-router-dom";
import CreateCustomerComponent from "../components/CreateCustomerComponent";
import { Order} from "./SearchOrderPage";
import {
  ColumnSort,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

function EditCustomerPage() {
  const [customer, setCustomer] = useState<Customer>();
  const [disabled, setDisabled] = useState(true);
  const [orderList, setOrderList] = useState<Order[]>([]);
  const orderColumnHelper = createColumnHelper<Order>();
  const [filteredList, setFilteredList] = useState<Order[]>(orderList);
  const [sorting, setSorting] = React.useState<ColumnSort[]>([]);
  let { id } = useParams();

  const fetchCustomerData = useCallback(async () => {
    const prepareUrl = (id: string | undefined) => {
      const url = `${baseUrl}/api/customer/${id}`;

      return encodeURI(url);
    };
    try {
      const response = await fetch(prepareUrl(id), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 204) {
        console.log("No Customers Found!");
      } else {
        const data: Customer = await response.json();
        setCustomer(data);
        console.log(data);
      }
    } catch (err) {
      console.error(err);
    }
  }, [id]);

  useEffect(() => {
    fetchCustomerData();
  }, [fetchCustomerData]);

  function handleOnClick() {
    setDisabled(false);
  }

  function handleCancel() {
    setDisabled(true);
    fetchCustomerData();
  }
  
  
  useEffect(() => {
    function prepareUrl(url: string) {
      return encodeURI(url);
    }

    const fetchData: () => Promise<void> = async () => {
      const encodedURL = prepareUrl(
        `${baseUrl}/api/order/all/${id}`
      );

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
    fetchData();
  }, [id]);
  const columns = [

    orderColumnHelper.accessor(
      (row) => {
        return `${row.customerNumber}`;
      },
      { id: "customerNumber", header: "Customer Id" }
    ),
    orderColumnHelper.accessor(
      (row) => {
        return `${row.firstContact.slice(0, 10)}`;
      },
      {
        id: "firstContact",
        header: "Date",
      }
    ),
    orderColumnHelper.accessor(
      (row) => {
        return `${row.id}`;
      },
      {
        id: "id",
        header: "Order Id",
      }
    ),
  ];
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
      const customerName = ` ${item.id} ${item.firstContact}`;

      return customerName.toLowerCase().includes(input?.toLowerCase() || "");
    });

    return filteredList.length > 0
      ? setFilteredList(filteredArray)
      : setFilteredList(orderList);
  };
  return (
    <>
      <div className="flex min-h-screen flex-col items-center p-24 ">
        <div className="w-full max-w-lg rounded-lg p-10 bg-white shadow-md">
          <h2 className="text-xl font-bold text-gray-600 mb-3">Se Kund</h2>
          <CreateCustomerComponent
            customer={customer}
            disabled={disabled}
            hideButtons={true}
            submitButtonText={"Ändra"}
            customOnClick={handleOnClick}
            customCancel={handleCancel}
            paramId={id}
          ></CreateCustomerComponent>
        </div>
      </div>
      <div className="flex min-h-screen flex-col items-center p-20 xl:px">
        <div className="flex justify-left w-full">
          <input
            className="appearance-none text-gray-700 border shadow-md rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white w-[20em]"
            placeholder={`Sök order...`}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              filterOrders(e.target.value);
            }}
          />
        </div>

        <div className="table-auto w-full rounded-r-lg rounded-bl-lg p-10 bg-white">
          <table className="w-full border-spacing-4 p-2">
            <thead className="bg-blue-500">
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
                                header.getContext()
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
                    // onClick={() => {
                    //   if ((row.original as Customer).customerNumber)
                    //     navigate(
                    //       `/customer/${(row.original as Customer).customerNumber}`
                    //     );
                    // }}
                  >
                    {row.getVisibleCells().map((cell, index) => {
                      return (
                        <td
                          key={cell.id}
                          className="text-[16px] p-5 min-w-[6em]"
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
    </>
  );
}

export default EditCustomerPage;
