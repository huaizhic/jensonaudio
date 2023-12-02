function Banner() {
  return (
    <div
      style={{
        backgroundImage: `url("backgroundBanner.jpg")`,
        height: "220px",
        width: "auto",
        textAlign: "center",
        paddingTop: "150px",
        fontSize: "55px",
        color: "white",
        margin: "auto",
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

export default Banner;
