import supabase from "./supabase";

const FakeCategories = [
  { name: "Speakers" },
  { name: "Preamps" },
  { name: "Cables" },
];

function AddProductForm({
  catalog,
  setCatalog,
  productTitle,
  setProductTitle,
  productPrice,
  setProductPrice,
  productCategory,
  setProductCategory,
}) {
  async function handleSubmit(e) {
    // prevent broswer reload
    e.preventDefault();
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

  return (
    <>
      <div className="addProduct">
        <h2>Add new product</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Product Name"
            value={productTitle}
            // whenever the user updates the input box, onChange will be triggered, setting the state of productTitle
            onChange={(e) => setProductTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Price"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
          />
          <select
            value={productCategory}
            onChange={(e) => setProductCategory(e.target.value)}
          >
            <option value="">Choose category</option>
            {FakeCategories.map((category) => (
              <option value={category.name}>{category.name}</option>
            ))}
          </select>
          <button>Submit</button>
        </form>
      </div>
    </>
  );
}

export default AddProductForm;
