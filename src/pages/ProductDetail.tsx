import { useState, useEffect, ChangeEvent } from "react";
import { useParams, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { addToCart } from "../store";
import { products } from "../data/products";
import type { Product } from "../types";
import "../styles/ProductDetail.css";
import { PulseLoader } from "react-spinners";
import Button from "../components/Button";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<Product>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      const foundProduct = products.find((p) => p.id === Number(id));
      setProduct(foundProduct);
      setLoading(false);
      setQuantity(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [id]);

  const handleQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value);
    if (product && value > 0 && value <= product.quantity) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart({ product, quantity }));
      navigate("/cart");
    }
  };

  if (loading) {
    return (
      <div className="loader">
        <PulseLoader color="#4caf50" size={25} />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-detail__not-found">
        Nie znaleziono takiego produktu
      </div>
    );
  }

  return (
    <div className="product-detail">
      <div className="product-detail__image-container">
        <img
          src={product.image}
          alt={product.name}
          className="product-detail__image"
        />
      </div>
      <div className="product-detail__info">
        <h2 className="product-detail__name">{product.name}</h2>
        <p className="product-detail__price">{`${product.price.toFixed(
          2
        )} zł`}</p>
        <p className="product-detail__availability">
          Dostępność:{" "}
          <span className="product-detail__quantity">{product.quantity}</span>{" "}
          sztuk
        </p>
        <p className="product-detail__description">{product.description}</p>
        <div className="product-detail__actions">
          <div className="product-detail__quantity-control">
            <label
              htmlFor="quantity"
              className="product-detail__quantity-label"
            >
              Ilość:
            </label>
            <input
              type="number"
              id="quantity"
              min="1"
              max={product.quantity}
              value={quantity}
              onChange={handleQuantityChange}
              className="product-detail__quantity-input"
            />
          </div>
          <Button
            onClick={handleAddToCart}
            className="product-detail__add-button"
          >
            Dodaj do koszyka
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
