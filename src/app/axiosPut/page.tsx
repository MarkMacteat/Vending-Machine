import axios from "axios";

const newData = {
  product_id: 1,
  product_name: "นมไมโล",
};

axios
  .put("/api/product", newData)
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.log(error);
  });
