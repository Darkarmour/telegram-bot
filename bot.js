const TelegramBot = require('node-telegram-bot-api');
const BloodPressure = require('./Utilities/BloodPressure');
const token = process.env['TELEGRAM_BOT_TOKEN'];
const bot = new TelegramBot(token, { polling: true });

bot.on('message', (msg) => {
    console.log("On Message", msg);
    const chatId = msg.chat.id;
    const messageText = msg.text;
    const userName = msg.chat.username;
    const date = msg.date;
    if (messageText == "/start") {
        bot.sendMessage(chatId, 'Welcome to JPs bot!');
    }
    // else if (messageText == "/updateBP") {
    //     bot.sendMessage(chatId, "Provide the BP details in the format BP-[SYSTOLE VALUE]:[DIASTOLE VALUE] (Eg: BP-110/80)");
    // }
    else if (messageText.toUpperCase().startsWith("BP=")) {
        BloodPressure.updateBP({ chatId, userName, date, messageText }).then((response) => {
            console.log("UPDATE BP - RESPONSE: ", JSON.stringify(response));
            bot.sendMessage(chatId, "Updated BP!");
        }).catch((error) => {
            console.log("UPDATE BP - ERROR: ", JSON.stringify(error));
            bot.sendMessage(chatId, "Error while updating BP, try again later!")
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
    // if (query.data == "existing_user") {
    //     bot.sendMessage("New user development in progress...");
    // }
    // else if (query.data == "new_user") {
    //     bot.sendMessage("New user development in progress...");
    // }

});

module.exports = bot;