import { useState } from "react";
import HeaderButton from "./HeaderButton";

function Header({
  catalog,
  catalogUnfiltered,
  setCatalogUnfiltered,
  catalogFilterView,
  setCatalogFilterView,
}) {
  const [searchInput, setSearchInput] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const searchInputLowerCase = searchInput.toLowerCase();

    // generate result array of objects, filtered from catalog array
    const resultArray = catalog.filter((product) =>
      product.productTitle.toLowerCase().includes(searchInputLowerCase)
    );

    // console.log(resultArray);

    setCatalogUnfiltered(false);
    setCatalogFilterView(resultArray);
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
