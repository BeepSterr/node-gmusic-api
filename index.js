
const port = 3000

const events    = require('events').EventEmitter;
const http      = require('http')

class gmusic {

    constructor(options){

        var me = this;

        this.player = {}
        this.lastReceived = Date.now();
        this.connected = false;

        // Default options
        this.defaultOptions = {
            port: 3000,
            host: '127.0.0.1'
        }

        // Make sure options are present, otherwise just ignore it
        if( typeof(options) == 'object'){

            // Set the defaults because no options were supplied.
            this.options = this.defaultOptions

        }else{

            this.options = {};

            // Port // Number
            if( typeof(options.port) == 'number'){ this.options.port = options.port; }else{ this.options.port = this.defaultOptions.port; }

            // Host // String
            if( typeof(options.port) == 'string'){ this.options.host = options.host; }else{ this.options.host = this.defaultOptions.host; }


        }


        // set up event emitter.
        this.events = new events.EventEmitter();

        // set up the http server.
        this.server = http.createServer(function(request, response) {

            if (request.method == 'POST') {
                var body = ''
                request.on('data', function(data) {
                    body += data
                })
                request.on('end', function() {

                    try{
                    
                    response.writeHead(200, {'Content-Type': 'text/html'})
                    response.end('THANKS')

                    var data = JSON.parse(body);
                    if(data.isPlaying != undefined){

                        if(me.connected == false){
                            me.events.emit( 'ready', data );
                        }

                        if(me.player.song != undefined){
                            if(me.player.song.Title != undefined){

                                if(me.player.song.Title != data.song.Title){
                                    me.events.emit( 'nowPlaying', me.player, data)
                                }

                                if(me.player.isPlaying != data.isPlaying && data.isPlaying == false){ me.events.emit( 'paused', data) }
                                if(me.player.isPlaying != data.isPlaying && data.isPlaying == true){ me.events.emit( 'unpaused', data) }

                            }
                        }
                    }

                    me.player         = data;
                    me.connected      = true;
                    me.lastReceived   = data.timestamp

                }catch(ex){

                    me.events.emit( 'error', ex)

                }


                })
            }
            
        })
        
        this.server.listen(port, '127.0.0.1')
        this.events.emit('init', null);
        

    }


}

module.exports = gmusic;