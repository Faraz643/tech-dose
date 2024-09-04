import { connection } from "../db.config.js";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "firebase/storage";
import { fireBaseStorage } from "../firebase.js";
export const addEvent = async (req, res) => {
  const { name, description, startTime, endTime, location, maxParticipants } =
    req.body;
  const eventThumbnail = req.file;
  if (!eventThumbnail) {
    return res.status(422).json({ message: "Please add a thumbnail" });
  }

  const event_id = Date.now().toString().substring(5);
  let columns = "name, description, start_time, end_time, location, event_id";
  let values = "?, ?, ?, ?, ?, ?";
  const params = [name, description, startTime, endTime, location, event_id];

  if (maxParticipants) {
    columns += ", max_participants";
    values += ", ?";
    params.push(maxParticipants);
  }
  const metaData = {
    contentType: "image/png",
  };

  try {
    const storageRef = ref(fireBaseStorage, `events/${Date.now()}`);

    // Upload file to Firebase Storage
    await uploadBytes(storageRef, eventThumbnail.buffer, metaData);
    const thumbnailDownloadURL = await getDownloadURL(storageRef);
    columns += ", thumbnail";
    values += ", ?";
    params.push(thumbnailDownloadURL);

    const addEventQuery = `INSERT INTO events (${columns}) VALUES (${values})`;
    await connection.query(addEventQuery, params);
    res.status(201).json({ message: "New Event Added" });
  } catch (e) {
    console.error("Error processing request:", e);

    const errorMap = {
      "storage/unauthorized": {
        status: 403,
        message: "Unauthorized access to Firebase Storage",
      },
      "storage/quota-exceeded": {
        status: 403,
        message: "Firebase Storage quota exceeded",
      },
      "storage/invalid-argument": {
        status: 400,
        message: "Invalid argument provided to Firebase Storage",
      },
      "storage/retry-limit-exceeded": {
        status: 503,
        message: "Retry limit exceeded while accessing Firebase Storage",
      },
    };

    const { status = 500, message = "Internal Server Error" } =
      errorMap[e.code] || {};
    res.status(status).json({ message });
  }
};

export const updateEvent = async (req, res) => {
  const metaData = {
    contentType: "image/png",
  };
  const eventToBeUpdated = req.params.eventId;
  const {
    name,
    description,
    startTime,
    endTime,
    location,
    maxParticipants,
    existingThumbnailFileName,
  } = req.body;

  console.log(existingThumbnailFileName);

  const eventThumbnail = req.file || null;

  // Extract the old file name from the URL
  const decodedFileName = decodeURIComponent(
    existingThumbnailFileName.split("%2F").pop().split("?")[0]
  );

  // Initial columns and query
  let tableColumns = [
    name,
    description,
    startTime,
    endTime,
    location,
    maxParticipants,
  ];
  let findEventQuery = `UPDATE events SET name=?, description=?, start_time=?, end_time=?, location=?, max_participants=?`;

  // Check if a new thumbnail is provided
  if (eventThumbnail) {
    findEventQuery += ", thumbnail=?";
  }

  // Append the condition for updating the specific event
  findEventQuery += " WHERE event_id=?";

  console.log(findEventQuery);

  try {
    if (eventThumbnail) {
      // Reference to the old thumbnail in Firebase Storage
      const storageRef = ref(fireBaseStorage, `events/${decodedFileName}`);

      // Upload the new thumbnail
      await uploadBytes(storageRef, eventThumbnail.buffer, {
        contentType: eventThumbnail.mimetype,
      });

      // Get the new thumbnail's download URL
      const thumbnailDownloadURL = await getDownloadURL(storageRef);

      // Add the new thumbnail URL to the table columns
      tableColumns.push(thumbnailDownloadURL);
      tableColumns.push(eventToBeUpdated);
    }

    // Execute the update query
    await connection.query(findEventQuery, tableColumns);
    res.status(201).json({ message: "Event Updated" });
  } catch (e) {
    console.error("Error updating event:", e);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: e.message });
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
  const thumbnailPath = req.body.thumbnailPath;
  const thumbnailName = decodeURIComponent(
    thumbnailPath.split("/o/")[1].split("?")[0]
  );

  const fileRef = ref(fireBaseStorage, thumbnailName);
  const deleteEventQuery = `DELETE FROM events WHERE event_id=?`;
  try {
    await connection.query(deleteEventQuery, [eventId]);
    try {
      await deleteObject(fileRef);
      return res.status(204).end(); // Success response, no more actions needed
    } catch (error) {
      console.log("Error deleting event thumbnail", error);
      return res
        .status(500)
        .json({ message: "Event deleted but file deletion failed" });
    }
  } catch (e) {
    return res
      .status(500)
      .json({ message: "An error occurred while deleting the event" });
  }
};

export const registerParticipants = async (req, res) => {
  const { fireBaseId, eventId } = req.body;
  try {
    const findParticipantQuery = `SELECT * FROM users WHERE firebase_uid = ?`;
    const [participant] = await connection.query(findParticipantQuery, [
      fireBaseId,
    ]);

    if (participant.length === 0 || participant[0].enroll_id === undefined) {
      return res.status(400).json({ message: "User does not exist" });
    }
    const userEnrollId = participant[0].enroll_id;

    //case 1: returns true if event does not exists
    //case 2: returns true if event_id and user_id does exists
    const checkParticipantInfoQuery = `
      SELECT
        CASE
          WHEN NOT EXISTS (SELECT 1 FROM events WHERE event_id = ?) THEN 'Event does not exist'
          WHEN EXISTS (SELECT 1 FROM participants WHERE user_id = ? AND event_id = ?) THEN 'User already registered'
          ELSE 'OK'
        END AS result
    `;
    const [userInfoFound] = await connection.query(checkParticipantInfoQuery, [
      eventId,
      userEnrollId,
      eventId,
    ]);
    const queryInfoStatus = userInfoFound[0].result;

   
    if (
      queryInfoStatus === "Event does not exist" ||
      queryInfoStatus === "User already registered"
    ) {
      return res.status(400).json({ message: queryInfoStatus });
    } else {
      const registerParticipantQuery = `
            INSERT INTO participants (user_id, event_id) VALUES (?, ?)
          `;
      await connection.query(registerParticipantQuery, [userEnrollId, eventId]);
      return res
        .status(201)
        .json({ message: "Participant registered successfully" });
    }
  } catch (error) {
    console.log("Error registering participant", error);
    return res.status(500).json({ message: "Error registering participant" });
  }
};
