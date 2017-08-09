'use strict';

const { join } = require('path');

const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const htmlWebpackTemplate = require('html-webpack-template');
const postcss = require('postcss-loader');
const webpack = require('webpack');

/** @type Number - Embed assets smaller than this size. */
const EMBED_FILE_SIZE = 32768;

const rulesInclude = [join(__dirname, 'source')];

module.exports = {
  devtool: 'source-map',

  entry: {
    main: ['./source/main.jsx']
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: rulesInclude,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              plugins: [
                'transform-class-properties',
                'transform-regenerator',
                'transform-async-to-generator'
              ],
              presets: [
                ['env', {
                  //targets: {
                  //  browsers: ['last 2 versions', 'safari >= 7']
                  //}
                }],

                // use preset `modules: false` so that ES6 modules are not transformed into CommonJS
                // modules, and thus keeps import/export statements, which is required if we want to
                // let Webpack 2 do tree-shaking:
                ['es2015', { modules: false }],

                // Transpile React components to JavaScript:
                'react',

                // Specifies what level of language features to activate.
                // Stage 2 is "draft", 4 is finished, 0 is strawman.
                // See https://tc39.github.io/process-document/
                'stage-2'
              ]
            }
          }
        ]
      },
      {
        test: /\.html$/,
        include: rulesInclude,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]'
          }
        }
      },
      {
        test: /\.css$/,
        include: [
          ...rulesInclude,
          'node_modules/graphiql/graphiql.css'
        ],
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: function () {
                return [autoprefixer({ browsers: 'last 2 versions' })];
              }
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        include: rulesInclude,
        exclude: /node_modules/,
        use: [
          {
            // Note: style-loader is required for hot-module-reloading (HMR)
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: function () {
                return [autoprefixer({ browsers: 'last 2 versions' })];
              }
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        include: rulesInclude,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: EMBED_FILE_SIZE,
              minetype: 'image/svg+xml'
            }
          }
        ]
      },
      {
        test: /\.gif/,
        include: rulesInclude,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: EMBED_FILE_SIZE,
              minetype: 'image/gif'
            }
          }
        ]
      },
      {
        test: /\.jpg/,
        include: rulesInclude,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: EMBED_FILE_SIZE,
              minetype: 'image/jpg'
            }
          }
        ]
      },
      {
        test: /\.png/,
        include: rulesInclude,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: EMBED_FILE_SIZE,
              minetype: 'image/png'
            }
          }
        ]
      }
    ]
  },

  output: {
    path: join(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].js'
  },

  profile: true,

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: (module) => {
        return module.context && module.context.includes('node_modules');
      }
    }),

    // @see https://www.npmjs.com/package/html-webpack-plugin
    // @see https://www.npmjs.com/package/html-webpack-template
    new HtmlWebpackPlugin({
      appMountId: 'app',
      filename: 'index.html',
      inject: false, // must be false when using `html-webpack-template`
      links: [],
      template: htmlWebpackTemplate,
      title: 'Demonstrate graphql-language-service issue #128'
    }),

    // new webpack.IgnorePlugin(/\.flow$/)
  ],

  resolve: {
    // Enables users to leave off the extension when importing:
    extensions: ['.js', '.jsx'],
    enforceModuleExtension: false
  },

};
