
import { addHours, isBefore } from 'date-fns';
import { get, set } from './cache';
import { ImageSelection } from './models';

const IMAGE_SELECTION_CACHE_KEY = 'images';
const IMAGE_SELECTION_EXPIRATION_HOURS = 4;

/** Check for cached selection. Images are valid for a few hours before switching if the weather is the same. */
export async function getImageSelection(key: string): Promise<string> {
  const images = await get<ImageSelection[]>(IMAGE_SELECTION_CACHE_KEY) || [];

  // check if cached and valid
  const target = images.find(i => i.id === key);
  if (target && isBefore(new Date(), addHours(new Date(target.date), IMAGE_SELECTION_EXPIRATION_HOURS))) {
    return target.image;
  }

  return null;
}

export async function saveImageSelection(id: string, image: string): Promise<void> {
  const images = await get<ImageSelection[]>(IMAGE_SELECTION_CACHE_KEY) || [];

  /** If obj already exists in list in list */
  let exists = false;

  // remove expired
  const imagesToSave: ImageSelection[] = [];
  images.forEach(i => {

    if (id === i.id) {
      exists = true;
      return;
    }

    // image still valid
    if (isBefore(new Date(), addHours(new Date(i.date), IMAGE_SELECTION_EXPIRATION_HOURS))) {
      imagesToSave.push(i);
    }
  });

  // new item
  if (!exists) {
    imagesToSave.push({
      id,
      image,
      date: new Date().toISOString(),
    });
  }

  set(IMAGE_SELECTION_CACHE_KEY, imagesToSave);
}
