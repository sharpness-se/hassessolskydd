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
  articleDetails: ProductAttribute[];
}

interface PilsegardinProps {
  clearOnClick: () => void;
  cartCallback: Dispatch<SetStateAction<Product[]>>;
  product: string;
  editCartItem: Dispatch<SetStateAction<EditCartItem | undefined>>;
  cartItem: EditCartItem | undefined;
}

const Pilsegardin: React.FC<PilsegardinProps> = ({
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
  const [ordinaryFitting, setOrdinaryFitting] = useState("");
  const [color, setColor] = useState("");
  const [remote, setRemote] = useState("");
  const [disable, setDisable] = useState(false);
  const item = {
    name: product.toLowerCase(),
    articleDetails: [
      { attribute: "Antal", value: numberOfProduct },
      { attribute: "Bred", value: `${width}m` },
      { attribute: "Höjd", value: `${length}m` },
      { attribute: "Modell", value: model },
      { attribute: "Vävnummer", value: weave },
      { attribute: "Beslag", value: fitting },
      { attribute: "Allmodebeslag", value: ordinaryFitting },
      { attribute: "Reglage", value: remote },
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
        const filteredItems = cartItem.cartItem.articleDetails.filter(
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
      editCartItem(undefined)
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
    setWidth(getAttribute("Bred"));
    setLength(getAttribute("Höjd"));
    setModel(getAttribute("Modell"));
    setWeave(getAttribute("Vävnummer"));
    setFitting(getAttribute("Beslag"));
    setOrdinaryFitting(getAttribute("Allmodebeslag"));
    setColor(getAttribute("Detaljfärg"));
    setRemote(getAttribute("Reglage"));
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
            label={"Bred"}
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
          <SingleFieldInputRow
            applyGrid
            label={"Allmodebeslag"}
            id={"ordinaryFitting"}
            value={ordinaryFitting}
            onChange={(e) => {
              setOrdinaryFitting(e.target.value);
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

export default Pilsegardin;
