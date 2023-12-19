import { useState } from "react";
import HeaderButton from "./HeaderButton";

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
}) {
  const [searchInput, setSearchInput] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const searchInputLowerCase = searchInput.toLowerCase();

    // generate result array of objects, filtered from catalog array
    // search based on substring (non-case sensitive)
    const resultArray = catalog.filter(
      (product) =>
        product.productTitle.toLowerCase().indexOf(searchInputLowerCase) !== -1
      // as long as it can return a positive index at which first character of substring is found, there is a match.
      // originally intended to use product.productTitle.toLowerCase().includes(searchInputLowerCase), but used above code instead to support older broswers
    );

    setCatalogUnfiltered(false);
    setCatalogFilterView(resultArray);

    setPriceCheck(false);
    setAlphabetCheck(false);
    setRecentCheck(false);
    setAllCheck(true);
    setCategoryList(
      categoryList.map((object) =>
        true ? { ...object, filterSelected: false } : object
      )
    );
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
          <HeaderButton />
        </div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            type="text"
            placeholder="Search product (Substring Match)"
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
