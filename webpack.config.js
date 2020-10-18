var HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');


module.exports = {
 
    entry:{
    
        app:'./src/app.js',
        
    },
    output:{
        filename: 'bundle.js',
        path: path.join(__dirname,'dist'),
       publicPath: 'dist'
    }, module: {
      
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.svg$/,
          use: 'file-loader'
        },
   
      ],
     
    }, plugins: [new HtmlWebpackPlugin()]
    
    
}