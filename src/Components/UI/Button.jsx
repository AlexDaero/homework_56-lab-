import React, { useEffect, useState } from "react";
import './Button.css'

function Button(props) {

    useEffect(() => {
        const copyState = { ...styles }
        copyState.background = props.bgColor
        setStyles(copyState)
    }, [props.bgColor])

    const [styles, setStyles] = useState({
        background: props.bgColor,
        border: props.border,
        borderRadius: props.borderRadius,
        height: props.height,
        width: props.width,
        color: props.color
    })
    return (
        <button
            className="button"
            onClick={props.click}
            style={styles}
        >
            {props.text}
        </button>
    )
}

export default Button