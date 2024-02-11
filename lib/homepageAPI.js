import axios from "axios";

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
