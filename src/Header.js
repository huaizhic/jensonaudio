import { useState } from "react";
import HeaderButton from "./HeaderButton";

const headerButtonArray = [
  { Name: "Home", RoutingName: "" },
  { Name: "Brands", RoutingName: "brands" },
  { Name: "About", RoutingName: "about" },
  { Name: "Contact", RoutingName: "contact" },
  { Name: "Request a demo", RoutingName: "requestademo" },
];

function Header({
  catalog,
  catalogUnfiltered,
  setCatalogUnfiltered,
  catalogFilterView,
  setCatalogFilterView,
  setAlphabetCheck,
  alphabetCheck,
  recentCheck,
  setRecentCheck,
  priceCheck,
  setPriceCheck,
  setAllCheck,
  categoryList,
  setCategoryList,
  searchClick,
  setSearchClick,
  searchInput,
  setSearchInput,
  searchResult,
  setSearchResult,
}) {
  // const [searchInput, setSearchInput] = useState("");

  function handleSubmit(e) {
    // *** currently, search function only searches the entire unfiltered catalog, unsorted.
    // *** there is also no functionality to filter and sort the search result yet.

    e.preventDefault();

    // in order to make search non case sensitive, make both user search and catalog details lowercase for comparision
    let searchInputLowerCase = searchInput.toLowerCase();

    // split search input by spaces, to search the individual words too
    let searchInputArray = searchInputLowerCase.split(" ");

    let searchResultArray = [];

    for (let i = 0; i < searchInputArray.length; i++) {
      searchResultArray = [
        ...searchResultArray,
        // generate result array of objects, filtered from catalog array
        // search based on substring (non-case sensitive)
        ...catalog.filter(
          (product) =>
            product.productTitle.toLowerCase().indexOf(searchInputArray[i]) !==
            -1
          // as long as it can return a positive index at which first character of substring is found, there is a match.
          // originally intended to use product.productTitle.toLowerCase().includes(searchInputLowerCase), but used above code instead to support older broswers
        ),
      ];
    }

    setSearchResult(searchResultArray);
    setCatalogUnfiltered(false);
    setCatalogFilterView(searchResultArray);

    setPriceCheck(false);
    setAlphabetCheck(false);
    setRecentCheck(false);
    setAllCheck(true);
    setCategoryList(
      categoryList.map((object) =>
        true ? { ...object, filterSelected: false } : object
      )
    );
    setSearchClick(true);
  }

  function handleChange(e) {
    setSearchInput(e.target.value);
  }

  return (
    <>
      <header
        style={{
          backgroundColor: "lightsteelblue",
          height: "40px",
          display: "flex",
          justifyContent: "Center",
          gap: "250px",
        }}
      >
        <img src="jenson.jpg" height="30" width="160" alt="Jenson Audio logo" />
        <div>
          {headerButtonArray.map((button) => (
            <HeaderButton button={button} />
          ))}
        </div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            type="text"
            placeholder="Search product..."
            value={searchInput}
            onChange={(e) => handleChange(e)}
          ></input>
          <button>Search</button>
        </form>
      </header>
    </>
  );
}

export default Header;
