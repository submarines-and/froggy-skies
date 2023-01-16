import { format } from 'date-fns';
import { getImage } from './image';
import { log } from './log';
import { getWeatherData } from './weather';

(async () => {
  const weatherData = await getWeatherData();
  const imageFilename = weatherData.weather[0].icon;
  const weatherDisplayName = weatherData.weather[0].main;

  // create widget + set background
  log('Creating widget');
  const widget = new ListWidget();
  widget.backgroundImage = await getImage(imageFilename, 'background');
  widget.addSpacer(0);

  // icon
  const widgetImage = widget.addImage(await getImage(imageFilename, 'icon'));
  widgetImage.imageSize = new Size(75, 75);
  widgetImage.rightAlignImage();

  const textColor = new Color('#ffffff');
  const degreeSymbol = '\u2103';

  // date
  const dateText = widget.addText(`${format(new Date(), 'cccc d')}, ${weatherDisplayName}`);
  dateText.textColor = textColor;
  dateText.font = Font.regularSystemFont(15);

  // temperature
  const tempText = widget.addText(`${Math.round(weatherData.main.temp)}${degreeSymbol}`);
  tempText.textColor = textColor;
  tempText.font = Font.boldSystemFont(35);

  // feels like
  const feel = `Feels like ${Math.round(weatherData.main.feels_like)}${degreeSymbol}`;
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
