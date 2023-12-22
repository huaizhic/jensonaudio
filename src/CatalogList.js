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
  searchClick,
  setSearchClick,
  searchInput,
  setSearchInput,
  allCheck,
  setAllCheck,
  categoryList,
  setCategoryList,
  setAlphabetCheck,
  setRecentCheck,
  setPriceCheck,
  fetchData,
  setFetchData,
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

  if (catalog.length === 0) {
    return <h1>Still loading...</h1>;
  }

  function handleClick() {
    // set catalog view back to original unfiltered unsorted catalog
    setCatalogUnfiltered(true);
    setSearchClick(false);
    setSearchInput("");
    // set filter state back to all
    setAllCheck(true);
    setCategoryList(
      categoryList.map((object) =>
        true ? { ...object, filterSelected: false } : object
      )
    );
    // set sorting state back to random (deselect)
    setAlphabetCheck(false);
    setRecentCheck(false);
    setPriceCheck(false);
  }

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
      {searchClick ? (
        <button onClick={() => handleClick()}>Clear Search</button>
      ) : null}
    </section>
  );
}

export default CatalogList;
