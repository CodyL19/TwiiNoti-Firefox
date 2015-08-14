var buttons = require('sdk/ui/button/action');
var tabs = require("sdk/tabs");

var button = buttons.ActionButton({
    id: "mozilla-link",
    label: "Visit Mozilla",
    icon: {
        "16": "./assets/images/icons/icon-16.png",
        "32": "./assets/images/icons/icon-32.png",
        "64": "./assets/images/icons/icon-64.png"
    },
    onClick: handleClick
});

function handleClick(state) {
    tabs.open("http://www.mozilla.org/");
}
