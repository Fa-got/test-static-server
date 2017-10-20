const fs = require("fs");
const path = require("path");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin"); //eslint-disable-line

const nodeModules = {};
fs
	.readdirSync("node_modules")
	.filter(x => [".bin"].indexOf(x) === -1)
	.forEach(mod => (nodeModules[mod] = `commonjs ${mod}`));

module.exports = {
	// context: __dirname + '/source/',
	entry: {
		js: path.resolve(`${__dirname}/index.js`)
	},
	target: "node",
	output: {
		path: path.resolve(`${__dirname}/build/`),
		publicPath: "/build/",
		filename: "bundle.min.js"
	},
	module: {
		rules: [
			{
				test: /\.json$/,
				use: "json-loader"
			},
			{
				test: /\.js$/,
				exclude: [/node_modules/],
				loader: "babel-loader"
			}
		]
	},
	externals: nodeModules,
	plugins: [
		new UglifyJSPlugin({
			minimize: true,
			output: {
				comments: false
			}
		})
	]
};
