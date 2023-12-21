import { useState, useEffect } from "react";
import supabase from "./supabase";
import "./style.css";
import Banner from "./Banner";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import CatalogList from "./CatalogList";
import { Route, Routes, useLocation } from "react-router-dom";
import AdminTools from "./AdminTools/AdminTools";
import About from "./About";
import Product from "./Product";
import ErrorPage from "./ErrorPage";

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

  // const location = useLocation();
  // console.log(location);

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
      />
      {/* <Banner /> */}
      <AdminTools
        catalog={catalog}
        setCatalog={setCatalog}
        productTitle={productTitle}
        setProductTitle={setProductTitle}
        productPrice={productPrice}
        setProductPrice={setProductPrice}
        productCategory={productCategory}
        setProductCategory={setProductCategory}
        categoryList={categoryList}
        setCategoryList={setCategoryList}
        catalogFilterRerender={catalogFilterRerender}
        setCatalogFilterRerender={setCatalogFilterRerender}
        productEdit={productEdit}
        setProductEdit={setProductEdit}
        productDescription={productDescription}
        setProductDescription={setProductDescription}
      />
      <Routes>
        <Route
          path="/"
          element={
            <main style={{ display: "grid", gridTemplateColumns: "1fr 4fr" }}>
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
        <Route path="/*" element={<ErrorPage />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
