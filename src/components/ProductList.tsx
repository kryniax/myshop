import { products } from "../data/products";
import ProductItem from "./ProductItem";
import { usePagination } from "../hooks/usePagination";
import "../styles/ProductList.css";
import { Product } from "../types";
import Button from "./Button";

const ProductList = () => {
  const { currentPage, totalPages, pageItems, goToPage } = usePagination({
    totalItems: products.length,
    itemsPerPage: 5,
  });

  const currentProducts = products.slice(
    pageItems.startIndex,
    pageItems.endIndex
  );

  return (
    <div className="product-list">
      <h2 className="product-list__title">Produkty</h2>
      <div className="product-list__items">
        {currentProducts.map((product: Product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
      <div className="product-list__pagination">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Button
            key={page}
            onClick={() => goToPage(page)}
            className={`product-list__page-button ${
              currentPage === page ? "product-list__page-button--active" : ""
            }`}
          >
            {page}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
