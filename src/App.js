import { useState } from "react";
import "./style.css";
import FakeCatalogData from "./CatalogList";
import Banner from "./Banner";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import CatalogList from "./CatalogList";
import AddProductForm from "./AddProductForm";
import DeleteProductForm from "./DeleteProductForm";

function App() {
  const [catalog, setCatalog] = useState([]);
  const [productTitle, setProductTitle] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [deleteList, setDeleteList] = useState([]);
  const [deleteCheckbox, setDeleteCheckbox] = useState(false);

  return (
    <>
      <Header />
      {/* <Banner /> */}
      <AddProductForm
        catalog={catalog}
        setCatalog={setCatalog}
        productTitle={productTitle}
        setProductTitle={setProductTitle}
        productPrice={productPrice}
        setProductPrice={setProductPrice}
        productCategory={productCategory}
        setProductCategory={setProductCategory}
      />
      <DeleteProductForm
        catalog={catalog}
        deleteCheckbox={deleteCheckbox}
        setDeleteCheckbox={setDeleteCheckbox}
        deleteList={deleteList}
        setDeleteList={setDeleteList}
      />
      <main style={{ display: "grid", gridTemplateColumns: "1fr 4fr" }}>
        <Sidebar />
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
