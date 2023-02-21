import {InferActionTypes} from "../../../types";
import {ArticleType} from "../loginReducer/loginReducer";

type InitialStateType = typeof initialState
type ActionType = InferActionTypes<typeof actions>

export const initialState = {
    article: null as null | ArticleType,
}

export const articleReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case 'ARTICLE/SET-ARTICLE':
            return {...state, article: action.payload}
        case 'ARTICLE/RESET-ARTICLE':
            return {...state, article: null}
        default:
            return state
    }
}

export const actions = {
    saveArticleInfoAC: (article: ArticleType) => ({
        type: 'ARTICLE/SET-ARTICLE' as const,
        payload: article
    }),
    resetAC: () => ({type: 'ARTICLE/RESET-ARTICLE' as const})
}
