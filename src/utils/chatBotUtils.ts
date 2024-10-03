import { Match } from "../types/GetCompetitionsType";

export const BuildHomeMatchesMessage = (matches: Match[]) => {
  let message = "🏟️ Partite in casa:\n\n";

  matches.forEach((match) => {
    message += `📅 ${new Date(match.utcDate).toLocaleDateString("it-IT", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })}\n`;
    message += `⏰ ${new Date(match.utcDate).toLocaleTimeString("it-IT", {
      hour: "2-digit",
      minute: "2-digit",
    })}\n`;
    message += `🏟️ ${match.homeTeam.tla} - ${match.awayTeam.tla}\n\n`;
  });

  return message;
};
