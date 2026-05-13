module.exports = function(eleventyConfig) {
	eleventyConfig.addPassthroughCopy("assets");
	eleventyConfig.addPassthroughCopy("node_modules");
	eleventyConfig.setServerOptions({});

	return {
		markdownTemplateEngine: "njk",
		dataTemplateEngine: "njk",
		htmlTemplateEngine: 'njk',

		dir: {
			input: "src",
			output: "_site",
		}
	};
};