import React, { Dispatch, ReactNode, SetStateAction } from "react";
import StartMenuButton from "../StartMenuButtonComponent";
//import { Product } from "../../pages/CreateOrderPage";
import CartItemComponent from "./CartItemComponent";
import { nanoid } from "nanoid";
import { Product } from "../createOrderProductForms/Plissegardin";
import { EditCartItem } from "../../pages/CreateOrderPage";
interface CustomerCartProps {
  children?: ReactNode;
  cart: Product[];
  cartCallBack: Dispatch<SetStateAction<Product[]>>;
  editCartItem: Dispatch<SetStateAction<EditCartItem | undefined>>;
  disabled?: Boolean;
}
const CustomerCartComponent: React.FC<CustomerCartProps> = ({
  children,
  cart,
  cartCallBack,
  editCartItem,
  disabled,
}) => {
  return (
    <div className="bg-white rounded p-5 max-w-3xl w-[715px]">
      <h2 className="uppercase tracking-wide text-gray-700 text-s font-bold mb-1 pb-2">
        Kundkorg:
      </h2>
      <div className="flex flex-col">
        <div className="bg-gray-300 w-full overflow-y-scroll flex-row px-10 py-5 rounded h-80">
          {cart?.length === 0 && (
            <div className="flex justify-center items-center h-full font-bold text-gray-500">
              <span className="text-xl">Customer Cart Empty</span>
            </div>
          )}
          {cart &&
            cart.map((item, index) => {
              return (
                <React.Fragment key={nanoid()}>
                  <CartItemComponent
                    product={item}
                    itemIndex={index}
                    cart={cart}
                    cartCallback={cartCallBack}
                    editCartItem={editCartItem}
                    disabled={disabled}
                  />
                </React.Fragment>
              );
            })}
          <div>{children}</div>
        </div>
        <div className="flex w-full justify-center">
         
        </div>
      </div>
    </div>
  );
};

export default CustomerCartComponent;
