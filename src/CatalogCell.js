import { Link } from "react-router-dom";

function CatalogCell({ product, productTitle, productPrice, productCategory }) {
  // console.log({ FakeCatalogData.ProductName });
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxBlockSize: "400px",
        maxWidth: "400px",
      }}
    >
      {/* <img src={Image} height="250" width="250" /> */}
      <h1>
        <Link to={`product/${product.productTitle}`}>
          {product.productTitle}
        </Link>
      </h1>
      <span>{product.productPrice}</span>
      <span>{product.productCategory}</span>
      <span>{product.deleteCheck}</span>
      <span>Created on: {new Date(product.created_at).toString()}</span>
    </div>
  );
}

export default CatalogCell;
