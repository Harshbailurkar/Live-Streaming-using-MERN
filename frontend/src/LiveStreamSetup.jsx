import React, { useState } from "react";
import axios from "axios";

const createIngress = async () => {
  console.log("Attempting to create ingress..."); // Debugging line
  const response = await axios.post(
    "http://localhost:5000/api/v1/streams/Ingress",
    {},
    { withCredentials: true }
  );
  const { ingressId, streamKey, url } = response.data;
  console.log("Ingress created:", { ingressId, streamKey, url }); // Debugging line
  return { ingressId, streamKey, url };
};
const LiveStreamSetup = () => {
  const [ingressDetails, setIngressDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCreateIngress = async () => {
    setLoading(true);
    setError(null);
    try {
      const details = await createIngress();
      setIngressDetails(details);
    } catch (error) {
      setError("Failed to create ingress.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Setup Live Stream</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {ingressDetails ? (
        <div>
          <p>Ingress ID: {ingressDetails.ingressId}</p>
          <p>Stream Key: {ingressDetails.streamKey}</p>
          <p>Server URL: {ingressDetails.url}</p>
        </div>
      ) : (
        <button onClick={handleCreateIngress}>Create Ingress</button>
      )}
    </div>
  );
};

export default LiveStreamSetup;
