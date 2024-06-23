import jwt from "jsonwebtoken";
import redis from "redis";
import dotenv from "dotenv";
dotenv.config();

const SECRET_KEY_VERIFICATION_USE = process.env.VERIFICATION_SECRET_KEY;

// Redis client configuration
const redisOptions = {
  host: process.env.REDISHOST,
  port: process.env.REDISPORT,
};

if (process.env.REDISPASSWORD) {
  redisOptions.password = process.env.REDISPASSWORD;
}

const client = redis.createClient(redisOptions);
client.on("error", (err) => {
  console.log("In-Memory storage", err);
});
client.connect();
async function invalidateToken(token) {
  await client.set(token, "invalid");
}

export async function verifyUsedToken(req, res, next) {
  const { token } = req.params;
  const urlPath = req.originalUrl;
  const method = req.method;
  const result = await client.get(token);
  try {
    const decoded = jwt.verify(token, SECRET_KEY_VERIFICATION_USE);
    if (result === null) {
      if (urlPath.includes("/api/auth/reset-password/") && method === "GET") {
        return res.status(200);
      } else {
        next();
      }
    } else {
      return res.status(401).json({
        message: "The link has been expired, please request a new link !",
      });
    }
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token expired" });
    } else {
      return res.status(500).json({ error: "Failed to authenticate token" });
    }
  }
}

async function isTokenBlacklisted(token) {
  const result = await client.get(token);
  return result !== null;
}

async function verifyToken(token) {
  if (await isTokenBlacklisted(token)) {
    console.error("Token is Blacklisted");
    return;
  }
}
export default invalidateToken;
