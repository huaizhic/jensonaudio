const headerButtonArray = [
  { Name: "Brands" },
  { Name: "About" },
  { Name: "Contact" },
  { Name: "Request a demo" },
];

function HeaderButton() {
  return headerButtonArray.map((headerButtonArray) => (
    <button style={{ marginLeft: 15, marginRight: 15, border: "" }}>
      {headerButtonArray.Name}
    </button>
  ));
}

export default HeaderButton;
