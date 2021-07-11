module.exports = {
  presets: [
    "@babel/preset-env",
    "@babel/preset-typescript",
    [
      "@babel/preset-react",
      // adding config to support .jsx without importing React
      {
        runtime: "automatic",
      },
    ],
  ],
};
