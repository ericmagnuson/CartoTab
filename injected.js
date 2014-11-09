var debugModeEnabled = false;

document.body.onclick = function(e) {
    e = e || event;

    var from = findParent('a', e.target || e.srcElement);
    if (from) {
        // A link -- rather than an element -- has been clicked, so do stuff.
        var clickInfo = [
            e.target.href,
            new Date,
            document.URL
        ];

        if (debugModeEnabled) console.debug('Dispatching message to global.html');
        if (debugModeEnabled) console.log(clickInfo);
        safari.self.tab.dispatchMessage('clickInfo', clickInfo);
    }
}

// Event delegation: find first parent with tagName [tagname]
function findParent(tagname,el){
    if ((el.nodeName || el.tagName).toLowerCase() === tagname.toLowerCase())    {
        return el;
    }
    while (el = el.parentNode){
        if ((el.nodeName || el.tagName).toLowerCase() === tagname.toLowerCase()) {
            return el;
        }
    }
    return null;
}
