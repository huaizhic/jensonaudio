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
  const [updatedFlag, setUpdatedFlag] = useState(false); // useEffect flag for editing product details
  const [updatedFlag1, setUpdatedFlag1] = useState(false); // useEffect flag for editing category name
  const [dropdownValue, setDropdownValue] = useState("Choose product"); // to reset dropdown for edit product after submission
  const [dropdownValue1, setDropdownValue1] = useState(""); // to reset dropdown for edit category after submission
  const [newCategory, setNewCategory] = useState(""); // for editing category name
  const [categoryEdit, setCategoryEdit] = useState(""); // for storing old category name

  // for proper re-rendering after editing product details
  useEffect(
    function () {
      async function updateCatalog() {
        // console.log(productEdit.productTitle);
        if (
          // use an if condition as the updatedFlag gets changed twice every refresh, triggering the useEffect unexpectedly
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

  // for proper rerendering after editing category name
  useEffect(
    function () {
      async function reflectEditedCategory() {
        if (newCategory !== "") {
          // 1: change category name in categorylist in supabase
          // filter out list of products to be modified (since they need can only be identified by ID)
          const productsOfEditedCategory = catalog.filter(
            (product) => product.productCategory === categoryEdit
          );

          for (let i = 0; i < productsOfEditedCategory.length; i++) {
            const { error } = await supabase.from("CatalogList").upsert({
              id: productsOfEditedCategory[i].id,
              productCategory: newCategory,
            });
          }

          for (let j = 0; j <= productsOfEditedCategory.length; j++) {
            setCatalog(
              catalog.map((product) =>
                product.productCategory === categoryEdit
                  ? (product.productCategory = newCategory)
                  : product
              )
            );
          }

          // 2: change category name of affected products in supabase
          const categoryToEdit = categoryList.filter(
            (object) => object.category === categoryEdit
          );
          const { error } = await supabase
            .from("CategoryList")
            .upsert({ id: categoryToEdit[0].id, category: newCategory });
          // reflect changes in local UI
          setCategoryList(
            categoryList.map((object) =>
              object.category === categoryEdit
                ? { ...object, category: newCategory }
                : object
            )
          );
        }
        setDropdownValue1("");
        setNewCategory("");
      }
      reflectEditedCategory();
    },
    [updatedFlag1]
  );

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
          // alert("Changes made successfully!");
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

  async function handleEditCategorySubmit(e) {
    e.preventDefault();
    // alert("this button not ready yet!");

    // input validation
    if (dropdownValue1 === "") {
      alert("You have not chosen which category to edit yet!");
    } else if (newCategory === "") {
      alert("You have not keyed in anything yet!");
    } else {
      const response = window.confirm(
        "Confirm new category name. This change is irreversible."
      );
      if (response) {
        setUpdatedFlag1(!updatedFlag1); // this triggers the useEffect that executes the actual functionality
      }
    }
  }

  function handleEditCategorySelect(e) {
    setNewCategory(e.target.value);
    setCategoryEdit(e.target.value);
    setDropdownValue1(e.target.value);
  }

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
        <form onSubmit={handleEditCategorySubmit}>
          <h2>Edit existing category name </h2>
          <select onChange={handleEditCategorySelect} value={dropdownValue1}>
            <option value={""}>Choose a category to edit</option>
            {categoryList.map((object) => (
              <option value={object.category}>{object.category}</option>
            ))}
          </select>
          <input
            type="text"
            placeholder="New category name"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          ></input>
          <button>Edit</button>
        </form>
        <form>
          <h2>Mass change product category (building in progress)</h2>
        </form>
      </div>
    </>
  );
}

export default EditForm;
