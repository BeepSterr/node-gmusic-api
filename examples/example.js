
const gmusic = require('../');
var music = new gmusic({ port: 3000});

music.events.on( 'ready', ()=>{
    console.log('ready');
})

music.events.on( 'nowPlaying', (oldState, newState)=>{
    console.log('new song: ' + newState.song.Title );
})

music.events.on( 'paused', ()=>{
    console.log('paused');
})
music.events.on( 'unpaused', ()=>{
    console.log('unpaused');
})