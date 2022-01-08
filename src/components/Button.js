import React from 'react';
import styles from './Button.module.scss';
import classnames from 'classnames';

let Button = ({ text, onClick, buttonType = "primary", className=null, ToggleOption }) => {

    return(
        <>
            <button
                className={ classnames(styles[buttonType], styles["c-button"], className) }
                onClick = { () => onClick && onClick() }
            >
                { text }
            </button>
            {ToggleOption}
        </>
    );
}
export default Button;