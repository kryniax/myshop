import { useSelector, useDispatch } from "react-redux";
import {
  type RootState,
  addToCart,
  updateQuantity,
  removeFromCart,
  clearCart,
} from "../store";
import type { Product } from "../types";

export const useCart = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const addItem = (product: Product, quantity: number) => {
    dispatch(addToCart({ product, quantity }));
  };

  const updateItem = (productId: number, quantity: number) => {
    dispatch(updateQuantity({ productId, quantity }));
  };

  const removeItem = (productId: number) => {
    dispatch(removeFromCart(productId));
  };

  const clearItems = () => {
    dispatch(clearCart());
  };

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  const getItemCount = () => {
    return cartItems.length;
  };

  return {
    cartItems,
    addItem,
    updateItem,
    removeItem,
    clearItems,
    getTotalPrice,
    getItemCount,
  };
};
