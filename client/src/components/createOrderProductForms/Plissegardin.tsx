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
export interface ProductAttribute {
  attribute: string;
  value: string;
}
interface PlissegardinAttributeProps {
  numberOfProduct: string;
  length: string;
  width: string;
  model: string;
  weave: string;
  fitting: string;
  ordinaryFitting: boolean;
  color: string;
  remote: string;
  measurementType: string;
  assembly: string;
  remoteLocation: string;
}
export interface Product {
  name: string;
  productDetails: ProductAttribute[];
}

interface PlissegardinFunctionProps {
  clearOnClick: () => void;
  cartCallback: Dispatch<SetStateAction<Product[]>>;
  product: string;
  editCartItem: Dispatch<SetStateAction<EditCartItem | undefined>>;
  cartItem: EditCartItem | undefined;
  disable: boolean;
}
const Plissegardin: React.FC<PlissegardinFunctionProps> = ({
  clearOnClick,
  cartCallback,
  product,
  editCartItem,
  cartItem,
  disable
}) => {

  const [disableActions, setDisableActions] = useState(disable?disable: false);
  const [productDetails, setProductDetails] = useState({
    numberOfProduct: "",
    length: "",
    width: "",
    model: "",
    weave: "",
    fitting: "",
    ordinaryFitting: false,
    color: "",
    remote: "",
    measurementType: "",
    assembly: "",
    remoteLocation: "",
  });
  const {
    numberOfProduct,
    length,
    width,
    model,
    weave,
    fitting,
    ordinaryFitting,
    color,
    remote,
    measurementType,
    assembly,
    remoteLocation,
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
      {
        attribute: "Allmodebeslag",
        value: `${ordinaryFitting ? "yes" : "no"}`,
      },
      { attribute: "Reglage", value: remote },
      { attribute: "Reglagesida", value: remoteLocation },
      { attribute: "Detaljfärg", value: color },
    ].reverse(),
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

  const handleInputChange = <T extends keyof PlissegardinAttributeProps>(
    field: T,
    value: PlissegardinAttributeProps[T]
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
      model: getAttribute("Modell"),
      measurementType: getAttribute("Måttyp"),
      weave: getAttribute("Vävnummer"),
      fitting: getAttribute("Beslag"),
      ordinaryFitting: getAttribute("Allmodebeslag") === "yes",
      remote: getAttribute("Reglage"),
      remoteLocation: getAttribute("Reglagesida"),
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
        <div className="grid w-full rounded-lg bg-white ">
          <div className="grid grid-cols-subgrid col-span-4">
            <SingleFieldInputRow
              applyGrid
              label={"Antal"}
              id={"numberOfProduct"}
              value={productDetails.numberOfProduct}
              onChange={(e) =>
                handleInputChange("numberOfProduct", e.target.value)
              }
            />
          </div>
          <SingleFieldInputRow
            applyGrid
            label={"Bredd"}
            id={"width"}
            value={productDetails.width}
            onChange={(e) => handleInputChange("width", e.target.value)}
          />
          <SingleFieldInputRow
            applyGrid
            label={"Höjd"}
            id={"height"}
            value={productDetails.length}
            onChange={(e) => handleInputChange("length", e.target.value)}
          />
          <SingleFieldInputRow
            applyGrid
            label={"Måttyp"}
            id={"måttyp"}
            value={productDetails.measurementType}
            onChange={(e) =>
              handleInputChange("measurementType", e.target.value)
            }
          />
          <SingleFieldInputRow
            applyGrid
            label={"Montagetyp"}
            id={"assembly"}
            value={productDetails.assembly}
            onChange={(e) => handleInputChange("assembly", e.target.value)}
          />
          <SingleFieldInputRow
            applyGrid
            label={"Modell"}
            id={"model"}
            value={productDetails.model}
            onChange={(e) => handleInputChange("model", e.target.value)}
          />
          <SingleFieldInputRow
            applyGrid
            label={"Vävnummer"}
            id={"weave"}
            value={productDetails.weave}
            onChange={(e) => handleInputChange("weave", e.target.value)}
          />
          {/* "nextLine" */}
          <SingleFieldInputRow
            applyGrid
            label={"Beslag"}
            id={"beslag"}
            value={productDetails.fitting}
            onChange={(e) => handleInputChange("fitting", e.target.value)}
          />
          <Checkbox
            label={"Allmodebeslag"}
            id={"ordinaryFitting"}
            value={productDetails.ordinaryFitting}
            onChange={(e) =>
              handleInputChange("ordinaryFitting", e.target.checked)
            }
          />
          <SingleFieldInputRow
            applyGrid
            label={"Reglage"}
            id={"remote"}
            value={productDetails.remote}
            onChange={(e) => handleInputChange("remote", e.target.value)}
          />
          <SingleFieldInputRow
            applyGrid
            label={"Reglagesida"}
            id={"remotelocation"}
            value={productDetails.remoteLocation}
            onChange={(e) =>
              handleInputChange("remoteLocation", e.target.value)
            }
          />
          <SingleFieldInputRow
            applyGrid
            label={"Detaljfärg"}
            id={"color"}
            value={productDetails.color}
            onChange={(e) => handleInputChange("color", e.target.value)}
          />
        </div>
      </FormComponent>
    </div>
  );
};

export default Plissegardin;
