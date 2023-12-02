import HeaderButton from "./HeaderButton";

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

export default Header;
