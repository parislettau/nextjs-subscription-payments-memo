import axios from "axios";
//
//
//
// api for shop content
export async function getShop() {
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
      query: `page('shop').children`,
      select: {
        title: "page.title",
        id: "page.id",
        slug: "page.slug",
        description: "page.description.kirbytext",
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
            caption: "file.caption.kirbytextinline",
            height: true,
            width: true,
          },
        },
      },
    },
    { auth }
  );

  const data = response.data.result.data;

  return data;
}
//
//
//
// api for product content
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
        description: "page.description.kirbytext",
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

//
//
//
//
// api for product content
export async function getProducts() {
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
      query: `site.index.filterBy('template', 'product').published.flip`,
      select: {
        id: "page.id",
        slug: "page.slug",
        url: "page.url",
        title: "page.title.value",
        description: "page.description.value",
        price: "page.price.value",
        src: "page.image.url",
        srcset: 'page.image.srcset("default")',
        width: "page.image.width",
        height: "page.image.height",
      },
    },
    { auth }
  );

  const products = response.data.result.data;

  return products;
}
