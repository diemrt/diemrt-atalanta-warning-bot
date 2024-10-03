import axios from "axios";

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

export type GetTeamIdType = {
  teams: {
    id: number;
    name: string;
  }[];
};
export const getTeamId = async (teamName: string) => {
  const apiKey = process.env.API_KEY;
  const url = `${process.env.API_BASE_PATH}/teams?name=${teamName}`;
  const headers = { "X-Auth-Token": apiKey };

  try {
    const data = await fetchData<GetTeamIdType>(url, headers);
    const team = data.teams.find(
      (t) => t.name.toLowerCase() === teamName.toLowerCase()
    );
    if (team) {
      return team.id;
    } else {
      console.log("Squadra non trovata");
      return null;
    }
  } catch (error: any) {
    console.error("Errore nel recuperare l'ID della squadra:", error.message);
    return null;
  }
};

export type GetHomeMatchesType = {
  matches: {
    utcDate: string;
    homeTeam: {
      id: number;
      name: string;
    },
    awayTeam: {
      id: number;
      name: string;
    }
  }[];
};
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
