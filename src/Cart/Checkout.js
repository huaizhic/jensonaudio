import { useNavigate } from "react-router-dom";

function Checkout() {
  const navigate = useNavigate();

  return (
    <>
      <h1>Checkout</h1>
      <p> Items in cart: (placeholder)</p>
      <p>
        {" "}
        Payment options: PayNow (Singapore) / Wire Transfer (International)
      </p>
      <form className="checkoutInputs">
        <input placeholder="Customer Name"></input>
        <br></br>
        <input placeholder="Customer Handphone Number"></input>
        <br></br>
        <input placeholder="Customer Email"></input>
        <br></br>
        <input placeholder="Delivery Address"></input>
        <br></br>
        <button onClick={() => navigate("/payment")}>Proceed to Payment</button>
      </form>
    </>
  );
}

export default Checkout;
