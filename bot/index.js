const TelegramBot = require('node-telegram-bot-api');
const token = process.env['TELEGRAM_BOT_TOKEN'];
const bot = new TelegramBot(token, { polling: true });

const mongo = require('./mongo');

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const messageText = msg.text;

    // Process the incoming message here
    if (messageText === '/start') {
        bot.sendMessage(chatId, 'Welcome to the JPs bot!');
    }

    if (messageText === '/loki') {
        bot.sendMessage(chatId, 'Welcome to the Lokis bot!');
    }


});

module.exports = bot;