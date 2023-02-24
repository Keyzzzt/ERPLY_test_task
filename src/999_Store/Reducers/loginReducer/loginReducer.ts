import {BaseThunkType, InferActionTypes} from '../../../types'
import {API} from '../../../03_API/API'

type ThunkType = BaseThunkType<ActionType>
type InitialStateType = typeof initialState
type ActionType = InferActionTypes<typeof actions>

export type ArticleType = {
    source: {
        id: null | string
        name: string
    }
    author: string
    title: string
    description: string
    url: string
    urlToImage: string
    publishedAt: string
    content: string
}
export type ResponseWithTopNewsType = {
    status: string
    totalResults: number
    articles: ArticleType[]
}
export type UserInfoType = {
    name: string
    email: string
    apiKey: string
}

export const initialState = {
    userInfo: null as null | UserInfoType,
    loading: false,
    errorMessage: '',
    successMessage: '',
}

export const loginReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case 'LOGIN/REQUEST':
            return {...state, loading: true}
        case 'LOGIN/SET-USER_INFO':
            return {...state, userInfo: action.payload, loading: false, successMessage: 'Good news! All Good.'}
        case 'LOGIN/SET-ERROR':
            return {...state, errorMessage: action.payload, loading: false}
        case 'LOGIN/RESET-MESSAGES':
            return {...state, errorMessage: '', successMessage: ''}
        case 'LOGIN/SET-LOGOUT':
            localStorage.removeItem('apiKey')
            localStorage.removeItem('email')
            localStorage.removeItem('name')
            return {...state, errorMessage: '', userInfo: null, successMessage: ''}
        default:
            return state
    }
}

export const actions = {
    requestAC: () => ({type: 'LOGIN/REQUEST' as const}),
    successAC: (data: UserInfoType) => ({
        type: 'LOGIN/SET-USER_INFO' as const,
        payload: data
    }),
    failAC: (errMessage: string) => ({type: 'LOGIN/SET-ERROR' as const, payload: errMessage}),
    logoutAC: () => ({type: 'LOGIN/SET-LOGOUT' as const}),
    resetLoginMessagesAC: () => ({type: 'LOGIN/RESET-MESSAGES' as const}),
}


export function loginTC(email: string, apiKey: string, name: string): ThunkType {
    return async function (dispatch) {
        try {
            dispatch(actions.requestAC())
            const data = await API.login(apiKey)
            if (data.status === 'ok') {
                localStorage.setItem('apiKey', apiKey)
                localStorage.setItem('email', email)
                name && localStorage.setItem('name', name)
                dispatch(actions.successAC({email, apiKey, name}))
            }
        } catch (err: any) {
            dispatch(actions.failAC(err.response.data.message))
        }
    }
}
