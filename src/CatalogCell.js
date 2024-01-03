import { Link } from "react-router-dom";

function CatalogCell({ product, productTitle, productPrice, productCategory }) {
  // console.log({ FakeCatalogData.ProductName });
  // if (product.media !== null) {
  //   console.log(product.media);
  //   console.log(product.media[0]);
  // }

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
      {product.media[0] === "" ||
      product.media === null ||
      product.media.length === 0 ? (
        <img
          src={
            "https://aykgozlgavkkuyxfksoi.supabase.co/storage/v1/object/public/miscellaneous/noImageAvailable.jpg?t=2023-12-28T13%3A19%3A07.796Z"
          }
          height="250"
          width="250"
        />
      ) : (
        <img src={product.media[0]} height="350" width="350"></img>
      )}

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
