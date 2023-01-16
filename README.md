# Froggy Skies
Weather widget for [Scriptable](https://scriptable.app) with the Google weather frog. Images are downloaded during sync from this repo and will be stored in your icloud account under `/scriptable/weather`. A primitive text cache will also be stored here.

## Installation and config
* Register api key at https://openweathermap.org
* Fill out key in `src/constants.ts`.

* Install dependencies with `yarn`.
* Run `yarn build`.
* Build output will be created at `dist/main.js`. You will need to copy the contents in a bit.

* Install `https://scriptable.app` on your phone.
* Create in new script in `Scriptable`, paste contents of `main.js`. Optional: modify `yarn copy` path and transfer through icloud sync.
* Add widget to homescreen.
* Select your script as target.


Look how happy he is :)

![Widget](./preview.jpeg)
