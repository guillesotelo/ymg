import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../app/context/AppContext'
import { isTooBright } from '../../helpers'

type Props = {
    label?: string
    className?: string
    bgColor?: string
    textColor?: string
    handleClick: () => any
    disabled?: boolean
    svg?: string
    style?: React.CSSProperties
    outline?: boolean
}

export default function Button({ label, handleClick, className, bgColor, textColor, disabled, svg, style, outline }: Props) {
    const [buttonStyle, setButtonStyle] = useState<React.CSSProperties>({ ...style })
    const { darkMode } = useContext(AppContext)

    return svg ?
        <div
            className="button__icon"
            onClick={handleClick}
            style={{
                backgroundColor: bgColor || '',
                border: `1px solid ${outline ? textColor : bgColor || ''}`,
                color: textColor || 'black',
                opacity: disabled ? '.3' : '',
                padding: '.2vw',
                cursor: disabled ? 'not-allowed' : '',
                display: 'flex',
                flexDirection: 'row',
                minHeight: '2rem',
                alignItems: 'center',
                gap: '.5rem',
                paddingInline: '.5rem',
                ...buttonStyle
            }}
            onMouseEnter={() => setButtonStyle({
                ...style,
                backgroundColor: outline ? textColor : 'transparent',
                color: outline ? bgColor : !darkMode ? (isTooBright(bgColor) ? 'black' : bgColor) : ''
            })}
            onMouseLeave={() => setButtonStyle({
                ...style,
                backgroundColor: bgColor || '',
                color: textColor || 'black',
            })}
        >
            <img src={svg} alt="Button" className='button__svg' />
            {label || ''}
        </div>
        :
        <button
            className={className || 'button__default'}
            onClick={handleClick}
            style={{
                backgroundColor: bgColor || '',
                border: `1px solid ${outline ? textColor : bgColor || ''}`,
                color: !textColor && darkMode ? 'lightgray' : textColor,
                opacity: disabled ? '.3' : '',
                cursor: disabled ? 'not-allowed' : '',
                ...buttonStyle
            }}
            disabled={disabled}
            onMouseEnter={() => setButtonStyle({
                ...style,
                color: outline || !darkMode ? bgColor : '',
                backgroundColor: outline ? textColor : 'transparent',
            })}
            onMouseLeave={() => setButtonStyle({
                ...style,
                backgroundColor: bgColor || '',
                color: textColor || 'black',
            })}
        >
            {label || ''}
        </button>
}