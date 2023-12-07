import supabase from "./supabase";

function DeleteForm({ setCatalog, catalog, categoryList, setCategoryList }) {
  async function handleProductSubmit(e) {
    // prevent broswer reload
    e.preventDefault();

    // display warning message
    const isAnyChecked = catalog.some((product) => {
      if (product.deleteCheck === true) {
        return true;
      }
      return false;
    });
    // console.log(isAnyChecked);

    if (isAnyChecked === false) {
      // meaning none of the checkboxes are checked
      alert("You have not selected any checkboxes for deletion!");
    } else {
      const response = window.confirm(
        "Confirm deletion. This action is irreversible"
      ); // boolean
      if (response === false) {
      } else {
        // delete on supabase
        const { error } = await supabase
          .from("CatalogList")
          .delete()
          .eq("deleteCheck", true);

        // delete on local UI
        setCatalog(catalog.filter((product) => product.deleteCheck === false));
        alert("Deleted!");
      }
    }
  }

  async function handleProductCheckbox(product) {
    // console.log(product);
    // to reflect changes in supabase (WORKS NOW!!!)
    const { data: updatedProduct, error } = await supabase
      .from("CatalogList")
      .update({ deleteCheck: !product.deleteCheck })
      .eq("id", product.id)
      .select();

    // console.log(updatedProduct);
    // console.log(updatedProduct[0]);

    // to reflect in local UI (WORKS NOW!!!)    (note: use updatedProduct[0] because updatedProduct is array of an obj)
    setCatalog(
      catalog.map((product) =>
        updatedProduct[0].id === product.id ? updatedProduct[0] : product
      )
    );
  }

  async function handleCategorySubmit(e) {
    e.preventDefault();

    // get array of categories to be deleted (each category comes as an object)
    const categoryDeleteArray = categoryList.filter(
      (object) => object.deleteCheck === true
    );
    // console.log(categoryDeleteArray);

    const sizeCategoryDeleteArray = categoryDeleteArray.length;
    // console.log(sizeCategoryDeleteArray);

    if (sizeCategoryDeleteArray === 0) {
      alert("You have not selected any checkboxes yet!");
    } else {
      const response = window.confirm(
        'Confirm deletion of categorie(s). This action is irreversible.  \n\nNOTE: Products of deleted categorie(s) will be automatically re-assigned the default category "Others".'
      );

      if (response) {
        // update CategoryList in supabase
        for (let i = 0; i < sizeCategoryDeleteArray; i++) {
          const { error } = await supabase.from("CategoryList").upsert({
            id: categoryDeleteArray[i].id,
            deleteCheck: categoryDeleteArray[i].deleteCheck,
          });
        }

        // delete category from CategoryList in supabase
        const { error } = await supabase
          .from("CategoryList")
          .delete()
          .eq("deleteCheck", true);

        // reflect deletion of category from supabase to local UI
        setCategoryList(
          categoryList.filter((object) => object.deleteCheck === false)
        );

        // create array of products that are affected by the deleted categories
        const productsFromDeletedCategoryArray = [];
        // array of array of object (each inner array to represent a category, as a category can have multiple products)
        // example format: [[{products for deleted category 1}],[{products for deleted category 2}]]
        for (let j = 0; j < sizeCategoryDeleteArray; j++) {
          productsFromDeletedCategoryArray.push(
            catalog.filter(
              (product) =>
                product.productCategory === categoryDeleteArray[j].category
            )
          );
        }
        // console.log(productsFromDeletedCategoryArray);

        // convert productsFromDeletedCategoryArray to array of objects by taking just the id
        // example format: [id of product 1, id of product 2, ...] (note: category of product doesn't matter, can mix)
        const sizeProductsFromDeletedCategoryArray =
          productsFromDeletedCategoryArray.length;

        let idProductsofDeletedCat = [];

        for (let k = 0; k < sizeProductsFromDeletedCategoryArray; k++) {
          let sizeInnerArray = productsFromDeletedCategoryArray[k].length;
          for (let q = 0; q < sizeInnerArray; q++) {
            idProductsofDeletedCat.push(
              productsFromDeletedCategoryArray[k][q].id
            );
            // console.log(productsFromDeletedCategoryArray[k][q].id);
          }
        }

        // console.log(idProductsofDeletedCat);

        let sizeIdArray = idProductsofDeletedCat.length;

        // apend products from deleted categories to default 'others' category in supabase
        for (let m = 0; m < sizeIdArray; m++) {
          const { error } = await supabase.from("CatalogList").upsert({
            id: idProductsofDeletedCat[m],
            productCategory: "Others",
          });
        }

        // reflect changes in local UI
        let counter = 0;
        while (counter <= sizeIdArray) {
          setCatalog(
            catalog.map((product) =>
              product.id === idProductsofDeletedCat[counter]
                ? (product.productCategory = "Others")
                : product
            )
          );
          counter++;
        }
        counter = 0; // reset counter back to 0 just in case
      }
    }
  }

  async function handleCategoryCheckBox(category) {
    // console.log("test");

    // modify deleteCheck attribute in categorylist
    const newCategoryList = categoryList.map((object) =>
      object.id === category.id
        ? { ...object, deleteCheck: !object.deleteCheck }
        : object
    );
    setCategoryList(newCategoryList);
  }

  return (
    <>
      <div className="deleteForm">
        <h2>Delete existing product(s)</h2>
        <p>
          Note: Checkboxes are persistent even after refresh, as they are tied
          to the database.
        </p>
        <form className="deleteProductForm" onSubmit={handleProductSubmit}>
          <div className="scrollDeleteProduct">
            {catalog.map((product) => (
              <div>
                <input
                  type="checkbox"
                  key={product.id}
                  product={product}
                  checked={product.deleteCheck}
                  onChange={() => handleProductCheckbox(product)}
                ></input>
                <label>{product.productTitle}</label>
              </div>
            ))}
          </div>
          <button>Delete</button>
        </form>
        <form onSubmit={handleCategorySubmit}>
          <h2>Delete existing category</h2>
          <p>
            Idea: Categories with no products attached to them will simply be
            deleted.
          </p>
          <p>
            Products of deleted categories will be transfered to default
            category "Others".
          </p>
          <div className="scrollDeleteCategory">
            {categoryList.map((object) => (
              <div>
                <input
                  type="checkbox"
                  key={object.id}
                  checked={object.deleteCheck}
                  onChange={() => handleCategoryCheckBox(object)}
                ></input>
                <label>{object.category}</label>
              </div>
            ))}
          </div>
          <button>Delete</button>
        </form>
      </div>
    </>
  );
}

export default DeleteForm;
