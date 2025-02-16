import axios from "axios";

// const request = async (id) => {
//   try {
//     const response = await axios.get(
//       `https://jsonplaceholder.typicode.com/posts/${id}`
//     );
//     return { status: 200, message: "success", data: response.data };
//   } catch (err) {
//     return { status: 500, message: "Error" };
//   }
// };

const request = (id) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((response) => {
        resolve({ status: 200, message: "success", data: response.data });
      })
      .catch((err) => {
        console.log(err);
        reject({ status: err.response.status, message: err.message });
      });
  });
};

request(101).then((response) => {
  console.log(response);
});
