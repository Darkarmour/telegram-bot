const TelegramBot = require('node-telegram-bot-api');
const token = process.env['TELEGRAM_BOT_TOKEN'];
const bot = new TelegramBot(token, { polling: true });

const bloodPressure = require('./Utilities/bloodPressure');
const bodyWeight = require('./Utilities/bodyWeight');

bot.setMyCommands([
    { command: "/start", description: "help command to know the bot" },
    { command: "/updatebloodpressure", description: "updates blood pressure" },
    { command: "/fetchbloodpressure", description: "fetches blood pressure" }
]);

bot.on('message', async (msg) => {
    console.log("On Message", msg);
    const chatId = msg.chat.id;
    const messageText = msg.text;
    const userName = msg.chat.username;
    const date = msg.date;
    const fullName = (msg.chat?.first_name + " " + msg.chat?.last_name).trim();
    const replyMessage = msg?.reply_to_message;
    if (messageText == "/start") {
        const htmlMarkup = `
Welcome to <b>JP's Utilities BOT</b>!

I can help you to use this bot. You can control me by sending these commands:

<b>Medical</b>
/updatebloodpressure - updates blood pressure
/fetchbloodpressure - fetches blood pressure
/updatebodyweight - updates body weight
/fetchbodyweight - fetches body weight
        `;

        bot.sendMessage(chatId, htmlMarkup, { parse_mode: "HTML" });
    }
    else if (messageText == "/fetchbloodpressure") {
        bot.sendMessage(chatId, "Please wait while we are fetching your blood pressure...");
        bloodPressure.fetchBloodPressure(chatId).then((response) => {
            console.log("FETCH BLOOD PRESSURE - RESPONSE: ", JSON.stringify(response));
            if (response?.length) {
                let htmlMarkup = '';
                response.forEach(element => {
                    const date = new Date(element.createdAt * 1000);
                    const dateTime = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes();
                    htmlMarkup += `<b>${dateTime}</b>
${element.systole}/${element.diastole}
-------------------------------------
`;
                });
                bot.sendMessage(chatId, htmlMarkup, { parse_mode: "HTML" });
            }
            else {
                bot.sendMessage(chatId, "You have not yet recorded blood pressure. Start updating using /updatebloodpressure command");
            }
        }).catch((error) => {
            console.log("FETCH BLOOD PRESSURE - ERROR: ", JSON.stringify(error));
            bot.sendMessage(chatId, "Error while fetching blood pressure, try again later!");
        })
    }
    else if (messageText == "/fetchbodyweight") {
        bot.sendMessage(chatId, "Please wait while we are fetching your body weight...");
        bodyWeight.fetchBodyWeight(chatId).then((response) => {
            console.log("FETCH BODY WEIGHT - RESPONSE: ", JSON.stringify(response));
            if (response?.length) {
                let htmlMarkup = '';
                response.forEach(element => {
                    const date = new Date(element.createdAt * 1000);
                    const dateTime = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes();
                    htmlMarkup += `<b>${dateTime}</b>
${element.weightInKgs} Kgs
-------------------------------------
`;
                });
                bot.sendMessage(chatId, htmlMarkup, { parse_mode: "HTML" });
            }
            else {
                bot.sendMessage(chatId, "You have not yet recorded body weight. Start updating using /updatebodyweight command");
            }
        }).catch((error) => {
            console.log("FETCH BODY WEIGHT - ERROR: ", JSON.stringify(error));
            bot.sendMessage(chatId, "Error while fetching body weight, try again later!");
        })
    }
    else if (messageText == "/updatebloodpressure") {
        bot.sendMessage(chatId, "Provide the blood pressure details in the format [SYSTOLE VALUE]/[DIASTOLE VALUE] (Eg: 120/80) tagging this message");
    }
    else if (messageText == "/updatebodyweight") {
        bot.sendMessage(chatId, "Provide the body weight in kgs tagging this message");
    }
    else if (replyMessage && replyMessage.text.startsWith("Provide the blood pressure details")) {
        bot.sendMessage(chatId, "Please wait while we are updating your blood pressure...");
        bloodPressure.updateBloodPressure({ chatId, userName, date, messageText, fullName }).then((response) => {
            console.log("UPDATE BLOOD PRESSURE - RESPONSE: ", JSON.stringify(response));
            bot.sendMessage(chatId, "Hurray, blood pressure has been updated!");
        }).catch((error) => {
            console.log("UPDATE BLOOD PRESSURE - ERROR: ", JSON.stringify(error));
            bot.sendMessage(chatId, "Error while updating blood pressure, try again later!");
        })
    }
    else if (replyMessage && replyMessage.text.startsWith("Provide the body weight")) {
        bot.sendMessage(chatId, "Please wait while we are updating your body weight...");
        bodyWeight.updateBodyWeight({ chatId, userName, date, messageText, fullName }).then((response) => {
            console.log("UPDATE BODY WEIGHT - RESPONSE: ", JSON.stringify(response));
            bot.sendMessage(chatId, "Hurray, body weight has been updated!");
        }).catch((error) => {
            console.log("UPDATE BODY WEIGHT - ERROR: ", JSON.stringify(error));
            bot.sendMessage(chatId, "Error while updating body weight, try again later!");
        })
    }
    else {
        bot.sendMessage(chatId, "Command not included!");
    }

    // const options = {
    //     reply_markup: {
    //         inline_keyboard: [
    //             [{ text: 'Yes', callback_data: 'existing_user' }],
    //             [{ text: 'No', callback_data: 'new_user' }],
    //         ]
    //     }
    // };
    // bot.sendMessage(chatId, 'Are you an existing user?', options);


});

bot.on('callback_query', (callback_data) => {
    console.log("Callback data");
    // if (query.data == "existing_user") {
    //     bot.sendMessage("New user development in progress...");
    // }
    // else if (query.data == "new_user") {
    //     bot.sendMessage("New user development in progress...");
    // }

});

module.exports = bot;