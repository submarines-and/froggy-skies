import { get, set } from './cache';

export async function getCurrentLocation(): Promise<Location.CurrentLocation> {
  const cacheKey = 'location';
  const cached = await get<Location.CurrentLocation>(cacheKey);
  if (cached) {
    return cached;
  }

  log('Getting current location...');
  Location.setAccuracyToBest();
  const currentLocation = await Location.current();
  set(cacheKey, currentLocation);
  return currentLocation;
}
