import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "./AuthWrapper";
import { useState, useEffect } from "react";
import supabase from "../supabase";

function LoginPage({ user, setUser }) {
  const navigate = useNavigate();
  const {
    processLogin,
    sessionData,
    sessionCheck,
    setSessionCheck,
    authRouteRedirect,
  } = useAdminAuth(); // custom hook for Admin Authentication Context

  // const [formData, dispatch] = useReducer(reducer, {
  //   userName: "",
  //   password: "",
  // });

  const [inputUsername, setInputUsername] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(
    function () {
      async function checkSession() {
        const { data: session, error } = await supabase.auth.getSession();

        console.log(session);

        if (session.session === null) {
          console.log(
            "(LoginPage POV) sessionData.session === null, meaning no session received from supabase"
          );
          setUser({ ...user, isAuthenticated: false });
          // if there is an existing session from supabase
        } else if (session.session !== null) {
          setUser({ ...user, isAuthenticated: true });
          navigate(authRouteRedirect);
        } else {
          // to catch any other edge cases
          alert(
            "(LoginPage POV) There was an error checking session data from supabase"
          );
        }

        // // this if condition checks if data is fetched from supabase
        // if (sessionData.beforeFetchData === "true") {
        //   console.log(
        //     "(LoginPage POV) sessionData.beforeFetchData === true, meaning data not fetched from supabase yet"
        //   );
        // } else {
        //   // if there is no session from supabase
        //   if (session.session === null) {
        //     console.log(
        //       "(LoginPage POV) sessionData.session === null, meaning no session received from supabase"
        //     );
        //     setUser({ ...user, isAuthenticated: false });
        //     // if there is an existing session from supabase
        //   } else if (session.session !== null) {
        //     setUser({ ...user, isAuthenticated: true });
        //   } else {
        //     // to catch any other edge cases
        //     alert(
        //       "(LoginPage POV) There was an error checking session data from supabase"
        //     );
        //   }
        // }

        // console.log("(LoginPage POV) user:", user);
        // console.log("(LoginPage POV) session:", sessionData);

        // if (user.isAuthenticated === false) {
        //   // alert("You are not logged in to admin yet!");
        //   navigate("/admin/login");
        // }
      }

      checkSession();
    },
    [sessionCheck]
  );

  const handleSubmit = async () => {
    try {
      await processLogin(inputUsername, inputPassword);
      navigate(authRouteRedirect);
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
        <br></br>
        <span>Reset password/email (coming soon)</span>
        <br></br>
        <span>Log in with magic link (coming soon)</span>
      </div>
    </div>
  );
}

export default LoginPage;
