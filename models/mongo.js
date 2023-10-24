
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env['MONGO_CONNECTION_STRING'] + '/?retryWrites=true&w=majority';

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

var dbObj = null;
class MongoModel {
  constructor() {
  }

  async getDbObj(db) {
    if (!dbObj) {
      console.log("Connecting", dbObj);
      await client.connect();
      dbObj = await client.db(db);
      return dbObj;
    }
    else {
      return dbObj;
    }
  }

  async testConnection() {
    try {
      console.log(`TEST CONNECTION`);
      await client.connect();
      await client.db(MONGO_DB_MEDICAL).command({ ping: 1 });
    }
    catch (error) {
      console.log(`TEST CONNECTION - Error: ${JSON.stringify(error)}`);
    }
  }

  async insertOne(db, collection, data) {
    try {
      console.log(`INSERT ONE - DB: ${db} - COLLECTION: ${collection} - Data: ${JSON.stringify(data)}`);
      const dbObj = await this.getDbObj(db);
      const response = await dbObj.collection(collection).insertOne(data);
      console.log(`INSERT ONE RESPONSE - DB: ${db} - COLLECTION: ${collection} - Data: ${JSON.stringify(data)}`);
      return response;
    }
    catch (error) {
      console.log(`INSERT ONE - DB: ${db} - COLLECTION: ${collection} - Error: ${JSON.stringify(error)}`);
      return Promise.reject(error);
    }
  }
}

module.exports = MongoModel;

