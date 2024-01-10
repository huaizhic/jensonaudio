import { createContext, useContext, useState } from "react";
import { Outlet, Routes, Route } from "react-router-dom";
import Header from "../Header";
import Banner from "../Banner";
import Sidebar from "../Sidebar";
import About from "../About";
import ErrorPage from "../ErrorPage";
import Product from "../Product";
import CatalogList from "../CatalogList";
import CartList from "./CartList";
import Checkout from "./Checkout";

const CartContext = createContext("");
export const useCart = () => useContext(CartContext);

export const CartWrapper = ({
  catalog,
  setCatalog,
  catalogUnfiltered,
  setCatalogUnfiltered,
  catalogFilterView,
  setCatalogFilterView,
  alphabetCheck,
  setAlphabetCheck,
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
  productTitle,
  setProductTitle,
  productPrice,
  setProductPrice,
  productCategory,
  setProductCategory,
  catalogFilterRerender,
  setCatalogFilterRerender,
  productEdit,
  setProductEdit,
  productDescription,
  setProductDescription,
  catalogFilterTarget,
  setCatalogFilterTarget,
  sortStatus,
  setSortStatus,
  allCheck,
  fetchData,
  setFetchData,
  user,
  setUser,
  cartOpen,
  setCartOpen,
}) => {
  const [cart, setCart] = useState([]);
  // const [cartOpen, setCartOpen] = useState(true);

  const addToCart = () => {};

  const removeFromCart = () => {};

  const buyFromCart = () => {};

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
        removeFromCart,
        buyFromCart,
        cartOpen,
        setCartOpen,
      }}
    >
      <>
        {/* children components here */}
        {cartOpen ? <CartList /> : null}
        <Routes>
          <Route
            index
            element={
              <>
                <Banner />
                <main
                  style={{ display: "grid", gridTemplateColumns: "1fr 4fr" }}
                >
                  <Sidebar
                    categoryList={categoryList}
                    setCategoryList={setCategoryList}
                    catalog={catalog}
                    setCatalog={setCatalog}
                    catalogUnfiltered={catalogUnfiltered}
                    setCatalogUnfiltered={setCatalogUnfiltered}
                    catalogFilterView={catalogFilterView}
                    setCatalogFilterView={setCatalogFilterView}
                    catalogFilterRerender={catalogFilterRerender}
                    setCatalogFilterRerender={setCatalogFilterRerender}
                    catalogFilterTarget={catalogFilterTarget}
                    setCatalogFilterTarget={setCatalogFilterTarget}
                    sortStatus={sortStatus}
                    setSortStatus={setSortStatus}
                    alphabetCheck={alphabetCheck}
                    setAlphabetCheck={setAlphabetCheck}
                    recentCheck={recentCheck}
                    setRecentCheck={setRecentCheck}
                    priceCheck={priceCheck}
                    setPriceCheck={setPriceCheck}
                    allCheck={allCheck}
                    setAllCheck={setAllCheck}
                    searchClick={searchClick}
                    setSearchClick={setSearchClick}
                    searchResult={searchResult}
                    setSearchResult={setSearchResult}
                  />
                  <CatalogList
                    catalog={catalog}
                    setCatalog={setCatalog}
                    catalogUnfiltered={catalogUnfiltered}
                    setCatalogUnfiltered={setCatalogUnfiltered}
                    catalogFilterView={catalogFilterView}
                    setCatalogFilterView={setCatalogFilterView}
                    catalogFilterRerender={catalogFilterRerender}
                    setCatalogFilterRerender={setCatalogFilterRerender}
                    catalogFilterTarget={catalogFilterTarget}
                    setCatalogFilterTarget={setCatalogFilterTarget}
                    searchClick={searchClick}
                    setSearchClick={setSearchClick}
                    searchInput={searchInput}
                    setSearchInput={setSearchInput}
                    allCheck={allCheck}
                    setAllCheck={setAllCheck}
                    categoryList={categoryList}
                    setCategoryList={setCategoryList}
                    setAlphabetCheck={setAlphabetCheck}
                    setRecentCheck={setRecentCheck}
                    setPriceCheck={setPriceCheck}
                    fetchData={fetchData}
                    setFetchData={setFetchData}
                  />
                </main>
              </>
            }
          />
          <Route path="/about" element={<About />} />
          <Route
            path="/product/:id"
            element={
              <Product
                catalog={catalog}
                setCatalog={setCatalog}
                fetchData={fetchData}
                setFetchData={setFetchData}
              />
            }
          />
          <Route path="checkout" element={<Checkout />} />
          <Route path="/*" element={<ErrorPage />} />
        </Routes>
        <Outlet />
      </>
    </CartContext.Provider>
  );
};
