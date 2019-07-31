const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const outputPath = path.join(__dirname, 'lib');
const srcPath = path.join(__dirname, 'src');
const componentsPath = path.join(srcPath, 'components');

const entryPoints = {
  index: './src/components/index.js',
};
fs.readdirSync(componentsPath)
  .filter(x => x !== '.DS_Store' && x !== 'index.js' && !x.match(/\.md/) && !x.match(/style/))
  .forEach((component) => {
    entryPoints[component] = [`./src/components/${component}`];
  });

module.exports = {
  entry: entryPoints,
  output: {
    path: outputPath,
    filename: '[name]/index.js',
    publicPath: '/dist/',
    library: 'hostui',
    libraryTarget: 'commonjs2',
  },
  resolve: {
    modules: ['node_modules', path.resolve(__dirname, 'lib/index')],
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'less-loader',
            options: { javascriptEnabled: true },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    new MiniCssExtractPlugin({
      filename: 'hostui.css',
      ignoreOrder: false, // Enable to remove warnings about conflicting order
    }),
  ],
  target: 'web',
  externals: {
    react: 'react',
    'react-dom': 'ReactDOM',
  },
  mode: 'production',
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
  },
};
