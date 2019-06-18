const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const CSS_FILE = process.env.npm_package_dsccViz_cssFile;
const MANIFEST = "manifest.json";
const INDEX_JSON = "index.json";

const IS_DEV = process.env.NODE_ENV !== "production"

module.exports = [
  {
    mode: IS_DEV ? 'development' : 'production',
    entry: './src/index.tsx',
    devServer: {
      contentBase: './dist',
    },
    resolve: {
      // Add '.ts' and '.tsx' as resolvable extensions.
      extensions: [".ts", ".tsx", ".js", ".json"]
    },
    module: {
      rules: [
        // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
        { test: /\.tsx?$/, loader: "awesome-typescript-loader" },

        // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
        { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
      ]
    },
    output: {
      filename: "index.js",
      path: path.resolve(__dirname, 'build'),
    },
    plugins: [
      new CopyWebpackPlugin([
        { from: path.join('src', CSS_FILE), to: '.' },
        { from: path.join('src', MANIFEST), to: '.' },
        { from: path.join('src', INDEX_JSON), to: '.' },
      ]),
    ]
  },
];
