import React, {FC, useState} from 'react'
import s from './notFound.module.scss'
import {Link} from 'react-router-dom'

type Page404Props = {
    errTitle: string
}
export const Page404: FC<Page404Props> = ({errTitle}) => {


    return (
        <div className={s.localContainer}>
            <main className={s.box}>
                <Link className={s.homeButton} to='/'>home</Link>
                <div className={s.innerBox}/>
                <h1>{errTitle}</h1>
                <p>404 E</p>
            </main>
            <p className={s.bottomText}>Sorry, news you are looking for cannot be found.</p>
        </div>
    )
}
