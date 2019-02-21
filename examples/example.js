
const gmusicapi = require('../');
var gmusic = new gmusicapi({ port: 3000});

gmusic.events.on( 'ready', (state)=>{

    // Log the new state to the console
    console.log(state);

})

gmusic.events.on( 'nowPlaying', (oldState, newState)=>{

    console.log('new song: ' + newState.song.Title );

})

gmusic.events.on( 'paused', (state)=>{

    console.log('paused');

})
gmusic.events.on( 'unpaused', (state)=>{

    console.log('unpaused');

})