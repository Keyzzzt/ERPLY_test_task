import React, {useEffect} from 'react'
import {Route, Routes, useNavigate} from 'react-router-dom'
import {LoginPage} from './01_Components/Pages/LoginPage/LoginPage'
import {Page404} from './01_Components/Pages/PageNotFound404/Page404'
import {MainPage} from './01_Components/Pages/MainPage/MainPage'
import {useDispatch, useSelector} from 'react-redux'
import {StoryPage} from './01_Components/Pages/StoryPage/StoryPage'
import {Header} from './01_Components/Chunks/Header/Header'
import {ProfilePage} from './01_Components/Pages/ProfilePage/ProfilePage'
import {selectApp, selectUserInfo} from './999_Store/selectors'
import {Message} from './01_Components/Chunks/MessageModal/Message'

const App = () => {
    const {userInfo, loading, errorMessage, successMessage} = useSelector(selectUserInfo)
    // const {appStatus, appError, isInitialized} = useSelector(selectApp)
    // const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (!userInfo) {
            navigate('/')
        }
    }, [userInfo])


    return (
        <div className="App">
            {/*{appError && <Message type='error' message={appError} handleCloseMessage={() => dispatch(actions.setErrorAC(null))} />}*/}
            <Header isLoggedIn={!!userInfo}/>
            <Routes>
                <Route path="/" element={<LoginPage/>}/>
                <Route path="/main" element={<MainPage userInfo={userInfo}/>}/>
                <Route path="/story" element={<StoryPage/>}/>
                <Route path="/profile"
                       element={<ProfilePage userInfo={userInfo} loading={loading} failMessage={errorMessage}
                                             successMessage={successMessage}/>}/>
                <Route path="/*" element={<Page404 errTitle="No news here"/>}/>
            </Routes>
        </div>
    )
}

export default App
