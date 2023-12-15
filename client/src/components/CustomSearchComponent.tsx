import React, { useEffect, useState, useRef } from "react";
import { IoClose, IoSearch } from "react-icons/io5";
import { AnimatePresence, motion } from "framer-motion";
import { useClickOutside } from "react-click-outside-hook";
import { MoonLoader } from "react-spinners";
import useDebounceHook from "../hooks/useDebounceHook";
import SearchResultComponent from "./searchBar/SearchResultComponent";

export interface Customer {
  id: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  phoneNumber?: string;
  address?: string;
  postalCode?: string;
  city?: string;
  error?: string;
}

export default function SearchBar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [parentRef, isClickedOutside] = useClickOutside();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selected, setSelected] = useState({
    firstname: "No",
    lastname: "Data",
  });
  const inputRef = useRef<HTMLInputElement>(null);
  const containerVariants = {
    expanded: { height: "auto" },
    collapse: { height: "3.8em" },
  };
  const containerTransition = { type: "spring", damping: 22, stiffness: 150 };
  const expandContainer = () => {
    if (searchResults.length > 0) {
      setIsExpanded(true);
    }
  };
  const collapseContainer = () => {
    setIsExpanded(false);
    setSearchQuery("");
    setSearchResults([]);
    setIsLoading(false);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  useEffect(() => {
    if (isClickedOutside && isExpanded) {
      collapseContainer();
    }
    if (searchResults.length > 0) {
      expandContainer();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isClickedOutside, searchResults]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchQuery(e.target.value);
  };
  const prepareSearchQuery = (query: string) => {
    const url = `http://localhost:8080/api/customers/search/${query}`;
    return encodeURI(url);
  };
  const handleSelect = (select: Customer) => {
    const selectedCustomer = {
      firstname: select.firstname || "",
      lastname: select.lastname || "",
    };
    setSelected(selectedCustomer);
    collapseContainer();
  };
  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    const URL = prepareSearchQuery(searchQuery);

    try {
      setIsLoading(true);
      const response = await fetch(URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 204) {
        // Handle 404 error
        setSearchResults([{ id: "error", error: "No Customer Found!" }]);
      } else {
          const data = await response.json();
          setSearchResults(data);
          console.log(searchResults);
        }
    } catch (error) {
      console.error(error);
    }
    
    setIsLoading(false);
  };
  useDebounceHook(searchQuery, 500, handleSearch);
  return (
    <>
      <motion.div
        animate={isExpanded ? "expanded" : "collapse"}
        variants={containerVariants}
        transition={containerTransition}
        ref={parentRef}
        className="flex flex-col w-[34em] h-[3.8em] bg-white rounded-md shadow-lg overflow-hidden"
      >
        <div className="h-[3.8em] flex relative py-[2px] px-[15px] items-center">
          <span className=" text-gray-400 text-[27px] mt-1.5 mr-2.5  transition-all duration-200 ease-in-out cursor-pointer hover:text-gray-300 ">
            <IoSearch />
          </span>
          <input
            className="w-full h-full min-h-[3.8em] outline-none border-none text-2xl text-indigo-900 font-semibold rounded-md bg-transparent focus:outline-none focus:placeholder-opacity-0 placeholder:transition-all placeholder:duration-500 placeholder:ease-in-out placeholder-gray-400"
            placeholder="Search for Customer..."
            onFocus={expandContainer}
            ref={inputRef}
            value={searchQuery}
            onChange={onChange}
          ></input>
          <AnimatePresence>
            {isExpanded && (
              <motion.span
                onClick={collapseContainer}
                className=" text-gray-400 text-[27px] mt-1.5 mr-2.5 items-center transition-all duration-200 ease-in-out cursor-pointer hover:text-gray-300 "
                key="close-icon"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                <IoClose />
              </motion.span>
            )}
          </AnimatePresence>
        </div>
        <span className="flex min-w-full min-h-[2px] bg-gray-400 opacity-60"></span>
        <div
          className={`flex w-full h-full ${
            isLoading ? "items-center" : ""
          } justify-center mt-2 `}
        >
          {isLoading && <MoonLoader loading color="#000"></MoonLoader>}

          {
            <div
              className={`block my-0 max-h-[15em] ${
                isLoading ? "hidden" : ""
              } m-8 overflow-y-auto w-full`}
            >
              {searchResults.length > 0 &&
                searchResults.map((item) => {
                  return (
                    <>
                    <SearchResultComponent
                      onSelect={handleSelect}
                      error={item.error}
                      item={item}
                      />
                      {console.log(item)}
                      </>
                  );
                })}
            </div>
          }
        </div>
      </motion.div>
      <p>{selected.firstname + " " + selected?.lastname}</p>
    </>
  );
}
