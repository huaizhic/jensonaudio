import { useState, useEffect } from "react";
import supabase from "./supabase";

const FakeCategories = [
  { name: "Speakers" },
  { name: "Preamps" },
  { name: "Cables" },
];

function EditForm({
  setCatalog,
  catalog,
  productEdit,
  setProductEdit,
  categoryList,
  setCategoryList,
}) {
  const [inputTitle, setInputTitle] = useState("");
  const [inputPrice, setInputPrice] = useState("");
  const [inputCategory, setInputCategory] = useState("");
  const [updatedFlag, setUpdatedFlag] = useState(false);
  const [dropdownValue, setDropdownValue] = useState("Choose product");

  useEffect(
    function () {
      async function updateCatalog() {
        // console.log(productEdit.productTitle);
        if (
          productEdit.productTitle !== null &&
          productEdit.productPrice !== null &&
          productEdit.productCategory !== null
        ) {
          const { data: updatedProduct, error } = await supabase
            .from("CatalogList")
            .upsert({
              // if id exists, update data; if not insert a new row with these details
              id: productEdit.id,
              productTitle: productEdit.productTitle,
              productPrice: productEdit.productPrice,
              productCategory: productEdit.productCategory,
            })
            .select();

          // reflect supabase changes on local UI
          setCatalog(
            catalog.map((product) =>
              product.id === productEdit.id ? updatedProduct[0] : product
            )
          );

          handleClick("Choose product");
          setDropdownValue("Choose product");
          // console.log(updatedProduct);
        }
      }
      updateCatalog();
    },
    [updatedFlag]
  );

  // have to click button twice for it to work
  async function handleSubmit(e) {
    // prevent broswer reload
    e.preventDefault();
    // alert("This button is not ready yet!");
    if (dropdownValue === "Choose product") {
      alert("You have not chosen a product to edit yet!");
    } else {
      if (
        inputTitle === "" ||
        Number.isNaN(inputPrice) ||
        inputPrice === "" ||
        inputCategory === ""
      ) {
        alert("You have not filled in all the blanks!");
      } else {
        const response = window.confirm(
          "Confirm changes. This action is irreversible"
        ); // boolean
        if (response === false) {
        } else {
          setProductEdit({
            ...productEdit,
            productTitle: inputTitle,
            productPrice: inputPrice,
            productCategory: inputCategory,
          });

          setUpdatedFlag(!updatedFlag);
          // console.log(productEdit.productTitle);
          // console.log(productEdit.id);
          alert("Changes made successfully!");
        }
      }
    }
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
      setInputTitle("");
      setInputPrice("");
      setInputCategory("");
      setDropdownValue("Choose product");
    } else {
      setDropdownValue(productName);
      const arrayOfObject = catalog.filter(
        (product) => product.productTitle === productName
      );
      setProductEdit(arrayOfObject[0]); // arrayOfObject[0] is an object type (of the specified product)
      setInputTitle(arrayOfObject[0].productTitle);
      setInputPrice(arrayOfObject[0].productPrice);
      setInputCategory(arrayOfObject[0].productCategory);
      // console.log(arrayOfObject[0].productTitle);
    }
  }

  // function EditingPanel() {
  //   return (

  //   );
  // }

  return (
    <>
      <div className="editProduct">
        <h2>Edit existing product(s)</h2>
        <p>
          Idea: When a product is selected in the dropdown, current products
          details should be pre-filled in the inputs for user to update
        </p>
        <form onSubmit={handleSubmit}>
          <select
            value={dropdownValue}
            onChange={(e) => handleClick(e.target.value)}
          >
            <option value="Choose product">Choose product</option>
            {catalog.map((product) => (
              <option value={product.productTitle}>
                {product.productTitle}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="New Product Name"
            value={inputTitle}
            onChange={(e) => setInputTitle(e.target.value)}
          />
          <input
            type="number"
            placeholder="New Price"
            value={inputPrice}
            onChange={(e) => setInputPrice(e.target.valueAsNumber)}
          />
          <select
            value={inputCategory}
            onChange={(e) => setInputCategory(e.target.value)}
          >
            <option value="">Choose new category</option>
            {categoryList.map((object) => (
              <option value={object.category}>{object.category}</option>
            ))}
          </select>
          <button>Update</button>
        </form>
        <form>
          <h2>Editing existing category name (building in progress)</h2>
        </form>
      </div>
    </>
  );
}

export default EditForm;
