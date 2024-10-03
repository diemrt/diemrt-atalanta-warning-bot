export type GetHomeMatchesType = {
    matches: {
      utcDate: string;
      homeTeam: {
        id: number;
        name: string;
      };
      awayTeam: {
        id: number;
        name: string;
      };
    }[];
  };