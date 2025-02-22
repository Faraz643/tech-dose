import express from "express";

import {
  addEvent,
  updateEvent,
  deleteEvent,
  showAllEvents,
  showSingleEvent,
  registerParticipants,
} from "../controllers/eventLogic.js";
const router = express.Router();
import { handleEventsThumbnail } from "../fileUpload.config.js";

router.post("/registerEvent", registerParticipants);
router
  .get("/", showAllEvents)
  .get("/:eventId", showSingleEvent)
  .post("/", handleEventsThumbnail.single("thumbnail"), addEvent)
  .put("/:eventId", handleEventsThumbnail.single("thumbnail"), updateEvent)
  .delete("/:eventId", deleteEvent);

export default router;
