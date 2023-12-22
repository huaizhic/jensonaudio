import { useParams } from "react-router-dom";
import { useState } from "react";

function ProductEdit({ catalog, categoryList }) {
  const [indivProductEdit, setIndivProductEdit] = useState(false);
  const { id } = useParams();

  let selectedProduct = catalog.filter((product) =>
    product.productTitle === id ? product : null
  )[0];

  if (selectedProduct === undefined) {
    return <h1>ProductEdit Still loading...</h1>;
  }

  function handleClick() {
    setIndivProductEdit(!indivProductEdit);
  }

  return (
    <div className="Product">
      {indivProductEdit ? (
        <form>
          <button onClick={() => handleClick()}>Close</button>
          <br></br>
          <h2>Edit product details (Uncompleted)</h2>
          <input type="text" value={selectedProduct.productTitle}></input>
          <input type="number" value={selectedProduct.productPrice}></input>
          <select value={selectedProduct.productCategory}>
            {categoryList.map((object) => (
              <option>{object.category}</option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Description"
            value={selectedProduct.productDescription}
          ></input>
        </form>
      ) : (
        <button onClick={() => handleClick()}>Edit Product</button>
      )}
    </div>
  );
}

export default ProductEdit;
