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
    e.preventDefault(); // prevent broswer reload
    const newProduct = { productTitle, productPrice, productCategory };
    setCatalog((catalog) => [newProduct, ...catalog]);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Product Name"
        value={productTitle}
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
  );
}

export default AddProductForm;
