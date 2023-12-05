import { useEffect } from "react";
import supabase from "./supabase";

function DeleteProductForm({ setCatalog, catalog }) {
  // display checkbox for user to tick which product to delete
  // are you sure warning
  // deletes selected products from supabase
  // retrieve updated catalog from supabase

  async function handleSubmit(e) {
    // prevent broswer reload
    e.preventDefault();
    // display warning message
    // if nothing is checked, display nothing is checked and stop there

    // delete on supabase
    const { error } = await supabase
      .from("CatalogList")
      .delete()
      .eq("deleteCheck", true);

    // delete on local UI
    setCatalog(catalog.filter((product) => product.deleteCheck === false));
  }

  async function handleCheckbox(product) {
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

  return (
    <>
      <div className="deleteProduct">
        <h2>Delete existing product(s)</h2>
        <form onSubmit={handleSubmit}>
          {catalog.map((product) => (
            <div>
              <input
                type="checkbox"
                key={product.id}
                product={product}
                checked={product.deleteCheck}
                onChange={() => handleCheckbox(product)}
              ></input>
              <label>{product.productTitle}</label>
            </div>
          ))}
          <button>Delete</button>
        </form>
      </div>
    </>
  );
}

export default DeleteProductForm;
