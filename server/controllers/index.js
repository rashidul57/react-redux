/**
 * Booting Routes
 */
var fs = require('fs');
module.exports = function (app) {
    var name;
    fs.readdirSync(__dirname).forEach(function (file) {
        if (file === 'index.js' || file.indexOf('.js') === -1) {
            return;
        }
        name =  file.replace(/\.js$/, '');
        if (name.indexOf('socket') === -1) {
            app.use('/' + name, require('./' + name));
        }
    });
};