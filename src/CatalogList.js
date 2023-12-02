import CatalogCell from "./CatalogCell";

const FakeCatalogData = [
  {
    Image: "product1.jpg",
    ProductName: "Product1",
    ShortDesc: "Price 1",
  },
  {
    Image: "product2.jpg",
    ProductName: "Product2",
    ShortDesc: "Price 2",
  },
  {
    Image: "product3.jpg",
    ProductName: "Product3",
    ShortDesc: "Price 3",
  },
  {
    Image: "product3.jpg",
    ProductName: "Product4",
    ShortDesc: "Price 4",
  },
  {
    Image: "product3.jpg",
    ProductName: "Product5",
    ShortDesc: "Price 5",
  },
];

function CatalogList() {
  return (
    <section
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        backgroundColor: "lightgray",
      }}
    >
      {FakeCatalogData.map(({ Image, ProductName, ShortDesc }) => (
        <div>
          <CatalogCell
            Image={Image}
            ProductName={ProductName}
            ShortDesc={ShortDesc}
          />
        </div>
      ))}
    </section>
  );
}

export default CatalogList;
