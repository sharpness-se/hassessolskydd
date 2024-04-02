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
//import { Product } from "../../pages/CreateOrderPage";
interface ProductAttribute {
  attribute: string;
  value: string;
}
export interface Product {
  name: string;
  productDetails: ProductAttribute[];
}
interface RullgardinAttributeProps {
  numberOfProduct: string;
  length: string;
  width: string;
  model: string;
  weave: string;
  fitting: string;
  roll: string;
  color: string;
  remote: string;
  measurementType: string;
  assembly: string;
  remoteLocation: string;
  bottomFinish: string;
}
interface RullgardinProps {
  clearOnClick: () => void;
  cartCallback: Dispatch<SetStateAction<Product[]>>;
  product: string;
  editCartItem: Dispatch<SetStateAction<EditCartItem | undefined>>;
  cartItem: EditCartItem | undefined;
  disable: boolean;

}

const Rullgardin: React.FC<RullgardinProps> = ({
  clearOnClick,
  cartCallback,
  product,
  editCartItem,
  cartItem,
  disable,

}) => {
  const [disableActions, setDisableActions] = useState(disable?disable: false);
  const [productDetails, setProductDetails] = useState({
    numberOfProduct: "",
    length: "",
    width: "",
    model: "",
    weave: "",
    fitting: "",
    roll: "",
    color: "",
    remote: "",
    measurementType: "",
    assembly: "",
    remoteLocation: "",
    bottomFinish: "",
  });
  const {
    numberOfProduct,
    length,
    width,
    model,
    weave,
    fitting,
    roll,
    color,
    remote,
    measurementType,
    assembly,
    remoteLocation,
    bottomFinish,
  } = productDetails;
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
      { attribute: "Reglage", value: remote },
      { attribute: "Reglagesida", value: remoteLocation },
      { attribute: "Under/överrullad", value: roll },
      { attribute: "Bottenlista", value: bottomFinish },
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
  const handleInputChange = <T extends keyof RullgardinAttributeProps>(
    field: T,
    value: RullgardinAttributeProps[T]
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
      measurementType: getAttribute("Måttyp"),
      assembly: getAttribute("Montagetyp"),
      model: getAttribute("Modell"),
      weave: getAttribute("Vävnummer"),
      fitting: getAttribute("Beslag"),
      remote: getAttribute("Reglage"),
      remoteLocation: getAttribute("Reglagesida"),
      roll: getAttribute("Under/överrullad"),
      bottomFinish: getAttribute("Bottenlista"),
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
        customOnClick={() => setDisableActions(false)}
        disabled={disableActions}
        hideButtons={cartItem ? true : false}
      >
        <div className="grid grid-cols-subgrid col-span-4">
        <div className="grid grid-cols-subgrid col-span-4">
          <SingleFieldInputRow
            applyGrid
            label={"Antal"}
            id={"numberOfProduct"}
            value={numberOfProduct}
            onChange={(e) =>
              handleInputChange("numberOfProduct", e.target.value)
            }
            ></SingleFieldInputRow>
            </div>
          <SingleFieldInputRow
            applyGrid
            label={"Bredd"}
            id={"width"}
            value={width}
            onChange={(e) => handleInputChange("width", e.target.value)}
          ></SingleFieldInputRow>
          <SingleFieldInputRow
            applyGrid
            label={"Höjd"}
            id={"height"}
            value={length}
            onChange={(e) => handleInputChange("length", e.target.value)}
          ></SingleFieldInputRow>
          <SingleFieldInputRow
            applyGrid
            label={"Måttyp"}
            id={"måttyp"}
            value={measurementType}
            onChange={(e) =>
              handleInputChange("measurementType", e.target.value)
            }
          ></SingleFieldInputRow>
          <SingleFieldInputRow
            applyGrid
            label={"Montagetyp"}
            id={"assembly"}
            value={assembly}
            onChange={(e) => handleInputChange("assembly", e.target.value)}
          ></SingleFieldInputRow>
          <SingleFieldInputRow
            applyGrid
            label={"Modell"}
            id={"model"}
            value={model}
            onChange={(e) => handleInputChange("model", e.target.value)}
          ></SingleFieldInputRow>
          <SingleFieldInputRow
            applyGrid
            label={"Vävnummer"}
            id={"weave"}
            value={weave}
            onChange={(e) => handleInputChange("weave", e.target.value)}
          ></SingleFieldInputRow>
          {/* "nextLine" */}
          <SingleFieldInputRow
            applyGrid
            label={"Beslag"}
            id={"beslag"}
            value={fitting}
            onChange={(e) => handleInputChange("fitting", e.target.value)}
          ></SingleFieldInputRow>
          <SingleFieldInputRow
            applyGrid
            label={"Reglage"}
            id={"remote"}
            value={remote}
            onChange={(e) => handleInputChange("remote", e.target.value)}
          ></SingleFieldInputRow>
          <SingleFieldInputRow
            applyGrid
            label={"Reglagesida"}
            id={"remotelocation"}
            value={remoteLocation}
            onChange={(e) =>
              handleInputChange("remoteLocation", e.target.value)
            }
          ></SingleFieldInputRow>{" "}
          <SingleFieldInputRow
            applyGrid
            label={"Under/överrullad"}
            id={"roll"}
            value={roll}
            onChange={(e) => handleInputChange("roll", e.target.value)}
          ></SingleFieldInputRow>
          <SingleFieldInputRow
            applyGrid
            label={"Bottenlista"}
            id={"bottomFinish"}
            value={bottomFinish}
            onChange={(e) => handleInputChange("bottomFinish", e.target.value)}
          ></SingleFieldInputRow>
          <SingleFieldInputRow
            applyGrid
            label={"Detaljfärg"}
            id={"color"}
            value={color}
            onChange={(e) => handleInputChange("color", e.target.value)}
          ></SingleFieldInputRow>
        </div>
      </FormComponent>
    </div>
  );
};

export default Rullgardin;
