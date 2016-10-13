module.exports = function(config) {
	if (!process.env.TRAVIS) {
		config.set({
			files: [
				{ pattern: 'tests/**/**/**.*', watched: true }
			],
			preprocessors: {
				'tests/**/**.*': ['webpack'],
				// Exclude the tests in the coverage report
				'!**/**/**.test.js': ['coverage']
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
		});
	} else {
		config.set(travisConfig);
	}
};

var travisConfig = {
	customLaunchers: {
		Chrome_travis_ci: {
			base: 'Chrome',
			flags: ['--no-sandbox']
		}
	}
};