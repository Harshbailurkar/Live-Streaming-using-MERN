import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

export const useViewerToken = (hostIdentity) => {
  const [token, setToken] = useState("");
  const [identity, setIdentity] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const createToken = async () => {
      try {
        const response = await axios.post(
          `http://localhost:5000/api/v1/users/createvtoken/${hostIdentity}`,
          {},
          { withCredentials: true }
        );
        const viewerToken = response.data?.token;
        if (viewerToken) {
          setToken(viewerToken);
          const decodeToken = jwtDecode(viewerToken);
          const identity = decodeToken.sub;
          setIdentity(identity);
        } else {
          console.error("Token is undefined");
        }
      } catch (error) {
        console.error("Error fetching token:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    createToken();
  }, [hostIdentity]);

  return {
    token,
    identity,
    loading,
    error,
  };
};
