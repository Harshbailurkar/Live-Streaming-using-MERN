import React, { useEffect, useState } from "react";
import axios from "axios";

const CurrentUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/users/getu",
          {
            withCredentials: true,
          }
        );
        setUser(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Current User</h1>
      {user ? (
        <div>
          <p>ID: {user._id}</p>
          <p>Name: {user.username}</p>
        </div>
      ) : (
        <p>No user information available.</p>
      )}
    </div>
  );
};

export default CurrentUser;
