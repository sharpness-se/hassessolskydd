import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import FormComponent from "../form/FormComponent";
import SingleFieldInputRow from "../form/SingleFieldInputRow";
import { EditCartItem } from "../../pages/CreateOrderPage";
import toast from "react-hot-toast";
import { Checkbox } from "../form/Checkbox";
import { Product } from "./Plissegardin";

interface PersiennFunctionProps {
  clearOnClick: () => void;
  cartCallback: Dispatch<SetStateAction<Product[]>>;
  product: string;
  editCartItem: Dispatch<SetStateAction<EditCartItem | undefined>>;
  cartItem: EditCartItem | undefined;
  disable: boolean;
}
interface PersiennAttributeProps {
  numberOfProduct: string;
  length: string;
  width: string;
  lamellColor: string;
  roofMount: string;
  linenColor: string;
  magnets: boolean;
  extendedPole: string;
  remote: string;
  measurementType: string;
  assembly: string;
}
const Persienn: React.FC<PersiennFunctionProps> = ({
  clearOnClick,
  cartCallback,
  product,
  editCartItem,
  cartItem,
  disable,
}) => {
  const [disableActions, setDisableActions] = useState(disable?disable: false);

  const [productDetails, setProductDetails] = useState<PersiennAttributeProps>({
    numberOfProduct: "",
    length: "",
    width: "",
    lamellColor: "",
    roofMount: "",
    linenColor: "",
    magnets: false,
    extendedPole: "",
    remote: "",
    measurementType: "",
    assembly: "",
  });
  const {
    numberOfProduct,
    length,
    width,
    lamellColor,
    roofMount,
    linenColor,
    magnets,
    extendedPole,
    remote,
    measurementType,
    assembly,
  } = productDetails;
  const item = {
    name: product.toLowerCase(),
    productDetails: [
      { attribute: "Antal", value: numberOfProduct },
      { attribute: "Bredd", value: `${width}mm` },
      { attribute: "Höjd", value: `${length}mm` },
      { attribute: "Måttyp", value: measurementType },
      { attribute: "Montagetyp", value: assembly },
      { attribute: "FH-Tak/väggmont", value: roofMount },
      { attribute: "Lamellfärg", value: lamellColor },
      { attribute: "Linfärg", value: linenColor },
      { attribute: "Reglage-Lina/Ögla", value: remote },
      { attribute: "Magneter", value: `${magnets ? "yes" : "no"}` },
      { attribute: "Förlängd Persiennstång", value: `${extendedPole}cm` },
    ],
  };
  const addToCart = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      cartCallback((prevCart) => [...prevCart, item]);
      clearOnClick();
      toast.success("Product added to cart!");
    } catch (err) {
      toast.error("Failed to Add Product to cart.");
      console.log(err);
    }
  };
  const getAttribute = useCallback(
    (attribute: string) => {
      let cartAttribute = "";
      if (cartItem) {
        const filteredItems = cartItem.cartItem.productDetails.filter(
          (item) => item.attribute === attribute
        );
        if (filteredItems.length > 0) {
          cartAttribute = filteredItems[0].value;
        }
      }
      return cartAttribute;
    },
    [cartItem]
  );
  const handleUpdateCart = () => {
    try {
      console.log("update");
      cartCallback((prev) => {
        const updatedCart = [...prev];
        if (cartItem) updatedCart[cartItem.cartItemIndex] = item;
        return updatedCart;
      });
      clearOnClick();
      editCartItem(undefined);
      toast.success("Cart updated successfully!");
    } catch (err) {
      toast.error("Failed to update cart!");
      console.log(err);
    }
  };
  const handleInputChange = <T extends keyof PersiennAttributeProps>(
    field: T,
    value: PersiennAttributeProps[T]
  ) => {
    setProductDetails((prevProductDetails) => ({
      ...prevProductDetails,
      [field]: value,
    }));
  };

  useEffect(() => {
    if (cartItem) {
      setDisableActions(true);
    }
    
    setProductDetails((prevProductDetails) => ({
      ...prevProductDetails,
      numberOfProduct: getAttribute("Antal"),
      width: getAttribute("Bredd"),
      length: getAttribute("Höjd"),
      assembly: getAttribute("Montagetyp"),
      measurementType: getAttribute("Måttyp"),
      weave: getAttribute("Vävnummer"),
      lamellColor: getAttribute("Lamellfärg"),
      roofMount: getAttribute("FH-Tak/väggmont"),
      linenColor: getAttribute("Linfärg"),
      remote: getAttribute("Reglage-Lina/Ögla"),
      magnets: getAttribute("Magneter") === "yes",
      extendedPole: getAttribute("Förlängd Persiennstång"),
    }));
  }, [cartItem, getAttribute]);
  return (
    <div>
      <h1 className="text-center font-bold text-gray-700 uppercase">
        {product}
      </h1>
      <FormComponent
        backButtonText={cartItem ? "Avbryta" : "Rensa"}
        submitButtonText={cartItem ? "Ändra" : "Lägg Till"}
        onSubmit={(e) => {
          if (cartItem) {
            e.preventDefault();
            handleUpdateCart();
          } else {
            addToCart(e);
          }
        }}
        applyGrid={true}
        customOnClickClear={() => {
          editCartItem(undefined);
          clearOnClick();
        }}
        customOnClick={() => setDisableActions(false)}
        disabled={disableActions}
        hideButtons={cartItem ? true : false}
      >
        <div className="grid w-full rounded-lg bg-white ">
          <div className="grid grid-cols-subgrid col-span-4">
            <SingleFieldInputRow
              applyGrid
              label={"Antal"}
              id={"numberOfProduct"}
              value={numberOfProduct}
              onChange={(e) => {
                handleInputChange("numberOfProduct", e.target.value);
              }}
            ></SingleFieldInputRow>
          </div>
          <SingleFieldInputRow
            applyGrid
            label={"Bredd"}
            id={"width"}
            value={width}
            onChange={(e) => {
              handleInputChange("width", e.target.value);
            }}
          ></SingleFieldInputRow>
          <SingleFieldInputRow
            applyGrid
            label={"Höjd"}
            id={"height"}
            value={length}
            onChange={(e) => {
              handleInputChange("length", e.target.value);
            }}
          ></SingleFieldInputRow>
          <SingleFieldInputRow
            applyGrid
            label={"Måttyp"}
            id={"måttyp"}
            value={measurementType}
            onChange={(e) => {
              handleInputChange("measurementType", e.target.value);
            }}
          ></SingleFieldInputRow>
          <SingleFieldInputRow
            applyGrid
            label={"Montagetyp"}
            id={"assembly"}
            value={assembly}
            onChange={(e) => {
              handleInputChange("assembly", e.target.value);
            }}
          ></SingleFieldInputRow>
          <SingleFieldInputRow
            applyGrid
            label={"FH-Tak/väggmont"}
            id={"roofmount"}
            value={roofMount}
            onChange={(e) => {
              handleInputChange("roofMount", e.target.value);
            }}
          ></SingleFieldInputRow>
          <SingleFieldInputRow
            applyGrid
            label={"Lamellfärg"}
            id={"lamellcolor"}
            value={lamellColor}
            onChange={(e) => {
              handleInputChange("lamellColor", e.target.value);
            }}
          ></SingleFieldInputRow>
          <SingleFieldInputRow
            applyGrid
            label={"Linfärg"}
            id={"linencolor"}
            value={linenColor}
            onChange={(e) => {
              handleInputChange("linenColor", e.target.value);
            }}
          ></SingleFieldInputRow>
          <SingleFieldInputRow
            applyGrid
            label={"Reglage-Lina/Ögla"}
            id={"remote"}
            value={remote}
            onChange={(e) => {
              handleInputChange("remote", e.target.value);
            }}
          ></SingleFieldInputRow>
          <Checkbox
            label={"Magneter"}
            id={"magnets"}
            value={magnets}
            onChange={(e) => {
              handleInputChange("magnets", e.target.checked);
            }}
          ></Checkbox>
          <SingleFieldInputRow
            applyGrid
            label={"Förlängd Persiennstång"}
            id={"extendedPole"}
            value={extendedPole}
            onChange={(e) => {
              handleInputChange("extendedPole", e.target.value);
            }}
          ></SingleFieldInputRow>
        </div>
      </FormComponent>
    </div>
  );
};

export default Persienn;
