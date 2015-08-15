var { ToggleButton } = require('sdk/ui/button/toggle');
var panels = require("sdk/panel");
var self = require("sdk/self");

var button = ToggleButton({
    id: "twiinoti",
    label: "TwiiNoti \n ----------------------\n Current Account:\n @User\n \n[0 New Notifications] \n[0 New Messages]",
    icon: {
        "16": "./assets/images/twiilogo.png",
        "32": "./assets/images/twiilogo.png",
        "64": "./assets/images/twiilogo.png"
    },
    onChange: handleChange
});

var panel = panels.Panel({
    contentURL: self.data.url("panel.html"),
    contentScriptURL: "./assets/scripts/background.js",
    onHide: handleHide,
    width: 416,
    height: 540
});

function handleChange(state) {
    if (state.checked) {
        panel.show({
            position: button
        });
    }
}

function handleHide() {
    button.state('window', {checked: false});
}
