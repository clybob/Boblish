if (phantom.args.length === 0) {
    console.log('Use --help to instructions');
    phantom.exit();
}

var page = new WebPage();
var fs = require('fs');

var command = phantom.args[0];
var url = phantom.args[1];
var selector = phantom.args[2];

page.settings.loadImages = false;
page.onConsoleMessage = function (msg) { 
    console.log(msg); 
};

if( command === "--help" ) {
    console.log("usage:  [--help] [--version]\n\t<command> [<args>]");
    console.log("");
    console.log("The boblish commands are:");
    console.log("\tcreate\t\t Access url and save file with output test");
    console.log("\tcompare\t\t Compare the file test with actual page of url");
    console.log("");
    phantom.exit();
} else if ( command === "--version" ) {
    console.log("Boblish v0.1");
    phantom.exit();
}

var paramSelector = "boblishSelector=" + escape(selector);
url += /[\?#]/.test(url) ? "&" : "?";
url += paramSelector;

page.open(url, function (status) {
    if (status !== 'success') {
        console.log('Unable to access network');
        phantom.exit();
    } else {
        page.includeJs("http://hellux.x-br.com/variavel/boblish_script.js", function() {
            var result = page.evaluate(function () {
                var selector = unescape(unescape( window.location.search.match(/boblishSelector=([^&]*)/)[1] ));
                
                if( selector ) {
                    return Boblish.init(selector);
                } else {
                    return "cannot find selector";
                }
                
            });
            
            if( command === "create" ) {
                try {
                    f = fs.open(phantom.args[2], "w");
                    f.writeLine(result);
                } catch (e) {
                    console.log(e);
                    phantom.exit();
                }
                console
            }
            
            console.log( result );
            phantom.exit();
        });
    }
});