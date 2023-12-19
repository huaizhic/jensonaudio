import FilterBar from "./FilterBar";
import SortBar from "./SortBar";
import EmbedFacebook from "./EmbedFacebook";

function Sidebar({
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
}) {
  return (
    <aside
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "silver",
      }}
    >
      <FilterBar
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
        allCheck={allCheck}
        setAllCheck={setAllCheck}
      />
      <SortBar
        catalog={catalog}
        catalogUnfiltered={catalogUnfiltered}
        setCatalogUnfiltered={setCatalogUnfiltered}
        catalogFilterView={catalogFilterView}
        setCatalogFilterView={setCatalogFilterView}
        catalogFilterRerender={catalogFilterRerender}
        setCatalogFilterRerender={setCatalogFilterRerender}
        catalogFilterTarget={catalogFilterTarget}
        sortStatus={sortStatus}
        setSortStatus={setSortStatus}
        alphabetCheck={alphabetCheck}
        setAlphabetCheck={setAlphabetCheck}
        recentCheck={recentCheck}
        setRecentCheck={setRecentCheck}
        priceCheck={priceCheck}
        setPriceCheck={setPriceCheck}
      />
      <EmbedFacebook />
    </aside>
  );
}

export default Sidebar;
