import { Route, Routes, Outlet } from "react-router-dom";
import AdminView from "./AdminView";
import Product from "./Product";
import ProductEdit from "./ProductEdit";

function AdminRoutes({
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
}) {
  return (
    <>
      <Routes>
        <Route
          index
          element={
            <AdminView
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
            />
          }
        ></Route>
        <Route
          path="product/:id"
          element={
            <>
              <Product
                catalog={catalog}
                setCatalog={setCatalog}
                fetchData={fetchData}
                setFetchData={setFetchData}
              />
              <br></br>
              <br></br>
              <ProductEdit catalog={catalog} categoryList={categoryList} />
            </>
          }
        ></Route>
      </Routes>
      <Outlet />
    </>
  );
}

export default AdminRoutes;
