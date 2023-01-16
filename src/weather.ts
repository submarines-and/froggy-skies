import { get, set } from './cache';
import { API_KEY } from './constants';
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

interface Location {
  id: string;
  name: string;
}

const testAndErrorData = {
  name: 'Malmö',
  main: {
    temp: 10,
    feels_like: 10,
  },
  weather: [
    {
      main: 'Cloudy',
      icon: '01d',
    },
  ],
} as WeatherData;

export async function getWeatherData(): Promise<WeatherData> {
  const cacheKey = 'weather';

  if (!API_KEY) {
    log('API key missing, will return test data');
    return testAndErrorData;
  }

  let url = '';

  // check cache
  const cached = await get<Location>(cacheKey);
  if (cached?.id) {
    url = `http://api.openweathermap.org/data/2.5/weather?id=${cached.id}&APPID=${API_KEY}&units=metric`;
  }
  else {
    // fall back to current location - will be used first time
    const currentLocation = await Location.current();
    url = `http://api.openweathermap.org/data/2.5/weather?lat=${currentLocation.latitude}&lon=${currentLocation.longitude}&appid=${API_KEY}&units=metric`;
  }

  log('Getting weather', url);
  const request = new Request(url);

  return request.loadJSON().then(data => {

    if (data.cod === 401) {
      log('Error in response', data);
      return testAndErrorData;
    }

    set(cacheKey, data);
    return data;
  }).catch(ex => {
    log('Error when getting weather', ex);

    // fall back to cached
    if (cached) {
      return cached;
    }

    // error object
    return testAndErrorData;
  });
}

