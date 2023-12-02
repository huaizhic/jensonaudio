import FilterBar from "./FilterBar";
import EmbedFacebook from "./EmbedFacebook";

function Sidebar() {
  return (
    <aside
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "silver",
      }}
    >
      <FilterBar />
      <EmbedFacebook />
    </aside>
  );
}

export default Sidebar;
