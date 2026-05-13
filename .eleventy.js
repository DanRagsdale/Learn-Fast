import eleventyNavigationPlugin from "@11ty/eleventy-navigation";

export default function(eleventyConfig) {
	eleventyConfig.addPlugin(eleventyNavigationPlugin);

	eleventyConfig.addFilter('navigationPrevious', function (nav) {
		const flat = [];

		const visit = (items) => {
			for (const item of items) {
				if (item.url === this.page.url){
					return flat.pop();
				}
				flat.push(item);
				
				const childReturn = visit(item.children);
				if (childReturn) {
					return childReturn;
				}
			}
		}
		return visit(nav);
	});

	eleventyConfig.addFilter('navigationNext', function (nav) {
		const flat = []

		const visit = (items) => {
			for (const item of items) {
				if (flat.length && flat[flat.length - 1].url === this.page.url) {
					return item;
				}
				flat.push(item);

				const childReturn = visit(item.children);
				if (childReturn) {
					return childReturn;
				}
			}
		}
		return visit(nav);
	});

	eleventyConfig.addPassthroughCopy("assets");
	eleventyConfig.addPassthroughCopy("node_modules");

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