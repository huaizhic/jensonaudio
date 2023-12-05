import supabase from "./supabase";

const FakeCategories = [
  { name: "Speakers" },
  { name: "Preamps" },
  { name: "Cables" },
];

function EditProductForm({ setCatalog, catalog, productEdit, setProductEdit }) {
  async function handleSubmit(e) {
    // prevent broswer reload
    e.preventDefault();
    alert("This button is not ready yet!");
  }

  async function handleClick(productName) {
    // console.log(productName);

    // fill input boxes with current product info
    if (productName === "Choose product") {
      setProductEdit([
        { productTitle: null, productPrice: null, productCategory: null },
      ]);
    } else {
      setProductEdit(
        catalog.filter((product) => product.productTitle === productName) // works
      );
    }
  }

  function EditingPanel() {
    return (
      <form onSubmit={handleSubmit} key={productEdit[0].id}>
        <input
          type="text"
          placeholder="New Product Name"
          value={productEdit[0].productTitle}
          // whenever the user updates the input box, onChange will be triggered, setting the state of productTitle
          //   onChange={(e) => setProductTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="New Price"
          value={productEdit[0].productPrice}
          //   onChange={(e) => setProductPrice(e.target.value)}
        />
        <select
          value={productEdit[0].productCategory}
          //   onChange={(e) => setProductCategory(e.target.value)}
        >
          <option value="">Choose new category</option>
          {FakeCategories.map((category) => (
            <option value={category.name}>{category.name}</option>
          ))}
        </select>
        <button>Update</button>
      </form>
    );
  }

  return (
    <>
      <div className="editProduct">
        <h2>Edit existing product(s) (not ready yet)</h2>
        <p>
          {" "}
          Idea: When a product is selected in the dropdown, current products
          details should be pre-filled in the inputs for user to update
        </p>
        <form onSubmit={handleSubmit}>
          <select onChange={(e) => handleClick(e.target.value)}>
            <option value="Choose product">Choose product</option>
            {catalog.map((product) => (
              <option value={product.productTitle}>
                {product.productTitle}
              </option>
            ))}
          </select>
        </form>
        <EditingPanel />
      </div>
    </>
  );
}

export default EditProductForm;
