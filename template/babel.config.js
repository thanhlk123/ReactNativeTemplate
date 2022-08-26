module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          components: './src/components/',
          utils: './src/utils/',
          screens: './src/screens/',
          constants: './src/constants/',
          assets: './src/assets/',
          actions: './src/redux/actions/',
          sagas: './src/redux/sagas/',
          reducers: './src/redux/reducers/',
          selectors: './src/redux/selectors/',
          apis: './src/apis/',
          helpers: './src/helpers/',
          parses: './src/redux/parses/',
          store: './src/redux/store/',
          language: './src/i18n/',
          actionsType: './src/redux/actionsType',
        },
      },
    ],
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
        blacklist: null,
        whitelist: null,
        safe: false,
        allowUndefined: true,
      },
    ],
  ],
};
