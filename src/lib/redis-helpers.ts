import { RedisClientType } from 'redis';

export async function getCached<T>(
  redis: RedisClientType,
  key: string
): Promise<T | null> {
  const cached = await redis.get(key);
  
  if (!cached || typeof cached !== 'string') {
    return null;
  }
  
  try {
    return JSON.parse(cached) as T;
  } catch (error) {
    console.error('Error parsing cached data:', error);
    return null;
  }
}

export async function setCached<T>(
  redis: RedisClientType,
  key: string,
  value: T,
  ttl?: number
): Promise<void> {
  const stringValue = JSON.stringify(value);
  
  if (ttl) {
    await redis.setEx(key, ttl, stringValue);
  } else {
    await redis.set(key, stringValue);
  }
}