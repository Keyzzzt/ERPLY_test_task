import s from './customInput.module.scss'
import React, {FC, ChangeEvent, useState, useEffect} from 'react'
import {isEmail} from '../../../04_Utils/matchEmail'

type CustomInputProps = {
    type: string
    placeholder: string
    id?: string
    label?: string
    name: 'email' | 'apiKey' | 'name'
    inputError: boolean
    value: string
    resetIsDirty?: boolean
    returnValue(value: string): void
    setInputError(value: boolean): void
}

export const CustomInput: FC<CustomInputProps> = React.memo(({
                                                                 resetIsDirty,
                                                                 type,
                                                                 placeholder,
                                                                 name,
                                                                 inputError,
                                                                 returnValue,
                                                                 setInputError,
                                                                 label,
                                                                 value,
                                                                 id = ''
                                                             }) => {
    const [errorMessage, setErrorMessage] = useState('Empty field')
    const [isDirty, setIsDirty] = useState(false)
    const showError = errorMessage && isDirty

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInputError(false)
        returnValue(e.target.value)
    }

    useEffect(() => {
        if (resetIsDirty) {
            setIsDirty(false)
        }
    }, [resetIsDirty])
    useEffect(() => {
        if (inputError) {
            setIsDirty(true)
        }
    }, [inputError])

    useEffect(() => {
        switch (name) {
            case 'email':
                if (isEmail(value)) {
                    setErrorMessage('')
                    setInputError(false)
                    break
                } else {
                    setInputError(true)
                    setErrorMessage('Enter a valid email')
                    break
                }
            case 'apiKey':
                if (value?.length > 0) {
                    setErrorMessage('')
                    setInputError(false)

                    break
                } else {
                    setErrorMessage('Enter a valid api key')
                    setInputError(true)
                    break
                }
            default:
                if (value.length > 0) {
                    setErrorMessage('')
                    setInputError(false)
                    break
                } else {
                    setErrorMessage('Field is required')
                    setInputError(true)
                    break
                }
        }
    }, [value])

    return (
        <div className={`${s.field} ${showError ? s.shake : ''}`}>
            <div className={s.inputArea}>
                {id && <label htmlFor={id}>{label}</label>}
                <input
                    id={id}
                    onBlur={() => setIsDirty(true)}
                    className={`${showError ? s.borderError : ''} commonInput`}
                    onChange={onChangeHandler}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    name={name}
                />
            </div>
            {showError && <div className={s.errorText}>{errorMessage}</div>}
        </div>
    )
})
