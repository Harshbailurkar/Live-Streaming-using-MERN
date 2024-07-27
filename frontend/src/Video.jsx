import React from "react";
import { ConnectionState, Track } from "livekit-client";
import {
  useConnectionState,
  useRemoteParticipant,
  useTracks,
} from "@livekit/components-react";
import LiveVideo from "./LiveVideo";
export default function Video({ hostName, hostIdentity }) {
  const connectionState = useConnectionState();
  const participent = useRemoteParticipant(hostIdentity);
  const tracks = useTracks([
    Track.Source.Camera,
    Track.Source.Microphone,
  ]).filter((track) => track.participant.identity === hostIdentity);

  let content;
  if (!participent && connectionState === ConnectionState.Connected) {
    content = <p>host is offline</p>;
  } else if (!participent && tracks.length === 0) {
    content = <p>Loading...</p>;
  } else {
    content = <LiveVideo participant={participent} />;
  }
  return <div className="aspect-video border-b group relative">{content}</div>;
}
