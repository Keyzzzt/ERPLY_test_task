import s from './profilePage.module.scss'
import {CustomInput} from "../../Chunks/CustomInput/CustomInput";
import React, {FC, FormEvent, useState} from "react";
import {Button} from "../../Chunks/Button/Button";
import {actions, loginTC, UserInfoType} from "../../../999_Store/Reducers/loginReducer/loginReducer";
import {useDispatch} from "react-redux";
import {Loader} from "../../Chunks/Loader/Loader";
import {Message} from "../../Chunks/MessageModal/Message";
import {fakeFetchFn} from "../../../04_Utils/utils";

type PropsType = {
    userInfo: null | UserInfoType
    loading: boolean
    failMessage: string
    successMessage: string
}
export const ProfilePage: FC<PropsType> = ({userInfo, loading, failMessage, successMessage}) => {
    const [inputError, setInputError] = useState(false)
    const [name, setName] = useState(userInfo?.name)
    const [email, setEmail] = useState(userInfo?.email)
    const [apiKey, setApiKey] = useState(userInfo?.apiKey)
    const [fakeFetch, setFakeFetch] = useState(true)
    const dispatch = useDispatch()

    fakeFetchFn(setFakeFetch, 2000)

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (email && apiKey) {
            dispatch(loginTC(email, apiKey, name ? name : ''))
        }

    }
    const isDisabledButton = inputError || loading || !!successMessage || !!failMessage

    return (
        <div className='container'>
            {fakeFetch
                ? <Loader/>
                : (<main className={s.formContainer}>
                        {(failMessage || successMessage) &&
                        <Message type={failMessage ? 'error' : 'success'} message={failMessage ? failMessage : successMessage}
                                 handleCloseMessage={() => dispatch(actions.resetLoginMessagesAC())}/>}

                        <form onSubmit={handleSubmit}>
                            <h1>Profile</h1>
                            <div className={s.nameInput}>
                                <label htmlFor="profileName">Name</label>
                                <input className='commonInput' onChange={(e) => setName(e.target.value)} type="text"
                                       placeholder='Enter your name' id='profileName' value={name}/>
                            </div>
                            <CustomInput
                                id={'profileEmail'}
                                label='Email'
                                returnValue={setEmail}
                                setInputError={setInputError}
                                inputError={inputError}
                                type="text"
                                placeholder="Enter your email"
                                name="email"
                                value={email ? email: ''}
                            />
                            <CustomInput
                                id={'profileKey'}
                                label='API Key'
                                returnValue={setApiKey}
                                setInputError={setInputError}
                                inputError={inputError}
                                type="text"
                                placeholder="Enter your key"
                                name="apiKey"
                                value={apiKey ? apiKey : ''}
                            />
                            <Button disabled={isDisabledButton} type='submit' title='Save changes' color='success'
                                    minWidth='100%'/>
                        </form>
                    </main>
                )}
        </div>
    )
}