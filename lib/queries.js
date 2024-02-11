const queryReviewPaths = {
  query: `page('reviews').children.flip`,
  select: {
    id: "page.slug",
  },
  pagination: {
    limit: 50,
  },
};

export { queryReviewPaths };
