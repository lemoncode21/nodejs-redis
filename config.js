import { Redis } from "ioredis";

class RedisConfig {
  constructor() {
    this.redis = new Redis({
      host: "localhost",
      port: 6379,
      password: "yourpassword",
    });
  }

  async consume(channel, callback) {
    await this.redis.subscribe(channel);
    this.redis.on("message", async (ch, message) => {
      if (channel === ch) {
        await callback(message);
      }
    });
  }

  async produce(channel, message) {
    await this.redis.publish(channel, message);
  }
}

export default RedisConfig;
