import axios from "axios";
exports.axios_token = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
  headers: {
    token: `${localStorage.getItem("token")}`,
  },
});

exports.axios_base = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
});
