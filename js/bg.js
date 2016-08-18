function getXmlHttp() { //stolen
    var xmlhttp;
    try {
        xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
        try {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (E) {
            xmlhttp = false;
        };
    };
    if (!xmlhttp && typeof XMLHttpRequest != 'undefined') {
        xmlhttp = new XMLHttpRequest();
    };
    return xmlhttp;
};

var xmlhttp = getXmlHttp()
xmlhttp.open('GET', chrome.extension.getURL('/js/inject.js'), false);
xmlhttp.send(null);
if (xmlhttp.status == 200) {
    var s = document.createElement("script");
    s.src = chrome.extension.getURL('/js/inject.js');
    (document.head || document.documentElement).appendChild(s)
    s.onload = function() {
        var evt = document.createEvent("CustomEvent");
        url = chrome.extension.getURL('/img/wheel.png');
        evt.initCustomEvent("BindURL", true, true, url);
        document.dispatchEvent(evt);
    };
};
