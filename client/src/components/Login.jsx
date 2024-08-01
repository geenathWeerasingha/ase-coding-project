import { useRef, useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";
 
import useToggle from "../hooks/useToggle";
 

import axios from "../api/axios";
const LOGIN_URL = "/api/Auth";

const Login = () => {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [usernamevalue, setUsernameValue] = useState("");
  const [isFocusedUsername, setIsFocusedUsername] = useState(false);

  const handleFocusUsername = () => setIsFocusedUsername(true);
  const handleBlurUsername = () => {
    if (!usernamevalue) setIsFocusedUsername(false);
  };

  const [passwordvalue, setPasswordValue] = useState("");
  const [isFocusedPassword, setIsFocusedPassword] = useState(false);

  const handleFocusPassword = () => setIsFocusedPassword(true);
  const handleBlurPassword = () => {
    if (!passwordvalue) setIsFocusedPassword(false);
  };

  const [errMsg, setErrMsg] = useState("");

  const [check, toggleCheck] = useToggle("persist", false);

   
  const redirect_uri = "http://localhost:5173/login";
 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let username = usernamevalue;
      let password = passwordvalue;

      console.log(username);
      console.log(password);

      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ username, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      const accessToken = response?.data?.accessToken;

      let user = username;

      setAuth({ user, accessToken });

      setUsernameValue("");
      setPasswordValue("");

      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
    }
  };

  return (
    <section className="min-h-s">
      <div className="container h-full px-6 py-2">
        <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
          <div className="mb-6 mt-20 md:mb-0 md:w-8/12 lg:w-6/12">
            <img
              src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              className="w-full"
              alt="Phone image"
            />
          </div>

          <div className="md:w-8/12 lg:ml-6  lg:w-5/12">
            <p
              className={`${
                errMsg ? "bg-red-500 text-white" : "offscreen"
              } p-4 rounded-md`}
              aria-live="assertive"
            >
              {errMsg}
            </p>

            <h2 className="text-4xl  text-center my-4">Login</h2>

            <form onSubmit={handleSubmit}>
              <div className="relative mt-5">
                <label
                  htmlFor="animated-input"
                  className={`absolute left-3 top-3 transition-all ${
                    isFocusedUsername || usernamevalue
                      ? "text-blue-500 transform -translate-y-6 scale-75 bg-white px-1"
                      : "text-gray-500"
                  }`}
                >
                  username
                </label>

                <input
                  type="text"
                  id="animated-input"
                  value={usernamevalue}
                  onChange={(e) => setUsernameValue(e.target.value)}
                  onFocus={handleFocusUsername}
                  onBlur={handleBlurUsername}
                  className="border-2 border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 p-2 rounded-md w-full"
                  placeholder=""
                />
              </div>

              <div className="relative mt-5">
                <label
                  htmlFor="animated-password"
                  className={`absolute left-3 top-3 transition-all ${
                    isFocusedPassword || passwordvalue
                      ? "text-blue-500 transform -translate-y-6 scale-75 bg-white px-1"
                      : "text-gray-500"
                  }`}
                >
                  Password
                </label>
                <input
                  type="password"
                  id="animated-password"
                  value={passwordvalue}
                  onChange={(e) => setPasswordValue(e.target.value)}
                  onFocus={handleFocusPassword}
                  onBlur={handleBlurPassword}
                  className="border-2 border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 p-2 rounded-md w-full"
                  placeholder=""
                />
              </div>

              <div className="mb-6 mt-5 flex items-center justify-between">
                <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
                  <input
                    className="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                    type="checkbox"
                    id="persist"
                    checked={check}
                    onChange={toggleCheck}
                  />
                  <label
                    className="inline-block pl-[0.15rem] hover:cursor-pointer"
                    htmlFor="exampleCheck3"
                  >
                    Remember me
                  </label>
                </div>

                {/* Forgot password link */}
                <a
                  href="#!"
                  className="text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
                >
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                className="inline-block w-full rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                data-te-ripple-init
                data-te-ripple-color="light"
              >
                Login
              </button>

              <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                <p className="mx-4 mb-0 text-center font-semibold dark:text-neutral-200">
                  OR
                </p>
              </div>
 

             

              <p className="mb-5 mt-5 pt-1    ">
                Don't have an account?
                {/* Replace the anchor tag with Link component from react-router-dom */}
                <Link
                  to="/register" // Update this to your registration page's route
                  className=" ml-4 text-danger transition duration-150 ease-in-out hover:text-danger-600 focus:text-danger-600 active:text-danger-700"
                >
                  Register
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
