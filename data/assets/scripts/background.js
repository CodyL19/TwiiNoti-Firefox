/*
 * Page use: All messages will be sent from here, and will process recieved messages.
 *
 * Notes:
 * Will Run in background
 * Some things done to panel using page may need to be redone each time panel is opened
 */

///////////////////////    Run the following only when the panel is open.    ///////////////////////

addon.port.on("foo", function() {
      // Connect page height : addon.port.emit('height', 202);
    // Connected page height : addon.port.emit('height', 546);

    if(!localStorage.getItem('connected')){ // Is a connection saved?
      addon.port.emit('height', 202); 

      // URL Structure for creating a new connection: https://www.twii.me/mpb/connect/?apikey={PUBLIC_KEY}&apicode={TEMP_CODE}
      $('#connect button').click(function(){ addon.port.emit("firstConnection"); }); // Create a new connection

    } else { addon.port.emit('height', 546); }

});

///////////////    The following is to process messages regardless of panel state    ///////////////

addon.port.on("firstConnection", function(){
  // Proccess the connection info
});
