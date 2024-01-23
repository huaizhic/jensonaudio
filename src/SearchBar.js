import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";

export const searchLogic = (searchInput, catalog) => {
  // in order to make search non case sensitive, make both user search and catalog details lowercase for comparision
  let searchInputLowerCase = searchInput.toLowerCase();

  // split search input by spaces, to search the individual words too
  let searchInputArray = searchInputLowerCase.split(" ");

  let searchResultArray = [];

  for (let i = 0; i < searchInputArray.length; i++) {
    // results from searching a single keyword in the entire string, seperated by spacing
    let indivWordSearch = catalog.filter(
      (product) =>
        product.productTitle.toLowerCase().indexOf(searchInputArray[i]) !== -1
    );

    // add a condition to not add if product alr exist in the result array
    indivWordSearch.forEach((product, index) => {
      let gotDuplicate = searchResultArray.some(
        (productParam) => productParam.id === product.id
      );

      if (gotDuplicate) {
        indivWordSearch[index] = {
          ...indivWordSearch[index],
          isDuplicate: true,
        };
      } else {
        indivWordSearch[index] = {
          ...indivWordSearch[index],
          isDuplicate: false,
        };
      }
    });

    indivWordSearch = indivWordSearch.filter(
      (product) => product.isDuplicate === false
    );

    // accumulate individual keyword result to total search result array
    searchResultArray = [...searchResultArray, ...indivWordSearch];
  }

  return searchResultArray;
};

export const SearchBar = ({
  searchBarOpen,
  setSearchBarOpen,
  catalog,
  productRerender,
  setProductRerender,
}) => {
  const navigate = useNavigate();
  const [searchResult, setSearchResult] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  return (
    <>
      <div className="cart">
        <div className="cartTitle">
          <h2>Search</h2>
          <button onClick={() => setSearchBarOpen(!searchBarOpen)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="20"
              height="20"
              viewBox="0 0 50 50"
            >
              <path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"></path>
            </svg>
          </button>
        </div>
        <input
          style={{ width: "100%" }}
          type="text"
          value={searchInput}
          onChange={(e) => {
            setSearchInput(e.target.value);
            setSearchResult(searchLogic(e.target.value, catalog));
          }}
        ></input>
        <div
          style={{
            height: "75%",
            overflow: "scroll",
          }}
        >
          {searchResult.map((product) => (
            // <h2>{product.productTitle}</h2>
            <h2>
              <Link
                to={`product/${product.productTitle}`}
                onClick={() => {
                  setProductRerender(!productRerender);
                }}
              >
                {product.productTitle}
                {/* {product} */}
              </Link>
            </h2>
          ))}
        </div>
        <button
          onClick={() => {
            // navigate("/checkout");
          }}
        >
          See all results (still in progress)
        </button>
      </div>
    </>
  );
};

// export default SearchBar;
