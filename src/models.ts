
export interface WeatherData {

  /** City name  */
  name: string;

  /** Temperature data */
  main: {
    temp: number;
    feels_like: number;
  };

  /**
   * Weather "type", used to pick icon and background
   * https://openweathermap.org/weather-conditions
  */
  weather: {
    id: number;
    main: string;
    icon: string;
  }[];

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
