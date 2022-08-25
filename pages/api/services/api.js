import axios from "axios";

const api = axios.create({
  baseURL: "https://api.spotify.com",
});

export default api;