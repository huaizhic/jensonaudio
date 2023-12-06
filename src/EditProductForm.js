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
      setProductEdit({
        productTitle: null,
        productPrice: null,
        productCategory: null,
      });
    } else {
      const arrayOfObject = catalog.filter(
        (product) => product.productTitle === productName
      );
      setProductEdit(arrayOfObject[0]); // arrayOfObject[0] is an object type (of the specified product)
    }
  }

  function EditingPanel() {
    return (
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="New Product Name"
          value={productEdit.productTitle}
          onChange={
            (e) =>
              setProductEdit({ ...productEdit, productTitle: e.target.value }) // editing attribute in object
          }
        />
        <input
          type="number"
          placeholder="New Price"
          value={productEdit.productPrice}
          onChange={(e) =>
            setProductEdit({
              ...productEdit,
              productPrice: e.target.valueAsNumber,
            })
          }
        />
        <select
          value={productEdit.productCategory}
          onChange={(e) =>
            setProductEdit({ ...productEdit, productCategory: e.target.value })
          }
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
