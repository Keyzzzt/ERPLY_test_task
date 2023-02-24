import {actions, initialState, loginReducer} from './loginReducer'

test('should set loading to true', () => {
    const endState = loginReducer(initialState, actions.requestAC())
    expect(endState.loading).toEqual(true)
})

test('should set fail message, and loading to false', () => {
    const error = 'Error'
    const endState = loginReducer(initialState, actions.failAC(error))
    expect(endState.errorMessage).toEqual(error)
    expect(endState.loading).toEqual(false)
})
test('should set userInfo and loading to false', () => {
    const userInfo = {
        name: '',
        email: 'some string',
        apiKey: 'hello'
    }

    const endState = loginReducer(initialState, actions.successAC(userInfo))
    expect(endState.userInfo).toEqual(userInfo)
    expect(endState.loading).toEqual(false)
})
test('should reset messages', () => {
    const startState = {
        userInfo: {name: 'Alex', email: 'gmail', apiKey: 'hello'},
        loading: false,
        errorMessage: 'ok',
        successMessage: 'maybe',
    }
    const endState = loginReducer(startState, actions.resetLoginMessagesAC())
    expect(endState.errorMessage).toBe(initialState.errorMessage)
    expect(endState.successMessage).toBe(initialState.successMessage)
})

test('should reset messages, userInfo and localStorage', () => {
    const startState = {
        userInfo: {name: 'Alex', email: 'gmail', apiKey: 'hello'},
        loading: false,
        errorMessage: 'ok',
        successMessage: 'maybe',
    }
    const endState = loginReducer(startState, actions.logoutAC())
    expect(endState.errorMessage).toBe(initialState.errorMessage)
    expect(endState.successMessage).toBe(initialState.successMessage)
    expect(localStorage.getItem('name')).toEqual(null)
    expect(localStorage.getItem('email')).toEqual(null)
    expect(localStorage.getItem('apiKey')).toEqual(null)
})