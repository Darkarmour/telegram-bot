const TelegramBot = require('node-telegram-bot-api');
const bloodPressure = require('./Utilities/bloodPressure');
const token = process.env['TELEGRAM_BOT_TOKEN'];
const bot = new TelegramBot(token, { polling: true });

bot.setMyCommands([
    { command: "/start", description: "help command to know the bot" },
    { command: "/updatebloodpressure", description: "updates blood pressure of the current telegram user" }]);

bot.on('message', async (msg) => {
    console.log("On Message", msg);
    const chatId = msg.chat.id;
    const messageText = msg.text;
    const userName = msg.chat.username;
    const date = msg.date;
    const replyMessage = msg?.reply_to_message;
    if (messageText == "/start") {
        const htmlMarkup = `
Welcome to <b>JP's Utilities BOT</b>!

I can help you to use this bot. You can control me by sending these commands:

<b>Medical</b>
/updatebloodpressure- updates blood pressure of the current telegram user
        `;

        bot.sendMessage(chatId, htmlMarkup, { parse_mode: "HTML" });
    }
    else if (messageText == "/updatebloodpressure") {
        bot.sendMessage(chatId, "Provide the blood pressure details in the format [SYSTOLE VALUE]/[DIASTOLE VALUE] (Eg: 120/80) tagging this message");
    }
    else if (replyMessage && replyMessage.text.startsWith("Provide the blood pressure details")) {
        bot.sendMessage(chatId, "Please wait while we are updating your blood pressure...");
        bloodPressure.updateBloodPressure({ chatId, userName, date, messageText }).then((response) => {
            console.log("UPDATE BLOOD PRESSURE - RESPONSE: ", JSON.stringify(response));
            bot.sendMessage(chatId, "Hurray, blood pressure has been updated!");
        }).catch((error) => {
            console.log("UPDATE BLOOD PRESSURE - ERROR: ", JSON.stringify(error));
            bot.sendMessage(chatId, "Error while updating blood pressure, try again later!")
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