import { createClient, RedisClientType } from 'redis';

let client: RedisClientType | null = null;

async function getRedisClient(): Promise<RedisClientType> {
  if (!client) {
    client = createClient({
      socket: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT || '6379'),
      },
      password: process.env.REDIS_PASSWORD,
    });

    client.on('error', (err) => {
      console.error('Redis Client Error', err);
    });

    client.on('connect', () => {
      console.log('Redis Client Connected');
    });

    await client.connect();
  }

  return client;
}

export default getRedisClient;