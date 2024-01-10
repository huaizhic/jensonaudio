import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import supabase from "./supabase";
import { useCart } from "./Cart/CartWrapper";
import { useAdminAuth } from "./Auth/AuthWrapper";

function Product({
  catalog,
  setCatalog,
  fetchData,
  setFetchData,
  productRerender,
  setProductRerender,
}) {
  const { cart, setCart } = useCart();
  const { privateList, setPrivateList } = useAdminAuth();

  const [selectedProduct, setSelectedProduct] = useState();
  // const [productRerender, setProductRerender] = useState(false);
  const { id } = useParams();
  console.log("useParams id:", id);

  useEffect(function () {
    async function getCatalog() {
      const { data: Catalog, error } = await supabase
        .from("CatalogList")
        .select("*");
      setCatalog(Catalog);
      // console.log(CatalogList);
    }
    async function getPrivateList() {
      const { data, error } = await supabase.from("PrivateList").select("*");
      console.log("privateList:", data);
      setPrivateList(data);
    }
    getPrivateList();
    getCatalog();
  }, []);

  useEffect(
    function () {
      function getProduct() {
        let productPublic = catalog.some(
          (product) => product.productTitle === id
        );
        if (productPublic) {
          let selectedProduct = catalog.filter((product) =>
            product.productTitle === id ? product : null
          )[0];
          setSelectedProduct(selectedProduct);
          // console.log("catalog", catalog);
          // console.log("selectedProduct", selectedProduct);
        } else {
          let productPrivate = privateList.some(
            (product) => product.productTitle === id
          );
          if (productPrivate) {
            let selectedProduct = privateList.filter((product) =>
              product.productTitle === id ? product : null
            )[0];
            setSelectedProduct(selectedProduct);
          } else {
            console.log("There has been an error fetching product details");
            alert("There has been an error fetching product details");
          }
        }
      }
      getProduct();
    },
    [productRerender]
  );

  // console.log("selectedproduct:", selectedProduct);
  // console.log("catalog:", catalog);

  //   console.log(selectedProduct);
  //   console.log(catalog);

  // as the components tend to render before the data is fetched from supabase, an error will occur complaining that product details are undefined.
  // thus, this if condition forces the components to wait for the data to be fetched from supabase before rendering,
  // successfully loading the product details.

  if (catalog[0] === undefined && privateList === undefined) {
    return <h1>Still loading...</h1>;
  } else {
    if (selectedProduct === undefined) {
      // setProductRerender(!productRerender);
      let productPublic = catalog.some(
        (product) => product.productTitle === id
      );

      let productPrivate = privateList.some(
        (product) => product.productTitle === id
      );

      if (productPublic) {
        setSelectedProduct(
          catalog.filter((product) =>
            product.productTitle === id ? product : null
          )[0]
        );
      } else if (productPrivate) {
        setSelectedProduct(
          privateList.filter((product) =>
            product.productTitle === id ? product : null
          )[0]
        );
      } else {
        console.log("There has been an error fetching product details (1)");
        alert("There has been an error fetching product details(1)");
      }

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
        <button onClick={() => setCart([...cart, selectedProduct])}>
          Add to cart (Early Build)
        </button>
        <h2>Recommended products: (coming soon)</h2>
      </div>
    </>
  );
}

export default Product;
