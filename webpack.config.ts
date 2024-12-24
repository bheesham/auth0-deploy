import { readFileSync } from 'node:fs';
import path from 'path';
import webpack from 'webpack';

// DEBT(bhee) This is a hack so we don't need to list each dependency.
const packageJson = JSON.parse(readFileSync("package.json", 'utf-8'));
const dependencies = Object.keys(packageJson.dependencies || {})
    .map((name) => name.replaceAll('.', '\\.'))
    .concat("base case for if there are no dependencies")
    .join('|');
const dependenciesRegex = new RegExp(`^(${dependencies})`);

const config: webpack.Configuration = {
  entry: {
    awsSaml: {
      import: './tf/actions/awsSaml.ts',
      library: {
        type: 'commonjs-static',
      },
    },
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'tf/actions/dist'),
    clean: true,
    chunkFormat: 'commonjs',
  },
  externals: [
    function(ctx, callback) {
      if (ctx.request && dependenciesRegex.test(ctx.request)) {
        return callback(null, `node-commonjs ${ctx.request}`);
      }
      callback()
    },
  ],
  target: 'es2022',
  mode: 'production',
  optimization: {
    minimize: false,
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
    preferRelative: true,
  },
};

export default config;
