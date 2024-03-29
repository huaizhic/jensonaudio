import { useState } from "react";
import supabase from "../../supabase";
import { useAdminAuth } from "../../Auth/AuthWrapper";

// const FakeCategories = [
//   { name: "Speakers" },
//   { name: "Preamps" },
//   { name: "Cables" },
// ];

function AddForm({
  catalog,
  setCatalog,
  productTitle,
  setProductTitle,
  productPrice,
  setProductPrice,
  productCategory,
  setProductCategory,
  categoryList,
  setCategoryList,
  catalogFilterRerender,
  setCatalogFilterRerender,
  productDescription,
  setProductDescription,
}) {
  const [newCategoryInput, setNewCategoryInput] = useState("");
  const { sessionData } = useAdminAuth();

  async function handleProductSubmit(e) {
    // prevent broswer reload
    e.preventDefault();

    if (sessionData === undefined) {
      alert("You are not logged in as an admin to perform the action!");
    } else {
      if (
        productTitle === "" ||
        productPrice != productPrice || // productPrice != productPrice is basically Number.isNaN() for both ES5 & ES6
        productPrice === "" ||
        productCategory === ""
      ) {
        alert("Please fill in all the input fields!");
      } else {
        const gotDuplicateProduct = catalog.some((product) => {
          if (
            product.productTitle.toLowerCase() === productTitle.toLowerCase()
          ) {
            return true;
          }
          return false;
        });

        if (gotDuplicateProduct) {
          alert(
            "The new product name you entered is already taken. Please enter a different one!"
          );
        } else {
          const response = window.confirm("Please confirm details");
          if (response) {
            // upload newly submitted product to supabase, and retrieve it at the same time, naming it newProduct
            const { data: newProduct, error } = await supabase
              .from("CatalogList")
              .insert([
                {
                  productTitle,
                  productPrice,
                  productCategory,
                  productDescription,
                },
              ])
              .select();
            // console.log(newProduct);
            // reflect changes on local UI
            setCatalog((catalog) => [newProduct[0], ...catalog]);
            // reset form upon submission
            setProductTitle("");
            setProductPrice("");
            setProductCategory("");
            setProductDescription("");
            setCatalogFilterRerender(!catalogFilterRerender);
          }
        }
      }
    }
  }

  async function handleCategorySubmit(e) {
    e.preventDefault();

    // if (newCategoryInput === "") {
    //   alert("You have not typed in anything yet!");
    // } else {
    //   // check if it is duplicate (string match, irregardless of upper/lowercase)
    //   const gotDuplicateCategory = categoryList.some((object) => {
    //     if (object.category.toLowerCase() === newCategoryInput.toLowerCase()) {
    //       return true;
    //     }
    //     return false;
    //   });

    //   if (gotDuplicateCategory) {
    //     alert("The category you typed in already exists!");
    //   } else {
    //     const response = window.confirm("Confirm your choice");
    //     if (response) {
    //       const { data: newCategory, error } = await supabase
    //         .from("CategoryList")
    //         .insert([{ category: newCategoryInput }])
    //         .select();

    //       // console.log("error", error);
    //       // console.log
    //       setCategoryList([...categoryList, newCategory[0]]); // not working, error: setState is not a function
    //       setNewCategoryInput("");
    //     }
    //   }
    // }

    if (sessionData === undefined) {
      alert("You are not logged in as an admin to perform the action!");
    } else {
      // alert("Yep you are an admin authorised to perform the action");
      if (newCategoryInput === "") {
        alert("You have not typed in anything yet!");
      } else {
        // check if it is duplicate (string match, irregardless of upper/lowercase)
        const gotDuplicateCategory = categoryList.some((object) => {
          if (
            object.category.toLowerCase() === newCategoryInput.toLowerCase()
          ) {
            return true;
          }
          return false;
        });

        if (gotDuplicateCategory) {
          alert("The category you typed in already exists!");
        } else {
          const response = window.confirm("Confirm your choice");
          if (response) {
            const { data: newCategory, error } = await supabase
              .from("CategoryList")
              .insert([{ category: newCategoryInput }])
              .select();

            setCategoryList([...categoryList, newCategory[0]]); // not working, error: setState is not a function
            setNewCategoryInput("");
          }
        }
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
          <input
            type="text"
            placeholder="Description"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
          ></input>
          <button>Add</button>
        </form>
        <form onSubmit={handleCategorySubmit}>
          <h2>Add new category</h2>
          <input
            type="text"
            placeholder="New Category Name"
            value={newCategoryInput}
            onChange={(e) => setNewCategoryInput(e.target.value)}
          ></input>
          <button>Add</button>
        </form>
      </div>
    </>
  );
}

export default AddForm;
