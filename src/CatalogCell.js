function CatalogCell({ Image, ProductName, ShortDesc }) {
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
      <img src={Image} height="250" width="250" />
      <h1>{ProductName}</h1>
      <span>{ShortDesc}</span>
    </div>
  );
}

export default CatalogCell;
