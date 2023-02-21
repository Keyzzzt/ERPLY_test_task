import {StateType} from "./store";

export const selectUserInfo = (state: StateType) => state.login
export const selectTopNews = (state: StateType) => state.topNews
export const selectArticle = (state: StateType) => state.article
export const selectApp = (state: StateType) => state.app