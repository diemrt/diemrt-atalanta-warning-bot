import express from 'express';
import dotenv from 'dotenv';
import { Telegraf } from 'telegraf';

dotenv.config();

const bot = new Telegraf(process.env.BOT_TOKEN ?? "");
const app = express();
const PORT = process.env.PORT || 3000;

let chatId : number;

bot.start((ctx) => {
    chatId = ctx.chat.id;
    ctx.reply('Bot avviato!');
});

bot.launch();

app.get('/', (req, res) => {
    if (chatId) {
        bot.telegram.sendMessage(chatId, 'Allerta: Il server è stato chiamato!');
        res.send('Messaggio di allerta inviato!');
    } else {
        res.send('Chat ID non disponibile. Avvia il bot con il comando /start.');
    }
});

app.listen(PORT, () => {
    console.log(`[Server]: Server in ascolto sulla porta ${PORT}`);
});