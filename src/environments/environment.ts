// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyB0s3MmLGwjyqNnSPO0hhUkIuyuV8g1T_Q",
    authDomain: "weathermap-92f0b.firebaseapp.com",  
    projectId: "weathermap-92f0b",  
    databaseUrl:"https://weathermap-92f0b-default-rtdb.firebaseio.com/",
    storageBucket: "weathermap-92f0b.appspot.com",  
    messagingSenderId: "185404331592"  
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
