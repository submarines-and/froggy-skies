import { API_KEY, CITY_ID } from './config';

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
  const url = `http://api.openweathermap.org/data/2.5/weather?id=${CITY_ID}&APPID=${API_KEY}&units=metric`;

  const request = new Request(url);
  const res = await request.loadJSON();
  return res;
}
