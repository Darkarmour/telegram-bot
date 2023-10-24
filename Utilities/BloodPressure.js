const MongoModel = require('../models/mongo');
const MONGO_DB_MEDICAL = "Medical";
const MONGO_COLLECTION_BLOODPRESSURE = "BloodPressure";

// Interfaces
// BloodPressure
userName: String
diastole: Number
systole: Number
created_at: Number

module.exports = {
    updateBP: ({ chatId, userName, date, messageText }) => {
        try {
            let msgTextSplits = messageText?.toUpperCase().split("BP-");
            let bloodPressureSplits = msgTextSplits[1]?.split("/") ?? undefined;
            let systole = bloodPressureSplits?.[0];
            let diastole = bloodPressureSplits?.[1];
            let insertData = {
                userName: userName,
                chatId: chatId,
                createdAt: date,
                diastole: diastole,
                systole: systole
            };
            return (new MongoModel()).insertOne(MONGO_DB_MEDICAL, MONGO_COLLECTION_BLOODPRESSURE, insertData)
        }
        catch(error) {
            const errMsg = "UPDATE BP - Error: " + error;
            console.log(errMsg);
            return Promise.reject(errMsg)
        }

    }
}