import { log } from './log';

type FileType = 'background' | 'icon'

export async function getImage(filename: string, fileType: FileType, destinationFolderPath: string = '/weather'): Promise<Image> {
  const fm = FileManager.iCloud();
  const fullPath = `${destinationFolderPath}/${filename}`;

  if (!fm.fileExists(fullPath)) {
    if (!fm.fileExists(destinationFolderPath)) {
      log('Creating folder', destinationFolderPath);
      fm.createDirectory(destinationFolderPath);
    }

    const url = `https://github.com/submarines-and/froggy-skies/raw/master/${fileType}/${filename}`;
    log('Downloading image', url);

    const request = new Request(url);
    const image = await request.loadImage();

    log('Saving image to disc', fullPath);
    fm.writeImage(fullPath, image);
  }

  return Image.fromFile(fullPath);
}
