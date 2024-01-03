import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import supabase from "./supabase";

function Product({
  catalog,
  setCatalog,
  fetchData,
  setFetchData,
  productRerender,
  setProductRerender,
}) {
  const [selectedProduct, setSelectedProduct] = useState();
  // const [productRerender, setProductRerender] = useState(false);

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

  useEffect(
    function () {
      function getProduct() {
        let selectedProduct = catalog.filter((product) =>
          product.productTitle === id ? product : null
        )[0];
        setSelectedProduct(selectedProduct);
        // console.log("catalog", catalog);
        // console.log("selectedProduct", selectedProduct);
      }
      getProduct();
    },
    [productRerender]
  );

  const { id } = useParams();

  // console.log("selectedproduct:", selectedProduct);
  // console.log("catalog:", catalog);

  //   console.log(selectedProduct);
  //   console.log(catalog);

  // as the components tend to render before the data is fetched from supabase, an error will occur complaining that product details are undefined.
  // thus, this if condition forces the components to wait for the data to be fetched from supabase before rendering,
  // successfully loading the product details.
  if (catalog[0] === undefined) {
    return <h1>Still loading...</h1>;
  } else {
    if (selectedProduct === undefined) {
      // setProductRerender(!productRerender);
      setSelectedProduct(
        catalog.filter((product) =>
          product.productTitle === id ? product : null
        )[0]
      );
      return <h1>Still loading selectedproduct...</h1>;
    }
  }

  return (
    <>
      <div className="Product">
        {selectedProduct.media[0] === "" ||
        selectedProduct.media === null ||
        selectedProduct.media.length === 0 ? (
          <img
            src="https://aykgozlgavkkuyxfksoi.supabase.co/storage/v1/object/public/miscellaneous/noImageAvailable.jpg?t=2023-12-28T13%3A19%3A07.796Z"
            height="350"
            width="350"
          ></img>
        ) : (
          selectedProduct.media.map((eachMedia) =>
            eachMedia === "" ? null : (
              <img src={eachMedia} height="350" width="350"></img>
            )
          )
        )}

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
        <h2>Recommended products: (coming soon)</h2>
      </div>
    </>
  );
}

export default Product;
