function SortBar({
  catalog,
  catalogUnfiltered,
  setCatalogUnfiltered,
  catalogFilterView,
  setCatalogFilterView,
  catalogFilterRerender,
  setCatalogFilterRerender,
  catalogFilterTarget,
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

      // toSorted creates a copy of the array being sorted. any confusion regarding the code below, please consult official documentation.
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

  function handleRecent() {
    // console.log(Date.parse(catalog[0].pro));

    // if catalog array is currently on display
    if (catalogUnfiltered === true) {
      const sortedCatalogArray = catalog.toSorted(
        (a, b) => Date.parse(a.created_at) - Date.parse(b.created_at)
      );
      // console.log(sortedCatalogArray);
      setCatalogFilterView(sortedCatalogArray);
      setCatalogUnfiltered(false);
      // setCatalogFilterRerender(!catalogFilterRerender);
    } else {
      // converts timestamp into string, then into no. of milliseconds elapsed since Jan 1 1970 UTC
      // afterwards, can just compare timestamp using numerical way
      const sortedFilterArray = catalogFilterView.toSorted(
        (a, b) => Date.parse(a.created_at) - Date.parse(b.created_at)
      );
      setCatalogFilterView(sortedFilterArray);
    }
  }

  function handlePrice() {
    // if catalog array is currently on display
    if (catalogUnfiltered === true) {
      const sortedCatalogArray = catalog.toSorted(
        (a, b) => a.productPrice - b.productPrice // based on value difference, either sort a after b, b after a, or don't sort
      );
      // console.log(sortedCatalogArray);
      setCatalogFilterView(sortedCatalogArray);
      setCatalogUnfiltered(false);
      // setCatalogFilterRerender(!catalogFilterRerender);
    } else {
      const sortedFilterArray = catalogFilterView.toSorted(
        (a, b) => a.productPrice - b.productPrice
      );
      setCatalogFilterView(sortedFilterArray);
    }
  }

  return (
    <ul style={{ listStyle: "None" }}>
      Sort by: (non-persistent)
      <li>
        <button onClick={() => handleAlphabet()}>Alphabet (A-Z)</button>
      </li>
      <li>
        <button onClick={() => handleRecent()}>Recently Added</button>
      </li>
      <li>
        <button onClick={() => handlePrice()}>Price (lowest to highest)</button>
      </li>
    </ul>
  );
}

export default SortBar;
