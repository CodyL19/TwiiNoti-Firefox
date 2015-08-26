/*
 * Notes:
 * LocalStorage does not work here, send info over from panel, or to panel to be stored
 */
var pubKey         = "HI_Z-Kl42gGAR6tHFp5Sp-1412031867-ByAy-Yy_vd_XRx1UI_qWb"; // This is TwiiNoti's public key to access Twii's api
var {ToggleButton} = require('sdk/ui/button/toggle');
var panels         = require("sdk/panel");
var self           = require("sdk/self");
var Request        = require("sdk/request").Request;

var button = ToggleButton({ // the button used to open the panel.
               id     : "twiinoti",
               label  : "TwiiNoti \n ----------------------\n Current Account:\n @User\n \n[0 New Notifications] \n[0 New Messages]",
               icon   : {
                            "16" : "./assets/images/twiilogo.png",
                            "32" : "./assets/images/twiilogo.png",
                            "64" : "./assets/images/twiilogo.png"
                          },
                onChange : handleChange
              });

var panel = panels.Panel({ // Create the Main addon-panel
              contentURL       : self.data.url("panel.html"),
              contentScriptURL : "./assets/scripts/background.js",
              onHide           : handleHide,
              width            : 416,
              height           : 202
            });

function handleChange(state) { if (state.checked) { panel.show({ position: button });} }

///////////////////////    Messages and other panel handling is in this area    ////////////////////

panel.on("show", function() { panel.port.emit("foo"); }); // Tell Panel when it's okay to start sending messages

panel.port.on("height", function(height){ // Height is variable depending one weather connected to an account (at least one) or not.
  panel.resize(416, height);
});

// Genorates a temporary key to authenticate the user.
function randomString(length, chars) {var result = '';for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];return result;}
var tempKey;

panel.port.on("firstConnection", function(){ // When the user clicks the button in the panel create a connection and return the values.
  tempKey = randomString(16, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_');

  var connect = panels.Panel({ // Creates a panel to authenticate
                contentURL       : "http://www.twii.me/mpb/connect/?apikey="+ pubKey +"&apicode="+ tempKey,
                onHide           : connectHide,
                width            : 600,
                height           : 500
              });

  connect.show();
  function connectHide(){ // Start sending requests and check for the user's info.

    // var connectRequest = Request({
    //   url        : "https://api.twitter.com/1/statuses/user_timeline.json?screen_name=mozhacks&count=1",
    //   onComplete : function (response) {
    //     var tweet = response.json[0];
    //   }
    // });

  }

});

////////////////////////////////////////////////////////////////////////////////////////////////////

function handleHide() { button.state('window', {checked: false}); }
