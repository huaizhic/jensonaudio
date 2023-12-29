import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAdminAuth } from "../../Auth/AuthWrapper";
import supabase from "../../supabase";

function ProductEdit({
  catalog,
  categoryList,
  user,
  setCatalog,
  productRerender,
  setProductRerender,
}) {
  const [indivProductEdit, setIndivProductEdit] = useState(false);
  const { id } = useParams(); // custom hook from react router to retrieve dynamic route generated
  const navigate = useNavigate();
  const { sessionData, sessionCheck, authRouteRedirect, setAuthRouteRedirect } =
    useAdminAuth();

  const [inputTitle, setInputTitle] = useState("unset");
  const [inputPrice, setInputPrice] = useState(NaN);
  const [inputCategory, setInputCategory] = useState("unset");
  const [inputDesc, setInputDesc] = useState("unset");

  useEffect(
    function () {
      function checkSession() {
        if (user.isAuthenticated === false) {
          setAuthRouteRedirect(`/admin/product/${id}`);
          // console.log(`/admin/product/${id}`);
          navigate("/admin/login");
        }
      }

      checkSession();
    },
    [sessionCheck]
  );

  let selectedProduct = catalog.filter((product) =>
    product.productTitle === id ? product : null
  )[0];

  // console.log(catalog);
  // console.log(selectedProduct);

  // catalog data not fetched in time yet
  if (catalog[0] === undefined) {
    return <h1>ProductEdit Still loading...</h1>;
  } else {
    let selectedProduct = catalog.filter((product) =>
      product.productTitle === id ? product : null
    )[0];
    if (
      inputTitle === "unset" ||
      inputCategory === "unset" ||
      inputDesc === "unset"
    ) {
      fillInputs(selectedProduct);
    }
  }

  function fillInputs(selectedProduct) {
    setInputTitle(selectedProduct.productTitle);
    setInputPrice(selectedProduct.productPrice);
    setInputCategory(selectedProduct.productCategory);
    setInputDesc(selectedProduct.productDescription);
    // return;
  }

  // opens/closes the productEdit component
  function handleClick() {
    setIndivProductEdit(!indivProductEdit);
  }

  // handles update product submission logic
  async function handleSubmit(e) {
    e.preventDefault();
    if (
      inputTitle === selectedProduct.productTitle &&
      inputPrice === selectedProduct.productPrice &&
      inputCategory === selectedProduct.productCategory &&
      inputDesc === selectedProduct.productDescription
    ) {
      alert("You have not changed anything so there is no need to update!");
    } else {
      if (inputTitle === "" || Number.isNaN(inputPrice)) {
        alert("Title/price is blank!");
      } else {
        // check if inputTitle name is already taken in catalog
        // filter catalog to exclude selected product to pass the same productTitle if other inputs are modified instead (eg productPrice, productDescription, etc)
        let restOfCatalog = catalog.filter(
          (product) => product.productTitle !== selectedProduct.productTitle
        );
        // console.log(restOfCatalog);

        const isNameTaken = restOfCatalog.some(
          (product) =>
            product.productTitle.toLowerCase() === inputTitle.toLowerCase()
        );
        if (isNameTaken) {
          alert(
            "The input product name already exists in the catalog. Please choose a new name!"
          );
        } else {
          const response = window.confirm("Confirm changes");
          if (response) {
            // update supabase
            const { data: modifiedProduct, error } = await supabase
              .from("CatalogList")
              .upsert({
                id: selectedProduct.id,
                productTitle: inputTitle,
                productPrice: inputPrice,
                productCategory: inputCategory,
                productDescription: inputDesc,
              })
              .select();

            // console.log("modifiedProduct:", modifiedProduct);

            // update react local UI
            setCatalog(
              catalog.map((product) =>
                product.id === modifiedProduct[0].id
                  ? modifiedProduct[0]
                  : product
              )
            );

            // console.log("catalog: ", catalog);
            setProductRerender(!productRerender);
          }
        }
      }
    }
  }

  // console.log(Number.isNaN(inputPrice));

  function handleTitleChange(e) {
    setInputTitle(e.target.value);
  }

  function handlePriceChange(e) {
    setInputPrice(e.target.valueAsNumber);
  }

  function handleCatChange(e) {
    setInputCategory(e.target.value);
  }

  function handleDescChange(e) {
    setInputDesc(e.target.value);
  }

  return (
    <div className="Product">
      {indivProductEdit ? (
        <>
          <button onClick={() => handleClick()}>Close</button>
          <form onSubmit={(e) => handleSubmit(e)}>
            <br></br>
            <h2>Edit product details</h2>
            <input
              type="text"
              value={inputTitle}
              onChange={(e) => handleTitleChange(e)}
            ></input>
            <input
              type="number"
              value={inputPrice}
              onChange={(e) => handlePriceChange(e)}
            ></input>
            <select value={inputCategory} onChange={(e) => handleCatChange(e)}>
              {categoryList.map((object) => (
                <option>{object.category}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Description"
              value={inputDesc}
              onChange={(e) => handleDescChange(e)}
            ></input>
            <button>Update</button>
          </form>
        </>
      ) : (
        <button onClick={() => handleClick()}>Edit Product</button>
      )}
    </div>
  );
}

export default ProductEdit;
