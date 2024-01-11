import { createContext, useContext, useEffect, useState } from "react";
import AdminView from "../Admin/AdminView";
import supabase from "../supabase";
import { Outlet, Route, Routes } from "react-router-dom";
import Product from "../Product";
// import ProductEdit from "../AdminTools/ProductEdit";
import ProductEdit from "../Admin/AdminTools/ProductEdit";
import Login from "./LoginPage";
import Header from "../Header";
import PrivateList from "../Admin/PrivateList";
import PrivateProduct from "../Admin/PrivateProduct";
import ProductWrapper from "./ProductWrapper";

const AuthContext = createContext("");
export const useAdminAuth = () => useContext(AuthContext);
// useEffect(async () => {
//   const { data: sessionData, error } = await supabase.auth.getSession();
// }, []);

export const AuthWrapper = ({
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
}) => {
  //   const [user, setUser] = useState({ name: "", isAuthenticated: false });
  const [sessionData, setSessionData] = useState({ beforeFetchData: "true" });
  const [sessionUpdate, setSessionUpdate] = useState(false);
  const [sessionCheck, setSessionCheck] = useState(false);
  const [authRouteRedirect, setAuthRouteRedirect] = useState(""); // depending on which route is accessed by user fitst, sets auth route to redirect to after login

  const [productRerender, setProductRerender] = useState(false);

  const [privateList, setPrivateList] = useState([]);

  // useEffect(async () => {
  //   const { data: session, error } = await supabase.auth.getSession();
  //   setSessionData(session);
  // }, []);

  useEffect(
    function () {
      async function getSession() {
        const { data: session, error } = await supabase.auth.getSession();
        setSessionData(session);
        setSessionCheck(!sessionCheck);
        // setSessionCheck(!sessionCheck);
        // setSessionCheck(!sessionCheck);
      }
      getSession();
      // setSessionCheck(!sessionCheck);
      // setSessionCheck(!sessionCheck);
      // setSessionCheck(!sessionCheck);
    },
    [sessionUpdate]
  );

  // useEffect(() => {
  //   setSessionCheck(!sessionCheck);
  // }, []);

  // if (sessionData.beforeFetchData === "true") {
  //   setSessionCheck(!sessionCheck);
  // }

  const processLogin = async (userName, password) => {
    let { data, error } = await supabase.auth.signInWithPassword({
      email: userName,
      password: password,
    });

    if (data.user.aud === "authenticated") {
      alert("Log in success!");
      setUser({ name: userName, isAuthenticated: true });
      console.log(data);
      setSessionUpdate(!sessionUpdate);
      // set session with supabase
      // const { data: test, error } = await supabase.auth.getSession();
      // console.log(test);
    } else {
      alert("Log in failed");
      alert(error);
    }
  };

  const processLogout = async () => {
    const { error } = await supabase.auth.signOut(); // removes session data
    setUser({ ...user, name: "", isAuthenticated: false });
    setSessionData({ signedOut: "true" });
    alert("Logged out!");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        processLogin,
        processLogout,
        sessionData,
        sessionCheck,
        setSessionCheck,
        authRouteRedirect,
        setAuthRouteRedirect,
        privateList,
        setPrivateList,
      }}
    >
      {/*  wrap admin pages inside here */}
      <>
        {/* <Login /> */}
        {/* <Header
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
        /> */}
        <Routes>
          <Route
            index
            element={
              <>
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
                  user={user}
                  setUser={setUser}
                />
                {/* <PrivateList /> */}
              </>
            }
          ></Route>
          <Route
            path="product/:id"
            element={
              <>
                {/* implement a condition to display either Product or PrivateProduct */}
                <ProductWrapper
                  catalog={catalog}
                  setCatalog={setCatalog}
                  fetchData={fetchData}
                  setFetchData={setFetchData}
                  productRerender={productRerender}
                  setProductRerender={setProductRerender}
                />
                {/* <Product
                  catalog={catalog}
                  setCatalog={setCatalog}
                  fetchData={fetchData}
                  setFetchData={setFetchData}
                  productRerender={productRerender}
                  setProductRerender={setProductRerender}
                />
                <PrivateProduct
                  productRerender={productRerender}
                  setProductRerender={setProductRerender}
                /> */}
                <br></br>
                <br></br>
                <ProductEdit
                  catalog={catalog}
                  categoryList={categoryList}
                  user={user}
                  setCatalog={setCatalog}
                  productRerender={productRerender}
                  setProductRerender={setProductRerender}
                />
              </>
            }
          ></Route>
          <Route
            path="/login"
            element={<Login user={user} setUser={setUser} />}
          ></Route>
        </Routes>
        <Outlet />
      </>
    </AuthContext.Provider>
  );
};
