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
interface ProductAttribute {
  attribute: string;
  value: string;
}


interface LamellgardinProps {
  clearOnClick: () => void;
  cartCallback: Dispatch<SetStateAction<Product[]>>;
  product: string;
  editCartItem: Dispatch<SetStateAction<EditCartItem | undefined>>;
  cartItem: EditCartItem | undefined;
}

const Lamellgardin: React.FC<LamellgardinProps> = ({
  clearOnClick,
  cartCallback,
  product,
  editCartItem,
  cartItem,
}) => {
  const [numberOfProduct, setNumberOfProduct] = useState("");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [assembly, setAssembly] = useState("");
  const [weave, setWeave] = useState("");
  const [fitting, setFitting] = useState("");
  const [controlMount, setControlMount] = useState("");
  const [color, setColor] = useState("");
  const [remote, setRemote] = useState("");
  const [disable, setDisable] = useState(false);
  const [packageLocation, setPackageLocation] = useState("");
  const [angled, setAngled] = useState(false);
  const [slatWidth, setSlatWidth] = useState("");
  const [measurementType, setMeasurementType] = useState("");
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
    setNumberOfProduct(getAttribute("Antal"));
    setWidth(getAttribute("Bredd"));
    setLength(getAttribute("Höjd"));
    setMeasurementType(getAttribute("Måttyp"));
    setAssembly(getAttribute("Montagetyp"));
    setWeave(getAttribute("Vävnummer"));
    setFitting(getAttribute("Beslag"));
    setRemote(getAttribute("Reglage"));
    setControlMount(getAttribute("Reglagesida"));
    setPackageLocation(getAttribute("Paketsida"));
    setSlatWidth(getAttribute("Lamellbredd"));
    setAngled(getAttribute("Sneda") === "yes" ? true : false);
    setColor(getAttribute("Detaljfärg"));
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
              onChange={(e) => {
                setNumberOfProduct(e.target.value);
              }}
            ></SingleFieldInputRow>
          </div>
          <SingleFieldInputRow
            applyGrid
            label={"Bredd"}
            id={"width"}
            value={width}
            onChange={(e) => {
              setWidth(e.target.value);
            }}
          ></SingleFieldInputRow>
          <SingleFieldInputRow
            applyGrid
            label={"Höjd"}
            id={"height"}
            value={length}
            onChange={(e) => {
              setLength(e.target.value);
            }}
          ></SingleFieldInputRow>
          <SingleFieldInputRow
            applyGrid
            label={"Måttyp"}
            id={"måttyp"}
            value={measurementType}
            onChange={(e) => {
              setMeasurementType(e.target.value);
            }}
          ></SingleFieldInputRow>

          <SingleFieldInputRow
            applyGrid
            label={"Montagetyp"}
            id={"montagetyp"}
            value={assembly}
            onChange={(e) => {
              setAssembly(e.target.value);
            }}
          ></SingleFieldInputRow>
          <SingleFieldInputRow
            applyGrid
            label={"Vävnummer"}
            id={"weave"}
            value={weave}
            onChange={(e) => {
              setWeave(e.target.value);
            }}
          ></SingleFieldInputRow>
          {/* "nextLine" */}
          <SingleFieldInputRow
            applyGrid
            label={"Beslag"}
            id={"beslag"}
            value={fitting}
            onChange={(e) => {
              setFitting(e.target.value);
            }}
          ></SingleFieldInputRow>
          <SingleFieldInputRow
            applyGrid
            label={"Reglage"}
            id={"remote"}
            value={remote}
            onChange={(e) => {
              setRemote(e.target.value);
            }}
          ></SingleFieldInputRow>
          <SingleFieldInputRow
            applyGrid
            label={"Reglagesida"}
            id={"controlMount"}
            value={controlMount}
            onChange={(e) => {
              setControlMount(e.target.value);
            }}
          ></SingleFieldInputRow>
          <SingleFieldInputRow
            applyGrid
            label={"Paketsida"}
            id={"packageLocation"}
            value={packageLocation}
            onChange={(e) => {
              setPackageLocation(e.target.value);
            }}
          ></SingleFieldInputRow>
          <SingleFieldInputRow
            applyGrid
            label={"Lamellbredd"}
            id={"slatewidth"}
            value={slatWidth}
            onChange={(e) => {
              setSlatWidth(e.target.value);
            }}
          ></SingleFieldInputRow>
          <Checkbox
            label={"Sneda"}
            id={"angled"}
            value={angled}
            onChange={(e) => {
              setAngled(e.target.checked);
            }}
          ></Checkbox>
          <SingleFieldInputRow
            applyGrid
            label={"Detaljfärg"}
            id={"color"}
            value={color}
            onChange={(e) => {
              setColor(e.target.value);
            }}
          ></SingleFieldInputRow>
        </div>
      </FormComponent>
    </div>
  );
};

export default Lamellgardin;
