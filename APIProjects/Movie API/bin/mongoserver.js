const { MongoClient } = require('mongodb');
// Connection URL
const url = 'mongodb://192.168.99.100:27017/temp';


const Connecttomongo = () => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, (err, client) => {
      if (err) {
        reject(err);
      } else {
        console.log('Connected successfully to server');
        resolve(client);
      }
    });
  });
};

module.exports = {
  Connecttomongo,
};
