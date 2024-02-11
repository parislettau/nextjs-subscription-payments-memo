import axios from "axios";

// getStaticPaths for reviews

export async function getImage(image) {
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
      query: `site.image("${image}")`,
    },
    { auth }
  );

  // const data = response.data.result.data.slice(0, 2);
  const data = response.data.result.data;

  return data;
}

// getStaticPaths for reviews
export async function getPaths() {
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
      query: `page('reviews').children.flip`,
      select: {
        id: "page.slug",
      },
      pagination: {
        limit: 50,
      },
    },
    { auth }
  );

  // const data = response.data.result.data.slice(0, 2);
  const data = response.data.result.data;

  return data;
}

// weather apis
// general pages api
export async function Temp(api) {
  const res = await fetch(api);
  const data = await res.json();
  return data;
}

// make an api request to any page
// api for article content
export async function getPage(query) {
  const api = process.env.API_KQL;
  const user = process.env.KIRBY_USER;
  const password = process.env.KIRBY_PASSWORD;
  const auth = {
    username: user,
    password: password,
  };
  const select = query;
  const response = await axios.post(api, select, { auth });

  const data = response.data.result;

  return data;
}

// api for articles getStaticPaths
export async function getArticles(page) {
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
      query: `page('${page}').children`,
      select: {
        // text: "page.text.kirbytext",
        // html: "page.text.kirbytext",
        date: "page.date",
        open: "page.opened",
        close: "page.closed",
        venue: true,
        template: "page.template",
        coverSrcset: "page.cover.toFile.srcset('default')",
        cover: {
          query: "page.cover.toFile",
          select: {
            url: true,
            // srcset: ".srcset('default')",
            height: true,
            width: true,
          },
        },
        caption: "page.cover_caption.html",
        id: true,
        slug: true,
        url: true,
        title: true,
        bio: true,
        issue: "page.date.toDate('W')",
        artists: true,
        images: {
          query: "page.images",
          select: {
            url: true,
            srcset: "toFile.srcset('default')",
            caption: true,
            height: true,
            width: true,
          },
        },
        author: true,
      },
    },
    { auth }
  );

  const data = response.data.result;

  return data;
}

// layout
export async function getLayout() {
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
      query: "site.layout",
    },
    { auth }
  );

  const data = JSON.parse(response.data.result);

  return data;
}

// api for article content
export async function getArticle(page, slug) {
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
      query: `page('${page}${slug}')`,
      select: {
        // text: "page.text.kirbytext",
        previous: "page.prev.slug",
        category: "page.category",
        html: "page.text.kirbytext",
        date: "page.date",
        open: "page.opened",
        close: "page.closed",
        exhibitions: "page.exhibitions.toStructure",
        venue: true,
        template: "page.template",
        coverSrcset: "page.cover.toFile.srcset('default')",
        cover: {
          query: "page.cover.toFile",
          select: {
            url: true,
            srcset: ".srcset('default')",
            height: true,
            width: true,
            caption: true,
          },
        },
        caption: "page.cover_caption.html",
        id: true,
        slug: true,
        url: true,
        title: true,
        bio: "page.bio.kirbytext",
        issue: "page.date.toDate('W')",
        artists: true,
        images: {
          query: "page.images.sortBy('sort', 'asc')",
          select: {
            src: "file.url",
            // srcset: "file.srcset('default')",
            subHtml: "file.caption.kirbytextinline",
            height: true,
            width: true,
          },
        },
        author: true,
      },
    },
    { auth }
  );

  const data = response.data.result;

  return data;
}

// api for article meta excluding all the content
export async function getArticleMeta(page, slug) {
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
      query: `page('${page}${slug}')`,
      select: {
        previous: "page.prev.slug",
        date: "page.date",
        open: "page.opened",
        close: "page.closed",
        exhibitions: "page.exhibitions.toStructure",
        venue: true,
        template: "page.template",
        coverSrcset: "page.cover.toFile.srcset('default')",
        cover: {
          query: "page.cover.toFile",
          select: {
            url: true,
            height: true,
            width: true,
          },
        },
        caption: "page.cover_caption.html",
        id: true,
        slug: true,
        url: true,
        title: true,
        bio: true,
        issue: "page.date.toDate('W')",
        artists: true,
        author: true,
      },
    },
    { auth }
  );

  const data = response.data.result;

  return data;
}

// api for article meta excluding all the content
export async function getArticleRandom() {
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
      query: `page('reviews').children.shuffle.first`,
      select: {
        date: "page.date",
        open: "page.opened",
        close: "page.closed",
        exhibitions: "page.exhibitions.toStructure",
        venue: true,
        template: "page.template",
        coverSrcset: "page.cover.toFile.srcset('default')",
        cover: {
          query: "page.cover.toFile",
          select: {
            url: true,
            // srcset: ".srcset('default')",
            height: true,
            width: true,
          },
        },
        caption: "page.cover_caption.html",
        id: true,
        slug: true,
        url: true,
        title: true,
        bio: true,
        issue: "page.date.toDate('W')",
        artists: true,
        author: true,
      },
    },
    { auth }
  );

  const data = response.data.result;

  return data;
}

// api for PREVIOUS article content
export async function getLinks(page) {
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
      query: `page('${page}')`,
      select: {
        date: "page.date",
        open: "page.opened",
        close: "page.closed",
        exhibitions: "page.exhibitions.toStructure",
        venue: true,
        coverSrcset: "page.cover.toFile.srcset('default')",
        cover: {
          query: "page.cover.toFile",
          select: {
            url: true,
            // srcset: ".srcset('default')",
            height: true,
            width: true,
          },
        },
        // caption: "page.cover_caption.html",
        id: true,
        slug: true,
        url: true,
        title: true,
        author: true,
      },
    },
    { auth }
  );

  const data = response.data.result;

  return data;
}

// general pages api
export async function getPages() {
  const res = await fetch(process.env.API_JSON);
  const data = await res.json();

  return data;
}
