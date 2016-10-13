const configuration = {
	files: [
		{ pattern: 'tests/**/**/**.*', watched: true }
	],
	preprocessors: {
		'tests/**/**.*': ['webpack'],
		// Exclude the tests in the coverage report
		'!**/**/**.test.js': ['coverage']
	},
	customLaunchers: {
		Chrome_travis_ci: {
			base: 'Chrome',
			flags: ['--no-sandbox']
		}
	},
	webpack: {
		module: {
			loaders: [
				{
					test: /\.js/,
					exclude: /node_modules/,
					loader: 'babel-loader',
					query: {
						"plugins": [
							"istanbul",
							"transform-runtime"
						],
						"presets" : ["es2015", "es2017"]
					}
				}
			]
		},
		node: {
			// Force webpack to replace fs with an empty package
			fs: "empty"
		},
		watch: true
	},
	webpackServer: {
		noInfo: true
	},
	frameworks: ['mocha'],
	reporters: ['mocha', 'coverage'],
	browsers: ['Chrome'],
	failOnEmptyTestSuite: true,
	singleRun: true
};

if (!process.env.TRAVIS) {
	configuration.browsers = ['Chrome_travis_ci']
}

module.exports = function(config) {
	config.set(configuration);
};