import Header from "../Header";
import AdminTools from ".//AdminTools/AdminTools";
import Sidebar from "../Sidebar";
import CatalogList from "../CatalogList";
import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "../Auth/AuthWrapper";
import { useEffect, useState } from "react";
import AdminSidebar from "./AdminSidebar";
import PrivateList from "./PrivateList";

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
  const {
    processLogout,
    sessionData,
    sessionCheck,
    setSessionCheck,
    authRouteRedirect,
    setAuthRouteRedirect,
  } = useAdminAuth();
  // console.log(sessionData);
  // const [sessionCheck, setSessionCheck] = useState(false);
  // setSessionCheck(!sessionCheck);

  const [isPrivateView, setIsPrivateView] = useState(false);

  useEffect(
    function () {
      function checkSession() {
        // // this if condition checks if data is fetched from supabase
        // if (sessionData.beforeFetchData === "true") {
        //   console.log(
        //     "(AdminView POV) sessionData.beforeFetchData === true, meaning data not fetched from supabase yet"
        //   );
        // } else {
        //   // if there is no session from supabase
        //   if (sessionData.session === null) {
        //     console.log(
        //       "(AdminView POV) sessionData.session === null, meaning no session received from supabase"
        //     );
        //     setUser({ ...user, isAuthenticated: false });
        //     // if there is an existing session from supabase
        //   } else if (sessionData.session !== null) {
        //     setUser({ ...user, isAuthenticated: true });
        //   } else {
        //     // to catch any other edge cases
        //     alert(
        //       "(AdminView POV) There was an error checking session data from supabase"
        //     );
        //   }
        // }

        // console.log("(AdminView POV) user:", user);
        // console.log("(AdminView POV) session:", sessionData);

        // if (user.isAuthenticated === false) {
        //   // alert("You are not logged in to admin yet!");
        //   navigate("/admin/login");
        // }

        if (user.isAuthenticated === false) {
          setAuthRouteRedirect("/admin");
          navigate("/admin/login");
        }
      }

      checkSession();
    },
    [sessionCheck]
  );

  // useEffect(() => {
  //   setSessionCheck(!sessionCheck);
  // }, []);

  function handleLogout() {
    processLogout();
    navigate("/");
  }

  return (
    <>
      <div className="adminLogout">
        <button onClick={handleLogout}>Logout</button>
      </div>
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
        <AdminSidebar
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
          isPrivateView={isPrivateView}
          setIsPrivateView={setIsPrivateView}
        />
        {isPrivateView ? (
          <PrivateList />
        ) : (
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
        )}
      </main>
    </>
  );
}

export default AdminView;
