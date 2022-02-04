import axios from "axios";

const podcastApi = axios.create({
  baseURL: "http://localhost:5000/api/user/"
});

export default podcastApi