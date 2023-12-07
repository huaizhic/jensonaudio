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

    // get array of category objects to be deleted (WORKS)
    const categoryDeleteArray = categoryList.filter(
      (object) => object.deleteCheck === true
    );
    console.log(categoryDeleteArray);

    const sizeCategoryDeleteArray = categoryDeleteArray.length;
    // console.log(sizeCategoryDeleteArray);

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

    // // apend products with deleted category to default 'others' category in supabase
    // for (let j = 0; j < sizeCategoryDeleteArray; j++) {
    //   const { data, error } = await supabase.from("CatalogList").upsert({
    //     productCategory: categoryDeleteArray[j].category,
    //     productCategory: "Others",
    //   });

    // setCatalog(
    //   catalog.map((product) =>
    //     product.productCategory === categoryDeleteArray[j].category
    //       ? (product.productCategory = "Others")
    //       : product
    //   )
    // );
  }

  // reflect changes in local UI

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
          <h2>Delete existing category (building in progress)</h2>
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
