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
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@images': path.resolve(__dirname, 'src/assets/images'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@fonts': path.resolve(__dirname, 'src/assets/fonts'),
      '@containers': path.resolve(__dirname, 'src/containers'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@actions': path.resolve(__dirname, 'src/redux/actions'),
      '@reducers': path.resolve(__dirname, 'src/redux/reducers'),
      '@store': path.resolve(__dirname, 'src/redux/store'),
      '@routes': path.resolve(__dirname, 'src/routes'),
      '@services': path.resolve(__dirname, 'src/services'),
      '@types': path.resolve(__dirname, 'src/types'),
      '@enums': path.resolve(__dirname, 'src/enums'),
      '@helpers': path.resolve(__dirname, 'src/utils/helpers'),
      '@hooks': path.resolve(__dirname, 'src/utils/hooks'),
    },
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
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        include: path.resolve(__dirname, 'src/assets/images'),
        type: 'asset/resource',
        generator: {
          filename: ({ filename }) => {
            const extension = path.extname(filename).toLowerCase();
            const directory = extension.slice(1);
            return `assets/${directory}/[name][ext]`;
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
