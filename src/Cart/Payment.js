// import paynowqrUmd from "paynowqr";
import PaynowQR from "./paynowqr";
import { QRCode } from "./qrim.module";

function Payment() {
  // const PaynowQR = require("paynowqr");

  //Create a PaynowQR object
  let qrcode = new PaynowQR({
    uen: "52861616A", //Required: UEN of company
    amount: 50, //Specify amount of money to pay.
    editable: false, //Whether or not to allow editing of payment amount. Defaults to false if amount is specified
    expiry: "20240112", //Set an expiry date for the Paynow QR code (YYYYMMDD). If omitted, defaults to 5 years from current time.
    refNumber: "testing", //Reference number for Paynow Transaction. Useful if you need to track payments for recouncilation.
    // company: "ACME Pte Ltd.", //Company name to embed in the QR code. Optional.
  });

  //Outputs the qrcode to a UTF-8 string format, which can be passed to a QR code generation script to generate the paynow QR
  let QRstring = qrcode.output();

  // console.log(QRstring);

  const el = document.getElementById("qrcode");
  const qr = new QRCode(el, {
    text: QRstring,
    size: 250,
    colorDark: "#6b21a8",
  });
  // qr.makeCode();
  // console.log("el:", el);
  // console.log(qr);
  // console.log(qr.__private_5_canvas.currentSrc);
  // let imageURL = URL.createObjectURL(qr.__private_7_image);
  // console.log(imageURL);
  // console.log(qr.getImageURL());
  let imageURL = qr.getImageURL();
  return (
    <>
      <h1>Unique PayNow QR for payment</h1>
      <p>
        Note: Each PayNow QR code is dynamically generated based on customer
        order. This helps to finetune and lock the price and payment reference
        for easier tracking.
      </p>
      <img src={imageURL} />
      <p>
        Additional note: Provide static SGQR code as backdoor failsafe in case
        dynamic QR fails
      </p>
    </>
  );
}

export default Payment;
