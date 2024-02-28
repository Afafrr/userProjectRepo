import axios from "axios";

export const getUsers = async () => {
  return axios
    .get("https://reqres.in/api/users")
    .then((res) => {
      return res.data.data;
    })
    .catch((err) => {
      throw new Error(err.message);
    });
};
