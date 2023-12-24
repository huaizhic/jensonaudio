import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "./AuthWrapper";
import { useReducer, useState } from "react";

function Login() {
  const navigate = useNavigate();
  const { login } = useAdminAuth();
  //   const test = useAdminAuth();
  //   console.log(test);
  const [formData, dispatch] = useReducer(reducer, {
    userName: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState(null);

  function reducer(formData, newItem) {
    return { ...formData, newItem };
  }

  const doLogin = async () => {
    try {
      await login(formData.userName, formData.password);
      navigate("/admin");
    } catch (error) {
      setErrorMessage(error);
    }
  };

  return (
    <div>
      <h2>Admin Login page</h2>
      <div>
        <div>
          <input
            value={formData.userName}
            onChange={(e) => dispatch({ userName: e.target.value })}
            type="text"
          />
        </div>
        <div>
          <input
            value={formData.password}
            onChange={(e) => dispatch({ password: e.target.value })}
            type="password"
          />
        </div>
        <div>
          <button onClick={doLogin}>Log in</button>
        </div>
        {errorMessage ? <div className="error">{errorMessage}</div> : null}
      </div>
    </div>
  );
}

export default Login;
