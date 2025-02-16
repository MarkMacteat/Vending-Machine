const axios = require("axios");

const callApi = async () => {
  await axios.get("https://jsonplaceholder.typicode.com/").then((res) => {
    console.log(res.data);
  });
};

callApi;
