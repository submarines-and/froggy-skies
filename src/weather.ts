import { get, set } from './cache';
import { API_KEY } from './constants';
import { getCurrentLocation } from './location';
import { log } from './log';
import { TEST_DATA, WeatherData } from './models';

export async function getWeatherData(): Promise<WeatherData> {
  const cacheKey = 'weather';

  if (!API_KEY) {
    log('API key missing, will return test data');
    return TEST_DATA;
  }

  // get weather based on current location
  const currentLocation = await getCurrentLocation();
  const url = `http://api.openweathermap.org/data/2.5/weather?lat=${currentLocation.latitude}&lon=${currentLocation.longitude}&appid=${API_KEY}&units=metric`;

  log('Getting weather', url);
  const request = new Request(url);

  return request.loadJSON().then(data => {

    if (data.cod === 401) {
      log(data);
      throw new Error('Error in response');
    }

    set(cacheKey, data);
    return data;
  }).catch(ex => {
    log('Error when getting weather', ex);

    // try cached data
    const cached = get<WeatherData>(cacheKey);
    if (cached) {
      return cached;
    }

    return TEST_DATA;
  });
}

