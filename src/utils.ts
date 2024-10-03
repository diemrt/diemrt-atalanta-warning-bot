import axios from "axios";

export type TeamsResponse = {
    teams: {
        id: number;
        name: string;
    }[];
};

const fetchData = async <T>(url: string, headers: Record<string, string | undefined | null>): Promise<T> => {
    try {
        const response = await axios.get<T>(url, { headers });
        return response.data;
    } catch (error: any) {
        console.error("Errore nel recuperare i dati:", error.message);
        throw error;
    }
};

export const getTeamId = async (teamName: string) => {
    const apiKey = process.env.API_KEY;
    const url = `${process.env.API_BASE_PATH}/teams?name=${teamName}`;
    const headers = { "X-Auth-Token": apiKey };

    try {
        const data = await fetchData<TeamsResponse>(url, headers);
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
