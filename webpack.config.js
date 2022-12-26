const webpack = require("webpack");

module.exports = function override(config, env) {
  //do stuff with the webpack config...
  config.resolve.fallback = {
    ...config.resolve.fallback,
    stream: require.resolve("stream-browserify"),
    buffer: require.resolve("buffer"),
  };
  config.resolve.extensions = [...config.resolve.extensions, ".ts", ".js"];
  config.plugins = [
    ...config.plugins,
    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
    }),
  ];
  // console.log(config.resolve)
  // console.log(config.plugins)

  return config;
};
// const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
// const webpack = require("webpack");
// module.exports = {
//   // Other rules...
//   plugins: [
//     new NodePolyfillPlugin(),
//     new webpack.ProvidePlugin({
//       Buffer: ["buffer", "Buffer"],
//     }),
//     new webpack.ProvidePlugin({
//       process: "process/browser",
//     }),
//   ],
//   target: "node",
//   resolve: {
//     extensions: [".ts", ".js"],
//     fallback: {
//       stream: require.resolve("stream-browserify"),
//       buffer: require.resolve("buffer"),
//     },
//   },
// };
