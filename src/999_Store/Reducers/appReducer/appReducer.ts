import {BaseThunkType, InferActionTypes} from '../../../types'
import {API} from '../../../03_API/API'

type ThunkType = BaseThunkType<ActionType>
type ActionType = InferActionTypes<typeof actions>

type StatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
    appStatus: StatusType
    appError: string | null
    isInitialized: boolean
}

export const initialState: InitialStateType = {
    appStatus: 'idle',
    appError: null,
    isInitialized: false

}
// Reducer is defined, tested, but not in use.
export const appReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, appStatus: action.payload}
        case 'APP/SET-FAIL':
            return {...state, appError: action.payload}
        case 'APP/SET-INITIALIZED':
            return {...state, isInitialized: action.payload}
        default:
            return state
    }
}

export const actions = {
    setStatusAC: (status: StatusType) => ({type: 'APP/SET-STATUS' as const, payload: status}),
    setErrorAC: (failMessage: string | null) => ({
        type: 'APP/SET-FAIL' as const,
        payload: failMessage
    }),
    setInitializedAC: (value: boolean) => ({
        type: 'APP/SET-INITIALIZED' as const,
        payload: value
    }),
}


export function initializeTC(): ThunkType {
    return async function (dispatch) {
        try {


        } catch (err: any) {

        }
    }
}
