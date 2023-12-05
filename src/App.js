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
import EditProductForm from "./EditProductForm";

function App() {
  const [catalog, setCatalog] = useState([]);
  const [productTitle, setProductTitle] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productEdit, setProductEdit] = useState([
    { productTitle: null, productPrice: null, productCategory: null },
  ]);

  return (
    <>
      <Header />
      {/* <Banner /> */}
      <div style={{ display: "flex" }}>
        <AddProductForm
          setCatalog={setCatalog}
          productTitle={productTitle}
          setProductTitle={setProductTitle}
          productPrice={productPrice}
          setProductPrice={setProductPrice}
          productCategory={productCategory}
          setProductCategory={setProductCategory}
        />
        <DeleteProductForm setCatalog={setCatalog} catalog={catalog} />
        <EditProductForm
          setCatalog={setCatalog}
          catalog={catalog}
          productEdit={productEdit}
          setProductEdit={setProductEdit}
        />
      </div>

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
