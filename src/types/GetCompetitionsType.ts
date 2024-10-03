export interface GetCompetitionsType {
    filters: Filters
    resultSet: ResultSet
    competition: Competition
    matches: Match[]
  }
  
  export interface Filters {
    season: string
  }
  
  export interface ResultSet {
    count: number
    first: string
    last: string
    played: number
  }
  
  export interface Competition {
    id: number
    name: string
    code: string
    type: string
    emblem: string
  }
  
  export interface Match {
    area: Area
    competition: Competition2
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
    referees: Referee[]
  }
  
  export interface Area {
    id: number
    name: string
    code: string
    flag: string
  }
  
  export interface Competition2 {
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
    winner?: string
    duration: string
    fullTime: FullTime
    halfTime: HalfTime
  }
  
  export interface FullTime {
    home?: number
    away?: number
  }
  
  export interface HalfTime {
    home?: number
    away?: number
  }
  
  export interface Odds {
    msg: string
  }
  
  export interface Referee {
    id: number
    name: string
    type: string
    nationality: string
  }
  