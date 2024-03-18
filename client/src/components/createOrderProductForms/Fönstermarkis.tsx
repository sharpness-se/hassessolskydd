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

interface FönstermarkisAttributeProps {
  numberOfProduct: string;
  length: string;
  width: string;
  model: string;
  weave: string;
  motor: string;
  shakeSensor: boolean;
  color: string;
  remote: string;
  disable: boolean;
  measurementType: string;
  coating: string;
  facade: string;
  solar: boolean;
  support: boolean;
}

interface FönstermarkisProps {
  clearOnClick: () => void;
  cartCallback: Dispatch<SetStateAction<Product[]>>;
  product: string;
  editCartItem: Dispatch<SetStateAction<EditCartItem | undefined>>;
  cartItem: EditCartItem | undefined;
}

const Fönstermarkis: React.FC<FönstermarkisProps> = ({
  clearOnClick,
  cartCallback,
  product,
  editCartItem,
  cartItem,
}) => {
  // const [numberOfProduct, setNumberOfProduct] = useState("");
  // const [length, setLength] = useState("");
  // const [width, setWidth] = useState("");
  // const [model, setModel] = useState("");
  // const [weave, setWeave] = useState("");
  // const [motor, setMotor] = useState("");
  // const [shakeSensor, setShakeSensor] = useState(false);
  // const [color, setColor] = useState("");
  // const [remote, setRemote] = useState("");
  // const [measurementType, setMeasurementType] = useState("");
  // const [coating, setCoating] = useState("");
  // const [facade, setFacade] = useState("");
  // const [solar, setSolar] = useState(false);
  // const [support, setSupport] = useState(false);
  const [disable, setDisable] = useState(false);

  const [productDetails, setProductDetails] = useState({
    numberOfProduct: "",
    length: "",
    width: "",
    model: "",
    weave: "",
    motor: "",
    shakeSensor: false,
    color: "",
    remote: "",
    measurementType: "",
    coating: "",
    facade: "",
    solar: false,
    support: false,
  });
  const {
    numberOfProduct,
    length,
    width,
    model,
    weave,
    motor,
    shakeSensor,
    color,
    remote,
    measurementType,
    coating,
    facade,
    solar,
    support,
  } = productDetails;

  const item = {
    name: product.toLowerCase(),
    productDetails: [
      { attribute: "Antal", value: numberOfProduct },
      { attribute: "Bredd", value: `${width}cm` },
      { attribute: "Utfall", value: `${length}cm` },
      { attribute: "Måttyp", value: measurementType },
      { attribute: "Kappa", value: coating },
      { attribute: "Modell", value: model },
      { attribute: "Vävnummer", value: weave },
      { attribute: "Vev/motor/drag", value: motor },
      { attribute: "Fjärrkontroll", value: remote },
      { attribute: "Fasadtyp", value: facade },
      { attribute: "Detaljfärg", value: color },
      {
        attribute: "SolVindAutomatik",
        value: `${solar ? "yes" : "no"}`,
      },
      {
        attribute: "Skaksensor",
        value: `${shakeSensor ? "yes" : "no"}`,
      },
      { attribute: "Stödben", value: `${support ? "yes" : "no"}` },
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
      if (cartItem && cartItem.cartItem) {
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

  const handleInputChange = <T extends keyof FönstermarkisAttributeProps>(
    field: T,
    value: FönstermarkisAttributeProps[T]
  ) => {
    setProductDetails((prevProductDetails) => ({
      ...prevProductDetails,
      [field]: value,
    }));
  };
  useEffect(() => {
    if (cartItem) {
      setDisable(true);
    }
    setProductDetails((prevProductDetails) => ({
      ...prevProductDetails,
      numberOfProduct: getAttribute("Antal"),
      length: getAttribute("Utfall"),
      width: getAttribute("Bredd"),
      measurementType: getAttribute("Måttyp"),
      coating: getAttribute("Kappa"),
      model: getAttribute("Modell"),
      weave: getAttribute("Vävnummer"),
      motor: getAttribute("Vev/motor/drag"),
      remote: getAttribute("Fjärrkontroll"),
      facade: getAttribute("Fasadtyp"),
      shakeSensor: getAttribute("Skaksensor") === "yes",
      solar: getAttribute("SolVindAutomatik") === "yes",
      support: getAttribute("Stödben") === "yes",
      color: getAttribute("Detaljfärg"),
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
              value={productDetails.numberOfProduct}
              onChange={(e) => {
                handleInputChange("numberOfProduct", e.target.value);
              }}
            ></SingleFieldInputRow>
          </div>
          <SingleFieldInputRow
            applyGrid
            label={"Utfall"}
            id={"width"}
            value={productDetails.width}
            onChange={(e) => {
              handleInputChange("width", e.target.value);
            }}
          ></SingleFieldInputRow>
          <SingleFieldInputRow
            applyGrid
            label={"Bredd"}
            id={"height"}
            value={productDetails.length}
            onChange={(e) => {
              handleInputChange("length", e.target.value);
            }}
          ></SingleFieldInputRow>
          <SingleFieldInputRow
            applyGrid
            label={"Måttyp"}
            id={"måttyp"}
            value={productDetails.measurementType}
            onChange={(e) => {
              handleInputChange("measurementType", e.target.value);
            }}
          ></SingleFieldInputRow>
          <SingleFieldInputRow
            applyGrid
            label={"Kappa"}
            id={"coating"}
            value={productDetails.coating}
            onChange={(e) => {
              handleInputChange("coating", e.target.value);
            }}
          ></SingleFieldInputRow>
          <SingleFieldInputRow
            applyGrid
            label={"Modell"}
            id={"model"}
            value={productDetails.model}
            onChange={(e) => {
              handleInputChange("model", e.target.value);
            }}
          ></SingleFieldInputRow>
          <SingleFieldInputRow
            applyGrid
            label={"Vävnummer"}
            id={"weave"}
            value={productDetails.weave}
            onChange={(e) => {
              handleInputChange("weave", e.target.value);
            }}
          ></SingleFieldInputRow>
          {/* "nextLine" */}
          <SingleFieldInputRow
            applyGrid
            label={"Vev/motor/drag"}
            id={"motor"}
            value={productDetails.motor}
            onChange={(e) => {
              handleInputChange("motor", e.target.value);
            }}
          ></SingleFieldInputRow>

          <SingleFieldInputRow
            applyGrid
            label={"Fjärrkontroll"}
            id={"remote"}
            value={productDetails.remote}
            onChange={(e) => {
              handleInputChange("remote", e.target.value);
            }}
          ></SingleFieldInputRow>
          <SingleFieldInputRow
            applyGrid
            label={"Fasadtyp"}
            id={"Facade"}
            value={productDetails.facade}
            onChange={(e) => {
              handleInputChange("facade", e.target.value);
            }}
          ></SingleFieldInputRow>
          <SingleFieldInputRow
            applyGrid
            label={"Detaljfärg"}
            id={"color"}
            value={productDetails.color}
            onChange={(e) => {
              handleInputChange("color", e.target.value);
            }}
          ></SingleFieldInputRow>
          <Checkbox
            label={"Sol&Vind Automatik"}
            id={"automatic"}
            value={productDetails.solar}
            onChange={(e) => {
              handleInputChange("solar", e.target.checked);
            }}
          ></Checkbox>
          <Checkbox
            label={"Skaksensor"}
            id={"shake"}
            value={productDetails.shakeSensor}
            onChange={(e) => {
              handleInputChange("shakeSensor", e.target.checked);
            }}
          ></Checkbox>
          <Checkbox
            label={"Stödben"}
            id={"support"}
            value={productDetails.support}
            onChange={(e) => {
              handleInputChange("support", e.target.checked);
            }}
          ></Checkbox>
        </div>
      </FormComponent>
    </div>
  );
};

export default Fönstermarkis;
