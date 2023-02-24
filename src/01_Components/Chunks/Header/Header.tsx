import React, {FC, useEffect, useState} from 'react'
import s from './header.module.scss'
import {Link, useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {useWindowSize} from '../../../04_Utils/useWindowSize'
import {actions} from '../../../999_Store/Reducers/loginReducer/loginReducer'
import {actions as topNewsActions} from '../../../999_Store/Reducers/topNewsReducer/newsReducer'
import {actions as articleActions} from '../../../999_Store/Reducers/articleReducer/articleReducer'

type HeaderProps = {
    isLoggedIn: boolean
}

export const Header: FC<HeaderProps> = ({isLoggedIn}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [menuOpen, setMenuOpen] = useState(false)
    const size = useWindowSize()

    useEffect(() => {
        if (size.width! > 992 && menuOpen) {
            setMenuOpen(false)
        }
    }, [size, menuOpen])

    const handleLogout = () => {
        setMenuOpen(false)
        navigate('/')
        dispatch(actions.logoutAC())
        dispatch(topNewsActions.resetAC())
        dispatch(articleActions.resetAC())
    }
    return (
        <header className={s.header}>
            <div className={`container ${s.container}`}>
                <div className={s.logo}>
                    <Link to="/" className={s.logoTitle}>
                        News
                    </Link>
                </div>

                {isLoggedIn && (
                    <nav className={`${s.menu} ${menuOpen && size.width! < 768 ? s.isMenu : ''}`}>
                        <ul className={s.menuList}>
                            <li onClick={() => setMenuOpen(false)} className={s.menuItem}>
                                <Link to="/main">Main</Link>
                            </li>
                            <li onClick={() => setMenuOpen(false)} className={s.menuItem}>
                                <Link to="/profile">Profile</Link>
                            </li>
                            <li onClick={handleLogout} className={s.menuItem}>
                                <Link to="#">Logout</Link>
                            </li>
                        </ul>
                    </nav>
                )}
                {isLoggedIn && (
                    <div className={s.burgerMenu}>
                        {menuOpen ? (
                            <i onClick={() => setMenuOpen(false)} className="fa-solid fa-xmark"/>
                        ) : (
                            <i onClick={() => setMenuOpen(true)} className="fa-solid fa-bars"/>
                        )}
                    </div>
                )}
            </div>
        </header>
    )
}
