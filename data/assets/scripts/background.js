var panelWidth  = $('body').width();
var panelHeight = $('body').height();

addon.port.on("shown", function() {
    addon.port.emit('alert', "is connected");
});

addon.port.on("alert", function(message){
    console.log("Connected: "+message);
});
