import { useNavigate, useParams } from "react-router-dom";
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
  const { cart, setCart, addToCart, inputQuantity, setInputQuantity } =
    useCart();
  // const { privateList, setPrivateList } = useAdminAuth();

  const [selectedProduct, setSelectedProduct] = useState();
  // const [productRerender, setProductRerender] = useState(false);
  const { id } = useParams();
  // console.log("useParams id:", id);
  const [isProductLoaded, setIsProductLoaded] = useState(false);
  const navigate = useNavigate();
  // const [inputQuantity, setInputQuantity] = useState(1);
  // const [tempQuantity, setTempQuantity] = useState(0);

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

        // } else {
        //   console.log("There has been an error fetching product details");
        //   alert("There has been an error fetching product details");
        // }
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

  if (catalog[0] === undefined) {
    return <h1>Still loading...</h1>;
  } else {
    if (selectedProduct === undefined && isProductLoaded === false) {
      setSelectedProduct(
        catalog.filter((product) =>
          product.productTitle === id ? product : null
        )[0]
      );

      setIsProductLoaded(!isProductLoaded);

      // if (selectedProduct !== undefined && isProductLoaded === true) {
      //   // for debugging purposes
      //   // setSelectedProduct({ ...selectedProduct, quantity: 3 });

      //   console.log();
      //   if (selectedProduct.quantity >= 1) {
      //     // setInputQuantity(1);
      //     selectedProduct = { ...selectedProduct, inputQuantity: 1 };
      //     console.log("oi");
      //   } else {
      //     // setInputQuantity(0);
      //     selectedProduct = { ...selectedProduct, inputQuantity: 0 };
      //   }
      // }
      // } else {

      //   } else {
      //     console.log("There has been an error fetching product details (1)");
      //     alert("There has been an error fetching product details(1)");
      //   }

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
        {/* <p>
          Quantity:
          <input
            type="number"
            value={selectedProduct.inputQuantity}
            onChange={(e) => {
              // setTempQuantity(e.target.valueAsNumber);

              let tempQuantity = e.target.valueAsNumber;
              console.log(tempQuantity);

              if (tempQuantity > inputQuantity) {
                // console.log(inputQuantity);
                // meaning increment
                if (tempQuantity >= selectedProduct.quantity) {
                  setInputQuantity(selectedProduct.quantity);
                } else {
                  setInputQuantity(e.target.valueAsNumber);
                }
              } else if (tempQuantity < inputQuantity) {
                // decrement
                if (tempQuantity <= 1) {
                  setInputQuantity(1);
                } else {
                  setInputQuantity(e.target.valueAsNumber);
                }
              }
            }}
          ></input>
        </p> */}

        <button>
          <a href="https://wa.me/6596612172" target="_blank">
            Enquire via Whatsapp
          </a>
        </button>
        <button onClick={() => navigate("/checkout")}>
          Buy Now (Not working yet)
        </button>
        <button
          onClick={() =>
            // setCart([...cart, selectedProduct])
            addToCart(selectedProduct)
          }
        >
          Add to cart
        </button>
        <h2>Recommended products: (coming soon)</h2>
      </div>
    </>
  );
}

export default Product;
