import PropType from "prop-types";
import AuthContext from "./AuthContext";
import { useNavigate } from "react-router-dom";

const AuthStates = (props) => {
  const host = "http://127.0.0.1:3000";
  const navigate = useNavigate();

  //   type => if its login or signup // to switch card-panels
  //   const [type, setType] = useState("login");

  const userLoginFunc = async (values) => {
    const { email, password } = values;
    try {
      const response = await fetch(`${host}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();

        return {
          success: false,
          message: errorMessage || `HTTP error! Status: ${response.status}`,
        };
      }

      const data = await response.json();

      localStorage.setItem("token", data.token);

      navigate("/");

      return { success: true, message: "Login successful!" };
    } catch (error) {
      console.log("Error : ", error.message);
    }
  };

  const userSignUpFunc = async (values) => {
    const { name, email, password, confirmPassword } = values;
    try {
      const response = await fetch(`${host}/api/auth/createuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, confirmPassword }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        return {
          success: false,
          message: errorMessage || `HTTP error! Status: ${response.status}`,
        };
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);

      navigate("/");
    } catch (error) {
      console.log("Error : ", error.message);
    }
  };

  const userLogOutFunc = () => {
    localStorage.removeItem("token");
    navigate("/auth");
  };

  return (
    <AuthContext.Provider
      value={{ userLoginFunc, userSignUpFunc, userLogOutFunc }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

AuthStates.propTypes = {
  children: PropType.oneOfType([
    PropType.arrayOf(PropType.node),
    PropType.node,
  ]),
};

export default AuthStates;
