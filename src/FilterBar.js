import FilterButton from "./FilterButton";

const FilterButtonArray = [
  { Name: "Speakers" },
  { Name: "Preamps" },
  { Name: "Cables" },
];

function FilterBar() {
  return (
    <ul style={{ listStyle: "None" }}>
      Filters:
      {FilterButtonArray.map(({ Name }) => (
        <li>
          <FilterButton Name={Name} />
        </li>
      ))}
    </ul>
  );
}

export default FilterBar;
