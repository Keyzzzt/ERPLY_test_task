import {actions, appReducer, InitialStateType} from "./appReducer";

let startState: InitialStateType

beforeEach(() => {
    const startState = {
        appError: null,
        appStatus: 'idle'
    }
})

test('correct error message should be set', () => {
    const error = 'Some error'
    const endState = appReducer(startState, actions.setErrorAC(error))
    expect(endState.appError).toEqual(error)
})
test('correct status should be set', () => {
    const status = 'succeeded'
    const endState = appReducer(startState, actions.setStatusAC(status))
    expect(endState.appStatus).toEqual(status)
})
test('correct isInitialized should be set', () => {
    const status = true
    const endState = appReducer(startState, actions.setInitializedAC(status))
    expect(endState.isInitialized).toEqual(status)
})