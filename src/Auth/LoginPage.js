import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "./AuthWrapper";
import { useState, useEffect } from "react";

function LoginPage({ user, setUser }) {
  const navigate = useNavigate();
  const { processLogin, sessionData, sessionCheck, setSessionCheck } =
    useAdminAuth(); // custom hook for Admin Authentication Context
  //   const test = useAdminAuth();
  //   console.log(test);
  // const [formData, dispatch] = useReducer(reducer, {
  //   userName: "",
  //   password: "",
  // });

  const [inputUsername, setInputUsername] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  // function reducer(formData, newItem) {
  //   return { ...formData, newItem };
  // }

  // if (sessionData.length === 0) {
  //   return <h1>Checking session</h1>;
  // }

  useEffect(
    function () {
      function checkSession() {
        // if (sessionData !== undefined) {
        //   setUser({ ...user, isAuthenticated: true }); // this triggers an infinite loop for some reason
        //   // console.log("user authenticated");
        //   console.log(sessionData);
        // }

        // if (sessionData.length === 0) {
        //   return <h1>Checking session...</h1>;
        // }

        if (sessionData.beforeFetchData === "true") {
          console.log(
            "Session data not loaded from supabase yet but react component rendered already (race condition)"
          );

          // return () => {
          //   <h1>Checking session...</h1>;
          // };
        }

        if (sessionData.session !== null) {
          setUser({ ...user, isAuthenticated: true });
          navigate("/admin");
        }

        console.log(sessionData);

        if (user.isAuthenticated === false) {
          // alert("You are not logged in to admin yet!");
          // navigate("/admin/login");
        }
      }

      checkSession();
    },
    [sessionCheck]
  );

  const handleSubmit = async () => {
    try {
      await processLogin(inputUsername, inputPassword);
      navigate("/admin");
    } catch (error) {
      setErrorMessage("Wrong email/password");
      // console.log(error);
    }
  };

  return (
    <div className="loginPage">
      <h2>Admin Login page</h2>
      <div>
        <div>
          <input
            value={inputUsername}
            onChange={(e) => setInputUsername(e.target.value)}
            type="text"
          />
        </div>
        <div>
          <input
            value={inputPassword}
            onChange={(e) => setInputPassword(e.target.value)}
            type="password"
          />
        </div>
        <div>
          <button onClick={handleSubmit}>Log in</button>
          {/* <button onClick={() => setSessionCheck(!sessionCheck)}>
            Quick log in if recently signed out
          </button> */}
        </div>
        {errorMessage ? <div className="loginError">{errorMessage}</div> : null}
      </div>
    </div>
  );
}

export default LoginPage;
