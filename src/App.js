import { useState, useEffect } from "react";
import supabase from "./supabase";
import "./style.css";
import FakeCatalogData from "./CatalogList";
import Banner from "./Banner";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import CatalogList from "./CatalogList";
import AddForm from "./AddForm";
import DeleteProductForm from "./DeleteProductForm";
import EditProductForm from "./EditProductForm";

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
      <Header />
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
        />
        <DeleteProductForm setCatalog={setCatalog} catalog={catalog} />
        <EditProductForm
          setCatalog={setCatalog}
          catalog={catalog}
          productEdit={productEdit}
          setProductEdit={setProductEdit}
          categoryList={categoryList}
          setCategoryList={setCategoryList}
        />
      </div>

      <main style={{ display: "grid", gridTemplateColumns: "1fr 4fr" }}>
        <Sidebar
          categoryList={categoryList}
          setCategoryList={setCategoryList}
        />
        <CatalogList catalog={catalog} setCatalog={setCatalog} />
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
