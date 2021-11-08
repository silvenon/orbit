// @noflow
const path = require("path");

module.exports = {
  core: { builder: "webpack5" },
  staticDirs: [path.resolve(__dirname, "../static")],
  stories: ["../src/**/*.stories.*"],
  addons: [
    "@storybook/addon-knobs",
    "@storybook/addon-actions",
    "@storybook/addon-viewport",
    "@storybook/addon-backgrounds",
  ],
  webpackFinal(config) {
    config.module.rules.push({
      test: /\.jsx?$/,
      use: [
        {
          options: { envName: "esm" },
          loader: require.resolve("babel-loader"),
        },
      ],
      exclude: /node_modules\/(?!(loki)\/).*/, // Loki is not transpilled, throws error in IE 11
    });

    return config;
  },
};
