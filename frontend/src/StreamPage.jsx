import React from "react";
import { useLocation } from "react-router-dom";
import StreamPlayer from "./StreamPlayer";
export default function StreamPage() {
  const location = useLocation();
  const { stream } = location.state;

  return (
    <div>
      <StreamPlayer stream={stream} />
    </div>
  );
}
