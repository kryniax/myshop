import { useNavigate } from "react-router";
import { useCart } from "../hooks/useCart";
import "../styles/Cart.css";
import Button from "../components/Button";

type CartProps = {
  isModal?: boolean;
  onClose?: () => void;
};

const Cart = ({ isModal = false, onClose }: CartProps) => {
  const { cartItems, updateItem, removeItem, clearItems, getTotalPrice } =
    useCart();
  const navigate = useNavigate();

  const handleQuantityChange = (productId: number, quantity: number) => {
    updateItem(productId, quantity);
  };

  const handleRemoveItem = (productId: number) => {
    removeItem(productId);
  };

  const handlePurchase = () => {
    alert("Dziękujemy za zakup!");
    clearItems();
    if (isModal && onClose) {
      onClose();
    } else {
      navigate("/");
    }
  };

  const handleViewFullCart = () => {
    if (onClose) {
      onClose();
    }
    navigate("/cart");
  };

  if (cartItems.length === 0) {
    return (
      <div className={`cart cart--empty ${isModal ? "cart--modal" : ""}`}>
        <p className="cart__empty-message">Koszyk jest pusty</p>
        {isModal && (
          <Button className="cart__continue-shopping" onClick={onClose}>
            Kontynuuj zakupy
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className={`cart ${isModal ? "cart--modal" : ""}`}>
      {!isModal && <h2 className="cart__title">Koszyk</h2>}
      <div className="cart__items">
        {cartItems.map((item) => (
          <div key={item.product.id} className="cart__item">
            <div className="cart__item-image-container">
              <img
                src={item.product.image || "/placeholder.svg"}
                alt={item.product.name}
                className="cart__item-image"
              />
            </div>
            <div className="cart__item-details">
              <h3 className="cart__item-name">{item.product.name}</h3>
              <p className="cart__item-price">
                {`${item.product.price.toFixed(2)} zł`}
              </p>
            </div>
            <div className="cart__item-actions">
              <div className="cart__item-quantity">
                <label
                  htmlFor={`quantity-${item.product.id}`}
                  className="cart__item-quantity-label"
                >
                  Ilość:
                </label>
                <input
                  type="number"
                  id={`quantity-${item.product.id}`}
                  min="1"
                  max={item.product.quantity}
                  value={item.quantity}
                  onChange={(e) =>
                    handleQuantityChange(
                      item.product.id,
                      Number.parseInt(e.target.value)
                    )
                  }
                  className="cart__item-quantity-input"
                />
              </div>
              <Button
                onClick={() => handleRemoveItem(item.product.id)}
                className="cart__item-remove"
              >
                Usuń
              </Button>
            </div>
          </div>
        ))}
      </div>
      <div className="cart__summary">
        <div className="cart__total">
          <span className="cart__total-label">Podsumowanie:</span>
          <span className="cart__total-price">
            {`${getTotalPrice().toFixed(2)} zł`}
          </span>
        </div>
        <div className="cart__actions">
          <Button onClick={handlePurchase} className="cart__purchase-button">
            Zamów
          </Button>
          {isModal && (
            <>
              <Button className="cart__continue-shopping" onClick={onClose}>
                Kontynuuj zakupy
              </Button>
              <Button className="cart__view-full" onClick={handleViewFullCart}>
                Przejdź do koszyka
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
