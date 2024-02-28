import axios from "axios";

type Json = {
  email: string;
  password: string;
};

export const postAuth = async (url: string, json: Json) => {
  return axios.post(`https://reqres.in/api/${url}`, json, {
    headers: { "Content-Type": "application/json" },
  });
};
