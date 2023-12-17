import FilterBar from "./FilterBar";
import SortBar from "./SortBar";
import EmbedFacebook from "./EmbedFacebook";

function Sidebar({ categoryList, setCategoryList }) {
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
      />
      <SortBar />
      <EmbedFacebook />
    </aside>
  );
}

export default Sidebar;
