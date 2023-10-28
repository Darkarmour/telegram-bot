const MongoModel = require('../models/mongo');
const MONGO_DB_MEDICAL = "Medical";
const MONGO_COLLECTION_BODY_WEIGHT = "bodyWeight";

// Interfaces
// bodyWeight
userName: String
weightInKgs: Number //Float
created_at: Number

module.exports = {
    updateBodyWeight: ({ chatId, userName, date, messageText, fullName }) => {
        try {
            const weightInKgs = messageText ? parseFloat(messageText) : undefined;
            if (weightInKgs) {
                const insertData = {
                    userName: userName,
                    fullName: fullName,
                    chatId: chatId,
                    createdAt: date,
                    weightInKgs: weightInKgs
                };
                return (new MongoModel()).insertOne(MONGO_DB_MEDICAL, MONGO_COLLECTION_BODY_WEIGHT, insertData);
            }
            else {
                return Promise.reject("Body weight is not provided.")
            }

        }
        catch (error) {
            const errMsg = "UPDATE BODY WEIGHT - Error: " + error;
            console.log(errMsg);
            return Promise.reject(errMsg)
        }

    },
    fetchBodyWeight: (chatId) => {
        try {
            const options = { query: { chatId }, projection: { _id: 0, weightInKgs: 1, createdAt: 1 } };
            return (new MongoModel()).find(MONGO_DB_MEDICAL, MONGO_COLLECTION_BODY_WEIGHT, options);
        }
        catch (error) {
            const errMsg = "GET BODY WEIGHT - Error: " + error;
            console.log(errMsg);
            return Promise.reject(errMsg)
        }
    }
}