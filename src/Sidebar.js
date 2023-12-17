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
      />
      <SortBar />
      <EmbedFacebook />
    </aside>
  );
}

export default Sidebar;
