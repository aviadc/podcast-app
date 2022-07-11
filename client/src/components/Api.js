import axios from "axios";

let myUrl = 'http://localhost:8080/api/user/'; //development

// if (process.env.NODE_ENV === 'production') {
//   myUrl = 'api/user';
// }
const podcastApi =  axios.create({
  baseURL: myUrl,
});


export default podcastApi