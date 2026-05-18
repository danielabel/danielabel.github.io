module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/styles");
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy({ "src/.nojekyll": ".nojekyll" });
  eleventyConfig.addPassthroughCopy({ "CNAME": "CNAME" });

  // In production builds, exclude drafts/ directories entirely
  if (process.env.ELEVENTY_RUN_MODE === "build") {
    eleventyConfig.ignores.add("src/way/posts/drafts");
    eleventyConfig.ignores.add("src/work/posts/drafts");
  }

  // Way collection — sorted newest first, drafts filtered in production
  eleventyConfig.addCollection("way", function (collectionApi) {
    return collectionApi
      .getFilteredByTag("way")
      .filter(
        (p) => process.env.ELEVENTY_RUN_MODE !== "build" || !p.data.draft
      )
      .sort((a, b) => b.date - a.date);
  });

  // Work collection — same pattern, ready for when content migrates in
  eleventyConfig.addCollection("work", function (collectionApi) {
    return collectionApi
      .getFilteredByTag("work")
      .filter(
        (p) => process.env.ELEVENTY_RUN_MODE !== "build" || !p.data.draft
      )
      .sort((a, b) => b.date - a.date);
  });

  eleventyConfig.addFilter("readableDate", function (date) {
    return new Date(date).toLocaleDateString("en-GB", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
  };
};
