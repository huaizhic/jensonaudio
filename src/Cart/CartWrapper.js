import { createContext, useContext, useEffect, useState } from "react";
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
import Payment from "./Payment";
import OrderSent from "./OrderSent";
import supabase from "../supabase";
import { SearchBar } from "../SearchBar";

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
  searchBarOpen,
  setSearchBarOpen,
  productRerender,
  setProductRerender,
}) => {
  const [cart, setCart] = useState([]);
  // const [cartOpen, setCartOpen] = useState(true);
  const [cartTotalPrice, setCartTotalPrice] = useState(0);
  const [calculateCartValue, setCalculateCartValue] = useState(false);
  const [inputQuantity, setInputQuantity] = useState(1);
  const [checkLocalStorage, setCheckLocalStorage] = useState(false);
  const [checkLocalStorageFlag, setCheckLocalStorageFlag] = useState(false);

  // useEffect(function () {
  //   async function getCatalog() {
  //     const { data: Catalog, error } = await supabase
  //       .from("CatalogList")
  //       .select("*");
  //     setCatalog(Catalog);
  //     // console.log(CatalogList);
  //   }
  //   getCatalog();
  // }, []);

  useEffect(() => {
    const checkLocalStorageCart = async () => {
      const { data: Catalog, error } = await supabase
        .from("CatalogList")
        .select("*");

      if (localStorage.getItem("cart") !== null) {
        // compare localStorage cart with current catalog as products might have been edited or deleted
        // verify and update using product id
        let localStorageCart = JSON.parse(localStorage.getItem("cart"));
        // console.log(localStorageCart);
        localStorageCart.forEach((localProduct, index) => {
          // if product can no longer be found in the catalog, delete it from localStorage cart
          let isProductInCatalog = false;
          // console.log(catalog); // problem: catalog is not fetched yet
          Catalog.forEach((catalogProduct) => {
            if (localProduct.id === catalogProduct.id) {
              isProductInCatalog = true;
            }
          });
          if (!isProductInCatalog) {
            // removeFromCart(localProduct);
            let tempCart = cart.filter(
              (product) => product.id !== localProduct.id
            );
            setCart(tempCart);
            localStorage.setItem("cart", JSON.stringify(tempCart));
            // setCartTotalPrice(cartTotalPrice - selectedProduct.productPrice);
            setCalculateCartValue(!calculateCartValue);
          } else if (isProductInCatalog) {
            // if product can still be found but its details are outdated, update it in the localStorage cart
            let upToDateProduct = Catalog.filter(
              (catalogProduct) => localProduct.id === catalogProduct.id
            )[0];
            // console.log(upToDateProduct);

            // check if input quantity exceeds in-stock quantity. if so, reduce input quantity to match that of in stock.
            if (
              localStorageCart[index].inputQuantity > upToDateProduct.quantity
            ) {
              localStorageCart[index] = {
                ...localStorageCart[index],
                inputQuantity: upToDateProduct.quantity,
              };
            }

            // update product details EXCEPT for input quantity
            upToDateProduct = {
              ...upToDateProduct,
              inputQuantity: localStorageCart[index].inputQuantity,
            };

            localStorageCart[index] = upToDateProduct; // works
            // console.log(localProduct);
            // console.log(localStorageCart);
            localStorage.setItem("cart", JSON.stringify(localStorageCart));
            setCart(localStorageCart);
          }
        });
        setCalculateCartValue(!calculateCartValue);
      } else if (localStorage.getItem("cart") === null) {
        // this is if cart cannot  be found in localStorge
        localStorage.setItem("cart", JSON.stringify(cart));
        setCalculateCartValue(!calculateCartValue);
      } else {
        alert("error setting/getting cart from localstorage");
      }
    };
    checkLocalStorageCart();
  }, [checkLocalStorage]);

  useEffect(() => {
    const determineCartPrice = () => {
      let tempPrice = 0;
      // if (cart.length !== 0) {
      // cart.forEach((product) => (tempPrice = tempPrice + product.productPrice));
      cart.forEach((product) => {
        tempPrice = tempPrice + product.productPrice * product.inputQuantity;
      });
      // }
      setCartTotalPrice(tempPrice);
      // return tempPrice;
    };
    determineCartPrice();
  }, [calculateCartValue]);

  if (catalog === undefined) {
    return <h1>Still loading...</h1>;
  } else if (checkLocalStorageFlag === false) {
    setCheckLocalStorage(!checkLocalStorage);
    setCheckLocalStorageFlag(!checkLocalStorageFlag);
  }

  const addToCart = (selectedProduct) => {
    // check if product is already in cart (for non-quantity version)
    let tempCart = [];
    let doesItemAlreadyExist = false;
    cart.forEach((product) => {
      if (product.id === selectedProduct.id) {
        doesItemAlreadyExist = true;
      }
    });

    // for item not in cart
    if (doesItemAlreadyExist === false) {
      setCart([...cart, selectedProduct]);
      localStorage.setItem("cart", JSON.stringify([...cart, selectedProduct]));
    } else if (doesItemAlreadyExist === true) {
      // for item already in cart, need to implement inputQuantity logic

      // look for the item
      let tempSelectedProduct = cart.filter(
        (product) => product.id === selectedProduct.id
      )[0];
      console.log("tempSelectedProduct:", tempSelectedProduct);

      // add to the existing input quantity in the shopping cart
      // but first, check if combined quantity exceeds in stock quantity
      if (
        tempSelectedProduct.inputQuantity + selectedProduct.inputQuantity <=
        tempSelectedProduct.quantity
      ) {
        // if combined quantity doesn't exceed in stock quantity, set inputQuantity to the added amt
        tempSelectedProduct = {
          ...tempSelectedProduct,
          inputQuantity:
            tempSelectedProduct.inputQuantity + selectedProduct.inputQuantity,
        };
        console.log("tempSelectedProduct:", tempSelectedProduct);
        tempCart = cart;
        tempCart.forEach((product, index) =>
          product.id === tempSelectedProduct.id
            ? (cart[index] = tempSelectedProduct)
            : product
        );
        console.log("tempCart:", tempCart);
        localStorage.setItem("cart", JSON.stringify(tempCart));
      } else if (
        tempSelectedProduct.inputQuantity + selectedProduct.inputQuantity >
        tempSelectedProduct.quantity
      ) {
        // if combined quantity exceeds in stock amt, just set to max in stock quantity
        tempSelectedProduct = {
          ...tempSelectedProduct,
          inputQuantity: tempSelectedProduct.quantity,
        };
        console.log("tempSelectedProduct:", tempSelectedProduct);
        tempCart = cart;
        tempCart.forEach((product, index) =>
          product.id === tempSelectedProduct.id
            ? (cart[index] = tempSelectedProduct)
            : product
        );
        localStorage.setItem("cart", JSON.stringify(tempCart));
      }
    }

    // setCartTotalPrice(cartTotalPrice + selectedProduct.productPrice);
    // setCartTotalPrice(determineCartPrice(cart));
    setCalculateCartValue(!calculateCartValue);
  };

  const removeFromCart = (selectedProduct) => {
    let tempCart = cart.filter((product) => product.id !== selectedProduct.id);
    setCart(tempCart);
    localStorage.setItem("cart", JSON.stringify(tempCart));
    // setCartTotalPrice(cartTotalPrice - selectedProduct.productPrice);
    setCalculateCartValue(!calculateCartValue);
  };

  const checkout = () => {};

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
        removeFromCart,
        checkout,
        cartOpen,
        setCartOpen,
        cartTotalPrice,
        setCartTotalPrice,
        calculateCartValue,
        setCalculateCartValue,
        inputQuantity,
        setInputQuantity,
      }}
    >
      <>
        {/* children components here */}
        {searchBarOpen ? (
          <SearchBar
            searchBarOpen={searchBarOpen}
            setSearchBarOpen={setSearchBarOpen}
            catalog={catalog}
            productRerender={productRerender}
            setProductRerender={setProductRerender}
          />
        ) : null}
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
                productRerender={productRerender}
                setProductRerender={setProductRerender}
              />
            }
          />
          <Route path="checkout" element={<Checkout />} />
          <Route path="payment" element={<Payment />} />
          <Route path="ordersent" element={<OrderSent />} />
          {/* <Route path="filter" element={}/> */}
          <Route path="/*" element={<ErrorPage />} />
        </Routes>
        <Outlet />
      </>
    </CartContext.Provider>
  );
};
