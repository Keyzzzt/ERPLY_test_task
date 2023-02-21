import React, {FC} from 'react'
import s from './message.module.scss'
import {Button} from "../Button/Button";

type ModalProps = {
    message: string | null
    handleCloseMessage: () => void
type: 'success' | 'error'
}
export const Message: FC<ModalProps> = ({message, handleCloseMessage, type}) => {
    const className = type === 'success' ? s.success : s.error
    return (
        <div className={s.message + ' ' + className}>
            <p className={s.text}>{message}</p>
            <Button onClick={handleCloseMessage} title='Close' type='button' color={type === 'success' ? 'success' : 'danger'}/>
        </div>
    )
}

