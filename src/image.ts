import { ICLOUD_FOLDER } from './constants';
import { log } from './log';

type FileType = 'background' | 'icon'

export async function getImage(file: string, fileType: FileType, destinationFolder: string = 'weather'): Promise<Image> {
  const iCloud = FileManager.iCloud();
  const destinationFolderPath = `${ICLOUD_FOLDER}/${destinationFolder}/${fileType}`;
  const filePath = `${destinationFolderPath}/${file}`;

  if (!iCloud.fileExists(destinationFolderPath)) {
    if (!iCloud.fileExists(destinationFolderPath)) {
      log('Creating folder', destinationFolderPath);
      iCloud.createDirectory(destinationFolderPath, true);
    }

    const url = `https://github.com/submarines-and/froggy-skies/raw/master/${fileType}/${file}`;
    log('Downloading image', url);

    const request = new Request(url);
    const image = await request.loadImage();

    log('Saving image to disk', filePath);
    iCloud.writeImage(filePath, image);
  }

  log('Loading local image', filePath);
  return Image.fromFile(filePath);
}
