import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
// import { baseUrl } from "../../settings/baseUrl";

// import useDebounceHook from "../../hooks/useDebounceHook";
export interface Customer {
  id?: number;
  firstname: string;
  lastname: string;
  email?: string;
  phoneNumber?: string;
  address?: string;
  postalCode?: string;
  city?: string;
  error?: string;
  customerNumber: string;
}

interface SearchBarProps {
  setSelectedCustomer: (selectedCustomer: Customer | undefined) => void;
  selectedCustomer: Customer | undefined;
  //inputValue: string;
  //onInputChange: (newInputValue: string) => void;
  options: Customer[] | [];
  setOptions: (newInputValue: Customer[]) => void;
  //selectedReturn: Customer | undefined;
  //setSelectedReturn: React.Dispatch<React.SetStateAction<Customer | undefined>>;
}

const MuiSearchBarComponent: React.FC<SearchBarProps> = ({
  selectedCustomer,
  setSelectedCustomer,
  //inputValue,
  //onInputChange,
  options,
  setOptions,
  //selectedReturn,
  //setSelectedReturn,
}) => {
  function Asynchronous() {
    const [open, setOpen] = React.useState(false);
    //const [options, setOptions] = React.useState<Customer[]>([]);
    const [searchQuery, setSearchQuery] = React.useState("");
    
    const CustomOption: React.FC<{ customer: Customer }> = ({
      customer,
      ...props
    }) => (
      <div className="hover:bg-blue-500 hover:text-white">
        <span {...props}>
          {customer.firstname + " " + customer.lastname}
          <br />
          {customer.email}
          <br />
          {customer.phoneNumber}
        </span>
      </div>
    );
    //const [loading, setLoading] = React.useState(false);
    // const prepareSearchQuery = (query: string) => {
    //   const url = `${baseUrl}/api/customers/search/${query}`;
    //   return encodeURI(url);
    // };
    // const handleSearch = async () => {
    //   //if (!searchQuery.trim()) return;
    //   console.log("searchQuery" + searchQuery);
    //   const URL = prepareSearchQuery(searchQuery);
    //   setLoading(true);
    //   setSelectedReturn(undefined);
    //   try {
    //     const response = await fetch(URL, {
    //       method: "GET",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     });

    //     if (response.status === 204) {
    //       // Handle no customers found
    //       // setOptions([{ id: "error", error: "No Customer Found!" }]);
    //       console.log("No Customers Found!");
    //     } else {
    //       const data = await response.json();
    //       setOptions(data);
    //       console.log(data);
    //       setOpen(true);
    //       const inputElement = document.getElementById("mui-search-bar-input");
    //       if (inputElement) {
    //         inputElement.focus();
    //       }
    //     }
    //   } catch (error) {
    //     console.error(error);
    //   }
    //   setLoading(false);
    //   // setOpen(true)
    // };

    // useDebounceHook(searchQuery, 500, handleSearch);

    React.useEffect(() => {
     
    }, [open]);

    return (
      <Autocomplete
        
        //disabled={selectedCustomer ? true : false}
        id="asynchronous-demo"
        sx={{ width: 400 }}
        open={open}
        value={selectedCustomer}
        onChange={(event, value) => {
          if (value) {
            setSelectedCustomer(value);
          } else {
            setSelectedCustomer(undefined);
          }
        }}
        
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        isOptionEqualToValue={(
          option: {
            customerNumber: string;
            firstname: string;
            lastname: string;
          },
          value: { firstname: string; lastname: string; customerNumber: string }
        ) =>
          `${option.firstname} ${option.lastname}, ${option.customerNumber}` ===
          `${value.firstname} ${value.lastname}, ${value.customerNumber}`
        }
        getOptionLabel={(option: {
          firstname: string;
          lastname: string;
          customerNumber: string;
        }) => `${option.firstname} ${option.lastname}`}
        options={options}
       // loading={loading}
        renderOption={(props, option) => (
          <CustomOption {...props} customer={option} />
        )}
        //inputValue={searchQuery} // Use inputValue instead of value
        // onInputChange={(event, newInputValue) => {
        //   console.log("new search:")
        //   setSearchQuery(newInputValue);
        // }}
        renderInput={(params) => (
          <TextField
            
            {...params}
            label="Kund"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {/* {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null} */}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}
      />
    );
  }
  return (
    <div className="bg-white p-5 rounded w-full mb-5 z-50">
      <h2 className="uppercase tracking-wide text-gray-700 text-s font-bold mb-3">
        Välj kund
      </h2>
      <Asynchronous />
    </div>
  );
};

export default MuiSearchBarComponent;
