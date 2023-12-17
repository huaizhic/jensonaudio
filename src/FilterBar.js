// const FilterButtonArray = [
//   { Name: "Speakers" },
//   { Name: "Preamps" },
//   { Name: "Cables" },
// ];

function FilterBar({
  categoryList,
  setCategoryList,
  catalog,
  setCatalog,
  catalogUnfiltered,
  setCatalogUnfiltered,
  catalogFilterView,
  setCatalogFilterView,
}) {
  // const fullCatalogBackup = catalog;

  function handleClick(categoryParam) {
    if (categoryParam === "All") {
      setCatalogUnfiltered(true);
    } else {
      setCatalogFilterView(
        catalog.filter((product) => product.productCategory === categoryParam)
      );
      setCatalogUnfiltered(false);
    }
  }

  return (
    <ul style={{ listStyle: "None" }}>
      Filter by Category: (early stage)
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
