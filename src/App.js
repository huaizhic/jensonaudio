import { useState, useEffect } from "react";
import supabase from "./supabase";
import "./style.css";
import Banner from "./Banner";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import CatalogList from "./CatalogList";
import { Route, Routes } from "react-router-dom";
import AdminTools from "./Admin/AdminTools/AdminTools";
import About from "./About";
import Product from "./Product";
import ErrorPage from "./ErrorPage";
import AdminView from "./Admin/AdminView";
// import ProductEdit from "./AdminTools/ProductEdit";
import ProductEdit from "./Admin/AdminTools/ProductEdit";
import { AuthWrapper } from "./Auth/AuthWrapper";
import Login from "./Auth/LoginPage";
import AddForm from "./Admin/AdminTools/AddForm";
import CartList from "./Cart/CartList";
import { CartWrapper } from "./Cart/CartWrapper";

function App() {
  const [catalog, setCatalog] = useState([]);
  const [productTitle, setProductTitle] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productEdit, setProductEdit] = useState({
    productTitle: null,
    productPrice: null,
    productCategory: null,
  });
  const [categoryList, setCategoryList] = useState([]); // array of objects from supabase
  const [catalogUnfiltered, setCatalogUnfiltered] = useState(true);
  const [catalogFilterView, setCatalogFilterView] = useState([]);
  const [catalogFilterRerender, setCatalogFilterRerender] = useState(false);
  const [catalogFilterTarget, setCatalogFilterTarget] = useState("All");
  const [sortStatus, setSortStatus] = useState("random");

  const [alphabetCheck, setAlphabetCheck] = useState(false);
  const [recentCheck, setRecentCheck] = useState(false);
  const [priceCheck, setPriceCheck] = useState(false);
  const [allCheck, setAllCheck] = useState(true);

  const [searchClick, setSearchClick] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const [fetchData, setFetchData] = useState(false);

  const [user, setUser] = useState({ name: "", isAuthenticated: false });

  const [cartOpen, setCartOpen] = useState(false);
  const [searchBarOpen, setSearchBarOpen] = useState(false);

  const [productRerender, setProductRerender] = useState(false);

  // for fetching categoryList from supabase
  useEffect(function () {
    async function getCategoryList() {
      const { data: Categories, error } = await supabase
        .from("CategoryList")
        .select("*");
      setCategoryList(Categories);
      // console.log(categoryList);
    }
    getCategoryList();
  }, []);

  return (
    <>
      <Header
        catalog={catalog}
        catalogUnfiltered={catalogUnfiltered}
        setCatalogUnfiltered={setCatalogUnfiltered}
        catalogFilterView={catalogFilterView}
        setCatalogFilterView={setCatalogFilterView}
        alphabetCheck={alphabetCheck}
        setAlphabetCheck={setAlphabetCheck}
        recentCheck={recentCheck}
        setRecentCheck={setRecentCheck}
        priceCheck={priceCheck}
        setPriceCheck={setPriceCheck}
        setAllCheck={setAllCheck}
        categoryList={categoryList}
        setCategoryList={setCategoryList}
        searchClick={searchClick}
        setSearchClick={setSearchClick}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        searchResult={searchResult}
        setSearchResult={setSearchResult}
        cartOpen={cartOpen}
        setCartOpen={setCartOpen}
        searchBarOpen={searchBarOpen}
        setSearchBarOpen={setSearchBarOpen}
      />
      {/* <CartList /> */}
      <Routes>
        <Route
          path="/*"
          element={
            <CartWrapper
              catalog={catalog}
              setCatalog={setCatalog}
              catalogUnfiltered={catalogUnfiltered}
              setCatalogUnfiltered={setCatalogUnfiltered}
              catalogFilterView={catalogFilterView}
              setCatalogFilterView={setCatalogFilterView}
              alphabetCheck={alphabetCheck}
              setAlphabetCheck={setAlphabetCheck}
              recentCheck={recentCheck}
              setRecentCheck={setRecentCheck}
              priceCheck={priceCheck}
              setPriceCheck={setPriceCheck}
              setAllCheck={setAllCheck}
              categoryList={categoryList}
              setCategoryList={setCategoryList}
              searchClick={searchClick}
              setSearchClick={setSearchClick}
              searchInput={searchInput}
              setSearchInput={setSearchInput}
              searchResult={searchResult}
              setSearchResult={setSearchResult}
              productTitle={productTitle}
              setProductTitle={setProductTitle}
              productPrice={productPrice}
              setProductPrice={setProductPrice}
              productCategory={productCategory}
              setProductCategory={setProductCategory}
              catalogFilterRerender={catalogFilterRerender}
              setCatalogFilterRerender={setCatalogFilterRerender}
              productEdit={productEdit}
              setProductEdit={setProductEdit}
              productDescription={productDescription}
              setProductDescription={setProductDescription}
              catalogFilterTarget={catalogFilterTarget}
              setCatalogFilterTarget={setCatalogFilterTarget}
              sortStatus={sortStatus}
              setSortStatus={setSortStatus}
              allCheck={allCheck}
              fetchData={fetchData}
              setFetchData={setFetchData}
              user={user}
              setUser={setUser}
              cartOpen={cartOpen}
              setCartOpen={setCartOpen}
              searchBarOpen={searchBarOpen}
              setSearchBarOpen={setSearchBarOpen}
              productRerender={productRerender}
              setProductRerender={setProductRerender}
            />
          }
        ></Route>

        {/* <Route path="/*" element={<ErrorPage />} /> */}
        <Route
          path="/admin/*"
          element={
            <AuthWrapper
              catalog={catalog}
              setCatalog={setCatalog}
              catalogUnfiltered={catalogUnfiltered}
              setCatalogUnfiltered={setCatalogUnfiltered}
              catalogFilterView={catalogFilterView}
              setCatalogFilterView={setCatalogFilterView}
              alphabetCheck={alphabetCheck}
              setAlphabetCheck={setAlphabetCheck}
              recentCheck={recentCheck}
              setRecentCheck={setRecentCheck}
              priceCheck={priceCheck}
              setPriceCheck={setPriceCheck}
              setAllCheck={setAllCheck}
              categoryList={categoryList}
              setCategoryList={setCategoryList}
              searchClick={searchClick}
              setSearchClick={setSearchClick}
              searchInput={searchInput}
              setSearchInput={setSearchInput}
              searchResult={searchResult}
              setSearchResult={setSearchResult}
              productTitle={productTitle}
              setProductTitle={setProductTitle}
              productPrice={productPrice}
              setProductPrice={setProductPrice}
              productCategory={productCategory}
              setProductCategory={setProductCategory}
              catalogFilterRerender={catalogFilterRerender}
              setCatalogFilterRerender={setCatalogFilterRerender}
              productEdit={productEdit}
              setProductEdit={setProductEdit}
              productDescription={productDescription}
              setProductDescription={setProductDescription}
              catalogFilterTarget={catalogFilterTarget}
              setCatalogFilterTarget={setCatalogFilterTarget}
              sortStatus={sortStatus}
              setSortStatus={setSortStatus}
              allCheck={allCheck}
              fetchData={fetchData}
              setFetchData={setFetchData}
              user={user}
              setUser={setUser}
              productRerender={productRerender}
              setProductRerender={setProductRerender}
            />
          }
        ></Route>
        {/* <Route path="/login" element={<Login />}></Route> */}
      </Routes>

      <Footer />
    </>
  );
}

export default App;
