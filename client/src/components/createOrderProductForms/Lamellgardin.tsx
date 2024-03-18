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
//import { Product } from "../../pages/CreateOrderPage";
interface LamellgardinAttributeProps{
  numberOfProduct: string;
  length: string;
  width: string;
  assembly: string;
  weave: string;
  fitting: string;
  controlMount: string;
  color: string;
  remote: string;
  packageLocation: string;
  angled: boolean;
  slatWidth: string;
  measurementType: string;
}

interface LamellgardinFunctionProps {
  clearOnClick: () => void;
  cartCallback: Dispatch<SetStateAction<Product[]>>;
  product: string;
  editCartItem: Dispatch<SetStateAction<EditCartItem | undefined>>;
  cartItem: EditCartItem | undefined;
}

const Lamellgardin: React.FC<LamellgardinFunctionProps> = ({
  clearOnClick,
  cartCallback,
  product,
  editCartItem,
  cartItem,
}) => {
 
  const [disable, setDisable] = useState(false);
  const [productDetails, setProductDetails] = useState<LamellgardinAttributeProps>({
    numberOfProduct: "",
    length: "",
    width: "",
    assembly: "",
    weave: "",
    fitting: "",
    controlMount: "",
    color: "",
    remote: "",
    packageLocation: "",
    angled: false,
    slatWidth: "",
    measurementType: "",
  });
  const {
    numberOfProduct,
    length,
    width,
    assembly,
    weave,
    fitting,
    controlMount,
    color,
    remote,
    packageLocation,
    angled,
    slatWidth,
    measurementType,
  } = productDetails;
  const item = {
    name: product.toLowerCase(),
    productDetails: [
      { attribute: "Antal", value: numberOfProduct },
      { attribute: "Bredd", value: `${width}mm` },
      { attribute: "Höjd", value: `${length}mm` },
      { attribute: "Måttyp", value: measurementType },
      { attribute: "Montagetyp", value: assembly },
      { attribute: "Vävnummer", value: weave },
      { attribute: "Beslag", value: fitting },
      { attribute: "Reglagesida", value: controlMount },
      { attribute: "Reglage", value: remote },
      { attribute: "Paketsida", value: packageLocation },
      { attribute: "Lamellbredd", value: slatWidth },
      { attribute: "Sneda", value: `${angled ? "yes" : "no"}` },
      { attribute: "Detaljfärg", value: color },
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
          (item: any) => item.attribute === attribute
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
  useEffect(() => {
    if (cartItem) {
      setDisable(true);
    }
    handleInputChange("numberOfProduct", getAttribute("Antal"));
    handleInputChange("width", getAttribute("Bredd"));
    handleInputChange("length", getAttribute("Höjd"));
    handleInputChange("measurementType", getAttribute("Måttyp"));
    handleInputChange("assembly", getAttribute("Montagetyp"));
    handleInputChange("weave", getAttribute("Vävnummer"));
    handleInputChange("fitting", getAttribute("Beslag"));
    handleInputChange("remote", getAttribute("Reglage"));
    handleInputChange("controlMount", getAttribute("Reglagesida"));
    handleInputChange("packageLocation", getAttribute("Paketsida"));
    handleInputChange("slatWidth", getAttribute("Lamellbredd"));
    handleInputChange("angled", getAttribute("Sneda") === "yes" ? true : false);
    handleInputChange("color", getAttribute("Detaljfärg"));
  }, [cartItem, getAttribute]);

  const handleInputChange = <T extends keyof LamellgardinAttributeProps>(
    key: T,
    value: LamellgardinAttributeProps[T]
  ) => {
    setProductDetails((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };
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
  customOnClick={() => setDisable(false)}
  disabled={disable}
  hideButtons={cartItem ? true : false}
>
  <div className="grid w-full rounded-lg bg-white ">
    <div className="grid grid-cols-subgrid col-span-4">
      <SingleFieldInputRow
        applyGrid
        label={"Antal"}
        id={"numberOfProduct"}
        value={numberOfProduct}
        onChange={(e) => handleInputChange("numberOfProduct", e.target.value)}
      />
    </div>
    <SingleFieldInputRow
      applyGrid
      label={"Bredd"}
      id={"width"}
      value={width}
      onChange={(e) => handleInputChange("width", e.target.value)}
    />
    <SingleFieldInputRow
      applyGrid
      label={"Höjd"}
      id={"height"}
      value={length}
      onChange={(e) => handleInputChange("length", e.target.value)}
    />
    <SingleFieldInputRow
      applyGrid
      label={"Måttyp"}
      id={"måttyp"}
      value={measurementType}
      onChange={(e) => handleInputChange("measurementType", e.target.value)}
    />
    <SingleFieldInputRow
      applyGrid
      label={"Montagetyp"}
      id={"montagetyp"}
      value={assembly}
      onChange={(e) => handleInputChange("assembly", e.target.value)}
    />
    <SingleFieldInputRow
      applyGrid
      label={"Vävnummer"}
      id={"weave"}
      value={weave}
      onChange={(e) => handleInputChange("weave", e.target.value)}
    />
    {/* "nextLine" */}
    <SingleFieldInputRow
      applyGrid
      label={"Beslag"}
      id={"beslag"}
      value={fitting}
      onChange={(e) => handleInputChange("fitting", e.target.value)}
    />
    <SingleFieldInputRow
      applyGrid
      label={"Reglage"}
      id={"remote"}
      value={remote}
      onChange={(e) => handleInputChange("remote", e.target.value)}
    />
    <SingleFieldInputRow
      applyGrid
      label={"Reglagesida"}
      id={"controlMount"}
      value={controlMount}
      onChange={(e) => handleInputChange("controlMount", e.target.value)}
    />
    <SingleFieldInputRow
      applyGrid
      label={"Paketsida"}
      id={"packageLocation"}
      value={packageLocation}
      onChange={(e) => handleInputChange("packageLocation", e.target.value)}
    />
    <SingleFieldInputRow
      applyGrid
      label={"Lamellbredd"}
      id={"slatewidth"}
      value={slatWidth}
      onChange={(e) => handleInputChange("slatWidth", e.target.value)}
    />
    <Checkbox
      label={"Sneda"}
      id={"angled"}
      value={angled}
      onChange={(e) => handleInputChange("angled", e.target.checked)}
    />
    <SingleFieldInputRow
      applyGrid
      label={"Detaljfärg"}
      id={"color"}
      value={color}
      onChange={(e) => handleInputChange("color", e.target.value)}
    />
  </div>
</FormComponent>

    </div>
  );
};

export default Lamellgardin;
