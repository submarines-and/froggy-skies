import { API_KEY } from './config';
import { log } from './log';

export interface WeatherData {
  name: string;
  main: {
    temp: number;
    feels_like: number;
  };
  weather: {
    main: string;
    icon: string;
  }[];
}

export interface WeatherLocation {
  id: string;
  name: string;
}

export async function getWeatherData(locationId?: string): Promise<WeatherData> {

  if (!API_KEY) {
    log('API key missing, will return test data');

    return {
      name: 'Malmö',
      main: {
        temp: 10,
        feels_like: 10,
      },
      weather: [
        {
          main: 'Cloudy',
          icon: '01d.png',
        },
      ],
    } as WeatherData;
  }

  let url = '';
  if (locationId) {
    url = `http://api.openweathermap.org/data/2.5/weather?id=${locationId}&APPID=${API_KEY}&units=metric`;
  }
  else {
    // fall back to current location
    const currentLocation = await Location.current();
    url = `http://api.openweathermap.org/data/2.5/weather?lat=${currentLocation.latitude}&lon=${currentLocation.longitude}&appid=${API_KEY}&units=metric`;
  }

  log('Getting weather', url);
  const request = new Request(url);
  return request.loadJSON().catch(ex => {
    log('Error when getting weather', ex);
    return {
      name: 'Error',
      main: {
        temp: 0,
        feels_like: 0,
      },
      weather: [
        { main: 'Error' },
      ],
    } as WeatherData;
  });
}

