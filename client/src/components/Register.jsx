import { useRef, useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "../api/axios";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = "/api/Register";

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [usernamevalue, setUsernameValue] = useState("");
  const [isFocusedUsername, setIsFocusedUsername] = useState(false);
  const [validUsername, setValidUsername] = useState(false);

  const handleFocusUsername = () => setIsFocusedUsername(true);
  const handleBlurUsername = () => {
    if (!usernamevalue) setIsFocusedUsername(false);
  };

  const [passwordvalue, setPasswordValue] = useState("");
  const [isFocusedPassword, setIsFocusedPassword] = useState(false);
  const [validPassword, setValidPassword] = useState(false);

  const handleFocusPassword = () => setIsFocusedPassword(true);
  const handleBlurPassword = () => {
    if (!passwordvalue) setIsFocusedPassword(false);
  };

  const [matchpasswordvalue, setmatchPasswordValue] = useState("");
  const [isFocusedmatchPassword, setIsFocusedmatchPassword] = useState(false);
  const [validmatchPassword, setValidmatchPassword] = useState(false);

  const handleFocusmatchPassword = () => setIsFocusedmatchPassword(true);
  const handleBlurmatchPassword = () => {
    if (!matchpasswordvalue) setIsFocusedmatchPassword(false);
  };

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setValidUsername(USER_REGEX.test(usernamevalue));
  }, [usernamevalue]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(passwordvalue));
    setValidmatchPassword(passwordvalue === matchpasswordvalue);
  }, [passwordvalue, matchpasswordvalue]);

  useEffect(() => {
    setErrMsg("");
  }, [usernamevalue, passwordvalue, matchpasswordvalue]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    const v1 = USER_REGEX.test(usernamevalue);
    const v2 = PWD_REGEX.test(passwordvalue);
    if (!v1 || !v2) {
      setErrMsg("Username and Password required");
      return;
    }
    try {
      let username = usernamevalue;
      let password = passwordvalue;

      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({ username, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      // TODO: remove console.logs before deployment
      console.log(JSON.stringify(response?.data));
      //console.log(JSON.stringify(response))
      setSuccess(true);
      //clear state and controlled inputs
      setUsernameValue("");
      setPasswordValue("");
      setmatchPasswordValue("");
      setIsFocusedPassword(false);
      setIsFocusedUsername(false);
      setIsFocusedmatchPassword(false); 

     console.log("isFocusedPassword",isFocusedPassword);
     
     console.log("!validPassword",!validPassword);


    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Username Taken");
      } else {
        setErrMsg("Registration Failed");
      }
    }
  };

  return (
    <>
      
        <section className="min-h-s">
          <div className="container h-full px-6 py-2">
            <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
              <div className="mb-6 mt-24 md:mb-0 md:w-8/12 lg:w-6/12">
                <img
                  src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                  className="w-full"
                  alt="Phone image"
                />
              </div>

              <div className="md:w-8/12 lg:ml-6  lg:w-5/12">
                <p
                  className={`${
                    errMsg
                      ? "bg-red-500 text-white"
                      : success
                      ? "bg-green-500 text-white"
                      : "offscreen"
                  } p-4 rounded-md`}
                  aria-live="assertive"
                >
                  {errMsg ? errMsg : success ? "Success!" : ""}
                </p>

                <h2 className="text-4xl  text-center my-4">Register</h2>

                <form onSubmit={handleSubmit}>
                  <div className="relative mt-5">
                    <label
                      htmlFor="username"
                      className={`absolute left-3 top-3 transition-all ${
                        isFocusedUsername || usernamevalue
                          ? "text-blue-500 transform -translate-y-6 scale-75 bg-white px-1"
                          : "text-gray-500"
                      }`}
                    >
                      username
                      {(isFocusedUsername || usernamevalue) && (
                        <>
                          <FontAwesomeIcon
                            icon={faCheck}
                            className={
                              validUsername ? "text-green-500 ml-1 " : "hidden"
                            }
                          />
                          <FontAwesomeIcon
                            icon={faTimes}
                            className={
                              validUsername || !usernamevalue
                                ? "hidden"
                                : "text-red-500 ml-1"
                            }
                          />
                        </>
                      )}
                    </label>

                    <input
                      type="text"
                      id="username"
                      value={usernamevalue}
                      onChange={(e) => setUsernameValue(e.target.value)}
                      onFocus={handleFocusUsername}
                      aria-invalid={validUsername ? "false" : "true"}
                      onBlur={handleBlurUsername}
                      aria-describedby="uidnote"
                      className="border-2 border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 p-2 rounded-md w-full"
                      placeholder=""
                    />

                    <p
                      id="uidnote"
                      className={`${
                        isFocusedUsername && usernamevalue && !validUsername
                          ? "text-sm rounded-md bg-black text-white p-1 relative bottom-[-10px]  "
                          : "absolute left-[-9999px]"
                      }`}
                    >
                      <FontAwesomeIcon icon={faInfoCircle} /> 4 to 24
                      characters.
                      <br />
                      Must begin with a letter.
                      <br />
                      Letters, numbers, underscores, hyphens allowed.
                    </p>
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
                      password
                      {(isFocusedPassword || passwordvalue) && (
                        <>
                          <FontAwesomeIcon
                            icon={faCheck}
                            className={
                              validPassword ? "text-green-500 ml-1 " : "hidden"
                            }
                          />
                          <FontAwesomeIcon
                            icon={faTimes}
                            className={
                              validPassword || !passwordvalue
                                ? "hidden"
                                : "text-red-500 ml-1"
                            }
                          />
                        </>
                      )}
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

                    <p
                      id="pwdnote"
                      className={`${
                        isFocusedPassword && !validPassword
                          ? "text-sm rounded-md bg-black text-white p-1 relative bottom-[-10px] "
                          : "absolute left-[-9999px]"
                      }`}
                    >
                      <FontAwesomeIcon icon={faInfoCircle} />
                      <t></t> 8 to 24 characters.
                      <br />
                      Must include uppercase and lowercase letters, a number and
                      a special character.
                      <br />
                      Allowed special characters: !@#$%
                    </p>
                  </div>

                  <div className="relative mt-5">
                    <label
                      htmlFor="confirmation-password"
                      className={`absolute left-3 top-3 transition-all ${
                        isFocusedmatchPassword || matchpasswordvalue
                          ? "text-blue-500 transform -translate-y-6 scale-75 bg-white px-1"
                          : "text-gray-500"
                      }`}
                    >
                      Confirm Password
                      {(isFocusedmatchPassword || matchpasswordvalue) && (
                        <>
                          <FontAwesomeIcon
                            icon={faCheck}
                            className={
                              validmatchPassword && matchpasswordvalue
                                ? "text-green-500 ml-1 "
                                : "hidden"
                            }
                          />
                          <FontAwesomeIcon
                            icon={faTimes}
                            className={
                              validmatchPassword || !matchpasswordvalue
                                ? "hidden"
                                : "text-red-500 ml-1"
                            }
                          />
                        </>
                      )}
                    </label>

                    <input
                      type="password"
                      id="confirmation-password"
                      value={matchpasswordvalue}
                      onChange={(e) => setmatchPasswordValue(e.target.value)}
                      onFocus={handleFocusmatchPassword}
                      onBlur={handleBlurmatchPassword}
                      className="border-2 border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 p-2 rounded-md w-full"
                      placeholder=""
                    />
                  </div>

                  <p
                    id="confirmnote"
                    className={`${
                      isFocusedmatchPassword && !validmatchPassword
                        ? "text-sm rounded-md bg-black text-white p-1 relative bottom-[-10px] flex items-center"
                        : "absolute left-[-9999px]"
                    }`}
                  >
                    <FontAwesomeIcon icon={faInfoCircle} />
                    <t></t> Must match the first password input field.
                  </p>

                  <button
                    type="submit"
                    className="inline-block w-full rounded bg-primary px-7 pb-2.5 mt-5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                    data-te-ripple-init
                    data-te-ripple-color="light"
                  >
                    Register
                  </button>

                  <p className="mb-0 mt-5 pt-1    ">
                    Already registered?
                    {/* Replace the anchor tag with Link component from react-router-dom */}
                    <Link
                      to="/login" // Update this to your registration page's route
                      className=" ml-4 text-danger transition duration-150 ease-in-out hover:text-danger-600 focus:text-danger-600 active:text-danger-700"
                    >
                      Sign Up
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
     
    </>
  );
};

export default Register;
