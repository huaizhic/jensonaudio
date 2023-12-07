// const FilterButtonArray = [
//   { Name: "Speakers" },
//   { Name: "Preamps" },
//   { Name: "Cables" },
// ];

function FilterBar({ categoryList, setCategoryList }) {
  return (
    <ul style={{ listStyle: "None" }}>
      Filter by Category:
      {categoryList.map((object) => (
        <li>
          <button>{object.category}</button>
        </li>
      ))}
    </ul>
  );
}

export default FilterBar;
