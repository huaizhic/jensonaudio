import { useEffect } from "react";

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
}) {
  // to re-render filtered catalog view everytime an external change is made (eg delete product, edit product, etc)
  useEffect(() => {
    setCatalogFilterView(
      catalog.filter(
        (product) => product.productCategory === catalogFilterTarget
      )
    );
  }, [catalogFilterRerender]);

  function handleClick(categoryParam) {
    if (categoryParam === "All") {
      setCatalogUnfiltered(true); // displays original catalog array
      setCatalogFilterTarget("All");
    } else {
      // displays a copy of the catalog array being filtered by user specified category
      setCatalogFilterView(
        catalog.filter((product) => product.productCategory === categoryParam)
      );
      setCatalogUnfiltered(false);
      setCatalogFilterTarget(categoryParam);
    }
  }

  return (
    <ul style={{ listStyle: "None" }}>
      Filter by Category:
      <li>
        <button onClick={() => handleClick("All")}>All</button>
      </li>
      {categoryList.map((object) => (
        <li>
          <button onClick={() => handleClick(object.category)}>
            {object.category}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default FilterBar;
