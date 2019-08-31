export interface IAction{
    type:string,
    payload: any,
}

export interface ICategoryItem{
    idStr:string,
    name: string,
}

export interface IExtendState {
    //add extend activity
    addChoice: string,
    addLineup: {
      expireTime: object|null,
      // expireTimeUTC: null,
      anonymous: boolean,    
    },
    addVote: {
      expireTime: object|null,
      // expireTimeUTC: null,
      anonymous: boolean,
      ifMulti: string,
      options:string[]
    },
    
    //join or quit extend activity
    lineupJoinning: boolean|null,
    lineupQuitting: boolean|null,
    voteJoinning: boolean|null,
    voteQuitting: boolean|null,
  
    //extend activity data from server
    extendFromServer:object|null,
 }
 
