import { WebhookReceiver } from "livekit-server-sdk";
import { Streams } from "../models/stream.model.js"; // Adjust the import path as necessary

const receiver = new WebhookReceiver(
  "LIVEKIT_API_KEY",
  "LIVEKIT_SECRETE_TOKEN"
);

export const handleLivekitWebhook = async (req, res) => {
  try {
    const rawBody = req.body.toString("utf8");

    const event = await receiver.receive(rawBody, req.headers.authorization);

    if (event.event === "ingress_ended") {
      await Streams.findOneAndUpdate(
        { ingressId: event.ingressInfo?.ingressId },
        { isLive: false }
      );
    }

    if (event.event === "ingress_started") {
      await Streams.findOneAndUpdate(
        { ingressId: event.ingressInfo?.ingressId },
        { isLive: true }
      );
    }

    res.status(200).send("Event received");
  } catch (error) {
    console.error("Error processing webhook event:", error);
    res.status(400).send("Error processing webhook event");
  }
};
