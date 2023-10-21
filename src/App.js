import "./style.css";

function App() {
  return (
    <>
      <Header />
      {/* <ProductCell /> */}
      <main style={{ display: "grid", gridTemplateColumns: "1fr 4fr" }}>
        <FilterSideBar />
        <Catalog />
      </main>
    </>
  );
}

function Header() {
  return (
    <>
      <header
        style={{
          backgroundColor: "#3b82f6",
          height: "40px",
          display: "flex",
          justifyContent: "Center",
          gap: "350px",
        }}
      >
        <img src="logo.png" height="30" width="160" alt="Jenson Audio logo" />
        <div>
          <HeaderButton />
        </div>
        <form>
          <input type="text" placeholder="Search product..."></input>
        </form>
      </header>
    </>
  );
}

const headerButtonArray = [
  { Name: "Home" },
  { Name: "About" },
  { Name: "Contact" },
];

function HeaderButton() {
  return headerButtonArray.map((headerButtonArray) => (
    <button>{headerButtonArray.Name}</button>
  ));
}

const FakeCatalogData = [
  {
    Image: "product1.jpg",
    ProductName: "Product1",
    ShortDesc: "Short Description 1",
  },
  {
    Image: "product2.jpg",
    ProductName: "Product2",
    ShortDesc: "Short Description 2",
  },
  {
    Image: "product3.jpg",
    ProductName: "Product3",
    ShortDesc: "Short Description 3",
  },
];

function Catalog() {
  return (
    <section style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}>
      {FakeCatalogData.map(({ Image, ProductName, ShortDesc }) => (
        <div>
          <ProductCell
            Image={Image}
            ProductName={ProductName}
            ShortDesc={ShortDesc}
          />
        </div>
      ))}
    </section>
  );
}

function ProductCell({ Image, ProductName, ShortDesc }) {
  // console.log({ FakeCatalogData.ProductName });
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxBlockSize: "400px",
        maxWidth: "400px",
      }}
    >
      <img src={Image} height="250" width="250" />
      <h1>{ProductName}</h1>
      <span>{ShortDesc}</span>
    </div>
  );
}

const FilterButtonArray = [
  { Name: "Speakers" },
  { Name: "Preamps" },
  { Name: "Cables" },
];

function FilterSideBar() {
  return (
    <aside>
      <ul style={{ listStyle: "None" }}>
        {FilterButtonArray.map(({ Name }) => (
          <li>
            <FilterButton Name={Name} />
          </li>
        ))}
      </ul>
    </aside>
  );
}

function FilterButton({ Name }) {
  return <button>{Name}</button>;
}

export default App;
