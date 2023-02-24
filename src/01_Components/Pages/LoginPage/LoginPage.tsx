import s from './login.module.scss'
import {CustomInput} from '../../Chunks/CustomInput/CustomInput'
import React, {FormEvent, useEffect, useState} from 'react'
import {Button} from '../../Chunks/Button/Button'
import {actions, loginTC} from '../../../999_Store/Reducers/loginReducer/loginReducer'
import {useDispatch, useSelector} from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'
import {Loader} from '../../Chunks/Loader/Loader'
import {Message} from '../../Chunks/MessageModal/Message'
import {selectUserInfo} from '../../../999_Store/selectors'

export const LoginPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {userInfo, loading, errorMessage} = useSelector(selectUserInfo)
    const [inputError, setInputError] = useState(false)
    const [email, setEmail] = useState('a@a.com')
    const [apiKey, setApiKey] = useState('17dfd8423ddc40cbb02491119ac37c57')
    const [className, setClassName] = useState('')

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(loginTC(email, apiKey, ''))
    }

    useEffect(() => {
        if (userInfo) {
            navigate('/main')
        }
        return () => {
            dispatch(actions.resetLoginMessagesAC())
        }
    }, [userInfo])

    const isDisabledButton = inputError || loading || !!errorMessage

    return (
        <div className="container">
            {errorMessage && <Message type="error" message={errorMessage}
                                      handleCloseMessage={() => dispatch(actions.resetLoginMessagesAC())}/>}
            <main className={s.formContainer + ' ' + className}>
                <h1>Login</h1>
                {loading && <Loader/>}
                <form onSubmit={handleSubmit}>
                    <CustomInput
                        id={'loginEmail'}
                        label="Email"
                        returnValue={setEmail}
                        setInputError={setInputError}
                        inputError={inputError}
                        type="text"
                        placeholder="Enter your email"
                        name="email"
                        value={email}
                    />
                    <CustomInput
                        id={'loginKey'}
                        label="API Key"
                        returnValue={setApiKey}
                        setInputError={setInputError}
                        inputError={inputError}
                        type="text"
                        placeholder="Enter your key"
                        name="apiKey"
                        value={apiKey}
                    />
                    <Button disabled={isDisabledButton} type="submit" title="Login" color="success" minWidth="100%"/>
                    <div className={s.help} onClick={() => setClassName(s.showClue)}>Help</div>
                </form>
                <div className={s.clue + ' ' + className}>
                    <div className={s.clueText}>
                        <p>To get key please <Link to="https://newsapi.org/register" target="_blank"
                                                   rel="noopener noreferrer">Register</Link></p>
                    </div>
                    <Button onClick={() => setClassName('')} title="Close" type="button" color="success"/>
                </div>
            </main>
        </div>
    )
}