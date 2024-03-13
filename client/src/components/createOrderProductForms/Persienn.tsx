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
interface ProductAttribute {
  attribute: string;
  value: string;
}
export interface Product {
  name: string;
  productDetails: ProductAttribute[];
}

interface PersiennProps {
  clearOnClick: () => void;
  cartCallback: Dispatch<SetStateAction<Product[]>>;
  product: string;
  editCartItem: Dispatch<SetStateAction<EditCartItem | undefined>>;
  cartItem: EditCartItem | undefined;
}

const Persienn: React.FC<PersiennProps> = ({
  clearOnClick,
  cartCallback,
  product,
  editCartItem,
  cartItem,
}) => {
  const [numberOfProduct, setNumberOfProduct] = useState("");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [lamellColor, setLamellColor] = useState("");
  const [roofMount, setRoofMount] = useState("");
  const [linenColor, setLinenColor] = useState("");
  const [magnets, setMagnets] = useState(false);
  const [extendedPole, setExtendedPole] = useState("");
  const [remote, setRemote] = useState("");
  const [disable, setDisable] = useState(false);
  const [measurementType, setMeasurementType] = useState("");
  const [assembly, setAssembly] = useState("");

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
    setRoofMount(getAttribute("FH-Tak/väggmont"));
    setLamellColor(getAttribute("Lamellfärg"));
    setLinenColor(getAttribute("Linfärg"));
    setRemote(getAttribute("Reglage-Lina/Ögla"));
    setMagnets(getAttribute("Magneter")==="yes"?true:false);
    setExtendedPole(getAttribute("Förlängd Persiennstång"));
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
            label={"FH-Tak/väggmont"}
            id={"roofmount"}
            value={roofMount}
            onChange={(e) => {
              setRoofMount(e.target.value);
            }}
          ></SingleFieldInputRow>
          <SingleFieldInputRow
            applyGrid
            label={"Lamellfärg"}
            id={"lamellcolor"}
            value={lamellColor}
            onChange={(e) => {
              setLamellColor(e.target.value);
            }}
          ></SingleFieldInputRow>
          {/* "nextLine" */}
          <SingleFieldInputRow
            applyGrid
            label={"Linfärg"}
            id={"linencolor"}
            value={linenColor}
            onChange={(e) => {
              setLinenColor(e.target.value);
            }}
          ></SingleFieldInputRow>

          <SingleFieldInputRow
            applyGrid
            label={"Reglage-Lina/Ögla"}
            id={"remote"}
            value={remote}
            onChange={(e) => {
              setRemote(e.target.value);
            }}
          ></SingleFieldInputRow>
          <Checkbox
            label={"Magneter"}
            id={"magnets"}
            value={magnets}
            onChange={(e) => {
              setMagnets(e.target.checked);
            }}
          ></Checkbox>
          <SingleFieldInputRow
            applyGrid
            label={"Förlängd Persiennstång"}
            id={"extendedPole"}
            value={extendedPole}
            onChange={(e) => {
              setExtendedPole(e.target.value);
            }}
          ></SingleFieldInputRow>
        </div>
      </FormComponent>
    </div>
  );
};

export default Persienn;
