import "./style.css";
import Banner from "./Banner";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import CatalogList from "./CatalogList";

function App() {
  return (
    <>
      <Header />
      <Banner />
      <main style={{ display: "grid", gridTemplateColumns: "1fr 4fr" }}>
        <Sidebar />
        <CatalogList />
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
