
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
const MONGO_DB_MEDICAL = "Medical";
const MONGO_COLLECTION_USERS = "Users";


class MongoModel {
  constructor() {
  }

  async testConnection() {
    try {
      console.log("Pinging the mongo connection");
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
      await client.db(MONGO_DB_MEDICAL).command({ ping: 1 });
      console.log(`Pinged your deployment. You successfully connected to ${MONGO_DB_MEDICAL}  MongoDB!`);
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
}

module.exports = MongoModel;
