import { User } from "../models/user.model.js";
import { Streams } from "../models/stream.model.js";
import { AccessToken } from "livekit-server-sdk";

export const createUser = async (req, res) => {
  try {
    const { username, imageUrl } = req.body;
    const user = await User.create({
      username,
      imageUrl,
    });
    const tokenOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      path: "/",
    };

    res
      .status(201)
      .cookie("userId", user._id.toString(), tokenOptions)
      .json(user);
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { username } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const tokenOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      path: "/",
    };
    res
      .status(200)
      .cookie("userId", user._id.toString(), tokenOptions)
      .json(user);
  } catch (error) {
    res.status(500).json({ message: "Error logging in user", error });
  }
};

export const getUser = async (req, res) => {
  try {
    const userId = req.cookies?.userId;
    if (!userId) {
      return res.status(400).json({ message: "No user ID found in cookies" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving user", err });
  }
};

export const getUserById = async (id) => {
  try {
    const user = await User.findById(id);
    return user;
  } catch (err) {
    console.error(err);
  }
};

export const getLiveStreams = async (req, res) => {
  try {
    const getAllLiveUsers = await Streams.find({ isLive: true })
      .select("-serverUrl -streamKey -ingressId")
      .populate("userId", "username imageUrl");

    return res.status(200).json({
      message: "All live users fetched successfully",
      getAllLiveUsers,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "An error occurred while fetching live users", error });
  }
};
export const createViewerToken = async (req, res) => {
  try {
    const { hostId } = req.params;
    const userId = req.cookies?.userId;
    if (userId) {
      const host = await getUserById(hostId);
      if (!host) {
        throw new Error("host not found");
      }

      const isHost = hostId === userId;
      const viewerToken = new AccessToken(
        process.env.LIVEKIT_API_KEY,
        process.env.LIVEKIT_API_SECRET,
        {
          identity: isHost ? `host-${hostId}` : userId,
        }
      );

      viewerToken.addGrant({
        room: hostId,
        roomJoin: true,
        canPublish: false,
        canPublishData: true,
      });
      const codedToken = await viewerToken.toJwt();
      return res.status(200).json({ token: codedToken });
    } else {
      throw new Error("login required");
    }
  } catch (err) {
    console.error(err);
  }
};
