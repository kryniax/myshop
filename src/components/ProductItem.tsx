import { Link } from "react-router";
import { useDispatch } from "react-redux";
import { addToCart } from "../store";
import type { Product } from "../types";
import "../styles/ProductItem.css";
import Button from "./Button";

interface ProductItemProps {
  product: Product;
}

const ProductItem = ({ product }: ProductItemProps) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({ product, quantity: 1 }));
  };

  return (
    <div className="product-item">
      <div className="product-item__image-container">
        <img
          src={product.image}
          alt={product.name}
          title={product.name}
          className="product-item__image"
        />
      </div>
      <div className="product-item__content">
        <Link to={`/product/${product.id}`} className="product-item__name">
          {product.name}
        </Link>
        <p className="product-item__price">{`${product.price.toFixed(
          2
        )} zł`}</p>
        <Button className="product-item__add-button" onClick={handleAddToCart}>
          Dodaj do koszyka
        </Button>
      </div>
    </div>
  );
};

export default ProductItem;
