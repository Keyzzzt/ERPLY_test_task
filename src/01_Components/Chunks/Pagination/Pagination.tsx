import React, {FC, useEffect} from 'react'
import s from './pagination.module.scss'

type Props = {
    setPageHandler: (page: number) => void
    totalPages: number
    newsCount: number
    currentPage: number
}

export const Pagination: FC<Props> = ({setPageHandler, totalPages, newsCount, currentPage}) => {
    console.log('PAGINATION')
    const pagesCount = []
    for (let i = 1; i <= totalPages; i++) {
        pagesCount.push(i)
    }

    const changePageHandler = (pageNumber: number) => {
        setPageHandler(pageNumber)
    }
    useEffect(() => {
        if (currentPage > 0) {
            setPageHandler(currentPage)
        }
    }, [currentPage])

    return (
        <div className={s.pagination}>
            {newsCount > 0 && totalPages > 0 && (
                <ul className={s.list}>
                    {currentPage > 4 && (
                        <>
                            <li onClick={() => setPageHandler(1)} className={s.numb}>
                                1
                            </li>
                            <li>...</li>
                        </>
                    )}
                    {pagesCount.map((pageNumber, i) =>
                        pageNumber < currentPage + 4 && pageNumber > currentPage - 4 && (
                            <li
                                className={`${s.numb} ${pageNumber === currentPage && s.active}`}
                                onClick={() => changePageHandler(pageNumber)}
                                key={i}
                            >
                                {pageNumber}
                            </li>
                        )
                    )}

                    {(totalPages - currentPage > 4) && (
                        <>
                            <li>...</li>
                            <li onClick={() => changePageHandler(totalPages)} className={s.numb}>
                                {totalPages}
                            </li>
                        </>
                    )}
                </ul>
            )}
        </div>
    )
}