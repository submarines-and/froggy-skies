# Froggy Skies
Weather widget for [Scriptable](https://scriptable.app) with the Google weather frog. Images are downloaded during sync from this repo and will be stored in your icloud account under `/scriptable/weather`. A primitive text cache will also be stored here.

## Installation and config

### Api key
* Register api key at https://openweathermap.org - note that this takes ~1h to activate, so do this early.
* Add key as constant to `src/constants.ts`.

### Build
* Install dependencies with `yarn`.
* Run `yarn build`.
* Build output will be created at `dist/main.js`. You will need to copy the contents in a bit.
* Optional: modify `yarn copy` path to allow file transfer through icloud sync.

### Create widget
* Install `https://scriptable.app` on your phone.
* Create in new script in `Scriptable`, paste contents of `main.js` (or run the copy script).
* Add widget to homescreen.
* Select your script as target.


Look how happy he is :)

![Widget](./preview2.jpeg)
