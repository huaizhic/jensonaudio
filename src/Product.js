import { useParams } from "react-router-dom";
import { useEffect } from "react";
import supabase from "./supabase";

function Product({ catalog, setCatalog, fetchData, setFetchData }) {
  useEffect(function () {
    async function getCatalog() {
      const { data: Catalog, error } = await supabase
        .from("CatalogList")
        .select("*");
      setCatalog(Catalog);
      // console.log(CatalogList);
    }
    getCatalog();
  }, []);

  const { id } = useParams();

  //   // fetch catalog data from supabase
  //   setFetchData(!fetchData);

  let selectedProduct = catalog.filter((product) =>
    product.productTitle === id ? product : null
  )[0];

  //   console.log(selectedProduct);
  //   console.log(catalog);

  if (selectedProduct === undefined) {
    return <h1>Still loading...</h1>;
  }

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
