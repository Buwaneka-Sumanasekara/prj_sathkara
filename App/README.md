# SATHKARA Team- APP

[![N|Solid](https://firebasestorage.googleapis.com/v0/b/sathkara-bb902.appspot.com/o/defaults%2Frsz_3logo.png?alt=media&token=69400e45-135d-46cd-ad8f-7b5019216bcb)](https://teamsathkara.org)

### Tech
We used following technoligies to develop this module

* [React-JS] - HTML enhanced for web apps!
* [Firebase] - Database / API / Storage / Authentication / Notifications





### Installation

This app requires [Node.js](https://nodejs.org/)  to run.

Install the dependencies and devDependencies and start the server.

```sh
$ cd [PrjFolder]/App
$ npm install
$ npm start
```
  
# Environment - Testing 
To Upload firebase functions for testing enviornemnt
```sh
$ cd [PrjFolder]/Firebase-tools
$ firebase use test
$ firebase deploy --only functions
```

# Environment - Production
For production environments...
Deploy functions only

```sh
$ cd [PrjFolder]/Firebase-tools
$ firebase use default
$ firebase deploy --only functions
```

Deploy host only

```sh
$ cd [PrjFolder]/App
$ cd npm run-script build
$ cd [PrjFolder]/Firebase-tools
$ firebase use default
$ firebase deploy --except functions
```




   [React-Js]: <https://reactjs.org/>
   [Firebase]: <http://firebase.google.com/>
  

