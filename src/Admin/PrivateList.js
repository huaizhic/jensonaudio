import { useAdminAuth } from "../Auth/AuthWrapper";
import CatalogCell from "../CatalogCell";
import supabase from "../supabase";
import { useEffect } from "react";

function PrivateList() {
  const { privateList, setPrivateList } = useAdminAuth();

  useEffect(() => {
    async function getPrivateList() {
      const { data, error } = await supabase.from("PrivateList").select("*");
      console.log("privateList:", data);
      setPrivateList(data);
    }
    getPrivateList();
  }, []);

  if (privateList[0] === undefined) {
    return <h1>Loading private list...</h1>;
  }

  return (
    <>
      {/* <h2>Private/Archived/Pending List</h2> */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          backgroundColor: "lightgray",
        }}
      >
        {privateList.map((product) => (
          <CatalogCell product={product} />
        ))}
      </section>
    </>
  );
}

export default PrivateList;
