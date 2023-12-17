import { useState, useEffect } from "react";
import supabase from "./supabase";
import CatalogCell from "./CatalogCell";

function CatalogList({
  catalog,
  setCatalog,
  catalogUnfiltered,
  setCatalogUnfiltered,
  catalogFilterView,
  setCatalogFilterView,
  catalogFilterRerender,
  setCatalogFilterRerender,
  catalogFilterTarget,
  setCatalogFilterTarget,
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
