import { useState } from "react";
import AddForm from "./AddForm";
import DeleteForm from "./DeleteForm";
import EditForm from "./EditForm";

function AdminTools({
  catalog,
  setCatalog,
  productTitle,
  setProductTitle,
  productPrice,
  setProductPrice,
  productCategory,
  setProductCategory,
  categoryList,
  setCategoryList,
  catalogFilterRerender,
  setCatalogFilterRerender,
  productEdit,
  setProductEdit,
  productDescription,
  setProductDescription,
}) {
  const [collapsed, setCollapsed] = useState(true);

  function handleClick() {
    setCollapsed(!collapsed);
  }

  return (
    <div className="AdminTools">
      <h1>Admin Tools</h1>
      <button onClick={() => handleClick()}>
        {collapsed ? "Expand" : "Collapse"}
      </button>
      {collapsed ? null : (
        <div className="AdminToolsComponents">
          <AddForm
            catalog={catalog}
            setCatalog={setCatalog}
            productTitle={productTitle}
            setProductTitle={setProductTitle}
            productPrice={productPrice}
            setProductPrice={setProductPrice}
            productCategory={productCategory}
            setProductCategory={setProductCategory}
            categoryList={categoryList}
            setCategoryList={setCategoryList}
            catalogFilterRerender={catalogFilterRerender}
            setCatalogFilterRerender={setCatalogFilterRerender}
            productDescription={productDescription}
            setProductDescription={setProductDescription}
          />
          <DeleteForm
            setCatalog={setCatalog}
            catalog={catalog}
            categoryList={categoryList}
            setCategoryList={setCategoryList}
            catalogFilterRerender={catalogFilterRerender}
            setCatalogFilterRerender={setCatalogFilterRerender}
            productDescription={productDescription}
            setProductDescription={setProductDescription}
          />
          <EditForm
            setCatalog={setCatalog}
            catalog={catalog}
            productEdit={productEdit}
            setProductEdit={setProductEdit}
            categoryList={categoryList}
            setCategoryList={setCategoryList}
            catalogFilterRerender={catalogFilterRerender}
            setCatalogFilterRerender={setCatalogFilterRerender}
            productDescription={productDescription}
            setProductDescription={setProductDescription}
          />
        </div>
      )}
    </div>
  );
}

export default AdminTools;
