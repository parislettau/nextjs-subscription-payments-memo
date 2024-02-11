import axios from "axios";

// api for PREVIOUS article content
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
      query: "page('reviews').children.flip",
      select: {
        category: "page.category",
        slug: true,
        date: "page.date",
        author: true,
        open: "page.opened",
        year: "page.date.todate('Y')",
        close: "page.closed",
        exhibitions: "page.exhibitions.toStructure",
        venue: true,
        cover: {
          query: "page.cover.toFile",
          select: {
            srcThumbs: "file.resize('450').url",
            src: "file.url",
            srcset: "file.srcset('default')",
            width: "file.width",
            height: "file.height",
          },
        },

        id: true,
        url: true,
        title: true,
        artists: true,
        author: true,
      },
      pagination: {
        limit: 1000,
      },
    },
    { auth }
  );

  const data = response.data.result;

  return data;
}
