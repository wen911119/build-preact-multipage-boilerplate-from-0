const path = require('path')
const fs = require('fs')
const ip = require('ip')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const getEntries = dir => {
  const pagesDir = path.resolve(__dirname, dir)
  let entry = {}
  fs.readdirSync(pagesDir).forEach(file => {
    const fullpath = path.join(pagesDir, file, 'entry.js')
    entry[file] = fullpath
  })
  return entry
}
const entries = getEntries('./src/pages')
const HtmlWebpackPlugins = Object.keys(entries).map(k => {
  return new HtmlWebpackPlugin({
    title: k,
    filename: `${k}.html`,
    template: './template.html',
    chunks: ['common', k]
  })
})
module.exports = {
  mode: 'development',
  entry: entries,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash].js' // string
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  exclude: ['@babel/plugin-transform-regenerator']
                }
              ]
            ],
            plugins: [
              ['@babel/plugin-transform-async-to-generator'],
              '@babel/plugin-syntax-dynamic-import',
              [
                '@babel/plugin-proposal-decorators',
                {
                  legacy: true
                }
              ],
              [
                '@babel/plugin-proposal-class-properties',
                {
                  loose: true
                }
              ],
              [
                'transform-object-rest-spread',
                {
                  useBuiltIns: true
                }
              ],
              'transform-export-extensions',
              '@babel/plugin-transform-react-constant-elements',
              [
                'transform-react-jsx',
                {
                  pragma: 'h'
                }
              ]
            ]
          }
        }
      }
    ]
  },
  plugins: [...HtmlWebpackPlugins, new CleanWebpackPlugin(['dist'])],
  optimization: {
    splitChunks: {
      cacheGroups: {
        common: {
          chunks: 'all',
          test: /[\\/]node_modules[\\/](preact|p-to-r|axios|@ruiyun\/preact-layout-suite|@ruiyun\/preact-m-nav|@ruiyun\/preact-text)[\\/]/,
          name: 'common'
        }
      }
    }
  },
  devServer: {
    host: ip.address()
  }
}
