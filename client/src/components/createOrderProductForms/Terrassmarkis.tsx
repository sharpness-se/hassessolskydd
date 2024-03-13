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

interface TerrassmarkisProps {
  clearOnClick: () => void;
  cartCallback: Dispatch<SetStateAction<Product[]>>;
  product: string;
  editCartItem: Dispatch<SetStateAction<EditCartItem | undefined>>;
  cartItem: EditCartItem | undefined;
}

const Terrassmarkis: React.FC<TerrassmarkisProps> = ({
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
  const [coating, setCoating] = useState("");
  const [motor, setMotor] = useState("");
  const [color, setColor] = useState("");
  const [remote, setRemote] = useState("");
  const [disable, setDisable] = useState(false);
  const [facade, setFacade] = useState("");
  const [support, setSupport] = useState(false);
  const [measurementType, setMeasurementType] = useState("");
  const [automatic, setAutomatic] = useState(false);
  const [shakeSensor, setShakeSensor] = useState(false);
  const item = {
    name: product.toLowerCase(),
    productDetails: [
      { attribute: "Antal", value: numberOfProduct },
      { attribute: "Utfall", value: `${length}cm` },
      { attribute: "Bredd", value: `${width}cm` },
      { attribute: "Modell", value: model },
      { attribute: "Måttyp", value: measurementType },
      { attribute: "Vävnummer", value: weave },
      { attribute: "Kappa", value: coating },
      { attribute: "Vevväxel/motor", value: motor },
      { attribute: "Fasadtyp", value: facade },
      { attribute: "Fjärrkontroll", value: remote },
      {
        attribute: "SolVindAutomatik",
        value: `${automatic ? "yes" : "no"}`,
      },
      {
        attribute: "Skaksensor",
        value: `${shakeSensor ? "yes" : "no"}`,
      },
      { attribute: "Stödben", value: `${support ? "yes" : "no"}` },
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
    setLength(getAttribute("Utfall"));
    setMeasurementType(getAttribute("Måttyp"));
    setModel(getAttribute("Modell"));
    setWeave(getAttribute("Vävnummer"));
    setCoating(getAttribute("Kappa"));
    setMotor(getAttribute("Vevväxel/motor"));
    setFacade(getAttribute("Fasadtyp"));
    setRemote(getAttribute("Fjärrkontroll"));
    setAutomatic(getAttribute("SolVindAutomatik") === "yes" ? true : false);
    setShakeSensor(getAttribute("Skaksensor") === "yes" ? true : false);
    setSupport(getAttribute("Stödben") === "yes" ? true : false);
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
            label={"Utfall"}
            id={"height"}
            value={length}
            onChange={(e) => {
              setLength(e.target.value);
            }}
          ></SingleFieldInputRow>
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
            label={"Måttyp"}
            id={"måttyp"}
            value={measurementType}
            onChange={(e) => {
              setMeasurementType(e.target.value);
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
            label={"Kapa"}
            id={"coating"}
            value={coating}
            onChange={(e) => {
              setCoating(e.target.value);
            }}
          ></SingleFieldInputRow>
          <SingleFieldInputRow
            applyGrid
            label={"Vevväxel/motor"}
            id={"motor"}
            value={motor}
            onChange={(e) => {
              setMotor(e.target.value);
            }}
          ></SingleFieldInputRow>
          <SingleFieldInputRow
            applyGrid
            label={"Fasadtyp"}
            id={"facad"}
            value={facade}
            onChange={(e) => {
              setFacade(e.target.value);
            }}
          ></SingleFieldInputRow>
          <SingleFieldInputRow
            applyGrid
            label={"Fjärrkontroll"}
            id={"remote"}
            value={remote}
            onChange={(e) => {
              setRemote(e.target.value);
            }}
          ></SingleFieldInputRow>
          <Checkbox 
            label={"Sol&Vind Automatik"}
            id={"automatic"}
            value={automatic}
            onChange={(e) => {
              setAutomatic(e.target.checked);
            }}
          ></Checkbox>
          <Checkbox 
            label={"Skaksensor"}
            id={"shake"}
            value={shakeSensor}
            onChange={(e) => {
              setShakeSensor(e.target.checked);
            }}
          ></Checkbox>
          <Checkbox
            label={"Stödben"}
            id={"support"}
            value={support}
            onChange={(e) => {
              setSupport(e.target.checked);
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

export default Terrassmarkis;
