const MongoModel = require('../models/mongo');
const MONGO_DB_MEDICAL = "Medical";
const MONGO_COLLECTION_bloodPressure = "bloodPressure";

// Interfaces
// bloodPressure
userName: String
diastole: Number
systole: Number
created_at: Number

module.exports = {
    updateBP: ({ chatId, userName, date, messageText }) => {
        try {
            const msgTextSplits = messageText?.toUpperCase().split("BP=");
            const bloodPressureSplits = msgTextSplits[1]?.split("/") ?? undefined;
            const systole = bloodPressureSplits?.[0];
            const diastole = bloodPressureSplits?.[1];
            if (diastole && systole) {
                const insertData = {
                    userName: userName,
                    chatId: chatId,
                    createdAt: date,
                    diastole: Number(diastole),
                    systole: Number(systole)
                };
                return (new MongoModel()).insertOne(MONGO_DB_MEDICAL, MONGO_COLLECTION_bloodPressure, insertData)
            }
            else {
                return Promise.reject("Diastole and Systole values are not provided.")
            }

        }
        catch (error) {
            const errMsg = "UPDATE BP - Error: " + error;
            console.log(errMsg);
            return Promise.reject(errMsg)
        }

    }
}