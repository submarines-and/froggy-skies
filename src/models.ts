/**
 * Weather "type", used to pick icon and background
 * https://openweathermap.org/weather-conditions
*/
export interface WeatherType {
  id: number;
  main: string;
  icon: string;
}

/** Weather data as returned by the api */
export interface WeatherData {

  /** City name  */
  name: string;

  /** Temperature data */
  main: {
    temp: number;
    feels_like: number;
  };

  /** Type of weather */
  weather: WeatherType[];

  // Any error message
  cod?: number;
}

/** Test data in case things go wrong */
export const TEST_DATA: WeatherData = {
  name: 'Krabbelurien',
  main: {
    temp: 10,
    feels_like: 15,
  },
  weather: [
    {
      id: 100,
      main: 'Sunny',
      icon: '01d',
    },
  ],
};

/**  Used to cache image selection to prevent too fast reloads */
export interface ImageSelection {
  id: string;
  image: string;
  date: string;
}
