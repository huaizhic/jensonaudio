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

  // as the components tend to render before the data is fetched from supabase, an error will occur complaining that product details are undefined.
  // thus, this if condition forces the components to wait for the data to be fetched from supabase before rendering,
  // successfully loading the product details.
  if (selectedProduct === undefined) {
    return <h1>Still loading...</h1>;
  }

  return (
    <>
      <div className="Product">
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
            Enquire via Whatsapp
          </a>
        </button>
        <button>Buy Now (Not working yet)</button>
        <button>Add to cart (Not working yet)</button>
      </div>
    </>
  );
}

export default Product;
