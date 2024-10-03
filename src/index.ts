import express from 'express';
import dotenv from 'dotenv';
import { Telegraf } from 'telegraf';
import { getAtalantaId, getHomeMatches } from './utils';

dotenv.config();

const bot = new Telegraf(process.env.BOT_TOKEN ?? "");
const app = express();
const PORT = process.env.PORT || 3000;

let chatId : number;

bot.start((ctx) => {
    chatId = ctx.chat.id;
    ctx.reply('🚀 Bot di Telegram avviato.');
});

bot.launch();

app.get('/', (req, res) => {
    if (bot && bot.telegram) {
        res.send('🚀 Bot Telegram in esecuzione e pronto!');
    } else {
        res.send('⚠️ Il bot non è avviato correttamente.');
    }
});

app.get('/test', (req, res) => {
    if (chatId) {
        bot.telegram.sendMessage(chatId, 'Ciao! ⚽👋\n\nHai appena effettuato una chiamata di prova del nostro servizio 💭');
        res.send('✅ Messaggio di test inviato');
    } else {
        res.send('⚠️ Chat ID non disponibile. Avvia il bot con il comando /start.');
    }
});

app.get('/atalanta', async (req, res) => {
    try {
        const atalantaId = await getAtalantaId();
        if (atalantaId) {
            res.send(`🪪 Code ID di Atalanta: ${atalantaId}`);
        } else {
            res.send('⚠️ Squadra non trovata.');
        }
    } catch (error) {
        res.send('⚠️ Errore nel recuperare l\'ID della squadra.');
    }
});

app.listen(PORT, () => {
    console.log(`[Server]: Server in ascolto sulla porta ${PORT}`);
});