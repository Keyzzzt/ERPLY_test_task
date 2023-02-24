import {actions, initialState, newsReducer} from './newsReducer'
import {generateArticle} from '../../../04_Utils/generateArticle'

test('should set loading to true', () => {
    const endState = newsReducer(initialState, actions.requestAC())
    expect(endState.loading).toEqual(true)
})

test('should change current page value', () => {
    const pageNumber = 404
    const endState = newsReducer(initialState, actions.setPageNumberAC(pageNumber))
    expect(endState.currentPage).toBe(pageNumber)
})
test('should set fail message, and loading to false', () => {
    const error = 'Error'
    const endState = newsReducer(initialState, actions.failAC(error))
    expect(endState.errorMessage).toEqual(error)
    expect(endState.loading).toEqual(false)
})
test('should set topNews, totalNewsCount and loading', () => {
    const article = generateArticle()
    const payload = {
        status: 'ok',
        articles: [article],
        totalResults: 100
    }
    const endState = newsReducer(initialState, actions.successAC(payload))
    expect(endState.totalNewsCount).toBe(100)
    expect(endState.topNews).toEqual([article])
    expect(endState.loading).toEqual(false)
})
test('should reset state', () => {
    const startState = {
        topNews: [generateArticle()],
        totalNewsCount: 101,
        pageSize: 10,
        currentPage: 20,
        loading: false,
        errorMessage: 'some message',
    }
    const endState = newsReducer(startState, actions.resetAC())
    expect(endState.errorMessage).toBe(initialState.errorMessage)
    expect(endState.totalNewsCount).toBe(initialState.totalNewsCount)
    expect(endState.topNews).toBe(initialState.topNews)
    expect(endState.currentPage).toBe(initialState.currentPage)

})