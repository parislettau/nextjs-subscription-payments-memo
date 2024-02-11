import axios from "axios";
// make an api request to Kirby
// https://github.com/getkirby/kql
//
// Kirby's Query Language API combines the flexibility of Kirby's data structures, the power of GraphQL and the simplicity of REST.
// The Kirby QL API takes POST requests with standard JSON objects and returns highly customized results that fit your application.
//
// Playground
// You can play in our KQL sandbox. The sandbox is based on the Kirby starterkit.
// https://kql.getkirby.com/
//
export async function queryKirby(query) {
  const api = process.env.API_KQL;
  const user = process.env.KIRBY_USER;
  const password = process.env.KIRBY_PASSWORD;
  const auth = {
    username: user,
    password: password,
  };
  const select = query;
  const response = await axios.post(api, select, { auth });
  // {
  //   "code": 200,
  //   "result": {
  //     "data": [
  //       {
  //         "key": "prop",
  //       }
  //     ],
  //     "pagination": {
  //       "page": num,
  //       "pages": num,
  //       "offset": num,
  //       "limit": num,
  //       "total": num
  //     }
  //   },
  //   "status": "ok"
  // }
  const result = response.data.result;

  return result;
}
