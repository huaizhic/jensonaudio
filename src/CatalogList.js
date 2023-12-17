import { useState, useEffect } from "react";
import supabase from "./supabase";
import CatalogCell from "./CatalogCell";

// const FakeCatalogData = [
//   {
//     // Image: "product1.jpg",
//     ProductName: "Product1",
//     ShortDesc: "Price 1",
//     Category: "Speakers",
//   },
//   {
//     // Image: "product2.jpg",
//     ProductName: "Product2",
//     ShortDesc: "Price 2",
//     Category: "Preamps",
//   },
//   {
//     // Image: "product3.jpg",
//     ProductName: "Product3",
//     ShortDesc: "Price 3",
//     Category: "Cables",
//   },
//   {
//     // Image: "product3.jpg",
//     ProductName: "Product4",
//     ShortDesc: "Price 4",
//     Category: "Speakers",
//   },
//   {
//     // Image: "product3.jpg",
//     ProductName: "Product5",
//     ShortDesc: "Price 5",
//     Category: "Speakers",
//   },
// ];

function CatalogList({
  catalog,
  setCatalog,
  catalogUnfiltered,
  setCatalogUnfiltered,
  catalogFilterView,
  setCatalogFilterView,
}) {
  useEffect(function () {
    async function getCatalog() {
      const { data: Catalog, error } = await supabase
        .from("CatalogList")
        .select("*");
      setCatalog(Catalog);
      // console.log(CatalogList);
    }
    getCatalog();
  }, []);

  return (
    <section
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        backgroundColor: "lightgray",
      }}
    >
      {catalogUnfiltered
        ? catalog.map((product) => (
            <CatalogCell
              // Image={Image}
              product={product}
              key={product.id}
              productTitle={product.productTitle} // passed in as a prop
              productPrice={product.productPrice}
              productCategory={product.productCategory}
            />
          ))
        : catalogFilterView.map((product) => <CatalogCell product={product} />)}
    </section>
  );
}

export default CatalogList;
