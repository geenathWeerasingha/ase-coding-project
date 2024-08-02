import React, { useState, useEffect } from "react";

import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";

const User = () => {
  const [users, setUsers] = useState([]);
  const [modalTitle, setModalTitle] = useState("");
  const [userId, setUserId] = useState(0);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [updatesuccessMessage, setUpdateSuccessMessage] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [userNameError, setUserNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);

  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  const refreshList = () => {
    let isMounted = true;
    const controller = new AbortController(); // For request cancellation

    const fetchUsers = async () => {
      try {
        const response = await axiosPrivate.get("/api/User", {
          signal: controller.signal, // Passing the AbortController signal for cancellation
        });

        // Assuming the data structure is directly usable
        console.log(response?.data);
        if (isMounted) {
          setUsers(response?.data);
        }
      } catch (err) {
        if (err.name !== "CanceledError") {
          console.error(err);
          navigate("/login", { state: { from: location }, replace: true });
        }
      }
    };

    fetchUsers();

    return () => {
      isMounted = false; // Component is unmounting, prevent state updates
      controller.abort(); // Cancel the fetch operation if component unmounts
    };
  };

  useEffect(() => {
    refreshList();
  }, []);

  const changeUserName = (e) => {
    setUserName(e.target.value);
    if (e !== null) {
      setUserNameError("");
    }
  };

  const changePassword = (e) => {
    setPassword(e.target.value);
    if (e !== null) {
      setPasswordError("");
    }
  };

  const changeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
    if (e !== null) {
      setConfirmPasswordError("");
    }
  };

  const changeFirstName = (e) => {
    setFirstName(e.target.value);
    if (e !== null) {
      setFirstNameError("");
    }
  };

  const changeLastName = (e) => {
    setLastName(e.target.value);
    if (e !== null) {
      setLastNameError("");
    }
  };

  const addClick = () => {
    setModalTitle("Add User");
    setUserId(0);
    setUserName("");
    setPassword("");
    setConfirmPassword("");
    setFirstName("");
    setLastName("");
    setIsAddUserModalOpen(true);
    setUserNameError("");
    setPasswordError("");
    setConfirmPasswordError("");
    setFirstNameError("");
    setLastNameError("");
  };

  const editClick = (emp) => {
    setModalTitle("Edit User");
    setUserName(emp.username);
    setUserId(emp.id);
    setFirstName(emp.firstname);
    setLastName(emp.lastname);

    setUserNameError("");

    setFirstNameError("");
    setLastNameError("");
    setIsAddUserModalOpen(true);
  };

  const createClick = async () => {
    if (
      !userName.trim() ||
      !firstName.trim() ||
      !lastName.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      if (!userName.trim()) {
        setUserNameError("User Name cannot be empty");
      }

      if (!password.trim()) {
        setPasswordError("Password cannot be empty");
      }

      if (!confirmPassword.trim()) {
        setConfirmPasswordError("Confirm Password cannot be empty");
      }

      if (!firstName.trim()) {
        setFirstNameError("First Name cannot be empty");
      }

      if (!lastName.trim()) {
        setLastNameError("Last Name cannot be empty");
      }

      return;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      return;
    }

    const controller = new AbortController();

    try {
      const response = await axiosPrivate.post("/api/User", {
        userName: userName,
        firstName: firstName,
        lastName: lastName,
        password: password,
        signal: controller.signal,
      });
      console.log(JSON.stringify(response?.data));

      alert(JSON.stringify(response?.data));

      setSuccessMessage("User created successfully");

      refreshList();
      resetForm();
    } catch (error) {
      if (error.response?.status === 409) {
        alert("Username already taken");
      } else {
        console.error(error);
        alert(error);
      }
    } finally {
      controller.abort();
    }
  };

  const updateClick = async () => {
    if (!userName.trim()) {
      if (!userName.trim()) {
        setUserNameError("User Name cannot be empty");
      }

      return;
    }

    const controller = new AbortController();

    try {
      const response = await axiosPrivate.put("/api/User", {
        userName: userName,
        firstName: firstName,
        lastName: lastName,
        id: userId,
        signal: controller.signal,
      });

      alert("Successfully updated"); // Assuming the API response includes the data you want to alert
      setUpdateSuccessMessage("User updated successfully");
      refreshList();
      resetForm();
    } catch (error) {
      console.error(error);
      alert("Update failed"); // Consider providing more detailed feedback based on the error
    } finally {
      controller.abort();
    }
  };

  const deleteClick = async (id) => {
    if (window.confirm("Are you sure?")) {
      const controller = new AbortController();

      try {
        console.log("BIHI", users);
        const response = await axiosPrivate.delete(`/api/User/${id}`, {
          signal: controller.signal,
        });

        alert("Successfully Deleted!");
        refreshList();
      } catch (error) {
        if (error.name !== "AbortError") {
          // Ignore abort errors
          console.error(error.message);
          alert("Failed");
        }
      } finally {
        controller.abort();
      }
    }
  };

  const resetForm = () => {
    setUserName("");

    setIsAddUserModalOpen(false);
  };

  return (
    <div className="min-h-screen">
      <button
        type="button"
        className="bg-blue-500 hover:bg-blue-700 text-white  py-2 px-4 rounded m-2 mt-5 mr-5 float-right"
        onClick={addClick}
        data-testid="add-user-button"
      >
        Add User
      </button>
      <br />
      <br />
      <br />
      <table className="mx-auto w-[1100px] divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th>UserName</th>
            <th>FirstName</th>
            <th>LastName</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users && users.length > 0 ? (
            users.map((emp) => (
              <tr key={emp.userId}>
                <td className="text-center pt-2 pb-2">{emp.username}</td>
                <td className="text-center pt-2 pb-2">{emp.firstname}</td>
                <td className="text-center pt-2 pb-2">{emp.lastname}</td>
                <td className="text-center pt-2 pb-2">
                  <button
                    type="button"
                    aria-label="Edit"
                    className="p-2 text-gray-600 hover:text-gray-800 focus:outline-none"
                    onClick={() => editClick(emp)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-pencil-square"
                      viewBox="0 0 16 16"
                    >
                      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                      <path
                        fillRule="evenodd"
                        d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                      />
                    </svg>
                    
                  </button>

                  <button
                    type="button"
                    className="p-2 text-gray-600 hover:text-gray-800 focus:outline-none ml-2"
                    onClick={() => deleteClick(emp.id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-trash-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">No users available</td>
            </tr>
          )}
        </tbody>
      </table>

      {isAddUserModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm"></div>
      )}
      <div
        className={`modal fixed w-full h-full top-0 left-0 flex items-center justify-center ${
          isAddUserModalOpen ? "" : "hidden"
        }`}
        id="exampleModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered relative w-auto pointer-events-none">
          <div className="modal-content border-none shadow-lg w-[800px]  relative flex flex-col   pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
            <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
              <h5 className="text-xl font-medium leading-normal text-gray-800">
                {modalTitle}
              </h5>

              <button
                type="button"
                className="btn-close text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={() => {
                  setUserNameError("");
                  resetForm();
                }}
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>

            <div className="modal-body p-4">
              <div className="flex flex-row mb-0">
                <div className="p-2 w-[550px] bd-highlight">
                  <div className="mb-2 flex">
                    {/* <span className="input-group-text inline-flex items-center px-3 py-1.5 border border-gray-300 text-gray-500 text-sm rounded-l-md bg-gray-50">
                      User Name
                    </span> */}

                    <label
                      htmlFor="userName"
                      className="input-group-text inline-flex items-center px-3 py-1.5 border border-gray-300 text-gray-500 text-sm rounded-l-md bg-gray-50"
                    >
                      User Name
                    </label>

                    <input
                      id="userName"
                      type="text"
                      className={`form-control flex-1 min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid ${
                        userNameError ? "border-red-500" : "border-gray-300"
                      } rounded-none rounded-r-md transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`}
                      value={userName}
                      onChange={changeUserName}
                    />
                  </div>

                  {userNameError && (
                    <div className="text-red-500 text-xs  text-start mb-2">
                      {userNameError}
                    </div>
                  )}

                  <div className="mb-2 flex">
                    <label
                      htmlFor="firstName"
                      className="input-group-text inline-flex items-center px-3 py-1.5 border border-gray-300 text-gray-500 text-sm rounded-l-md bg-gray-50"
                    >
                      First Name
                    </label>

                    <input
                      id="firstName"
                      type="text"
                      className={`form-control flex-1 min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid ${
                        firstNameError ? "border-red-500" : "border-gray-300"
                      } rounded-none rounded-r-md transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`}
                      value={firstName}
                      onChange={changeFirstName}
                    />
                  </div>

                  {firstNameError && (
                    <div className="text-red-500 text-xs  text-start mb-2">
                      {firstNameError}
                    </div>
                  )}

                  <div className="mb-2 flex">
                    <label
                      htmlFor="lastName"
                      className="input-group-text inline-flex items-center px-3 py-1.5 border border-gray-300 text-gray-500 text-sm rounded-l-md bg-gray-50"
                    >
                      Last Name
                    </label>

                    <input
                      id="lastName"
                      type="text"
                      className={`form-control flex-1 min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid ${
                        lastNameError ? "border-red-500" : "border-gray-300"
                      } rounded-none rounded-r-md transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`}
                      value={lastName}
                      onChange={changeLastName}
                    />
                  </div>

                  {lastNameError && (
                    <div className="text-red-500 text-xs  text-start mb-2">
                      {lastNameError}
                    </div>
                  )}

                  {userId === 0 && (
                    <div>
                      <div className="mb-2 flex">
                        <label
                          htmlFor="Password"
                          className="input-group-text inline-flex items-center px-3 py-1.5 border border-gray-300 text-gray-500 text-sm rounded-l-md bg-gray-50"
                        >
                          Password
                        </label>
                        <input
                          id="Password"
                          type="password"
                          className={`form-control flex-1 min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid ${
                            passwordError ? "border-red-500" : "border-gray-300"
                          } rounded-none rounded-r-md transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`}
                          value={password}
                          onChange={changePassword}
                        />
                      </div>
                      {passwordError && (
                        <div className="text-red-500 text-xs text-start mb-2">
                          {passwordError}
                        </div>
                      )}
                      <div className="mb-2 flex">
                        <label
                          htmlFor="confirmPassword"
                          className="input-group-text inline-flex items-center px-3 py-1.5 border border-gray-300 text-gray-500 text-sm rounded-l-md bg-gray-50"
                        >
                          Confirm Password
                        </label>
                        <input
                          id="confirmPassword"
                          type="password"
                          className={`form-control flex-1 min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid ${
                            confirmPasswordError
                              ? "border-red-500"
                              : "border-gray-300"
                          } rounded-none rounded-r-md transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`}
                          value={confirmPassword}
                          onChange={changeConfirmPassword}
                        />
                      </div>
                      {confirmPasswordError && (
                        <div className="text-red-500 text-xs text-start mb-2">
                          {confirmPasswordError}
                        </div>
                      )}

                      {successMessage && (
                        <div className="text-green-500 text-xs text-start mb-2">
                          {successMessage}
                        </div>
                      )}

                      {updatesuccessMessage && (
                        <div className="text-green-500 text-xs text-start mb-2">
                          {updatesuccessMessage}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {userId === 0 ? (
                <button
                  type="button"
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  onClick={createClick}
                >
                  Create
                </button>
              ) : null}

              {userId !== 0 ? (
                <button
                  type="button"
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                  onClick={updateClick}
                >
                  Update
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
