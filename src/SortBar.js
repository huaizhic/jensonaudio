function SortBar({
  catalog,
  catalogUnfiltered,
  setCatalogUnfiltered,
  catalogFilterView,
  setCatalogFilterView,
  catalogFilterRerender,
  setCatalogFilterRerender,
}) {
  function handleAlphabet() {
    // if catalog array is currently on display
    if (catalogUnfiltered === true) {
      // explanation for sorting:
      // function compare( a, b ) {
      //   if ( a.last_nom < b.last_nom ){
      //     return -1;
      //   }
      //   if ( a.last_nom > b.last_nom ){
      //     return 1;
      //   }
      //   return 0;
      // }
      // objs.sort( compare );
      const sortedCatalogArray = catalog.toSorted(
        (a, b) =>
          a.productTitle > b.productTitle
            ? 1 // sort a after b
            : a.productTitle < b.productTitle
            ? -1 // sort a before b
            : 0 // no sorting done since a === b
      );
      // console.log(sortedCatalogArray);
      setCatalogFilterView(sortedCatalogArray);
      setCatalogUnfiltered(false);
      // setCatalogFilterRerender(!catalogFilterRerender);
    } else {
      const sortedFilterArray = catalogFilterView.toSorted((a, b) =>
        a.productTitle > b.productTitle
          ? 1
          : a.productTitle < b.productTitle
          ? -1
          : 0
      );
      setCatalogFilterView(sortedFilterArray);
    }
  }

  function handleRecent() {}

  function handlePrice() {}

  return (
    <ul style={{ listStyle: "None" }}>
      Sort by: (only working for alphabet A-Z (non-persistent))
      <li>
        <button onClick={() => handleAlphabet()}>Alphabet (A-Z)</button>
      </li>
      <li>
        <button> onClick={() => handleRecent()}Recently Added</button>
      </li>
      <li>
        <button onClick={() => handlePrice()}>Price (lowest to highest)</button>
      </li>
    </ul>
  );
}

export default SortBar;
