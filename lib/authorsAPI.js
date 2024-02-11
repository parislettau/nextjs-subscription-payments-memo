import axios from "axios";

// api for writers
export async function getAuthors() {
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
      query: `page('/authors').children`,
      select: {
        id: "page.id",
        slug: "page.slug",
      },
    },
    { auth }
  );

  const data = response.data.result.data;

  return data;
}

// api for author
export async function getAuthor(id) {
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
      query: `page('authors/${id}')`,
      select: {
        title: "page.title",
        id: true,
        bio: "page.text.kirbytext",
        reviews: {
          query: `site.find("reviews").children.filterBy("author", page.title,",").flip`,
          select: {
            article: {
              query: "page",
              select: {
                category: "page.category",
                id: true,
                slug: true,
                url: true,
                href: "page.slug",
                title: true,
                author: true,
                date: "page.date",
                open: "page.opened",
                close: "page.closed",
                exhibitions: "page.exhibitions.toStructure",
                venue: true,
                coverSrcset: "page.cover.toFile.srcset('default')",
                cover: {
                  query: "page.cover.toFile",
                  // select: {
                  //   url: true,
                  //   srcset: ".srcset('default')",
                  //   //             height: true,
                  //   //             width: true,
                  // },
                },
              },
            },
          },
        },
      },
    },
    { auth }
  );

  const data = response.data.result;
  return data;
}

// getStaticPaths for authors
export async function getAuthorsPaths() {
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
      query: `page('authors').children.flip`,
      select: {
        id: "page.slug",
      },
      pagination: {
        limit: 1000,
      },
    },
    { auth }
  );

  // const data = response.data.result.data.slice(0, 2);
  const data = response.data.result.data;

  return data;
}
