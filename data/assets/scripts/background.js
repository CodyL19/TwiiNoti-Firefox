var panelWidth = $('body').width();
var panelHeight = $('body').height();

var size = {width: panelWidth, height: panelHeight};

self.postMessage(size);
