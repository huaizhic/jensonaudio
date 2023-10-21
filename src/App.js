import "./style.css";

function App() {
  return (
    <>
      <Header />
      <Banner />
      <main style={{ display: "grid", gridTemplateColumns: "1fr 4fr" }}>
        <SideBar />
        <Catalog />
      </main>
      <Footer />
    </>
  );
}

function Header() {
  return (
    <>
      <header
        style={{
          backgroundColor: "lightsteelblue",
          height: "40px",
          display: "flex",
          justifyContent: "Center",
          gap: "250px",
        }}
      >
        <img src="jenson.jpg" height="30" width="160" alt="Jenson Audio logo" />
        <div>
          <HeaderButton />
        </div>
        <form>
          <input type="text" placeholder="Search product..." style={{}}></input>
        </form>
      </header>
    </>
  );
}

const headerButtonArray = [
  { Name: "Home" },
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

function Banner() {
  return (
    <div
      style={{
        backgroundImage: `url("backgroundBanner.jpg")`,
        height: "220px",
        width: "1250px",
        textAlign: "center",
        paddingTop: "150px",
        fontSize: "55px",
        color: "white",
      }}
    >
      Welcome to Jenson Audio!
      <p style={{ fontSize: "20px" }}>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book.
      </p>
    </div>
  );
}

const FakeCatalogData = [
  {
    Image: "product1.jpg",
    ProductName: "Product1",
    ShortDesc: "Price 1",
  },
  {
    Image: "product2.jpg",
    ProductName: "Product2",
    ShortDesc: "Price 2",
  },
  {
    Image: "product3.jpg",
    ProductName: "Product3",
    ShortDesc: "Price 3",
  },
  {
    Image: "product3.jpg",
    ProductName: "Product4",
    ShortDesc: "Price 4",
  },
  {
    Image: "product3.jpg",
    ProductName: "Product5",
    ShortDesc: "Price 5",
  },
];

function Catalog() {
  return (
    <section
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        backgroundColor: "lightgray",
      }}
    >
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

function SideBar() {
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

function FilterButton({ Name }) {
  return <button>{Name}</button>;
}

function EmbedFacebook() {
  return <p>Space to embed facebook/carousell page</p>;
}

function Footer() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "lightslategray",
      }}
    >
      <h2 style={{ width: "300px" }}>
        33 Ubi Ave 3, Vertex 02-12, Singapore 408868
      </h2>
      <p>jenson_audio@yahoo.com.sg</p>
    </div>
  );
}

export default App;
