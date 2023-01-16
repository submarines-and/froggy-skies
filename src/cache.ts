import { ICLOUD_FOLDER } from './constants';
import { log } from './log';

export async function get<T>(key: string): Promise<T> {
  const filePath = `${ICLOUD_FOLDER}/cache/${key}.json`;
  log('Cache', 'Get', filePath);
  const iCloud = FileManager.iCloud();
  if (!iCloud.fileExists(filePath)) {
    return null;
  }

  const raw = iCloud.readString(filePath);
  return JSON.parse(raw);
}

export async function set(key: string, value: any): Promise<void> {
  const iCloud = FileManager.iCloud();
  const cacheFolder = `${ICLOUD_FOLDER}/cache`;
  const filePath = `${cacheFolder}/${key}.json`;

  log('Cache', 'Set', filePath);

  // create cache folder if missing
  if (!iCloud.fileExists(cacheFolder)) {
    if (!iCloud.fileExists(cacheFolder)) {
      log('Creating folder', cacheFolder);
      iCloud.createDirectory(cacheFolder, true);
    }
  }

  iCloud.writeString(filePath, JSON.stringify(value));
}
