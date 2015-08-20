/*
 * Notes:
 * LocalStorage does not work here, send info over from panel, or to panel to be stored
 */
var {ToggleButton} = require('sdk/ui/button/toggle');
var panels         = require("sdk/panel");
var self           = require("sdk/self");

var button = ToggleButton({
               id       : "twiinoti",
	   				 	 label    : "TwiiNoti \n ----------------------\n Current Account:\n @User\n \n[0 New Notifications] \n[0 New Messages]",
	   				 	 icon     : {
								 						"16" : "./assets/images/twiilogo.png",
														"32" : "./assets/images/twiilogo.png",
														"64" : "./assets/images/twiilogo.png"
													},
	    			 	 onChange : handleChange
     				 }),

var panel = panels.Panel({
						  contentURL       : self.data.url("panel.html"),
							contentScriptURL : "./assets/scripts/background.js",
							onHide           : handleHide,
							width            : 416, 
							height           : 546
						});

function handleChange(state) { if (state.checked) { panel.show({ position: button });} }

///////////////////////////////////////    Messages and other panel handling is in this area    ////////////////////////////////////////////

panel.on("show", function() { panel.port.emit("foo"); }); // Tell Panel when it's okay to start sending messages

panel.port.on("alert", function(message){
	panel.port.emit("alert", "Yes");
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function handleHide() { button.state('window', {checked: false}); }
