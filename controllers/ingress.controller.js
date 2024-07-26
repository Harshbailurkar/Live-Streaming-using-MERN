import {
  IngressClient,
  IngressAudioEncodingPreset,
  IngressVideoEncodingPreset,
  IngressInput,
  RoomServiceClient,
  TrackSource,
} from "livekit-server-sdk";

import { User } from "../models/user.model.js";
import { Streams } from "../models/stream.model.js";

const roomService = new RoomServiceClient(
  "https://streamtest-ybp0gjju.livekit.cloud",
  "APIv2cUrGJZ47gs",
  "cSzKKUrsqtTReMnpQXl8fDisLCNBF0CoeWJ1uWL3R0bA"
);
const ingressClient = new IngressClient(
  "https://streamtest-ybp0gjju.livekit.cloud",
  "APIv2cUrGJZ47gs",
  "cSzKKUrsqtTReMnpQXl8fDisLCNBF0CoeWJ1uWL3R0bA"
);

export const resetIngresses = async (hostIdentity) => {
  const ingresses = await ingressClient.listIngress({
    roomName: hostIdentity,
  });

  const rooms = await roomService.listRooms([hostIdentity]);
  for (const room of rooms) {
    await roomService.deleteRoom(room.name);
  }
  for (const ingress of ingresses) {
    if (ingress.ingressId) {
      await ingressClient.deleteIngress(ingress.ingressId);
    }
  }
};

export const createIngress = async (req, res) => {
  try {
    const userId = req.cookies.userId;
    if (!userId) {
      return res.status(400).json({ message: "User not authenticated" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await resetIngresses(user._id.toString());

    const ingressOptions = {
      name: user.username,
      roomName: user._id.toString(),
      participantIdentity: user._id.toString(),
      participantName: user.username,
      video: {
        source: TrackSource.CAMERA,
        preset: IngressVideoEncodingPreset.H264_1080P_30FPS_3_LAYERS,
      },
      audio: {
        source: TrackSource.MICROPHONE,
        preset: IngressAudioEncodingPreset.OPUS_MONO_64KBS,
      },
    };

    const { ingressId, streamKey, url } = await ingressClient.createIngress(
      IngressInput.RTMP_INPUT,
      ingressOptions
    );

    const stream = await Streams.findOneAndUpdate(
      { userId: userId },
      {
        title: `${user.username}'s Live Concert`,
        description: `Live Concert by ${user.username}`,
        ingressId: ingressId,
        serverUrl: url,
        streamKey: streamKey,
        isLive: true,
      },
      { new: true, upsert: true } // Create the document if it doesn't exist
    );

    return res.status(201).json({ ingressId, streamKey, url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating ingress", error });
  }
};
