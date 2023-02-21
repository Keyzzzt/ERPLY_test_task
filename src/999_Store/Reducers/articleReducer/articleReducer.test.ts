import {actions, articleReducer, initialState} from "./articleReducer";
import {generateArticle} from "../../../04_Utils/utils";

test('should set loading to true', () => {
    const article = generateArticle()
    const endState = articleReducer(initialState, actions.saveArticleInfoAC(article))
    expect(endState.article).toEqual(article)
})

test('should set article to null', () => {
    const endState = articleReducer(initialState, actions.resetAC())
    expect(endState.article).toEqual(null)
})
