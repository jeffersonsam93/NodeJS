
const mongoserver = require('../bin/mongoserver');
// Use connect method to connect to the server
const insertDocuments = (vals) => {
  return new Promise((resolve, reject) => {
    mongoserver.Connecttomongo().then((client) => {
      const database = client.db('temp');
      const collection = database.collection('documents');
      // Insert some documents
      collection.insertMany(vals, (retvals) => {
        console.log('Inserted documents into the collection');
        console.log(retvals);
        client.close();
        resolve('Successfully Inserted');
      });
    }).catch((err) => {
      reject(err);
      console.log(err);
    });
  });
  // Get the documents collection
};
const insertCollectionDocuments = (name, vals) => {
  return new Promise((resolve, reject) => {
    mongoserver.Connecttomongo().then((client) => {
      const database = client.db('temp');
      const collection = database.collection(name);
      // Insert some documents
      collection.insertMany(vals, (retvals) => {
        console.log('Inserted documents into the collection');
        console.log(retvals);
        client.close();
        resolve('Successfully Inserted');
      });
    }).catch((err) => {
      reject(err);
      console.log(err);
    });
  });
  // Get the documents collection
};
const updateDocuments = (vals, updvalue) => {
  return new Promise((resolve, reject) => {
    mongoserver.Connecttomongo().then((client) => {
      const database = client.db('temp');
      const collection = database.collection('documents');
      // Insert some documents
      collection.updateMany(
        vals
        , { $set: updvalue }, () => {
          resolve('Updated the document');
          client.close();
        },
      );
    }).catch((err) => {
      reject(err);
      console.log(err);
    });
  });
  // Get the documents collection
};
const DeleteDocuments = (delvalue) => {
  return new Promise((resolve, reject) => {
    mongoserver.Connecttomongo().then((client) => {
      const database = client.db('temp');
      const collection = database.collection('documents');
      // Insert some documents
      collection.deleteOne({ $set: delvalue }, () => {
        resolve('Deleted the document');
        client.close();
      });
    }).catch((err) => {
      reject(err);
      console.log(err);
    });
  });
  // Get the documents collection
};
const getallvals = (vals) => {
  return new Promise((resolve, reject) => {
    mongoserver.Connecttomongo().then((client) => {
      const database = client.db('temp');
      const collection = database.collection('documents');
      // Insert some documents
      if (!vals) {
        collection.find({}).toArray((finderr, docs) => {
          console.log('selected docs');
          client.close();
          resolve(docs);
        });
      } else {
        collection.find(vals).toArray((finderr, docs) => {
          console.log('selected docs');
          client.close();
          resolve(docs);
        });
      }
    }).catch((err) => {
      reject(err);
      console.log(err);
    });
  });
// Get the documents collection
};
const getalljointvals = (vals) => {
  return new Promise((resolve, reject) => {
    mongoserver.Connecttomongo().then((client) => {
      const database = client.db('temp');
      const collection = database.collection('documents');
      // Insert some documents
      if (!vals) {
        collection.find({}).toArray((finderr, docs) => {
          console.log('selected docs');
          client.close();
          resolve(docs);
        });
      } else {
        collection.find(vals).toArray((finderr, docs) => {
          console.log('selected docs');
          client.close();
          resolve(docs);
        });
      }
    }).catch((err) => {
      reject(err);
      console.log(err);
    });
  });
// Get the documents collection
};

module.exports = {
  insertDocuments,
  getallvals,
  updateDocuments,
  DeleteDocuments,
  insertCollectionDocuments,
  getalljointvals,
};
