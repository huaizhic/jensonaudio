import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "./AuthWrapper";
import { useState } from "react";

function LoginPage() {
  const navigate = useNavigate();
  const { processLogin } = useAdminAuth(); // custom hook for Admin Authentication Context
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
    <div>
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
        </div>
        {errorMessage ? <div className="error">{errorMessage}</div> : null}
      </div>
    </div>
  );
}

export default LoginPage;
