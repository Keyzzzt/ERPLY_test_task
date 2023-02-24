import {FC} from 'react'
import s from './loader.module.scss'

export const Loader: FC = () => {
    return (
        // There is two loader with class loader_1 and loader_2
        <div className={s.loader_1}/>
    )
}
