import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { baseUrl } from "../../settings/baseUrl";

import useDebounceHook from "../../hooks/useDebounceHook";
export interface Customer {
  id?: string;
  firstname: string;
  lastname: string;
  email?: string;
  phoneNumber: string;
  address?: string;
  postalCode?: string;
  city?: string;
  error?: string;
  customerNumber: string;
}

const MuiSearchBarComponent = () => {
  function Asynchronous() {
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState<Customer[]>([]);
    const [loading, setLoading] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState("");
    const [selectedValue, setSelectedValue] = React.useState<
      Customer | undefined
    >(undefined);
    const prepareSearchQuery = (query: string) => {
      const url = `${baseUrl}/api/customers/search/${query}`;
      return encodeURI(url);
    };
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
    const handleSearch = async () => {
      if (!searchQuery.trim()) return;

      const URL = prepareSearchQuery(searchQuery);
      setOpen(true);
      setLoading(true);
      try {
        const response = await fetch(URL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.status === 204) {
          // Handle no customers found
          // setOptions([{ id: "error", error: "No Customer Found!" }]);
          console.log("No Customers Found!");
        } else {
          const data = await response.json();
          setOptions(data);
          console.log(data);
        }
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };

    useDebounceHook(searchQuery, 500, handleSearch);
    React.useEffect(() => {
      if (!open) {
        setOptions([]);
      }
    }, [open]);

    return (
      <Autocomplete
        multiple
        disabled={selectedValue ? true : false}
        id="asynchronous-demo"
        sx={{ width: 400 }}
        open={open}
        // onChange={(event, value) => {
        //     setSelectedValue(value);
        //   }}
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
        loading={loading}
        renderOption={(props, option) => (
          <CustomOption {...props} customer={option} />
        )}
        renderInput={(params) => (
          <TextField
            multiline
            {...params}
            label="Kund"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
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
    <div className="bg-white p-5 rounded w-full mb-5 max-h-[7em] z-50">
      <Asynchronous />
    </div>
  );
};

export default MuiSearchBarComponent;
