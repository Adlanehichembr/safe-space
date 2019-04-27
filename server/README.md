## How to run locally

1. Install NodeJS v10. You can install [nvm](https://github.com/nvm-sh/nvm) and then inside this folder run `nvm install`.
1. Run `npm install`
1. Create `config/local.js` with the same structure from `config/default.js` and change the default values for the real ones.
1. Run `npm run start:dev`

That's it! Your local server is now running on the specified port (it will print it in the console). The server will restart any time you change any file.

## How to run in a Docker container

1. Create `config/local.js` with the same structure from `config/default.js` and change the default values for the real ones.
1. Build the image by running `docker build -t boushra .`
1. Start the container with `docker run -p 80:80 boushra`
