import s from './mainPage.module.scss'
import React, {FC, useState, useEffect, FormEvent} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {topNewsTC} from '../../../999_Store/Reducers/topNewsReducer/newsReducer'
import {useNavigate} from 'react-router-dom'
import {Loader} from '../../Chunks/Loader/Loader'
import {ArticleType, UserInfoType} from '../../../999_Store/Reducers/loginReducer/loginReducer'
import {actions} from '../../../999_Store/Reducers/articleReducer/articleReducer'
import {actions as topNewsActions} from '../../../999_Store/Reducers/topNewsReducer/newsReducer'
import {Pagination} from '../../Chunks/Pagination/Pagination'
import {selectTopNews} from '../../../999_Store/selectors'
import {SearchBar} from '../../Chunks/SearchBar/SearchBar'
import {Message} from '../../Chunks/MessageModal/Message'

type PropsType = {
    userInfo: null | UserInfoType
}

export const MainPage: FC<PropsType> = ({userInfo}) => {
    const [searchQuery, setSearchQuery] = useState('')
    const {topNews, loading, errorMessage, totalNewsCount, currentPage, pageSize} = useSelector(selectTopNews)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = (e: FormEvent<HTMLFormElement>, value: string) => {
        e.preventDefault()
        const searchStr = value.trim()
        setSearchQuery(searchStr)
        userInfo && dispatch(topNewsTC(userInfo.apiKey, searchStr, currentPage, pageSize))
    }
    const handleShowArticle = (article: ArticleType) => {
        dispatch(actions.saveArticleInfoAC(article))
        navigate('/story')
    }
    const handlePage = (pageNumber: number) => {
        dispatch(topNewsActions.setPageNumberAC(pageNumber))
    }

    const totalPages = Math.ceil(totalNewsCount / pageSize)

    // Request news on page change
    useEffect(() => {
        if (userInfo && userInfo.apiKey) {
            dispatch(topNewsTC(userInfo.apiKey, searchQuery, currentPage, pageSize))
        }

    }, [currentPage])


    return (
        <main className="container">
            <SearchBar handleSubmit={handleSubmit}/>
            {topNews && topNews.length > 0 && (
                <Pagination currentPage={currentPage} setPageHandler={handlePage} totalPages={totalPages}
                            newsCount={topNews.length}/>
            )}
            {topNews && topNews.length === 0 && (
                <div>No news correspond to search criteria</div>
            )}
            {errorMessage &&
                <Message type="error" message={errorMessage}
                         handleCloseMessage={() => dispatch(topNewsActions.resetAC())}/>}
            {loading ? <Loader/> : (
                <div className={s.news}>
                    {topNews && topNews.map((article, i) => {
                        return (
                            <article className={s.newsItem} onClick={() => handleShowArticle(article)} key={i}>
                                <img src={article.urlToImage} alt=""/>
                                <h2 className={s.title}>{article.title}</h2>
                            </article>
                        )
                    })}
                </div>
            )}

        </main>
    )
}
