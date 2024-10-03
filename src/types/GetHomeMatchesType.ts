export interface GetHomeMatchesType {
    filters: Filters
    resultSet: ResultSet
    matches: Match[]
  }
  
  export interface Filters {
    competitions: string
    permission: string
    status: string[]
    limit: number
  }
  
  export interface ResultSet {
    count: number
    competitions: string
    first: string
    last: string
    played: number
    wins: number
    draws: number
    losses: number
  }
  
  export interface Match {
    area: Area
    competition: Competition
    season: Season
    id: number
    utcDate: string
    status: string
    matchday: number
    stage: string
    group: any
    lastUpdated: string
    homeTeam: HomeTeam
    awayTeam: AwayTeam
    score: Score
    odds: Odds
    referees: any[]
  }
  
  export interface Area {
    id: number
    name: string
    code: string
    flag: string
  }
  
  export interface Competition {
    id: number
    name: string
    code: string
    type: string
    emblem: string
  }
  
  export interface Season {
    id: number
    startDate: string
    endDate: string
    currentMatchday: number
    winner: any
  }
  
  export interface HomeTeam {
    id: number
    name: string
    shortName: string
    tla: string
    crest: string
  }
  
  export interface AwayTeam {
    id: number
    name: string
    shortName: string
    tla: string
    crest: string
  }
  
  export interface Score {
    winner: any
    duration: string
    fullTime: FullTime
    halfTime: HalfTime
  }
  
  export interface FullTime {
    home: any
    away: any
  }
  
  export interface HalfTime {
    home: any
    away: any
  }
  
  export interface Odds {
    msg: string
  }
  