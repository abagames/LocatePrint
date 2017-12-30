module.exports = function (env) {
  var config = {
    resolve: {
      extensions: ['.ts', '.js'],
      modules: ['node_modules', 'web_modules']
    },
    devServer: {
      contentBase: 'docs'
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          exclude: /(node_modules|web_modules)/,
          loader: 'awesome-typescript-loader'
        }
      ]
    }
  };
  if (env == null || env.sample_game == null) {
    config.entry = './src/locate-print/index.ts';
    config.output = {
      path: __dirname + '/docs/locate-print',
      filename: 'index.js',
      library: ['locate-print'],
      libraryTarget: 'umd'
    };
  } else {
    var sampleGame = env.sample_game;
    config.entry = './src/samples/' + sampleGame + '.ts';
    config.output = {
      path: __dirname + '/docs/samples',
      publicPath: '/samples',
      filename: sampleGame + '.js'
    };
    config.devtool = 'source-map';
  }
  return config;
}
