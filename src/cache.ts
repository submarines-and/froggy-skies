import { ICLOUD_FOLDER } from './constants';

export function get<T>(key: string): T {
  try {
    const filePath = `${ICLOUD_FOLDER}/cache/${key}.json`;

    const iCloud = FileManager.iCloud();
    if (!iCloud.fileExists(filePath)) {
      log(`Item not found in cache: ${filePath}`);
      return null;
    }

    const raw = iCloud.readString(filePath);
    return JSON.parse(raw);
  }
  catch (ex) {
    log('Cache GET Error');
    log(key);
    log(ex);
    return null;
  }
}

export function set(key: string, value: any): void {
  try {
    const iCloud = FileManager.iCloud();
    const cacheFolder = `${ICLOUD_FOLDER}/cache`;
    const filePath = `${cacheFolder}/${key}.json`;

    // create cache folder if missing
    if (!iCloud.fileExists(cacheFolder)) {
      log(`Creating cache folder: ${cacheFolder}`);
      iCloud.createDirectory(cacheFolder, true);
    }

    iCloud.writeString(filePath, JSON.stringify(value));
  }
  catch (ex) {
    log('Cache SET Error');
    log(key);
    log(ex);
  }
}
