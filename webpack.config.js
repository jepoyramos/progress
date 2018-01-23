var path = require('path'); //node js package
var ExtractTextPlugin = require('extract-text-webpack-plugin'); //get this plugin installed using npm

var extractPlugin = new ExtractTextPlugin({ // assign plugin to this var
  filename: 'main.css' //tell which file or what file name should be used/created in compiling scss files
});

module.exports = {
    entry:'./src/js/app.js', //entry point/ first load
    output:{
      path: path.resolve(__dirname, 'dist'), //'__dirname = current/absolurte directory', 'directory so save the compiled js'
      filename: 'bundle.js', //'file to create'
      publicPath: '/dist' //tells webpack that files will be in this folder
    },
    module:{
      rules:[
        {
          test: /\.js$/, //test load all js file extension
          use: [
            {
              loader: 'babel-loader', //use this loader
              options: {
                presets: ['es2015'] // compile with this presets
              }
            }
          ]
        },
        {
          test: /\.scss$/, // test load all scss file extension
          use: extractPlugin.extract({ //use extract method from extractplugin
            use:[
              'css-loader', //second load
              'sass-loader' //first load 
            ]
          })
        }        
      ]
    },

    plugins:[
      extractPlugin
    ]
};