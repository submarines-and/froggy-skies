import { get, set } from './cache';
import { API_KEY } from './constants';
import { getCurrentLocation } from './location';
import { log } from './log';

interface WeatherData {
  id: string;
  name: string;
  main: {
    temp: number;
    feels_like: number;
  };
  weather: {
    main: string;
    icon: string;
  }[];

  // error
  cod?: number;
}

/** Test data in case things go wrong */
const testData = {
  name: 'Krabbelurien',
  main: {
    temp: 10,
    feels_like: 15,
  },
  weather: [
    {
      main: 'Sunny',
      icon: '01d',
    },
  ],
} as WeatherData;

export async function getWeatherData(): Promise<WeatherData> {
  const cacheKey = 'weather';

  if (!API_KEY) {
    log('API key missing, will return test data');
    return testData;
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

    return testData;
  });
}

