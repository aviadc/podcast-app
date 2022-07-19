import axios from "axios";

let myUrl = 'http://localhost:5000/'; //development

if (process.env.NODE_ENV === 'production') {
  myUrl = '';
}
const podcastApi =  axios.create({
  baseURL: myUrl,
});


export default podcastApi