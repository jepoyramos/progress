var path = require('path'); //node js package

module.exports = {
    entry:'.src/js/app.js',
    output:{
      path: path.resolve(__dirname, 'dist'), //'__dirname = current/absolurte directory', 'directory so save the compiled js'
      filename: 'bundle.js' //'file to create'
    }
};