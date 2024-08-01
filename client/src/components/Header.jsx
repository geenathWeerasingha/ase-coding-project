import useLogout from "../hooks/useLogout";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

import { NavLink } from "react-router-dom";

const SiteHeader = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const logout = useLogout();

  const signOut = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <header className="bg-gray-800 text-white">
      <div className="max-w-6xl mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center">
          {/* Logo or Site Name */}
          <h1 className="text-xl font-bold mr-80">
            <NavLink to="/">Haulmatic App</NavLink>
          </h1>
          {/* Navigation Links */}

          {auth.user != null && (
            <nav>
              <ul className="flex space-x-4">
                <li>
                  <NavLink className="hover:text-blue-400" to="/">
                    {" "}
                    Home
                  </NavLink>
                </li>

                <li>
                   <NavLink className="hover:text-blue-400" to="/user">Users</NavLink>
                </li>
              


              </ul>
            </nav>
          )}
        </div>

        <div>
          {auth.user == null ? (
            <>
              {/* Login Button */}
              <a
                className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded mr-2"
                href="/login"
              >
                Login
              </a>

              {/* Registration Button */}
              <a
                className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded"
                href="/register"
              >
                Register
              </a>
            </>
          ) : (
            <>
              <a
                className="bg-blue-500 hover:bg-yellow-700 text-white py-2 px-4 rounded mr-2 "
                href="/profile"
              >
                {auth.user}
              </a>

              <a
                className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded cursor-pointer"
                onClick={signOut}
              >
                Logout
              </a>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default SiteHeader;
