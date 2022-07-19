import axios from "axios";

let myUrl = 'http://localhost:8080/'; //development

if (process.env.NODE_ENV === 'production') {
  myUrl = '/';
}
const podcastApi =  axios.create({
  baseURL: myUrl,
});


export default podcastApi