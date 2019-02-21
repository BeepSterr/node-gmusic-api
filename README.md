# Getting Started
First, install the package using NPM `npm install gmusic-api`
Then initialize the package using this:
```js
const gmusicapi = require('gmusic-api');
var gmusic = new gmusicapi(options);
```
Replace options with a valid [options object](https://github.com/Nioxed/node-gmusic-api/wiki/Options)

# How it works.
This package handles incoming data from my [Play Music State API](https://chrome.google.com/webstore/detail/play-music-state-api/dlbcboanleiapaacghkbhocdnfolhkec) and gives you objects/events to work with. Internally it's not much more than a small HTTP server with a event emitter attached.

# The state object
```js
{ isPlaying: true,
  song:
   { Album: 'BEST OF LAPFOX VOL 2: The Killer\'s Notebook',
     Artist: 'Jackal Queenston',
     Cover: 'https://lh3.googleusercontent.com/BtAShinHDjYUK-QEGDsslUMjg6TRZ5DbwNmv91wuDgLPwyB1Q82U6QFgyhOc=s90-c-e100',
     Times: { Current: '0:10', Total: '2:56' },
     Title: 'Rubber Band' },
  timestamp: 1550782801317 }
```
This is a fully filled out state object, Present in `gmusic.player` and supplied with all events.

# Events
## ready
Fired when the first message is received and the player is being initialized.
```js
gmusic.events.on( 'ready', (state)=>{

    // Log the new state to the console
    console.log(state);

})
```
## nowPlaying
Fired whenever the current song Title changes
```js
gmusic.events.on( 'nowPlaying', (oldState, newState)=>{

    console.log('new song: ' + newState.song.Title );

})
```
## paused
Fired whenever the current playing song is paused.
```js
gmusic.events.on( 'paused', (state)=>{

    console.log('paused');

})
```
## unpaused
Fired whenever the current playing song is unpaused.
```js
gmusic.events.on( 'paused', (state)=>{

    console.log('paused');

})
```
 
