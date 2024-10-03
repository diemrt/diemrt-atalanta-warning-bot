import axios from "axios";
import { GetCompetitionsType } from "./types/GetCompetitionsType";
import { GetHomeMatchesType } from "./types/GetHomeMatchesType";

const fetchData = async <T>(
  url: string,
  headers: Record<string, string | undefined | null>
): Promise<T> => {
  try {
    const response = await axios.get<T>(url, { headers });
    return response.data;
  } catch (error: any) {
    console.error("Errore nel recuperare i dati:", error.message);
    throw error;
  }
};

// Get Atalanta's ID from the Serie A competition
export const getAtalantaId = async () => {
    const apiKey = process.env.API_KEY;
    const leagueCode = "SA";
    const teamToFind = "Atalanta";
    const url = `${process.env.API_BASE_PATH}/competitions/${leagueCode}/matches`;
    const headers = { "X-Auth-Token": apiKey };

    const data = await fetchData<GetCompetitionsType>(url, headers);
    const team = data.matches.find(
        (match) =>
            match.homeTeam.name.toLowerCase() === teamToFind.toLowerCase() ||
            match.awayTeam.name.toLowerCase() === teamToFind.toLowerCase()
    );

    if (team) {
        return team.homeTeam.name.toLowerCase() === teamToFind.toLowerCase()
            ? team.homeTeam.id
            : team.awayTeam.id;
    } else {
        console.log("Squadra non trovata.");
        return null;
    }
}

// Get the next home matches for a team
export const getHomeMatches = async (teamId: number) => {
  const apiKey = process.env.API_KEY;
  const url = `${process.env.API_BASE_PATH}/teams/${teamId}/matches?status=SCHEDULED`;
  const headers = { "X-Auth-Token": apiKey };

  try {
    const data = await fetchData<GetHomeMatchesType>(url, headers);
    const matches = data.matches.filter(
      (match) => match.homeTeam.id === teamId
    );
    return matches;
  } catch (error: any) {
    console.error("Errore nel recuperare le partite in casa:", error.message);
    return [];
  }
};
