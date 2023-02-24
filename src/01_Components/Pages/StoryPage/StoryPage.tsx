import React, {useState} from 'react'
import s from './storyPage.module.scss'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {Loader} from '../../Chunks/Loader/Loader'
import {selectArticle} from '../../../999_Store/selectors'
import {fakeFetchFn} from '../../../04_Utils/fakeFetch'
import {parsePublishedDate} from '../../../04_Utils/parsePublishedDate'


export const StoryPage = () => {
    const {article} = useSelector(selectArticle)
    const [fakeFetch, setFakeFetch] = useState(true)

    fakeFetchFn(setFakeFetch, 2000)

    const contentBody = article?.content?.split('[')[0].trim()
    return (
        <div className="container">
            {fakeFetch
                ? (<Loader/>)
                : (article && (
                    <main className={s.article}>
                        {fakeFetch && <Loader/>}
                        <h1>{article.title}</h1>
                        <p>{parsePublishedDate(article.publishedAt)}</p>
                        <p>Author: {article.author}</p>
                        <div className={s.articleImage}>
                            <img src={article.urlToImage} alt=""/>
                        </div>
                        <div className={s.articleText}>{contentBody} <Link to={article.url} target="_blank"
                                                                           rel="noopener noreferrer">{article.source.name}</Link>
                        </div>
                    </main>
                ))
            }
        </div>
    )
}