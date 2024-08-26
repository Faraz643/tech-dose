import express from "express";

import {
  addEvent,
  updateEvent,
  deleteEvent,
  showAllEvents,
  showSingleEvent,
} from "../controllers/eventLogic.js";
const router = express.Router();

router
  .get("/", showAllEvents)
  .get("/:eventId", showSingleEvent)
  .post("/", addEvent)
  .put("/:eventId", updateEvent)
  .delete("/:eventId", deleteEvent);
export default router;
