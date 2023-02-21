import {useEffect, useState} from "react";

export const isEmail = (email: string) => {
    if(email) {
        let matchEmail =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return !!email.toLocaleLowerCase().match(matchEmail);
    }
}

export const parsePublishedDate = (str: string) => {
    if(str) {
        const arr = str.split('T')
        return arr[0].split('-').reverse().join('.')
    }
}

export const fakeFetchFn = (cb: (value: boolean) => void, time: number) => {
    return setTimeout(() => {
        cb(false)
    }, time)
}

// Generates single article
export const generateArticle = () => ({
    title: 'News',
    source: {
        id: null,
        name: ''
    },
    author: 'string',
    description: 'string',
    url: 'string',
    urlToImage: 'string',
    publishedAt: 'string',
    content: 'string',
})


/**
 *! ===============================================================================================================================
 *  @useWindowSize
 * * returns windowSize with height and width on window size change
 */
export function useWindowSize() {
    const [windowSize, setWindowSize] = useState({
        width: 0,
        height: 0,
    })

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            })
        }
        window.addEventListener('resize', handleResize)
        handleResize()
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return windowSize
}