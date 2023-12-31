import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAdminAuth } from "../../Auth/AuthWrapper";
import supabase from "../../supabase";

// const imagesTemplate = [
//   { name: "image1" },
//   { name: "image2" },
//   { name: "image3" },
//   { name: "image4" },
//   { name: "image5" },
// ];

function ProductEdit({
  catalog,
  categoryList,
  user,
  setCatalog,
  productRerender,
  setProductRerender,
}) {
  const [indivProductEdit, setIndivProductEdit] = useState(true);
  const { id } = useParams(); // custom hook from react router to retrieve dynamic route generated
  const navigate = useNavigate();
  const { sessionData, sessionCheck, authRouteRedirect, setAuthRouteRedirect } =
    useAdminAuth();

  const [inputTitle, setInputTitle] = useState("unset");
  const [inputPrice, setInputPrice] = useState(NaN);
  const [inputCategory, setInputCategory] = useState("unset");
  const [inputDesc, setInputDesc] = useState("unset");

  const [images, setImages] = useState([]);
  const [image1preview, setImage1preview] = useState("");
  const [image2preview, setImage2preview] = useState("");
  const [image3preview, setImage3preview] = useState("");
  const [image4preview, setImage4preview] = useState("");
  const [image5preview, setImage5preview] = useState("");
  const [image1, setImage1] = useState();
  const [image2, setImage2] = useState();
  const [image3, setImage3] = useState();
  const [image4, setImage4] = useState();
  const [image5, setImage5] = useState();

  useEffect(
    function () {
      function checkSession() {
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

  let selectedProduct = catalog.filter((product) =>
    product.productTitle === id ? product : null
  )[0];

  // console.log(catalog);
  // console.log(selectedProduct);

  // catalog data not fetched in time yet
  if (catalog[0] === undefined) {
    return <h1>ProductEdit Still loading...</h1>;
  } else {
    let selectedProduct = catalog.filter((product) =>
      product.productTitle === id ? product : null
    )[0];
    if (
      inputTitle === "unset" ||
      inputCategory === "unset" ||
      inputDesc === "unset"
    ) {
      fillInputs(selectedProduct);
    }
    // console.log("selectedProduct:", selectedProduct);
  }

  const imagesTemplate = [
    {
      id: 0,
      name: "image1",
      preview: image1preview,
      setPreview: setImage1preview,
      originalImage: selectedProduct.media[0],
      newFile: image1,
      setNewFile: setImage1,
    },
    {
      id: 1,
      name: "image2",
      preview: image2preview,
      setPreview: setImage2preview,
      originalImage: selectedProduct.media[1],
      newFile: image2,
      setNewFile: setImage2,
    },
    {
      id: 2,
      name: "image3",
      preview: image3preview,
      setPreview: setImage3preview,
      originalImage: selectedProduct.media[2],
      newFile: image3,
      setNewFile: setImage3,
    },
    {
      id: 3,
      name: "image4",
      preview: image4preview,
      setPreview: setImage4preview,
      originalImage: selectedProduct.media[3],
      newFile: image4,
      setNewFile: setImage4,
    },
    {
      id: 4,
      name: "image5",
      preview: image5preview,
      setPreview: setImage5preview,
      originalImage: selectedProduct.media[4],
      newFile: image5,
      setNewFile: setImage5,
    },
  ];

  if (
    image1preview === "" &&
    image2preview === "" &&
    image3preview === "" &&
    image4preview === "" &&
    image5preview === ""
  ) {
    imagesTemplate.map((imageParam) =>
      imageParam.setPreview(imageParam.originalImage)
    );
    // imagesTemplate.filter((imageParam) => imageParam.image === "");
    // imagesTemplate.map((imageParam) =>
    //   imageParam.state === undefined
    //     ? { ...imageParam, state: imageParam.setState("") }
    //     : imageParam
    // );
  }

  function fillInputs(selectedProduct) {
    setInputTitle(selectedProduct.productTitle);
    setInputPrice(selectedProduct.productPrice);
    setInputCategory(selectedProduct.productCategory);
    setInputDesc(selectedProduct.productDescription);
    // return;
  }

  // opens/closes the productEdit component
  function handleClick() {
    setIndivProductEdit(!indivProductEdit);
  }

  // handles update product submission logic
  async function handleSubmit(e) {
    e.preventDefault();

    imageSubmission();

    if (
      inputTitle === selectedProduct.productTitle &&
      inputPrice === selectedProduct.productPrice &&
      inputCategory === selectedProduct.productCategory &&
      inputDesc === selectedProduct.productDescription
    ) {
      alert("You have not changed anything so there is no need to update!");
    } else {
      if (inputTitle === "" || Number.isNaN(inputPrice)) {
        alert("Title/price is blank!");
      } else {
        // check if inputTitle name is already taken in catalog
        // filter catalog to exclude selected product to pass the same productTitle if other inputs are modified instead (eg productPrice, productDescription, etc)
        let restOfCatalog = catalog.filter(
          (product) => product.productTitle !== selectedProduct.productTitle
        );
        // console.log(restOfCatalog);

        const isNameTaken = restOfCatalog.some(
          (product) =>
            product.productTitle.toLowerCase() === inputTitle.toLowerCase()
        );
        if (isNameTaken) {
          alert(
            "The input product name already exists in the catalog. Please choose a new name!"
          );
        } else {
          const response = window.confirm("Confirm changes");
          if (response) {
            // update supabase
            const { data: modifiedProduct, error } = await supabase
              .from("CatalogList")
              .upsert({
                id: selectedProduct.id,
                productTitle: inputTitle,
                productPrice: inputPrice,
                productCategory: inputCategory,
                productDescription: inputDesc,
              })
              .select();

            // console.log("modifiedProduct:", modifiedProduct);

            // update react local UI
            setCatalog(
              catalog.map((product) =>
                product.id === modifiedProduct[0].id
                  ? modifiedProduct[0]
                  : product
              )
            );

            // console.log("catalog: ", catalog);
            setProductRerender(!productRerender);
          }
        }
      }
    }
  }

  // console.log(Number.isNaN(inputPrice));

  function handleTitleChange(e) {
    setInputTitle(e.target.value);
  }

  function handlePriceChange(e) {
    setInputPrice(e.target.valueAsNumber);
  }

  function handleCatChange(e) {
    setInputCategory(e.target.value);
  }

  function handleDescChange(e) {
    setInputDesc(e.target.value);
  }

  function handleSingleImageChange(e, setImage, setNewFile) {
    // setImages([...e.target.files]);
    // console.log(images);
    // console.log(e.target.files);
    // console.log("e.target.files[0]:", e.target.files[0]);
    // console.log(e.target.files[0].name);
    // console.log();
    setImage(URL.createObjectURL(e.target.files[0]));
    setNewFile(e.target.files[0]);
    // console.log(imagesTemplate);
  }

  function handleMultipleImageChange(e) {
    // setImages([...e.target.files]);
    // console.log(images);
  }

  // helper function to be nested inside handleSubmit function
  async function imageSubmission() {
    // for the slots left untouched, do nothing  (newFile === undefined)
    // for slots with new submission, upload to supabase

    // filter out slots with new submissions
    const toUpload = imagesTemplate.filter(
      (slot) => slot.newFile !== undefined
    );
    console.log("toUpload:", toUpload);

    for (let i = 0; i < toUpload.length; i++) {
      console.log("toUpload[i].newFile", toUpload[i].newFile);
      console.log("toUpload[i].preview", toUpload[i].preview);

      console.log(
        "intended supabase filepath:",
        `${selectedProduct.productTitle}/${selectedProduct.productTitle}(image${
          toUpload[i].id + 1
        })`
      );

      // upload files to supabase (works)
      const { data, error } = await supabase.storage
        .from("catalog-public")
        .upload(
          `${selectedProduct.productTitle}/${
            selectedProduct.productTitle
          }(image${toUpload[i].id + 1})`,
          toUpload[i].newFile,
          { upsert: true }
        );

      // console.log("supabase response data:", data);
      // console.log("supabase response error (if any):", error);

      // get their URLs
      const { data: link } = supabase.storage
        .from("catalog-public")
        .getPublicUrl(
          `${selectedProduct.productTitle}/${
            selectedProduct.productTitle
          }(image${toUpload[i].id + 1})`
        );

      console.log("URL:", link);

      // identify and retrieve product from catalogList
      // update media column of product in catalogList
      console.log("selectedProduct.media array: ", selectedProduct.media);
      let updatedMediaArray = selectedProduct.media;
      updatedMediaArray[toUpload[i].id] = link.publicUrl;
      console.log("updatedMediaArray:", updatedMediaArray);

      const { data: updatedProduct, error: updatedProductError } =
        await supabase
          .from("CatalogList")
          .upsert({ id: selectedProduct.id, media: updatedMediaArray })
          .select();

      console.log("updatedProduct:", updatedProduct); // the media array should be updated correctly
      console.log("updatedProductError, if any:", updatedProductError); // catching the error
    }
  }

  return (
    <div className="Product">
      {indivProductEdit ? (
        <>
          <button onClick={() => handleClick()}>Close</button>
          <form onSubmit={(e) => handleSubmit(e)}>
            <br></br>
            <h2>Edit product details</h2>
            <div className="imagesTemplate">
              {imagesTemplate.map((image) => (
                <>
                  <div className="images">
                    <h3>{image.name}</h3>
                    <img src={image.preview} height="100" width="100"></img>
                    <input
                      type="file"
                      accept="image/*"
                      // value={image.state}
                      // multiple="multiple"
                      onChange={(e) =>
                        handleSingleImageChange(
                          e,
                          image.setPreview,
                          image.setNewFile
                        )
                      }
                    ></input>
                  </div>
                </>
              ))}
            </div>
            <div>
              <h3>Multiple upload (not working yet)</h3>
              <input
                type="file"
                accept="image/*"
                multiple="multiple"
                onChange={(e) => handleMultipleImageChange(e)}
              ></input>
            </div>
            {/* <input
              type="file"
              multple
              accept="image/*"
              onChange={handleImageChange}
            ></input> */}
            <br></br>
            <input
              type="text"
              value={inputTitle}
              onChange={(e) => handleTitleChange(e)}
            ></input>
            <input
              type="number"
              value={inputPrice}
              onChange={(e) => handlePriceChange(e)}
            ></input>
            <select value={inputCategory} onChange={(e) => handleCatChange(e)}>
              {categoryList.map((object) => (
                <option>{object.category}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Description"
              value={inputDesc}
              onChange={(e) => handleDescChange(e)}
            ></input>
            <button>Update</button>
          </form>
        </>
      ) : (
        <button onClick={() => handleClick()}>Edit Product</button>
      )}
      <br></br>
      <br></br>
      <button>Delete product (coming soon)</button>
    </div>
  );
}

export default ProductEdit;
