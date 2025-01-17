import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5001/scff-47ab7/us-central1",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
