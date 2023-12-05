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
      <h1>{product.productTitle}</h1>
      <span>{product.productPrice}</span>
      <span>{product.productCategory}</span>
      <span>{product.deleteCheck}</span>
    </div>
  );
}

export default CatalogCell;
