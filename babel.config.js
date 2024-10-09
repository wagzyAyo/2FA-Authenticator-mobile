module.exports = function(api) {
  api.cache(true);
  plugins: ['react-native-reanimated/plugin']
  return {
    presets: ['babel-preset-expo'],
  };
};
