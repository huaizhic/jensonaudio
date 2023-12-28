import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAdminAuth } from "../../Auth/AuthWrapper";

function ProductEdit({ catalog, categoryList, user, setUser }) {
  const [indivProductEdit, setIndivProductEdit] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { sessionData, sessionCheck, authRouteRedirect, setAuthRouteRedirect } =
    useAdminAuth();

  useEffect(
    function () {
      function checkSession() {
        // // this if condition checks if data is fetched from supabase
        // if (sessionData.beforeFetchData === "true") {
        //   console.log(
        //     "(ProductEdit POV) sessionData.beforeFetchData === true, meaning data not fetched from supabase yet"
        //   );
        // } else {
        //   // if there is no session from supabase
        //   if (sessionData.session === null) {
        //     console.log(
        //       "(ProductEdit POV) sessionData.session === null, meaning no session received from supabase"
        //     );
        //     setUser({ ...user, isAuthenticated: false });
        //     // if there is an existing session from supabase
        //   } else if (sessionData.session !== null) {
        //     setUser({ ...user, isAuthenticated: true });
        //   } else {
        //     // to catch any other edge cases
        //     alert(
        //       "(ProductEdit POV) There was an error checking session data from supabase"
        //     );
        //   }
        // }

        // console.log("(ProductEdit POV) user:", user);
        // console.log("(ProductEdit POV) session:", sessionData);

        // if (user.isAuthenticated === false) {
        //   // alert("You are not logged in to admin yet!");
        //   navigate("/admin/login");
        // }
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

  // function checkAdmin() {
  //   if (user.isAuthenticated === false) {
  //     // alert("You are not logged in to admin yet!");
  //     navigate("/admin/login");
  //   }
  // }

  // checkAdmin();

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
