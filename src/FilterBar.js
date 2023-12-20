import { useState, useEffect } from "react";

function FilterBar({
  categoryList,
  setCategoryList,
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
  sortStatus,
  setSortStatus,
  allCheck,
  setAllCheck,
  searchClick,
  setSearchClick,
  searchResult,
  setSearchResult,
}) {
  // const [allCheck, setAllCheck] = useState(true);

  // to re-render filtered catalog view everytime an external change is made (eg delete product, edit product, etc)
  useEffect(() => {
    setCatalogFilterView(
      catalog.filter(
        (product) => product.productCategory === catalogFilterTarget
      )
    );
  }, [catalogFilterRerender]);

  function handleClick(objParam) {
    if (objParam === "All") {
      // above if condition is for filter button set to "All"

      if (searchClick === true) {
        setCatalogFilterView(searchResult);

        // check sorting status
        if (sortStatus === "Alphabet A-Z") {
          const sortedCatalogArray = searchResult.toSorted((a, b) =>
            a.productTitle > b.productTitle
              ? 1
              : a.productTitle < b.productTitle
              ? -1
              : 0
          );
          setCatalogUnfiltered(false);
          setCatalogFilterView(sortedCatalogArray);
        } else if (sortStatus === "Recently Added") {
          const sortedCatalogArray = searchResult.toSorted(
            (a, b) => Date.parse(b.created_at) - Date.parse(a.created_at)
          );
          setCatalogUnfiltered(false);
          setCatalogFilterView(sortedCatalogArray);
        } else if (sortStatus === "Price ascending") {
          const sortedCatalogArray = searchResult.toSorted(
            (a, b) => a.productPrice - b.productPrice
          );
          setCatalogUnfiltered(false);
          setCatalogFilterView(sortedCatalogArray);
        } else {
          setCatalogUnfiltered(true); // displays original catalog array
        }
      } else {
        // below if condition is to check current sorting status
        if (sortStatus === "Alphabet A-Z") {
          const sortedCatalogArray = catalog.toSorted((a, b) =>
            a.productTitle > b.productTitle
              ? 1
              : a.productTitle < b.productTitle
              ? -1
              : 0
          );
          setCatalogUnfiltered(false);
          setCatalogFilterView(sortedCatalogArray);
        } else if (sortStatus === "Recently Added") {
          const sortedCatalogArray = catalog.toSorted(
            (a, b) => Date.parse(b.created_at) - Date.parse(a.created_at)
          );
          setCatalogUnfiltered(false);
          setCatalogFilterView(sortedCatalogArray);
        } else if (sortStatus === "Price ascending") {
          const sortedCatalogArray = catalog.toSorted(
            (a, b) => a.productPrice - b.productPrice
          );
          setCatalogUnfiltered(false);
          setCatalogFilterView(sortedCatalogArray);
        } else {
          setCatalogUnfiltered(true); // displays original catalog array
        }
      }

      setCatalogFilterTarget("All");
      setAllCheck(true);
      setCategoryList(
        categoryList.map((object) =>
          true ? { ...object, filterSelected: false } : object
        )
      );
    } else {
      // scenarios here are for filtering categories other than "All"
      // Key idea: filter catalog first, and then sort accordingly after
      if (searchClick === true) {
        // if search function used, filter and sort search result catalog
        // checking current sorting status
        if (sortStatus === "Alphabet A-Z") {
          const sortedCatalogArray = searchResult
            .filter((product) => product.productCategory === objParam.category)
            .toSorted((a, b) =>
              a.productTitle > b.productTitle
                ? 1
                : a.productTitle < b.productTitle
                ? -1
                : 0
            );

          setCatalogFilterView(sortedCatalogArray);
        } else if (sortStatus === "Recently Added") {
          const sortedCatalogArray = searchResult
            .filter((product) => product.productCategory === objParam.category)
            .toSorted(
              (a, b) => Date.parse(b.created_at) - Date.parse(a.created_at)
            );
          setCatalogFilterView(sortedCatalogArray);
        } else if (sortStatus === "Price ascending") {
          const sortedCatalogArray = searchResult
            .filter((product) => product.productCategory === objParam.category)
            .toSorted((a, b) => a.productPrice - b.productPrice);
          setCatalogFilterView(sortedCatalogArray);
        } else {
          // displays a copy of the catalog array being filtered by user specified category
          setCatalogFilterView(
            searchResult.filter(
              (product) => product.productCategory === objParam.category
            )
          );
        }
      } else {
        // if search function not used, just filter and sort original catalog instead
        if (sortStatus === "Alphabet A-Z") {
          const sortedCatalogArray = catalog
            .filter((product) => product.productCategory === objParam.category)
            .toSorted((a, b) =>
              a.productTitle > b.productTitle
                ? 1
                : a.productTitle < b.productTitle
                ? -1
                : 0
            );

          setCatalogFilterView(sortedCatalogArray);
        } else if (sortStatus === "Recently Added") {
          const sortedCatalogArray = catalog
            .filter((product) => product.productCategory === objParam.category)
            .toSorted(
              (a, b) => Date.parse(b.created_at) - Date.parse(a.created_at)
            );
          setCatalogFilterView(sortedCatalogArray);
        } else if (sortStatus === "Price ascending") {
          const sortedCatalogArray = catalog
            .filter((product) => product.productCategory === objParam.category)
            .toSorted((a, b) => a.productPrice - b.productPrice);
          setCatalogFilterView(sortedCatalogArray);
        } else {
          // displays a copy of the catalog array being filtered by user specified category
          setCatalogFilterView(
            catalog.filter(
              (product) => product.productCategory === objParam.category
            )
          );
        }
      }

      setCatalogUnfiltered(false);
      setCatalogFilterTarget(objParam.category);
      setCategoryList(
        categoryList.map((object) =>
          object.id === objParam.id
            ? { ...object, filterSelected: true }
            : { ...object, filterSelected: false }
        )
      );
      setAllCheck(false);
    }
  }

  return (
    <ul style={{ listStyle: "None" }}>
      Filter by Category:
      <li>
        <label>
          <input
            type="radio"
            checked={allCheck}
            onChange={() => handleClick("All")}
          />
          All
        </label>
      </li>
      {categoryList.map((object) => (
        <li>
          <label>
            <input
              type="radio"
              checked={object.filterSelected}
              onChange={() => handleClick(object)}
            />
            {object.category}
          </label>
        </li>
      ))}
    </ul>
  );
}

export default FilterBar;
