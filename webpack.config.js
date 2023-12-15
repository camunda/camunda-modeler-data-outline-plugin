/**
 * Copyright Camunda Services GmbH and/or licensed to Camunda Services GmbH
 * under one or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information regarding copyright
 * ownership.
 *
 * Camunda licenses this file to you under the MIT; you may not use this file
 * except in compliance with the MIT License.
 */

const path = require('path');

module.exports = {
  mode: 'production',
  entry: './lib/index.js',
  output: {
    path: path.resolve(__dirname, 'dist/client'),
    filename: 'client.js'
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [

          // Creates `style` nodes from JS strings
          'style-loader',

          // Translates CSS into CommonJS
          'css-loader',

          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [ '@babel/preset-react' ]
          }
        }
      }
    ]
  },
  resolve: {
    alias: {
      'react': 'camunda-modeler-plugin-helpers/react',
    }
  },
  devtool: 'cheap-module-source-map'
};
