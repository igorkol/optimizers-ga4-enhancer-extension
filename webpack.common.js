const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
	entry: {
		popup: path.join(__dirname, 'src/popup/index.tsx'),
		background: path.join(__dirname, 'src/background.ts'),
		content: path.join(__dirname, 'src/content.ts'),
	},
	output: {
		path: path.join(__dirname, 'dist/js'),
		filename: '[name].js',
	},
	module: {
		rules: [
			{
				exclude: /node_modules/,
				test: /\.tsx?$/,
				use: 'ts-loader',
			},
			{
				exclude: /node_modules/,
				test: /\.scss$/,
				use: [
					{
						loader: 'style-loader', // Creates style nodes from JS strings
					},
					{
						loader: 'css-loader', // Translates CSS into CommonJS
					},
					{
						loader: 'sass-loader', // Compiles Sass to CSS
					},
				],
			},
		],
	},
	optimization: {
		minimize: true,
		minimizer: [new TerserPlugin({
			terserOptions: {
				// Terser minify options
				compress: {
					drop_console: true,
				},
			},
		})],
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js'],
	},
};
