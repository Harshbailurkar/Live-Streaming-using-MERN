import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LiveStreams() {
  const [streams, setStreams] = React.useState([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    axios.get("http://localhost:5000/api/v1/users/live").then((response) => {
      console.log(response.data.getAllLiveUsers);
      setStreams(response.data.getAllLiveUsers);
    });
  }, []);

  const handleStreamPlay = (stream) => {
    console.log(stream);
    navigate(`/stream/${stream.userId._id}`, { state: { stream } });
  };

  return (
    <div>
      <h1>Live Streams</h1>
      <ul>
        {streams.map((stream) => (
          <li key={stream.id}>
            <div
              style={{ position: "relative", display: "inline-block" }}
              onClick={() => handleStreamPlay(stream)}
            >
              <img
                src={stream.userId.imageUrl}
                alt=""
                style={{
                  width: "300px",
                  height: "200px",
                  borderRadius: "10px",
                }}
              />
              <p
                style={{
                  position: "absolute",
                  bottom: "10px",
                  right: "10px",
                  backgroundColor: "red",
                  color: "white",
                  width: "30px",
                  padding: "5px",
                  borderRadius: "5px",
                  margin: "0",
                  textAlign: "center",
                }}
              >
                live
              </p>
            </div>

            <h2>{stream.title}</h2>
            <p>{stream.userId.username}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
