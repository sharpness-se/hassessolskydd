import React, { Dispatch, SetStateAction } from "react";
import Accordion from "../AccordionComponent";
//import { Product } from "../../pages/CreateOrderPage";
import { nanoid } from "nanoid";
import { Product } from "../createOrderProductForms/Plissegardin";
import { EditCartItem } from "../../pages/CreateOrderPage";

interface CartItemProps {
  product?: Product;
  itemIndex: number;
  cartCallback: Dispatch<SetStateAction<Product[]>>;
  cart: Product[];
  editCartItem: Dispatch<SetStateAction<EditCartItem | undefined>>;
  setHiddenCallBack: Dispatch<SetStateAction<boolean>>;
  openProduct: Dispatch<SetStateAction<boolean>>;
  disabled: boolean;
}

const CartItemComponent: React.FC<CartItemProps> = ({
  product,
  itemIndex,
  cartCallback,
  cart,
  editCartItem,
  disabled,
  setHiddenCallBack,
  openProduct
}) => {
  const deleteCartItem = () => {
    const updatedProducts = cart?.filter((_, index) => index !== itemIndex);
    cartCallback(updatedProducts);
  };
  const updateEditCart = () => {
    setHiddenCallBack(false);
    openProduct(false);
    console.log(itemIndex);
    console.log(cart[itemIndex]);
    const updateItem = { cartItemIndex: itemIndex, cartItem: cart[itemIndex] };
    // console.log(updateItem);
    editCartItem(updateItem);
  };
  return (
    <div className="bg-white rounded-lg mb-5">
      <Accordion
        title={product?.name || ""}
        addDelete
        deleteCallback={deleteCartItem}
        disabled={disabled}
      >
        <div className="flex justify-end flex-col bg-white rounded-lg">
          <div className="grid text-xs gap-y-5 gap-x-10 px-5">
            {product &&
              product.productDetails.map((item, index) => {
                if (index === 0) {
                  return (
                    <div
                      className="grid grid-cols-4 col-span-4 "
                      key={nanoid()}
                    >
                      <div className="grid grid-cols-1 ">
                        <span className="">{item.attribute}</span>
                        <span>{item.value}</span>
                      </div>
                    </div>
                  );
                }
                return (
                  <div className="flex flex-col" key={nanoid()}>
                    <span className="">{item.attribute}</span>
                    <span>{item.value}</span>
                  </div>
                );
              })}
          </div>

          <div className="pt-5 flex justify-center">
            <button
              className={` h-min p-2 mr-2 ${!disabled?"bg-white hover:bg-blue-500 hover:text-white":"bg-gray-200"} rounded-full px-5 text-s crusor-pointer`}
              onClick={updateEditCart}
              disabled={disabled}
            >
              Visa eller Ändra
            </button>
          </div>
        </div>
      </Accordion>
    </div>
  );
};

export default CartItemComponent;
