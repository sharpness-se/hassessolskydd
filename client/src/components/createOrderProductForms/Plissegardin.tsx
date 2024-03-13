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
//import { Product } from "../../pages/CreateOrderPage";
interface ProductAttribute {
  attribute: string;
  value: string;
}
export interface Product {
  name: string;
  productDetails: ProductAttribute[];
}

interface PlissegardinProps {
  clearOnClick: () => void;
  cartCallback: Dispatch<SetStateAction<Product[]>>;
  product: string;
  editCartItem: Dispatch<SetStateAction<EditCartItem | undefined>>;
  cartItem: EditCartItem | undefined;
}

const Plissegardin: React.FC<PlissegardinProps> = ({
  clearOnClick,
  cartCallback,
  product,
  editCartItem,
  cartItem,
}) => {
  const [numberOfProduct, setNumberOfProduct] = useState("");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [model, setModel] = useState("");
  const [weave, setWeave] = useState("");
  const [fitting, setFitting] = useState("");
  const [ordinaryFitting, setOrdinaryFitting] = useState(false);
  const [color, setColor] = useState("");
  const [remote, setRemote] = useState("");
  const [disable, setDisable] = useState(false);
  const [measurementType, setMeasurementType] = useState("");
  const [assembly, setAssembly] = useState("");
  const [remoteLocation, setRemoteLocation] = useState("");
  const item = {
    name: product.toLowerCase(),
    productDetails: [
      { attribute: "Antal", value: numberOfProduct },
      { attribute: "Bredd", value: `${width}mm` },
      { attribute: "Höjd", value: `${length}mm` },
      { attribute: "Måttyp", value: measurementType },
      { attribute: "Montagetyp", value: assembly },
      { attribute: "Modell", value: model },
      { attribute: "Vävnummer", value: weave },
      { attribute: "Beslag", value: fitting },
      {
        attribute: "Allmodebeslag",
        value: `${ordinaryFitting ? "yes" : "no"}`,
      },
      { attribute: "Reglage", value: remote },
      { attribute: "Reglagesida", value: remoteLocation },
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
    setAssembly(getAttribute("Montagetyp"));
    setMeasurementType(getAttribute("Måttyp"));
    setWeave(getAttribute("Vävnummer"));
    setFitting(getAttribute("Beslag"));
    setOrdinaryFitting(getAttribute("Allmodebeslag") === "yes" ? true : false);
    setRemote(getAttribute("Reglage"));
    setRemoteLocation(getAttribute("Reglagesida"));
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
            id={"assembly"}
            value={assembly}
            onChange={(e) => {
              setAssembly(e.target.value);
            }}
          ></SingleFieldInputRow>
          <SingleFieldInputRow
            applyGrid
            label={"Modell"}
            id={"model"}
            value={model}
            onChange={(e) => {
              setModel(e.target.value);
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
          {/* <SingleFieldInputRow
            applyGrid
            label={"Allmodebeslag"}
            id={"ordinaryFitting"}
            value={ordinaryFitting}
            onChange={(e) => {
              setOrdinaryFitting(e.target.value);
            }}
          ></SingleFieldInputRow> */}
          <Checkbox
            //applyGrid
            label={"Allmodebeslag"}
            id={"ordinaryFitting"}
            value={ordinaryFitting}
            onChange={(e) => {
              setOrdinaryFitting(e.target.checked);
            }}
          ></Checkbox>
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
            id={"remotelocation"}
            value={remoteLocation}
            onChange={(e) => {
              setRemoteLocation(e.target.value);
            }}
          ></SingleFieldInputRow>
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

export default Plissegardin;
