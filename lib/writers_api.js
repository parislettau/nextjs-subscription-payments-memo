import axios from "axios";


// api for writers
export async function getWriters() {
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

// api for writer
export async function getProduct(page, context) {
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
      query: `page('${page}${context.params.id}')`,
      select: {
        title: "page.title",
        id: "page.id",
        slug: "page.slug",
        description: "page.description",
        details: "page.details",
        price: "page.price",
        weight: "page.weight",
        width: "page.width",
        height: "page.height",
        length: "page.length",
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
      },
    },
    { auth }
  );

  const data = response.data.result;

  return data;
}
