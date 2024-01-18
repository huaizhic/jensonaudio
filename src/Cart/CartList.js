import { useNavigate } from "react-router-dom";
import { useCart } from "./CartWrapper";
import { useEffect } from "react";

function CartList() {
  const {
    cart,
    setCart,
    cartOpen,
    setCartOpen,
    cartTotalPrice,
    setCartTotalPrice,
    removeFromCart,
    calculateCartValue,
    setCalculateCartValue,
    inputQuantity,
    setInputQuantity,
  } = useCart();

  const navigate = useNavigate();

  return (
    <>
      <div className="cart">
        <div className="cartTitle">
          <h2>Shopping Cart</h2>
          <button onClick={() => setCartOpen(!cartOpen)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="20"
              height="20"
              viewBox="0 0 50 50"
            >
              <path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"></path>
            </svg>
          </button>
        </div>
        <div className="cartProductsArea">
          {cart.length === 0 ? (
            <span>There are no items in cart. Add one now!</span>
          ) : (
            cart.map((product) => (
              <>
                <div className="cartProduct">
                  <div className="cartTitlePrice">
                    <h2>{product.productTitle}</h2>
                    <span>{product.productPrice}</span>
                  </div>
                  <p>
                    Quantity:
                    <input
                      type="number"
                      value={product.inputQuantity}
                      onChange={(e) => {
                        // setTempQuantity(e.target.valueAsNumber);
                        let tempCart = [];
                        let tempQuantity = e.target.valueAsNumber;
                        console.log(
                          "product.inputQuantity:",
                          product.inputQuantity
                        );
                        console.log("tempQuantity:", tempQuantity);

                        if (tempQuantity > product.inputQuantity) {
                          // meaning increment
                          if (tempQuantity >= product.quantity) {
                            tempCart = cart;
                            tempCart.forEach((productParam, index) =>
                              productParam.id === product.id
                                ? (tempCart[index].inputQuantity =
                                    product.quantity)
                                : productParam
                            );
                            localStorage.setItem(
                              "cart",
                              JSON.stringify(tempCart)
                            );
                            // setCart(
                            //   cart.forEach((productParam) =>
                            //     productParam.id === product.id
                            //       ? {
                            //           ...product,
                            //           inputQuantity: product.quantity,
                            //         }
                            //       : product
                            //   )
                            // );
                            // return {
                            //   ...product,
                            //   inputQuantity: product.quantity,
                            // };
                            // setInputQuantity(product.quantity);
                            // setCart
                          } else {
                            console.log(cart);
                            tempCart = cart;
                            tempCart.forEach((productParam, index) =>
                              productParam.id === product.id
                                ? (tempCart[index].inputQuantity =
                                    e.target.valueAsNumber)
                                : productParam
                            );
                            // console.log(e.target.valueAsNumber);
                            console.log("tempCart:", tempCart);
                            localStorage.setItem(
                              "cart",
                              JSON.stringify(tempCart)
                            );

                            // setCart(
                            //   cart.forEach((productParam) =>
                            //     productParam.id === product.id
                            //       ? {
                            //           ...product,
                            //           inputQuantity: e.target.valueAsNumber,
                            //         }
                            //       : product
                            //   )
                            // );
                            // setInputQuantity(e.target.valueAsNumber);
                          }
                        } else if (tempQuantity < product.inputQuantity) {
                          // decrement
                          if (tempQuantity <= 1) {
                            tempCart = cart;
                            tempCart.forEach((productParam, index) =>
                              productParam.id === product.id
                                ? (tempCart[index].inputQuantity = 1)
                                : productParam
                            );
                            localStorage.setItem(
                              "cart",
                              JSON.stringify(tempCart)
                            );

                            // setCart(
                            //   cart.forEach((productParam) =>
                            //     productParam.id === product.id
                            //       ? {
                            //           ...product,
                            //           inputQuantity: 1,
                            //         }
                            //       : product
                            //   )
                            // );
                            // setInputQuantity(1);
                          } else {
                            tempCart = cart;
                            tempCart.forEach((productParam, index) =>
                              productParam.id === product.id
                                ? (tempCart[index].inputQuantity =
                                    e.target.valueAsNumber)
                                : productParam
                            );
                            localStorage.setItem(
                              "cart",
                              JSON.stringify(tempCart)
                            );

                            // setCart(
                            //   cart.forEach((productParam) =>
                            //     productParam.id === product.id
                            //       ? {
                            //           ...product,
                            //           inputQuantity: e.target.valueAsNumber,
                            //         }
                            //       : product
                            //   )
                            // );
                            // setInputQuantity(e.target.valueAsNumber);
                          }
                        }
                        // console.log(
                        //   "product.inputQuantity (1):",
                        //   product.inputQuantity
                        // );
                        setCalculateCartValue(!calculateCartValue);
                        // return product;
                      }}
                    ></input>
                  </p>
                  <button onClick={() => removeFromCart(product)}>
                    Remove
                  </button>
                </div>
              </>
            ))
          )}
        </div>
        <h3>Total Price: {cartTotalPrice}</h3>
        <button
          onClick={() => {
            navigate("/checkout");
            setCartOpen(!cartOpen);
          }}
        >
          Checkout
        </button>
      </div>
    </>
  );
}

export default CartList;
