import { AddShoppingCart, RemoveShoppingCartOutlined, Star } from "@mui/icons-material";
import { useRecoilState, useRecoilValue } from "recoil";
import { Products, currencyAtom, loginStatusAtom, shoppingCartAtom } from "../state/atom";
import { useState } from "react";
import { Button } from "@mui/material";
import { currencyConverter } from "../utils/currencyConverter";

const ProductCard = ({ title, rating, image, price, category, id }: Products) => {
  const [shoppingCart, setShoppingCart] = useRecoilState(shoppingCartAtom);
  const [quantity, setQuantity] = useState(shoppingCart.find((product) => product.id === id)?.quantity);
  const isLogged = useRecoilValue(loginStatusAtom);
  const currency = useRecoilValue(currencyAtom);

  const addToShoppingCart = () => {
    setQuantity((prev) => (prev ? prev + 1 : 1));
    setShoppingCart((prev) => {
      const product = prev.find((product) => product.id === id);
      if (product) {
        product.quantity += 1;
        return [...prev];
      } else {
        return [...prev, { id, title, price, quantity: 1 }];
      }
    });
  };

  const removeFromShoppingCart = () => {
    setQuantity((prev) => (prev ? prev - 1 : 0));
    const product = shoppingCart.find((product) => product.id === id);
    if (product) {
      product.quantity -= 1;
    }
    //if the quantity is 0, remove the product from the shopping cart
    if (quantity === 1) {
      setShoppingCart(shoppingCart.filter((product) => product.id !== id));
    } else {
      setShoppingCart([...shoppingCart]);
    }
  };
  return (
    <div className="grid border border-black bg-white rounded-xl items-center p-4 gap-y-2">
      <p className="text-xl font-semibold text-left">{title}</p>
      <p className="flex italic items-center justify-start">
        {rating.rate}
        <Star className="text-yellow-500" />
      </p>
      <img src={image} alt="product image" className="w-full h-[200px] object-contain mb-4" />
      <p className="text-left italic capitalize">{category}</p>
      {/* SHOPPING CART BUTTONS, MISSING LOGIN LOGIC */}
      {isLogged && (
        <div className="flex ml-auto items-center gap-x-2 mt-auto">
          {quantity ? (
            <Button style={{ color: "black", borderRadius: "10px" }} onClick={removeFromShoppingCart}>
              <RemoveShoppingCartOutlined />
            </Button>
          ) : null}
          {quantity ? <p className="bg-white px-2 py-1 border border-black rounded-md">{quantity}</p> : null}
          <Button onClick={addToShoppingCart} style={{ color: "black", borderRadius: "10px" }}>
            <AddShoppingCart />
          </Button>
          {/* END OF SHOPPING CART */}
        </div>
      )}
      <p className="text-right align-text-bottom  text-lg font-bold ">{currencyConverter(currency, price)}</p>
    </div>
  );
};

export default ProductCard;
