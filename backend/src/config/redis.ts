import Redis from "ioredis";

const redis = new Redis({
  host: process.env.REDIS_HOST || "localhost",
  port: parseInt(process.env.REDIS_PORT || "6379"),
  password: process.env.REDIS_PASSWORD || undefined,
  maxRetriesPerRequest: 3,
  enableReadyCheck: true,
});

redis.on("connect", () => {
  console.log("✅ Redis Connected");
});

redis.on("error", (err) => {
  console.error("Redis error:", err);
});

export const cacheGet = async (key: string): Promise<string | null> => {
  try {
    return await redis.get(key);
  } catch {
    return null;
  }
};

export const cacheSet = async (key: string, value: string, ttl: number = 3600): Promise<void> => {
  try {
    await redis.setex(key, ttl, value);
  } catch {
    // Silently fail cache writes
  }
};

export const cacheDelete = async (key: string): Promise<void> => {
  try {
    await redis.del(key);
  } catch {
    // Silently fail
  }
};

export const cacheFlush = async (): Promise<void> => {
  try {
    await redis.flushdb();
  } catch {
    // Silently fail
  }
};

export default redis;
