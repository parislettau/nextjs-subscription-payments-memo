import axios from "axios";

// general pages api
// api for product content
export async function getReviews() {
  const api = process.env.API_KQL;
  const user = process.env.KIRBY_USER;
  const password = process.env.KIRBY_PASSWORD;
  const auth = {
    username: user,
    password: password,
  };
  const response = await axios.post(
    api,
    {
      query: `site.index.filterBy('template', 'review').published.flip`,
      select: {
        id: true,
        slug: true,
        title: true,
        url: true,
        artists: true,
        author: true,
        venue: true,
        category: true,
        date: "page.date.value",
        year: "page.date.toDate('Y')",
        open: "page.opened",
        close: "page.closed",
        exhibitions: "page.exhibitions.toStructure",
        template: "page.template",
        cover: {
          query: "page.cover.toFile",
          select: {
            src: "file.resize('2000').url",
            srcset: "file.srcset('default')",
            height: true,
            width: true,
            // srcThumbs: "file.resize('450').url",
          },
        },
      },
    },
    { auth }
  );

  const products = response.data.result.data;

  return products;
}
