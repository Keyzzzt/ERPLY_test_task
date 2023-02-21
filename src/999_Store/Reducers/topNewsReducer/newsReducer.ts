import {BaseThunkType, InferActionTypes} from "../../../types";
import {API} from "../../../03_API/API";
import {ArticleType, ResponseWithTopNewsType} from "../loginReducer/loginReducer";

type ThunkType = BaseThunkType<ActionType>
type InitialStateType = typeof initialState
type ActionType = InferActionTypes<typeof actions>

export const initialState = {
    topNews: null as null | ArticleType[],
    totalNewsCount: 0,
    pageSize: 10,
    currentPage: 1,
    loading: false,
    errorMessage: '',
}

export const newsReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case 'NEWS/REQUEST':
            return {...state, loading: true}
        case 'NEWS/SET-NEWS':
            return {
                ...state,
                topNews: action.payload.articles,
                totalNewsCount: action.payload.totalResults,
                loading: false
            }
        case 'NEWS/SET-FAIL':
            return {...state, errorMessage: action.payload, loading: false}
        case 'NEWS/SET-PAGE_NUMBER':
            return {...state, currentPage: action.payload}
        case 'NEWS/RESET-NEWS':
            return {...state, topNews: null, totalNewsCount: 0, currentPage: 1, errorMessage: ''}
        default:
            return state
    }
}

export const actions = {
    requestAC: () => ({type: 'NEWS/REQUEST' as const}),
    successAC: (articles: ResponseWithTopNewsType) => ({
        type: 'NEWS/SET-NEWS' as const,
        payload: articles
    }),
    failAC: (errMessage: string) => ({type: 'NEWS/SET-FAIL' as const, payload: errMessage}),
    resetAC: () => ({type: 'NEWS/RESET-NEWS' as const}),
    setPageNumberAC: (pageNumber: number) => ({type: 'NEWS/SET-PAGE_NUMBER' as const, payload: pageNumber}),
}

export function topNewsTC(apiKey: string, searchQuery: string, currentPage: number, pageSize: number): ThunkType {
    return async function (dispatch) {
        try {
            dispatch(actions.requestAC())
            const {data} = await API.topNews(apiKey, searchQuery, currentPage, pageSize)
            dispatch(actions.successAC(data))
        } catch (err: any) {
            dispatch(actions.failAC(err.response.data.message))
        }
    }
}
