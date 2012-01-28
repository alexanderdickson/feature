var fs = require("fs"),
    path = require("path"),
    readDirFiles = require("read-dir-files"),
    featurePath = path.join(__dirname, "lib", "features");

readDirFiles(featurePath, "utf8", function (err, files) {
    if (err) throw err;
    files = flatten(files).map(function (v) {
        return "(function () { \n" + v.toString() + "\n}());\n\n";
    }).join("");
    var src = ";(function () { window.features = []; \n\n" + files + "\n}())";
    fs.writeFile(path.join(".", "feature.js"), src);
});

writeArray(path.join(__dirname, "lib", "features", "DOM", "DOMImplementation"), [

]);

function flatten(o) {
    var arr = [];
    Object.keys(o).forEach(function (k) {
        var v = o[k];
        if (typeof v === "object") {
            arr = arr.concat(flatten(v));    
        } else {
            arr.push(v);    
        }
    });
    return arr;
}

function writeArray(loc, arr) {
    var interface = "DOMImplementation";
    arr.forEach(function (name) {
        var str = "features[\"DOM." + interface + "." + name + 
            "\"] = !!(document.implementation." + name + ");"
        fs.writeFile(
            path.join(loc, name + ".js"),
            str
        );
    });
}