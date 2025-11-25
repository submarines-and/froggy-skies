import { format } from 'date-fns';
import { getImage } from './image';
import { log } from './log';
import { getWeatherData } from './weather';

(async () => {
  log('Creating widget');
  const widget = new ListWidget();

  const weatherData = await getWeatherData();
  const filename = weatherData.weather[0].icon;
  const weathername = weatherData.weather[0].main;
  const curTempObj = weatherData.main;

  // background
  widget.backgroundImage = await getImage(filename, 'background');
  widget.addSpacer(0);

  // icon
  const img = await getImage(filename, 'icon');
  const widgetimg = widget.addImage(img);
  widgetimg.imageSize = new Size(75, 75);
  widgetimg.rightAlignImage();

  const textColor = new Color('#ffffff');
  const degreeSymbol = '\u2103';

  // date
  const dateText = widget.addText(`${format(new Date(), 'mediumDate')}, ${weathername}`);
  dateText.textColor = textColor;
  dateText.font = Font.regularSystemFont(15);

  // temperature
  const tempText = widget.addText(`${Math.round(curTempObj.temp)}${degreeSymbol}`);
  tempText.textColor = textColor;
  tempText.font = Font.boldSystemFont(35);

  // feels like
  const feel = `Feels like ${Math.round(curTempObj.feels_like)}${degreeSymbol}`;
  const hltempText = widget.addText(feel);
  hltempText.textColor = textColor;
  hltempText.font = Font.regularSystemFont(15);

  // city name
  const citynameText = widget.addText(weatherData.name);
  citynameText.textColor = textColor;
  citynameText.font = Font.regularSystemFont(10);

  widget.addSpacer();

  log('Applying');
  Script.setWidget(widget);
})().catch(ex => log('Root error', ex));
