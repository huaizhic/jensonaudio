function CatalogCell({ Image, productTitle, productPrice, productCategory }) {
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
      <h1>{productTitle}</h1>
      <span>{productPrice}</span>
      <span>{productCategory}</span>
    </div>
  );
}

export default CatalogCell;
