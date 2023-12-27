import Header from "../Header";
import AdminTools from ".//AdminTools/AdminTools";
import Sidebar from "../Sidebar";
import CatalogList from "../CatalogList";
import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "../Auth/AuthWrapper";
import { useEffect, useState } from "react";

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
  const { processLogout, sessionData, sessionCheck, setSessionCheck } =
    useAdminAuth();
  // console.log(sessionData);
  // const [sessionCheck, setSessionCheck] = useState(false);
  // setSessionCheck(!sessionCheck);

  useEffect(
    function () {
      function checkSession() {
        // if (sessionData !== undefined) {
        //   setUser({ ...user, isAuthenticated: true }); // this triggers an infinite loop for some reason
        //   // console.log("user authenticated");
        //   console.log(sessionData);
        // }

        // if (sessionData.length === 0) {
        //   return <h1>Checking session...</h1>;
        // }

        if (sessionData.beforeFetchData === "true") {
          console.log(
            "Session data not loaded from supabase yet but react component rendered already (race condition)"
          );

          // return () => {
          //   <h1>Checking session...</h1>;
          // };
        }

        // if (sessionData.signedOut === "true") {
        //   alert("please log in as admin");
        // }

        if (sessionData.session !== null) {
          setUser({ ...user, isAuthenticated: true }); // problematic code causing login bypass w/o credentials
          console.log(sessionData.session);
        }

        console.log(sessionData);
        // console.log(sessionData.session);

        if (user.isAuthenticated === false) {
          // alert("You are not logged in to admin yet!");
          navigate("/admin/login");
        }
      }

      checkSession();
    },
    [sessionCheck]
  );

  useEffect(() => {
    setSessionCheck(!sessionCheck);
  }, []);

  // useEffect(() => {
  //   while (sessionData.beforeFetchData === "true") {
  //     setSessionCheck(!sessionCheck);
  //     console.log("anyhow");
  //   }
  // }, []);

  // function checkAdmin() {
  //   if (sessionData.beforeFetchData === "true") {
  //     setSessionCheck(!sessionCheck);
  //   }
  // }

  // if (sessionData.beforeFetchData === "true") {
  //   setSessionCheck(!sessionCheck);
  // }

  function handleLogout() {
    processLogout();
    navigate("/");
  }

  // function checkAdmin() {
  //   if (user.isAuthenticated === false) {
  //     // alert("You are not logged in to admin yet!");
  //     navigate("/admin/login");
  //   }
  //   console.log("user authenticated?", user.isAuthenticated);
  // }

  // checkAdmin();

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
