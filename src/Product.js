import { useParams } from "react-router-dom";

function Product({ catalog, fetchData, setFetchData }) {
  const { id } = useParams();

  //   // fetch catalog data from supabase
  //   setFetchData(!fetchData);

  let selectedProduct = catalog.filter((product) =>
    product.productTitle === id ? product : null
  )[0];

  return (
    <>
      <h1>Product Title: {id}</h1>
      <h2>Product Price: {selectedProduct.productPrice}</h2>
      <p>Product Category: {selectedProduct.productCategory}</p>
      {selectedProduct.productDescription === null ? (
        <p>Product Description: No description yet</p>
      ) : (
        <p>Product Description: {selectedProduct.productDescription} </p>
      )}
      <button>
        <a href="https://wa.me/6596612172" target="_blank">
          Enquire via whatsapp
        </a>
      </button>
    </>
  );
}

export default Product;
