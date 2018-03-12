// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyCXVTjTuBUXf-UWlpKfKHjomfPezutmPwI',
    authDomain: 'cas-fee-shop.firebaseapp.com',
    databaseURL: 'https://cas-fee-shop.firebaseio.com',
    projectId: 'cas-fee-shop',
    storageBucket: 'cas-fee-shop.appspot.com',
    messagingSenderId: '323643286137'
  }
};
