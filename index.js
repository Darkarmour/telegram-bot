const http = require('http');
 
const hostname = '127.0.0.1';
const port = 3000;
 
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Telegram bot running!');
});
 
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});


const TelegramBot = require('node-telegram-bot-api');

const token = '6971012076:AAHcv5AtKH3CMbYdpy9Ly2nFOZTRkOeFXdU'; // Replace with your own bot token
const bot = new TelegramBot(token, { polling: true });

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

