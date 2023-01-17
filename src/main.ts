import { format } from 'date-fns';
import { getImage } from './image';
import { log } from './log';
import { getWeatherData } from './weather';

(async () => {
  const weatherData = await getWeatherData();

  // create widget + set background
  const widget = new ListWidget();
  widget.backgroundImage = await getImage(weatherData.weather[0], 'background');
  widget.addSpacer(0);

  // icon
  const widgetImage = widget.addImage(await getImage(weatherData.weather[0], 'icon'));
  widgetImage.imageSize = new Size(75, 75);
  widgetImage.rightAlignImage();

  const textColor = new Color('#ffffff');
  const degreeSymbol = '\u2103';

  // date
  const dateText = widget.addText(`${format(new Date(), 'cccc d')}, ${weatherData.weather[0].main}`);
  dateText.textColor = textColor;
  dateText.font = Font.regularSystemFont(15);

  // temperature
  const temperatureText = widget.addText(`${Math.round(weatherData.main.temp)}${degreeSymbol}`);
  temperatureText.textColor = textColor;
  temperatureText.font = Font.boldSystemFont(35);

  // feels like
  const feelsLikeText = widget.addText(`Feels like ${Math.round(weatherData.main.feels_like)}${degreeSymbol}`);
  feelsLikeText.textColor = textColor;
  feelsLikeText.font = Font.regularSystemFont(15);

  // city name
  const cityText = widget.addText(weatherData.name);
  cityText.textColor = textColor;
  cityText.font = Font.regularSystemFont(10);

  // last updated
  const lastUpdatedText = widget.addText(`Updated ${format(new Date(), 'HH:mm')}`);
  lastUpdatedText.textColor = textColor;
  lastUpdatedText.font = Font.regularSystemFont(10);

  widget.addSpacer();

  log('Applying');
  Script.setWidget(widget);
})().catch(ex => log('Root error', ex));
