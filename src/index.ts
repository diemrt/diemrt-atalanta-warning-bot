import express from "express";
import dotenv from "dotenv";
import { Telegraf } from "telegraf";
import { getAtalantaId, getHomeMatches } from "./utils";
import { BuildHomeMatchesMessage } from "./utils/chatBotUtils";

dotenv.config();

const bot = new Telegraf(process.env.BOT_TOKEN ?? "");
const app = express();
const PORT = process.env.PORT || 3000;

let chatId: number;

bot.start((ctx) => {
  chatId = ctx.chat.id;
  ctx.reply("🚀 Bot di Telegram avviato.");
});

bot.launch();

app.get("/", (req, res) => {
  if (bot && bot.telegram) {
    res.send("🚀 Bot Telegram in esecuzione e pronto!");
  } else {
    res.send("⚠️ Il bot non è avviato correttamente.");
  }
});

app.get("/test", (req, res) => {
  if (chatId) {
    bot.telegram.sendMessage(
      chatId,
      "Ciao! ⚽👋\n\nHai appena effettuato una chiamata di prova del nostro servizio 💭"
    );
    res.send("✅ Messaggio di test inviato");
  } else {
    res.send("⚠️ Chat ID non disponibile. Avvia il bot con il comando /start.");
  }
});

app.get("/atalanta/check-id", (req, res) => {
  getAtalantaId()
    .then((id) => {
      if (id) {
        res.send(`🪪 ID di Atalanta: ${id}`);
      } else {
        res.send("⚠️ Squadra non trovata.");
      }
    })
    .catch(() => {
      res.send("⚠️ Errore nel recuperare l'ID della squadra.");
    });
});

app.get("/atalanta/home-matches", (req, res) => {
  if (chatId) {
    getAtalantaId()
      .then((teamId) => {
        if (teamId) {
          getHomeMatches(teamId)
            .then((homeMatches) => {
              if (homeMatches && homeMatches.length > 0) {
                bot.telegram.sendMessage(chatId, BuildHomeMatchesMessage(homeMatches));
                res.send("✅ Servizio di notifica avviato");
              } else {
                bot.telegram.sendMessage(
                  chatId,
                  "⚠️ Nessuna partita in casa trovata per la squadra selezionata."
                );
                res.send(
                  "⚠️ Nessuna partita in casa trovata per la squadra selezionata."
                );
              }
            })
            .catch(() => {
              bot.telegram.sendMessage(
                chatId,
                "⚠️ Errore nel recuperare le partite in casa."
              );
            });
        } else {
          res.send("⚠️ Squadra non trovata.");
        }
      })
      .catch(() => {
        res.send("⚠️ Errore nel recuperare l'ID della squadra.");
      });
  } else {
    res.send("⚠️ Chat ID non disponibile. Avvia il bot con il comando /start.");
  }
});

app.listen(PORT, () => {
  console.log(`[Server]: Server in ascolto sulla porta ${PORT}`);
});
