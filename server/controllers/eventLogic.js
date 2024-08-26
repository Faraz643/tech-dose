import { connection } from "../db.config.js";

export const addEvent = async (req, res) => {
  const { name, description, startTime, endTime, location, maxParticipants } =
    req.body;
  const event_id = 5566278;
  let columns = "name, description, start_time, end_time, location, event_id";
  let values = "?, ?, ?, ?, ?, ?";
  const params = [name, description, startTime, endTime, location, event_id];

  if (maxParticipants) {
    columns += ", max_participants";
    values += ", ?";
    params.push(maxParticipants);
  }

  const addEventQuery = `INSERT INTO events (${columns}) VALUES (${values})`;
  try {
    await connection.query(addEventQuery, params);
    res.status(201).json({ message: "New Event Added" });
  } catch (e) {
    res.status(500).json({
      message: "Internal Server Error, Please again try after some time",
      e,
    });
  }
};

export const updateEvent = async (req, res) => {
  const eventToBeUpdated = req.params.eventId;
  const { name, description, startTime, endTime, location, maxParticipants } =
    req.body;
  const findEventQuery = `UPDATE events SET name=?, description=?, start_time=?, end_time=?, location=?, max_participants=? WHERE event_id=?`;
  try {
    await connection.query(findEventQuery, [
      name,
      description,
      startTime,
      endTime,
      location,
      maxParticipants,
      eventToBeUpdated,
    ]);
    res.status(201).json({ message: "Event Updated" });
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .json({ message: "Internal Server Error, Please try after some time" });
  }
};

export const showAllEvents = async (req, res) => {
  const showAllEventsQuery = `SELECT * FROM events`;
  try {
    const result = await connection.query(showAllEventsQuery);
    res.send(result[0]);
  } catch (e) {
    res.status(500).json({
      message:
        "Can not fetch events from server, please try again after some time",
    });
  }
};
export const showSingleEvent = async (req, res) => {
  const eventId = req.params.eventId;
  const showSingleEventQuery = `SELECT * FROM events WHERE event_id=?`;
  try {
    const result = await connection.query(showSingleEventQuery, [eventId]);
    if (result[0].length === 0)
      res.status(404).json({ message: "No event found with such id" });
    res.send(result[0]);
  } catch (e) {
    res.status(500).json({
      message:
        "Can not fetch event at this moment, please try again after some time",
    });
  }
};
export const deleteEvent = async (req, res) => {
  const eventId = req.params.eventId;
  const deleteEventQuery = `DELETE FROM events WHERE event_id=?`;
  try {
    await connection.query(deleteEventQuery, [eventId]);
    res.sendStatus(204).end();
  } catch (e) {
    res
      .status(500)
      .json({ message: "An error occured while deleting the event" });
  }
};
