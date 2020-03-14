const path = require('path');

module.exports = {
  mode: 'production',
  entry: { index: './src/components/index.tsx' },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'public')
  },
  target: 'web',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: '/node_modules/'
      }
    ],
  },
  externals: {
    "react": "React",
    "react-dom": "ReactDOM"
  }
}