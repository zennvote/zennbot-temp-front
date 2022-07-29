module.exports = {
	globDirectory: 'build/',
	globPatterns: [
		'**/*.{json,png,ico,txt,js,css}'
	],
	swDest: 'build/service-worker.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};