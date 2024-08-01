import axios from "../api/axios";
import useAuth from "./useAuth";

import { jwtDecode } from "jwt-decode";

const useRefreshToken = () => {
  const { setAuth } = useAuth();
  const { auth } = useAuth();

  const refresh = async () => {
    const response = await axios.get("/api/RefreshToken", {
      withCredentials: true,
    });
    setAuth((prev) => {
      console.log(JSON.stringify(prev));
      console.log(response.data.accessToken);

      const decoded = jwtDecode(response.data.accessToken);

      const username = decoded?.username;

      return {
        ...prev,
        roles: response.data.roles,
        accessToken: response.data.accessToken,
        user: username,
      };
    });

    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
