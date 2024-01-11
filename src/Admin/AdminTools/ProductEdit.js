import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAdminAuth } from "../../Auth/AuthWrapper";
import supabase from "../../supabase";

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
  const {
    sessionData,
    sessionCheck,
    authRouteRedirect,
    setAuthRouteRedirect,
    privateList,
    setPrivateList,
  } = useAdminAuth();

  const [inputTitle, setInputTitle] = useState("unset");
  const [inputPrice, setInputPrice] = useState(NaN);
  const [inputCategory, setInputCategory] = useState("unset");
  const [inputDesc, setInputDesc] = useState("unset");

  const [images, setImages] = useState([]);
  // to store image URL
  const [slot1preview, setSlot1preview] = useState(""); // change name to media slot 1
  const [image2preview, setImage2preview] = useState("");
  const [image3preview, setImage3preview] = useState("");
  const [image4preview, setImage4preview] = useState("");
  const [image5preview, setImage5preview] = useState("");
  // to store file object
  const [slot1, setSlot1] = useState();
  const [image2, setImage2] = useState();
  const [image3, setImage3] = useState();
  const [image4, setImage4] = useState();
  const [image5, setImage5] = useState();
  // flag to load media and stop infinite re-render
  const [isMediaLoaded, setIsMediaLoaded] = useState(false);

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
  if (catalog[0] === undefined || privateList[0] === undefined) {
    return <h1>ProductEdit Still loading...</h1>;
  } else {
    let productPublic = catalog.some((product) => product.productTitle === id);
    let productPrivate = privateList.some(
      (product) => product.productTitle === id
    );
    if (productPublic) {
      selectedProduct = catalog.filter((product) =>
        product.productTitle === id ? product : null
      )[0];
    } else if (productPrivate) {
      selectedProduct = privateList.filter((product) =>
        product.productTitle === id ? product : null
      )[0];
    } else {
      console.log("ProductEdit: error fetching product details");
      alert("ProductEdit: error fetching product details");
      console.log("product id:", id);
      console.log("catalog: ", catalog);
      console.log("privateList: ", privateList);
      console.log("privateList[0]: ", privateList[0]);
    }

    if (
      inputTitle === "unset" ||
      inputCategory === "unset" ||
      inputDesc === "unset"
    ) {
      // console.log(selectedProduct);
      fillInputs(selectedProduct);
    }
    // console.log("selectedProduct:", selectedProduct);
  }

  // id is for array indexing purposes
  const imagesTemplate = [
    {
      id: 0,
      name: "Image/Video 1",
      preview: slot1preview,
      setPreview: setSlot1preview,
      originalImage: selectedProduct.media[0],
      newFile: slot1,
      setNewFile: setSlot1,
    },
    {
      id: 1,
      name: "Image 2",
      preview: image2preview,
      setPreview: setImage2preview,
      originalImage: selectedProduct.media[1],
      newFile: image2,
      setNewFile: setImage2,
    },
    {
      id: 2,
      name: "Image 3",
      preview: image3preview,
      setPreview: setImage3preview,
      originalImage: selectedProduct.media[2],
      newFile: image3,
      setNewFile: setImage3,
    },
    {
      id: 3,
      name: "Image 4",
      preview: image4preview,
      setPreview: setImage4preview,
      originalImage: selectedProduct.media[3],
      newFile: image4,
      setNewFile: setImage4,
    },
    {
      id: 4,
      name: "Image 5",
      preview: image5preview,
      setPreview: setImage5preview,
      originalImage: selectedProduct.media[4],
      newFile: image5,
      setNewFile: setImage5,
    },
  ];

  if (
    isMediaLoaded === false &&
    slot1preview === "" &&
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
    setIsMediaLoaded(!isMediaLoaded);
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

    // imageSubmission();

    if (
      inputTitle === selectedProduct.productTitle &&
      inputPrice === selectedProduct.productPrice &&
      inputCategory === selectedProduct.productCategory &&
      inputDesc === selectedProduct.productDescription &&
      slot1 === undefined &&
      image2 === undefined &&
      image3 === undefined &&
      image4 === undefined &&
      image5 === undefined
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
            imageSubmission();
            console.log("catalog after image submission:", catalog); // image change is reflected

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
            console.log("catalog after product details modification:", catalog); // image change also reflected

            // console.log("catalog: ", catalog);
            setProductRerender(!productRerender); // re rendering only working for product details, not media
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

    // filter out slots with new submissions. if toUpload array is empty, below for loop will not run and imageSubmission() is done
    const toUpload = imagesTemplate.filter(
      (slot) => slot.newFile !== undefined
    );
    console.log("toUpload:", toUpload);

    let updatedMediaArray = [];

    for (let i = 0; i < toUpload.length; i++) {
      console.log("toUpload[i].newFile", toUpload[i].newFile);
      console.log("toUpload[i].preview", toUpload[i].preview);

      if (toUpload[i].newFile === "delete current image with no replacement") {
        // alert("delete feature still in progress!");
        // delete current product image from supabase
        const { data: removeData, error } = await supabase.storage
          .from("catalog-public")
          .remove([
            `${selectedProduct.productTitle}/${
              selectedProduct.productTitle
            }(slot${toUpload[i].id + 1})`,
          ]);
        console.log("removeData: ", removeData);
        console.log("removeData error, if any:", error);
        // amend product.media array slot to ""
        updatedMediaArray = selectedProduct.media;
        updatedMediaArray[toUpload[i].id] = "";
      }
      // for replacing exising image and uploading empty slot
      else {
        // upload updated product image to supabase
        console.log(
          "intended supabase filepath:",
          `${selectedProduct.productTitle}/${
            selectedProduct.productTitle
          }(slot${toUpload[i].id + 1})`
        );

        // upload files to supabase (works)
        // upsert will replace existing image
        const { data, error } = await supabase.storage
          .from("catalog-public")
          .upload(
            `${selectedProduct.productTitle}/${
              selectedProduct.productTitle
            }(slot${toUpload[i].id + 1})`,
            toUpload[i].newFile,
            { cacheControl: "10", upsert: true }
          );

        console.log("supabase response data:", data);
        // console.log("supabase response error (if any):", error);

        // get their URLs
        const { data: link } = supabase.storage
          .from("catalog-public")
          .getPublicUrl(
            `${selectedProduct.productTitle}/${
              selectedProduct.productTitle
            }(slot${toUpload[i].id + 1})`
          );

        console.log("URL:", link);

        // identify and retrieve product from catalogList
        // update media column of product in catalogList
        console.log("selectedProduct.media array: ", selectedProduct.media);
        updatedMediaArray = selectedProduct.media;
        updatedMediaArray[toUpload[i].id] = link.publicUrl;
        console.log("updatedMediaArray:", updatedMediaArray);
      }
      const { data: updatedProduct, error: updatedProductError } =
        await supabase
          .from("CatalogList")
          .upsert({ id: selectedProduct.id, media: updatedMediaArray })
          .select();

      console.log("updatedProduct:", updatedProduct); // the media array should be updated correctly
      console.log("updatedProductError, if any:", updatedProductError); // catching the error

      // add in additional logic to remove old image from supabase if it is a replace operation (to free up space)

      // re-render product view (still doesn't work, probably need useEffect in product.js)
      setCatalog(
        catalog.map((product) =>
          product.id === updatedProduct[0].id
            ? { ...product, media: updatedMediaArray }
            : product
        )
      );

      console.log("updatedProduct[0]:", updatedProduct[0]); // the media array should be updated correctly
      // setProductRerender(!productRerender);
    }
  }

  function handleDeleteChange(setPreview, setNewFile, preview) {
    // condition to prevent marking an already empty slot for deleting in supabase
    if (preview !== "") {
      setPreview("");
      setNewFile("delete current image with no replacement");
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
            <p>
              Note: Changes will only be reflected upon clicking of 'Update'
              button. Drag and drop to reorder coming soon
            </p>
            <div className="imagesTemplate">
              {imagesTemplate.map((image) =>
                image.name === "Image/Video 1" ? (
                  <>
                    <div className="images">
                      <h3>{image.name}</h3>

                      <img src={image.preview} height="100" width="100"></img>
                      <input
                        type="file"
                        accept="image/*, video/*"
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
                      <button
                        type="button"
                        // this onClick only triggers if type="button" is used. Else, form onSubmit would take priority
                        onClick={() =>
                          handleDeleteChange(
                            image.setPreview,
                            image.setNewFile,
                            image.preview
                          )
                        }
                      >
                        Delete
                      </button>
                    </div>
                  </>
                ) : (
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
                      <button
                        type="button"
                        // this onClick only triggers if type="button" is used. Else, form onSubmit would take priority
                        onClick={() =>
                          handleDeleteChange(
                            image.setPreview,
                            image.setNewFile,
                            image.preview
                          )
                        }
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )
              )}
            </div>
            {/* <div>
              <h3>Multiple upload (not working yet)</h3>
              <input
                type="file"
                accept="image/*"
                multiple="multiple"
                onChange={(e) => handleMultipleImageChange(e)}
              ></input>
            </div> */}
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
