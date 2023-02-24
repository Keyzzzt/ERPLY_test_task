import React, {FC} from 'react'

type Props = {
    title: string
    type: 'submit' | 'button'
    color: 'success' | 'danger'
    marginTop?: string
    marginRight?: string
    onClick?: any
    minWidth?: string | undefined
    padding?: string | undefined
    disabled?: boolean

}

export const Button: FC<Props> = ({
                                      disabled,
                                      title,
                                      type,
                                      color,
                                      marginTop = undefined,
                                      onClick,
                                      minWidth = undefined,
                                      padding = undefined,
                                      marginRight = undefined
                                  }) => {
    const className = disabled ? 'disabled' : color === 'success' ? 'success' : 'danger'

    return (
        <input disabled={disabled} onClick={onClick} style={{marginTop, marginRight, minWidth, padding}}
               className={className} type={type} value={title}/>
    )
}
