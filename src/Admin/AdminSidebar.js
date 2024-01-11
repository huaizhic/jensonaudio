import { useAdminAuth } from "../Auth/AuthWrapper";
import Sidebar from "../Sidebar";
import { useState } from "react";

function AdminSidebar({
  categoryList,
  setCategoryList,
  catalog,
  setCatalog,
  catalogUnfiltered,
  setCatalogUnfiltered,
  catalogFilterView,
  setCatalogFilterView,
  catalogFilterRerender,
  setCatalogFilterRerender,
  catalogFilterTarget,
  setCatalogFilterTarget,
  sortStatus,
  setSortStatus,
  alphabetCheck,
  setAlphabetCheck,
  recentCheck,
  setRecentCheck,
  priceCheck,
  setPriceCheck,
  allCheck,
  setAllCheck,
  searchClick,
  setSearchClick,
  searchResult,
  setSearchResult,
  isPrivateView,
  setIsPrivateView,
}) {
  //   const { privateList } = useAdminAuth();
  //   const [isPrivateView, setIsPrivateView] = useState(false);

  return (
    <>
      <aside
        style={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "silver",
        }}
      >
        <h3>Toggle public/private view</h3>
        <button onClick={() => setIsPrivateView(!isPrivateView)}>
          {isPrivateView ? "Current: Private List" : "Current: Public Catalog"}
        </button>
        {isPrivateView ? null : (
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
        )}
      </aside>
    </>
  );
}

export default AdminSidebar;
