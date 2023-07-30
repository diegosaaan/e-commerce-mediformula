const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const EslingPlugin = require('eslint-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
  entry: './src/App.tsx',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'build'),
  },
  resolve: {
    extensions: ['.tsx', '.json', '.scss', '.js'],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: './tsconfig.json',
      }),
    ],
  },
  plugins: [
    new EslingPlugin({
      extensions: 'tsx',
    }),
    new MiniCssExtractPlugin({
      filename: 'index.css',
      ignoreOrder: false,
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
      filename: 'index.html',
    }),
    new ForkTsCheckerWebpackPlugin(),
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(s*)css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
          {
            loader: 'sass-resources-loader',
            options: {
              resources: ['./src/styles/variables.scss', './src/styles/mixins.scss'],
            },
          },
        ],
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
          },
        },
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|webp)$/,
        include: path.resolve(__dirname, 'src/assets/images'),
        type: 'asset/resource',
        generator: {
          filename: ({ filename }) => {
            const extension = path.extname(filename).toLowerCase();
            const directory = extension.slice(1);
            return `assets/images/${directory}/[name][ext]`;
          },
        },
      },
      {
        test: /\.(woff|woff2|ttf)$/,
        include: path.resolve(__dirname, 'src/assets/fonts'),
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name][ext]',
        },
      },
    ],
  },
  mode: 'development',
  devServer: {
    static: 'build',
    hot: true,
    open: true,
    port: 8000,
    liveReload: false,
    client: {
      logging: 'none',
      overlay: false,
    },
    historyApiFallback: true,
  },
};
