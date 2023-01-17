import { ICLOUD_FOLDER } from './constants';
import { log } from './log';
import { WeatherType } from './models';

type FileType = 'background' | 'icon'

/** Pick best image for the provided weather type */
function pickBestImage(weatherType: WeatherType): string {

  let prefix = '';
  let count = 1;

  switch (weatherType.icon) {

    // sunny
    case '01d':
      prefix = 'sun-day';
      count = 11;
      break;

    // sunny night
    case '01n':
      prefix = 'sun-night';
      count = 7;
      break;

    // cloudy
    case '02d':
    case '03d':
    case '04d':
      prefix = 'cloud-day';
      count = 11;
      break;

    // cloudy night
    case '02n':
    case '03n':
    case '04n':
      prefix = 'cloud-night';
      count = 6;
      break;

    // rain
    case '10d':
    case '10n':
      prefix = 'rain';
      count = 5;
      break;

    // heavy rain
    case '09d':
    case '09n':
    case '11d':
    case '11n':
      prefix = 'rain-heavy';
      count = 4;
      break;

    // snow
    case '13d':
    case '13n':
      prefix = 'snow';
      count = 4;
      break;

    // mist
    case '50d':
    case '50n':
      prefix = 'mist';
      count = 1;
      break;

    // error or missing type
    default:
      log('Bad type provided', weatherType);
      prefix = 'error';
      count = 2;
      break;
  }

  const index = Math.floor(Math.random() * (count - 1) + 1);
  return `${prefix}-${`${index}`.padStart(2, '0')}.jpg`;
}

/** Download image from repository (or local icloud) */
export async function getImage(weatherType: WeatherType, fileType: FileType, destinationFolder: string = 'weather'): Promise<Image> {
  const filename = fileType === 'icon' ? `${weatherType.icon}.png` : pickBestImage(weatherType);

  const iCloud = FileManager.iCloud();
  const destinationFolderPath = `${ICLOUD_FOLDER}/${destinationFolder}/${fileType}`;
  const filePath = `${destinationFolderPath}/${filename}`;

  if (!iCloud.fileExists(filePath)) {
    log('Image does not exist', filename);

    // create folder if missing
    if (!iCloud.fileExists(destinationFolderPath)) {
      log('Creating folder', destinationFolderPath);
      iCloud.createDirectory(destinationFolderPath, true);
    }

    // Images are downloaded from repo first time
    // Once they are downloaded, they will be read from personal icloud.
    const url = `https://github.com/submarines-and/froggy-skies/raw/master/${fileType}/${filename}`;
    log('Downloading image', url);

    const request = new Request(url);
    const image = await request.loadImage().catch(ex => {
      log('Error when download image', ex);
      return null;
    });

    if (image) {
      log('Saving image to disk', filePath);
      iCloud.writeImage(filePath, image);
    }

    // check again after downloading
    if (!iCloud.fileExists(filePath)) {
      log('Image not found after supposedly downloading, check logs!');
    }
  }

  return Image.fromFile(filePath);
}
