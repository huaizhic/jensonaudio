import { useEffect } from "react";
import supabase from "./supabase";

function DeleteProductForm({
  catalog,
  deleteList,
  setDeleteList,
  deleteCheckBox,
  setDeleteCheckbox,
}) {
  // display checkbox for user to tick which product to delete
  // are you sure warning
  // deletes selected products from supabase
  // retrieve updated catalog from supabase

  async function handleSubmit(e) {
    // prevent broswer reload
    e.preventDefault();
    const finalDeleteList = catalog.map(({ productTitle }) => {
      if (deleteCheckBox === true) {
        setDeleteList([...deleteList, { name: productTitle }]);
      }
    });
    // setDeleteList(finalDeleteList);
    // console.log(deleteList);
    console.log(finalDeleteList);
  }

  async function handleCheckbox(name, booleanParam) {
    // setDeleteCheckbox(!booleanParam);
    // // console.log(!booleanParam);
    // console.log(deleteCheckBox);
    // AS SET STATE IS ASYNC FUNCTION, NORMAL CONSOLE LOG WILL NOT BE ABLE TO GIVE ACCURATE RESPONSE.
    // USE REACT COMPONENTS TOOL INSTEAD

    //current problem is that value={deleteCheckBox} is not updating, so the boolean passed into this function is always false.

    if (booleanParam) {
      // this scenario is never executed as deleteCheckBox is never updated to false
      setDeleteList(
        deleteList.filter((product) => product.name !== deleteList.name)
      );
    } else {
      // this scenario works as intended, don't touch
      setDeleteList([
        ...deleteList,
        { name: name, deleteCheck: !booleanParam },
      ]);
      // setDeleteCheckbox(!booleanParam); // this does not work for some reason
    }
    // setDeleteCheckbox(!booleanParam); // this does not work for some reason
    // console.log(deleteList);
  }

  return (
    <>
      <div className="deleteProduct">
        <h2>Delete existing product(s) (not working yet)</h2>
        <form onSubmit={handleSubmit}>
          {catalog.map(({ productTitle }) => (
            <div>
              <input
                type="checkbox"
                // name={productTitle}
                value={deleteCheckBox}
                onChange={() => handleCheckbox(productTitle, deleteCheckBox)}
              ></input>
              <label>{productTitle}</label>
            </div>
          ))}
          <button>Console log</button>
        </form>
      </div>
    </>
  );
}

export default DeleteProductForm;
