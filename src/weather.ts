import { API_KEY, CITY_ID } from './config';
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

export async function getWeatherData(): Promise<WeatherData> {

  if (!CITY_ID || !API_KEY) {
    log('Keys missing, will return test data');

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

  const url = `http://api.openweathermap.org/data/2.5/weather?id=${CITY_ID}&APPID=${API_KEY}&units=metric`;

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
