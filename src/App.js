import { useState, useEffect } from "react";
import supabase from "./supabase";
import "./style.css";
import Banner from "./Banner";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import CatalogList from "./CatalogList";
import AddForm from "./AddForm";
import DeleteForm from "./DeleteForm";
import EditForm from "./EditForm";

function App() {
  const [catalog, setCatalog] = useState([]);
  const [productTitle, setProductTitle] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCategory, setProductCategory] = useState("");
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
      />
      {/* <Banner /> */}
      <div style={{ display: "flex" }}>
        <AddForm
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
        />
        <DeleteForm
          setCatalog={setCatalog}
          catalog={catalog}
          categoryList={categoryList}
          setCategoryList={setCategoryList}
          catalogFilterRerender={catalogFilterRerender}
          setCatalogFilterRerender={setCatalogFilterRerender}
        />
        <EditForm
          setCatalog={setCatalog}
          catalog={catalog}
          productEdit={productEdit}
          setProductEdit={setProductEdit}
          categoryList={categoryList}
          setCategoryList={setCategoryList}
          catalogFilterRerender={catalogFilterRerender}
          setCatalogFilterRerender={setCatalogFilterRerender}
        />
      </div>

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
        />
      </main>
      <Footer />
    </>
  );
}

function sortCatalogArray() {
  // let noOfCatalogItems = FakeCatalogData.length;
  // if (noOfCatalogItems > 6) {
  // }
}

export default App;
