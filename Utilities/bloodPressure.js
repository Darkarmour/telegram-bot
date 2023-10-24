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
    updateBloodPressure: ({ chatId, userName, date, messageText }) => {
        try {
            const bloodPressureSplits = messageText?.split("/") ?? undefined;
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
            const errMsg = "UPDATE BLOOD PRESSURE - Error: " + error;
            console.log(errMsg);
            return Promise.reject(errMsg)
        }

    }
}