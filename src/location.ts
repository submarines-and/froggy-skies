import { get, set } from './cache';
import { log } from './log';

export async function getCurrentLocation(): Promise<Location.CurrentLocation> {
  const cacheKey = 'location';
  const cached = get<Location.CurrentLocation>(cacheKey);
  if (cached) {
    return cached;
  }

  log('Getting current location');
  Location.setAccuracyToBest();
  const currentLocation = await Location.current();
  set(cacheKey, currentLocation);
  return currentLocation;
}
