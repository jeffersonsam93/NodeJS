
import axios from 'react-native-axios';
let url="http://172.16.1.43:8314/EEMServices/api/leave/"
let tryLogin=(username,password)=> {
  return new Promise((resolve, reject) => {
    axios.post(`${url}authentication`,{username:username,password:password})
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
        console.log(err);
      });
  });
  }

  export { tryLogin };