import Product from "../Product";
import PrivateProduct from "../Admin/PrivateProduct";
import { useParams } from "react-router-dom";
import PrivateList from "../Admin/PrivateList";
import { useAdminAuth } from "./AuthWrapper";
import { useEffect } from "react";
import supabase from "../supabase";

function ProductWrapper({
  catalog,
  setCatalog,
  fetchData,
  setFetchData,
  productRerender,
  setProductRerender,
}) {
  const { id } = useParams();
  const { privateList, setPrivateList } = useAdminAuth();
  let isProductPublic = false;
  let isProductPrivate = false;

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
      setPrivateList(data); // PROBLEM: if accessing Product component from CartWrapper, this function does not exist
      // proposed solution: split into 2 components: product and privateProduct. then use a ternary operator to determine which one to display based on a robust condition
    }
    getCatalog();
    getPrivateList();
  }, []);

  if (catalog[0] === undefined || privateList[0] === undefined) {
    // console.log(catalog[0]);
    return <h1>Still loading productWrapper...</h1>;
  } else {
    isProductPublic = catalog.some((product) => product.productTitle === id);
    // console.log("isProductPublic:", isProductPublic);
    isProductPrivate = privateList.some(
      (product) => product.productTitle === id
    );
    // console.log("isProductPrivate:", isProductPrivate);
  }

  return (
    <>
      {isProductPublic ? (
        <Product
          catalog={catalog}
          setCatalog={setCatalog}
          fetchData={fetchData}
          setFetchData={setFetchData}
          productRerender={productRerender}
          setProductRerender={setProductRerender}
        />
      ) : isProductPrivate ? (
        <PrivateProduct
          productRerender={productRerender}
          setProductRerender={setProductRerender}
        />
      ) : (
        <h1>An error occured when loading product details</h1>
      )}
    </>
  );
}

export default ProductWrapper;
