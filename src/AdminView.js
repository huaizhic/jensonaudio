import Header from "./Header";
import AdminTools from "./AdminTools/AdminTools";
import Sidebar from "./Sidebar";
import CatalogList from "./CatalogList";
import { useNavigate } from "react-router-dom";

function AdminView({
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
}) {
  const navigate = useNavigate();

  function checkAdmin() {
    if (user.isAuthenticated === false) {
      // alert("You are not logged in to admin yet!");
      navigate("/login");
    }
  }

  checkAdmin();

  return (
    <>
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
    </>
  );
}

export default AdminView;
