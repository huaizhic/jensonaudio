import { createContext, useContext, useState } from "react";
import AdminView from "../AdminView";
import supabase from "../supabase";
import { Outlet, Route, Routes } from "react-router-dom";
import Product from "../Product";
import ProductEdit from "../ProductEdit";
import Login from "./LoginPage";

const AuthContext = createContext("");
export const useAdminAuth = () => useContext(AuthContext);

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

  const processLogin = async (userName, password) => {
    let { data, error } = await supabase.auth.signInWithPassword({
      email: userName,
      password: password,
    });

    if (data.user.aud === "authenticated") {
      alert("Log in success!");
      setUser({ name: userName, isAuthenticated: true });
      console.log(data);
    } else {
      alert("Log in failed");
      alert(error);
    }

    // if (loginSuccess) {
    //   alert("Log in success!");
    //   console.log(loginSuccess);
    //   setUser({ name: userName, isAuthenticated: true });
    // } else {
    //   alert("Log in failed");
    //   alert(error);
    // }
  };

  const logout = () => {
    alert("Logged out!");
    setUser({ ...user, isAuthenticated: false });
  };

  return (
    <AuthContext.Provider value={{ user, processLogin, logout }}>
      {/*  wrap admin pages inside here */}
      <>
        {/* <Login /> */}
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
                user={user}
                setUser={setUser}
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
                <ProductEdit
                  catalog={catalog}
                  categoryList={categoryList}
                  user={user}
                  setUser={setUser}
                />
              </>
            }
          ></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
        <Outlet />
      </>
    </AuthContext.Provider>
  );
};
