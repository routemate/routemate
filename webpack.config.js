const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


// All the configuration necessary for Webpack to properly process file assets into a bundle
module.exports = {
  // dynamically setting up the webpack mode
  mode: process.env.NODE_ENV,
  entry: { src: './client/index.js' },
  output: {
    path: path.join(__dirname, 'build'),
    publicPath: '/',
    // name of the bundle file that will be outputted
    filename: 'bundle.js',
  },
  devServer: {
    host: 'localhost',
    port: 8080,
    // enable HMR on the devServer
    hot: true,
    // fallback to root for other urls
    historyApiFallback: true,
    // loads any static files. not needed but best practice. used for any images or things that you need to render to a page
    static: {
      directory: path.resolve(__dirname, 'build'),
      publicPath: '/',
    },
    proxy: {
      '/**': 'http://localhost:3000',
    },
  },
  module: {
    // specificying different rules for the different loaders being used
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: 'defaults' }],
              ['@babel/preset-react', { targets: 'defaults' }],
            ],
          },
        },
      },
      {
        test: /\.s[ac]ss$/i,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|gif|woff|woff2|eot|ttf|svg|ico)$/,
        use: [
          {
            // loads files as base64 encoded data url if image file is less than set limit
            loader: 'url-loader',
            options: {
              // if file is greater than the limit (bytes), file-loader is used as fallback
              limit: 8192,
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './client/index.html',
    }),
  ],
  resolve: {
    // Enable importing JS / JSX files without specifying their extension
    extensions: ['.js', '.jsx'],
    fallback: {
      crypto: false,
      stream: false,
      path: false,
      zlib: false,
      net: false,
      tls: false,
      fs: false,
      os: false,
    },
  },
};
