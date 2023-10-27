const MongoModel = require('../models/mongo');
const MONGO_DB_MEDICAL = "Medical";
const MONGO_COLLECTION_BLOODPRESSURE = "bloodPressure";

// Interfaces
// bloodPressure
userName: String
diastole: Number
systole: Number
created_at: Number

module.exports = {
    updateBloodPressure: ({ chatId, userName, date, messageText, fullName }) => {
        try {
            const bloodPressureSplits = messageText?.split("/") ?? undefined;
            const systole = bloodPressureSplits?.[0];
            const diastole = bloodPressureSplits?.[1];
            if (diastole && systole) {
                const insertData = {
                    userName: userName,
                    fullName: fullName,
                    chatId: chatId,
                    createdAt: date,
                    diastole: Number(diastole),
                    systole: Number(systole)
                };
                return (new MongoModel()).insertOne(MONGO_DB_MEDICAL, MONGO_COLLECTION_BLOODPRESSURE, insertData);
            }
            else {
                return Promise.reject("Diastole and Systole values are not provided.")
            }

        }
        catch (error) {
            const errMsg = "UPDATE BLOOD PRESSURE - Error: " + error;
            console.log(errMsg);
            return Promise.reject(errMsg)
        }

    },
    fetchBloodPressure: (chatId) => {
        try {
            const options = { query: { chatId }, projection: { _id: 0, diastole: 1, systole: 1, createdAt: 1 } };
            return (new MongoModel()).find(MONGO_DB_MEDICAL, MONGO_COLLECTION_BLOODPRESSURE, options);
        }
        catch (error) {
            const errMsg = "GET BLOOD PRESSURE - Error: " + error;
            console.log(errMsg);
            return Promise.reject(errMsg)
        }
    }
}