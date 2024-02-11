import axios from "axios";

// general pages api
// api for product content
export async function getVenues() {
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
      query: `site.find('venues').children`,
      select: {
        title: true,
      },
    },
    { auth }
  );

  const venues = response.data.result.data;

  return venues;
}
