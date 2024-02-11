import axios from "axios";

// general pages api
export async function getPages() {
  const res = await fetch(process.env.API_JSON);
  const data = await res.json();

  return data;
}
