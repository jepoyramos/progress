var path = require('path'); //node js package
var ExtractTextPlugin = require('extract-text-webpack-plugin'); //get this plugin installed using npm

var extractPlugin = new ExtractTextPlugin({ // assign plugin to this var
  filename: 'main.css' //tell which file or what file name should be used/created in compiling scss files
});

module.exports = {
    entry:'./src/js/app.js', //entry point/ first load
    output:{
      path: path.resolve(__dirname, 'dist'), //'__dirname = current/absolurte directory', 'directory so save the compiled js'
      filename: 'bundle.js', //'file to create', end result 
      publicPath: '/dist' //tells webpack that files will be in this folder
    },
    module:{
      rules:[
        { //es6 js -> es2015 -> bundle.js
          test: /\.js$/, //test load all js file extension
          use: [
            {
              loader: 'babel-loader', //use this loader transpile es6 to es5
              options: {
                presets: ['es2015'] //transpile with this presets
              }
            }
          ]
        },
        { // scss -> main.css
          test: /\.scss$/, // test load all scss file extension
          use: extractPlugin.extract({ //use extract method from extractplugin
            use:[
              'css-loader', //'second load', 'handles css via javascript(when importing css file to app.js file)'
              'sass-loader' //'first load ', 'compile scss/sass to css'
            ]
          })
        }
        {
          test: /\.html$/, //test for html extension file
          use: ['html-loader']
        },
        {
          test: /\.(jpg|png)$/, // test for multiple format images 
          use: [
            {
              loader: 'file-loader',
              options:{ //sets where the file should be stored and how should it be named.
                name: '[name].[ext]', //keeps the original name rather than random hash code plus extension file
                outputPath: 'img/',
                publicPath: 'img/'
              }
            }
          ]
        }

      ]
    },

    plugins:[
      extractPlugin // extract style and create a css file named main which is set before
    ]
};