import supabase from "./supabase";

// const FakeCategories = [
//   { name: "Speakers" },
//   { name: "Preamps" },
//   { name: "Cables" },
// ];

function AddForm({
  setCatalog,
  productTitle,
  setProductTitle,
  productPrice,
  setProductPrice,
  productCategory,
  setProductCategory,
  categoryList,
  setCategoryList,
}) {
  async function handleProductSubmit(e) {
    // prevent broswer reload
    e.preventDefault();

    if (
      productTitle === "" ||
      productPrice != productPrice || // productPrice != productPrice is basically Number.isNaN() for both ES5 & ES6
      productPrice === "" ||
      productCategory === ""
    ) {
      alert("Please fill in all the input fields!");
    } else {
      const response = window.confirm("Please confirm details");
      if (response) {
        // upload newly submitted product to supabase, and retrieve it at the same time, naming it newProduct
        const { data: newProduct, error } = await supabase
          .from("CatalogList")
          .insert([{ productTitle, productPrice, productCategory }])
          .select();
        // console.log(newProduct);
        // reflect changes on local UI
        setCatalog((catalog) => [newProduct[0], ...catalog]);
        // reset form upon submission
        setProductTitle("");
        setProductPrice("");
        setProductCategory("");
      }
    }
  }

  return (
    <>
      <div className="addProduct">
        <h2>Add new product</h2>
        <form onSubmit={handleProductSubmit}>
          <input
            type="text"
            placeholder="Product Name"
            value={productTitle}
            // whenever the user updates the input box, onChange will be triggered, setting the state of productTitle
            onChange={(e) => setProductTitle(e.target.value)}
          />
          <input
            type="number"
            placeholder="Price"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.valueAsNumber)}
          />
          <select
            value={productCategory}
            onChange={(e) => setProductCategory(e.target.value)}
          >
            <option value="">Choose category</option>
            {categoryList.map((object) => (
              <option value={object.category}>{object.category}</option>
            ))}
          </select>
          <button>Add</button>
        </form>
      </div>
    </>
  );
}

export default AddForm;
